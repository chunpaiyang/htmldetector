const Getopt = require('node-getopt');

module.exports = (() => {
    // # Parse argument #
    let Help = () => {
        console.error(process.argv[1] +" input_html_file [--output-file=out_file]"); 
    }

    let getopt = new Getopt([
    [''  , 'output-file[=ARG]'],
    ['h' , 'help']
    ]).bindHelp();

    let opt = getopt.parse(process.argv.slice(2));

    let input_html_file_name = '';
    
    let output_file_name = '';

    if (!opt.argv[0]) {
        Help();
        process.exit(1);
    }
    input_html_file_name = opt.argv[0];
    output_file_name = opt.options['output-file'];

    return {
        input_html_file_name: input_html_file_name,
        output_file_name: output_file_name
    };

})();