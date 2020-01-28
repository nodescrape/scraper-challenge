import chalk = require("chalk");
import clear = require("clear");
import inquirer = require("inquirer");
import linksQueue from "./queues/linksQueue";
import convertLinksToArray from "./utils/convertLinksToArray";

const getLinks = async (): Promise<string[]> => {
    const { links } = await inquirer.prompt([
        {
            name: "links",
            message: "Type URLs to Product Details Pages divided by comma:",
            type: "input",
            validate: input => {
                if (!input) {
                    return "You have to provide links";
                }

                if (!input.includes("http")) {
                    return "You have to provide links with http / https";
                }

                return true;
            }
        }
    ]);

    const linksArray = convertLinksToArray(links);

    return linksArray;
};

const main = async () => {
    clear();
    let count = 0;
    console.log(chalk.blue("Ceneo Scraper Producer"));

    const array = await getLinks();

    array.forEach((link: string) => {
        count++;
        linksQueue.add({ url: link });
    });

    const plural = count === 1 ? "link" : "links";
    console.log(chalk.green(`Added ${count} ${plural} to queue`));
};

main();
