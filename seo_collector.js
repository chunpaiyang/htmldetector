/**
 * @fileOverview traverse each detector and call each detecor's
 * detect function and collection all result 
 */

const cheerio =  require('cheerio');
const fs = require('fs');
const util = require('util');
const isStream = require('is-stream');

module.exports = (() => {
    // if in is not readable stream, assume it is buffer, directly return.
    // else read until end, concat all to buffer.
    const getHtmlConents = (input) => {
        let buf = [];
        let html_contents = null;

        if (!isStream.readable(input)) { // assume in is a buffer
            return input;
        }

        readablestream.on('readable', () => {
            let data = null;
            while (data = this.read()) {
                buf.push(data);
            }
        });
        readablestream.on('end', () => {
            html_contents = Buffer.concat(buf);
        });

        return html_contents;
    };
    return {
        /**
         * @param {[] or readableStream]} data - input buffer or readable stream. Suspect the content is html format string.
         * @param {Object[]} seo_rules: seo rules which used to detect. Each Object must have detect() functon.
         * @param {Object} opt: the parse result of node-getopt of process.argv
         * @param {null or writableStream} output: if output is not writable stream, output result to buffer and return.
         *  else write result to writable stream. 
         */
        collect: (data, seo_rules, env, output/*optional*/) => {
            let outputToWritableStream = false;
            const html_contents = getHtmlConents(data);
            const $ = Object.freeze(cheerio.load(html_contents));

            let seo_results = [];
            if (output && isStream.writable(output)) {
                outputToWritableStream = true;
                seo_results = output;
            }

            seo_rules.forEach(seo_rule => {
                let output_item = {
                    name: seo_rule.name,
                    description: seo_rule.description,
                    results: seo_rule.detect($, env[seo_rule.name])
                };
                if (!outputToWritableStream) { // output to buffer
                    seo_results.push(output_item);
                } else { // output to writable stream
                    seo_results.write(output_item);
                }
            });

            if (outputToWritableStream) {
                seo_results.end();
            }

            return seo_results;
        }
    };
})();
