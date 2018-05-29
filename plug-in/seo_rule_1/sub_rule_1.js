const util = require('util');

module.exports = {
    name: "img_no_alt_attribute",
    description: "<img /> tag without alt attribute",
    detect: ($) => {
        let counter = 0;
        const result = $('img').each((item)=>{
            if ($('img')[item].attribs.alt !== undefined) {
                counter++;
            }
        });
        
        return {
            need_report: counter == 0,
            value: counter == 0
        }
    }
}
