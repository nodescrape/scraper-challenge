import dotenv = require("dotenv");
import Arena = require("bull-arena");

dotenv.config();

Arena(
    {
        queues: [
            {
                name: "CeneoScraper",
                hostId: "CeneoScraper",
                redis: {
                    port: Number(process.env.REDIS_PORT),
                    host: process.env.REDIS_HOST,
                    password: process.env.REDIS_PASSWORD
                }
            }
        ]
    },
    {
        basePath: "/"
    }
);
