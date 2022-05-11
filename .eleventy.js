module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "*.{woff2,jpg,}": "" });
    eleventyConfig.addPassthroughCopy({ "meta": "meta" });

    eleventyConfig.addFilter('jsDate', str => {
        return new Date(str);
    })
    return {
        htmlTemplateEngine: 'njk'
    }
}