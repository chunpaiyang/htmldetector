/**
 * @fileOverview The main() of this project.
 * Input a html file and output parsed result to console or file.
 * The parsing rules are encapsulated in './seo_rules'
 */

const util = require('util');
const opt_parser = require('./getopt');
const seo_collector = require('./seo_collector');
const fs = require('fs');
const glob = require('glob');
const SEO_RULE_DETECTOR_NAMES = glob.sync("./plug-in/seo_rule_*", '');

const action_detect = (opt) => {
    const intput_file_name = opt.input_file_name;
    const output_file_name = opt.output_file_name || null; // optional arg
    const white_list_rules = opt.white_list_rules || null; // optional arg

    // read html content
    const html_contents = Object.freeze(fs.readFileSync(intput_file_name, 'utf8'));

    const get_intersect = (arr1, arr2) => {
        let a = new Set(arr1);
        let b = new Set(arr2);
        return new Set([...a].filter(item => b.has(item))); 
    };

    let specified_seo_rules = SEO_RULE_DETECTOR_NAMES;
    if (white_list_rules !== null) {
        specified_seo_rules = get_intersect(SEO_RULE_DETECTOR_NAMES, white_list_rules);
    }
    // detect with seo_rules
    const seo_rule_detector = [];
    specified_seo_rules.forEach((file_name) => {
        seo_rule_detector.push(require(file_name)); // notice that use require() to load rules
    });
    const seo_results = seo_collector.collect(html_contents, seo_rule_detector, opt.env);

    // format output
    const out_data = util.inspect(seo_results, {depth: null});
    if (!output_file_name) {
        console.log(out_data);
        process.exit(0);
    }

    fs.writeFileSync(output_file_name, out_data);
}

const action_list = () => {
    SEO_RULE_DETECTOR_NAMES.forEach((file_name) => {
        console.log(`${file_name}`);
    });
}

const main = () => {
    const action_mappor = {
        'detect': action_detect,
        'list': action_list
    };
    const opt = opt_parser.parse(process.argv);
    const func = action_mappor[opt.action];
    return func(opt);
}

main()