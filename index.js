const {check} = require('./checker'),
    {writeFileSync,readFileSync} = require('fs'),
    {bgGreen} = require('chalk'),
    {timeout} = require('./settings/config.json'),
    tokens = readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split("\n");

writeFileSync('utils/invalid.txt', 'utf-8');
writeFileSync('utils/verified.txt', 'utf-8');
writeFileSync('utils/unverified.txt', 'utf-8');


let i = 0;

setInterval(() => {
    if (i >= tokens.length) {
        console.log(`[${bgGreen('CHEKING TOKENS !!')}]`);
        process.exit(1);
    }
    check(tokens[i]);
    i++;
}, timeout);