const util = require('util');

module.exports = {
    name: "one_h1_tags",
    description: "More than 1 h1 tags",
    detect: ($, env) => {
        let counter = 0;
        const result = $('h1').each((item)=>{
            counter++;
        });

        return {
            need_report: counter > 1,
            value: counter > 1
        };
    }
}
