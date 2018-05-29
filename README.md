# htmldetector
## Introduction
- This project is used for detecting types of tag/attribute. User can easily define their own rules.
- The rules are node packages. I'll call it a 'plug-in package'.
- The interface of 'plug-in package' is `detect()` function. 
e.g.
```
    module.exports = {detect($, env): {...}}
```

## Command line usage
```sh
node main.js -l # list all detectors
node main.js -d --input-file $input_file_name --output-flie $output_filename # start to detect and output to $output_filename
node main.js -d --input-file $input_file_name # start to detect and output to console
node main.js -d --json-rules='["./plug-in/seo_rule_3"]' --input-file $input_file_name # start to detect and specify only detect with rule: seo_rule_3, if no json-rules means run all rules.
node main.js -d --input-file $input_file_name --json-env='{"seo_rule_4": {"cnt": 3}}' # pass cnt argument for seo_rule_4
```

## Plug-in package introduction
  - Due to this project use `glob` to glob plug-in package with a hard code prefix path, so that you need to put plug-in package under path `./plug-in` and package name with prefix `seo_rule_`.
  - Currently there are 5 default seo plug-in packages under `./plug-in`.

## Example steps of creating a plug-in package
  - step1. cp -rf ./plug-in/seo_rule_5 ./plug-in/xxxxxxx
  - step2. modify ./plug-in/xxxxxxx/sub_rule_x.js for your rules
  - step3. When developing a new rule, you can test with test.js
  - step4. run with htmldetector main.js

## Passing argument into plug-in package from command line
As the above example, the format of argument of command line of '--json-env' is '{$seo_rule_name: {$variable: ....}}'
The $project_name is define in index.js/main.js of your plug-in package. For example, in plug-in/seo_rule_4/main.js,

```javascript
module.exports = (() => {
    return {
        name: 'seo_rule_4', // this is $seo_rule_name
        ...
        detect: ($, env) => {
            ...
        }
```

## Using argument in defined plug-in package sub rules
For example, in plug-in/seo_rule_4/sub_rule_1.js

```javascript
module.exports = {
    ...
    detect: ($, env) => {
        ...
        let thresh_hold = env['cnt'] === undefined? 15 : env['cnt'];
        return {
            need_report: counter > thresh_hold,
            value: counter > thresh_hold
        };
    }
}

```

