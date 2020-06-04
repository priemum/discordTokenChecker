const Bot = require('./checker');
const fs = require('fs');

const config = require('./settings/config.json');

fs.writeFileSync('utils/invalid.txt', '');
fs.writeFileSync('utils/verified.txt', '');
fs.writeFileSync('utils/unverified.txt', '');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split("\n");

var i = 0;
setInterval(() => {
    if (i >= tokens.length) {
        console.log("Done Checking Tokens!");
        process.exit(1);
    }
    Bot.check(tokens[i]);
    i++;
}, config.timeout);