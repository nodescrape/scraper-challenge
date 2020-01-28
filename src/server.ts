import dotenv = require("dotenv");
import Arena = require("bull-arena");

dotenv.config();

Arena(
    {
        queues: [
            {
                name: "CeneoScrapper",
                hostId: "CeneoScrapper",
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
