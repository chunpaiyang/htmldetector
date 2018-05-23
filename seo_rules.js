const cheerio =  require('cheerio');
const fs = require('fs');
const util = require('util');
const glob = require('glob');

const fs = require('fs');

// ------------ require load plug-in/seo_rule_8 -------------
const seo_rules = [];
const seo_rules_names = glob.sync("./plug-in/seo_rule_*", '');
seo_rules_names.forEach((file_name)=>{
    seo_rules.push(require(file_name));  
});

module.exports = (()=>{
    return {
        /*
        detectFromReadableStream: (readablestream) => {
            let buf = [];
            let html_contents = null;
            readablestream.on('readable', () => {
                let data = null;
                while (data = this.read()) {
                    buf.push(data);
                }
            });
            readablestream.on('end', () => {
                html_contents = Buffer.concat(buf);
            });
            return this.detect(html_contents);
        },*/
        detect: (html_contents, opt) => {
            const $ = Object.freeze(cheerio.load(html_contents));
        
            const seo_results = [];
            seo_rules.forEach(seo_rule => {
                seo_results.push({
                    name: seo_rule.name,
                    description: seo_rule.description,
                    results: seo_rule.detect($)
                });
            });
        
            return seo_rules;
        }
    }
})();