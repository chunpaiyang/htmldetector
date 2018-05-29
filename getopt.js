/**
 * @fileOverview parse process.argv
 */

const Getopt = require('node-getopt');
const path = require('path');

module.exports = (() => {
    return {
         // argv shall be process.argv
        parse: function(argv) {
            let Help = () => {
                const program_name = path.basename(argv[1]);
                console.error("usage:\n");
                console.error(`\t${program_name} -d [--rules=$rules_file] --input-file=$input_file [--output-file=$out_file]; // detect`); 
                console.error(`\t${program_name} -l; // list seo rules`); 
            }
            let getopt = new Getopt([
            ['l'  , 'list'],
            ['d'  , 'detect'],
            [''  , 'json-rules[=ARG]'],
            [''  , 'json-env[=ARG]'],
            [''  , 'input-file[=ARG]'],
            [''  , 'output-file[=ARG]'],
            ['h' , 'help']
            ]).bindHelp();
        
            let opt = getopt.parse(argv.slice(2));

            if (opt.options.d) { // detect
                let input_file_name = opt.options['input-file'];
                let output_file_name = opt.options['output-file'];
                let white_list_rules = null;
                let json_env = {};
                if (opt.options['json-rules'] ) {
                    try {
                        white_list_rules = JSON.parse(opt.options['json-rules']); // assume array
                    } catch (e) {
                        console.error(`--json-rules=${opt.options['json-rules']} is not json format`);
                        process.exit(1);
                    }
                }

                /**
                 * assume json_env format:
                 * {
                 *  'seo_rule_4': { // seo_rule.name, please refer seo_collector.js
                 *     cnt: 4
                 *  }
                 * }
                 */
                if (opt.options['json-env'] ) {
                    try {
                        json_env = JSON.parse(opt.options['json-env']);
                    } catch (e) {
                        console.error(`--json-env=${opt.options['json-env']} is not json format`);
                        process.exit(1);
                    }
                }                

                if (!input_file_name) {
                    console.error("Need input-file");
                    Help();
                    process.exit(1);
                }
            
                return {
                    action: 'detect',
                    input_file_name: input_file_name,
                    output_file_name: output_file_name,
                    white_list_rules: white_list_rules,
                    env: json_env
                };
            } else if (opt.options.l) { // list rules
                return {
                    action: 'list'
                };
            }

            console.error('Unknown action');
            Help();
            process.exit(1);
        }
    };

})();