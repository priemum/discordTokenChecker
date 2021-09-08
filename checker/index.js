const request = require('request'),
chalk = require('chalk'),
    {appendFile} = require('fs');
data = {
    invalid: [],
    verified: [],
    unverified: []
};

class Checker {
    constructor(token) {
        this.token = token;
    }
    check() {
        request({
            method: "GET",
            url: "https://discordapp.com/api/v7/users/@me",
            headers: {
                authorization: this.token
            }
        }, (error, response, body) => {
            if (!body) return;
            let json = JSON.parse(body);
            if (!json.id) {
                data.invalid.push(this.token);
                appendFile('utils/invalid.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            } else if (!json.verified) {
                data.unverified.push(this.token);
                appendFile('utils/unverified.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            } else {
                data.verified.push(this.token);
                appendFile('utils/verified.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            }
            console.clear();
            let text = "";
            text += chalk.green(`Verified: ${data.verified.length}`);
            text += chalk.blue(" | ");
            text += chalk.yellow(`Unverified: ${data.unverified.length}`);
            text += chalk.blue(" | ");
            text += chalk.red(`Invalid: ${data.invalid.length}`);
            let title = `[${chalk.green('Verified')}]: ${data.verified.length} | [${chalk.yellow('Unverified')}]: ${data.unverified.length} | [${chalk.red('Invalid')}]: ${data.invalid.length}`;
            log(text, title);
        });
    }
}

/**
 * @param text
 * @param title
 */
function log(text, title) {
    if (process.platform === 'win64') {
        process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
    } else {
        process.title = title;
    }
    console.log(text);
}

/**
 * @type {{check: Index.check}}
 */
const Index = {
    check: function(token) {
        new Checker(token).check();
    }
};

/**
 * @type {{check: Index.check}}
 */
module.exports = Index; 
