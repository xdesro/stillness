const { find } = require("geo-tz");
const { chain, groupBy, toPairs, value } = require("lodash");

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

  eleventyConfig.addFilter("shortDate", (str) => {
    const date = new Date(str);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("encodeURIComponent", (str) => {
    return encodeURIComponent(str);
  });

  eleventyConfig.addFilter("contentToDescription", (str) => {
    return str.replace(/\r|\n|\r\n/g, " ❡ ");
  });

  eleventyConfig.addCollection("postsByYear", (collectionApi) =>
  // Use lodash methods to sort posts by year
  // Turns { year: [posts] } format into [ year, [posts] ] ]
    chain(collectionApi.getFilteredByTag("posts"))
      .groupBy((post) => {
        return new Date(post.date).getFullYear();
      })
      .toPairs()
      .value()
  );

  return {
    htmlTemplateEngine: "njk",
  };
};
