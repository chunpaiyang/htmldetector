module.exports = {
    name: "no_meta_keywords",
    description: "Header doesn't have <meta name=\"keywords\" .../>",
    detect: ($) => {
        let items = $("head").children("meta[name='keywords']");

        return {
            need_report: 0 == items.length,
            value: 0 == items.length
        }
    }
}
