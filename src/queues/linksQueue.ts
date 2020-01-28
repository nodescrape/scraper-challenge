import Queue = require("bull");
import dotenv = require("dotenv");

dotenv.config();

const linksQueue = new Queue("CeneoScrapper", {
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    }
});

export default linksQueue;
