
module.exports = {
    name: "no_title_tag",
    description: "Header doesn't have <title> tag",
    detect: ($) => {
        let count = 0;
        $("head").children("title").each(function () {
            count++;
            return false;
        });
        return {
            need_report: 0 === count,
            value: 0 === count
        }
    }
}