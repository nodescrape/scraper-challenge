import { Job } from "bull";
import chalk = require("chalk");
import cheerio = require("cheerio");
import fs = require("fs");
import Link from "./types/link";
import Offer from "./types/offer";
import getRetailerPrice from "./utils/getRetailerPrice";
import linksQueue from "./queues/linksQueue";
import puppeteer = require("puppeteer");
import wait from "./utils/wait";
import formatProductName from "./utils/formatProductName";

const main = async () => {
    console.log(chalk.blue("Ceneo Scraper Worker"));

    const browser = await puppeteer.launch({ headless: false });

    linksQueue.process(async (job: Job<Link>, done) => {
        job.progress(0);

        const page = await browser.newPage();
        await page.goto(job.data.url);
        await page.click("a[href$=clr]");
        await wait(1000);

        const content = await page.content();
        const $ = cheerio.load(content);

        const productName = $("h1.product-name").text();
        const price = $("[data-price]").attr("data-price");
        const offers = $("tr.product-offer").get();

        const allOffers: Offer[] = offers
            .map(product => ({
                retailer: $(product).attr("data-shopurl"),
                price: Number($(product).attr("data-price"))
            }))
            .filter(offer => !!offer.price && !!offer.retailer);

        const prices = allOffers.map((offer: Offer) => offer.price);

        const data = {
            productName: formatProductName(productName),
            price: Number(price),
            totalOffers: allOffers.length,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
            mediamarktPrice: getRetailerPrice(allOffers, "mediamarkt.pl"),
            mediaexpertPrice: getRetailerPrice(allOffers, "mediaexpert.pl"),
            euroPrice: getRetailerPrice(allOffers, "euro.com.pl"),
            allOffers
        };

        job.progress(50);

        if (!fs.existsSync("results")) {
            fs.mkdirSync("results");
        }

        const id = job.data.url.split("/").pop();
        fs.writeFileSync(`./results/${id}.json`, JSON.stringify(data), "utf8");

        job.progress(100);

        done(null, id);
    });

    linksQueue.on("completed", (job, id) => {
        console.log(`Result for product with id ${id} saved`);
    });

    process.on("beforeExit", async () => {
        await browser.close();
    });
};

main();
