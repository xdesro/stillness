module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "*.{woff2,jpg,}": "" });
    eleventyConfig.addPassthroughCopy({ "meta": "meta" });
    return {
        htmlTemplateEngine: 'njk'
    }
}