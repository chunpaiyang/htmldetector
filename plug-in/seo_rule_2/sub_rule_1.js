const util = require('util');


module.exports = {
    name: "a_no_alt_attribute",
    description: "<a /> tag without rel attribute",
    detect: ($) => {
        let counter = 0;
        const result = $('a').each((item)=>{
            if ($('a')[item].attribs.rel !== undefined) {
                counter++;
            }
        });
        
        return {
            need_report: counter == 0,
            value: counter == 0
        }
    }
}
