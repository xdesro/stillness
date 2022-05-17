const { find } = require("geo-tz");

const GPS_DEFAULT = [40.76, -73.95];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "*.{woff2,jpg,css}": "" });
  eleventyConfig.addPassthroughCopy({ meta: "meta" });

  eleventyConfig.addFilter("timezonedDate", (str, coords) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "long",
    };
    if (!coords) coords = GPS_DEFAULT;
    const timeZone = find(...coords);

    const date = new Date(str).toLocaleDateString("en-US", {
      timeZone,
      ...options,
    });
    return date;
  });
  eleventyConfig.addFilter("encodeURIComponent", (str) => {
    return encodeURIComponent(str);
  });
  eleventyConfig.addFilter("urlDate", (str) => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year} ${`${month}`.padStart(2, "0")} ${`${day}`.padStart(
      2,
      "0"
    )}`;
  });
  eleventyConfig.addFilter("contentToDescription", (str) => {
    return str.replace(/\r|\n|\r\n/g, " ❡ ");
  });
  return {
    htmlTemplateEngine: "njk",
  };
};
