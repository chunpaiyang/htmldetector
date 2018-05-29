
module.exports = {
    name: "no_meta_descriptions",
    description: "Header doesn't have <meta name=\"descriptions\" .../>",
    detect: ($) => {
        let items = $("head").children("meta[name='descriptions']");

        return {
            need_report: 0 == items.length,
            value: 0 == items.length
        }
    }
}
