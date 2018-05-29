
const sub_rule_1 = require('./sub_rule_1');
const fs = require('fs');
const cheerio =  require('cheerio');
const util = require('util');

const html_contents = Object.freeze(fs.readFileSync('./DATA_1', 'utf8'));
const $ = Object.freeze(cheerio.load(html_contents));
console.log(util.inspect(sub_rule_1.detect($), {depth: null}));