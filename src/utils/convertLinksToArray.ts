import chalk = require("chalk");
import validUrl = require("valid-url");

const convertLinksToArray = (links: string): string[] => {
    const result = links
        .split(",")
        .map((link: string) => link.trim())
        .filter((link: string) => {
            if (!validUrl.isWebUri(link)) {
                console.log(chalk.red(`Incorect link: ${link}`));
                return false;
            }

            return !!link;
        });

    return result;
};

export default convertLinksToArray;
