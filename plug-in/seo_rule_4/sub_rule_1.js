const util = require('util');

module.exports = {
    name: "N_strong_tags",
    description: "More than N strong tags",
    detect: ($, env) => {
        let counter = 0;
        const result = $('strong').each((item)=>{
            counter++;
        });

        let thresh_hold = env['cnt'] === undefined? 15 : env['cnt'];
        return {
            need_report: counter > thresh_hold,
            value: counter > thresh_hold
        };
    }
}
