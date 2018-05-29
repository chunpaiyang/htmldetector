const util = require('util');
const glob = require('glob');

const sub_rules = [];
const sub_rules_names = glob.sync(__dirname+"/sub_rule_*.js", '');
sub_rules_names.forEach((file_name)=>{
    sub_rules.push(require(file_name));
});

module.exports = (() => {
    return {
        name: 'seo_rule_5',
        version: '1',
        description: 'SEO Rule 5: use to detect more than 1 <H1> tags',
        detect: ($, env) => {
            results = [];

            sub_rules.forEach(((sub_rule)=>{
                let ret = sub_rule.detect($, env);
                if (ret && ret.need_report) {
                    results.push({
                        name: sub_rule.name,
                        description: sub_rule.description,
                        value: ret.value
                    });
                }
            }));

            return results;
        }
    }
})();
