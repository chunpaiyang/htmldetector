// ------------ require -------------
const util = require('util');
const opt = require('./getopt');
const seo_rules = require('./seo_rules');


const INPUT_FILE_NAME = opt.input_html_file_name;
const html_contents = Object.freeze(fs.readFileSync(INPUT_FILE_NAME, 'utf8'));
const seo_results = seo_rules.detect(html_contents);

if (!opt.output_file_name) {
    console.log(util.inspect(seo_results, {depth: null}));
}