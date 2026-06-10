/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://reliqube.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq:       "monthly",
  priority:         0.8,
  sitemapSize:      100,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/"        },
      { userAgent: "*", disallow: "/api/" },
    ],
    additionalSitemaps: [],
  },
};
