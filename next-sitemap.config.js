/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://reliqube.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  exclude: ['/api/*', '/_not-found'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: ['https://reliqube.com/sitemap.xml'],
  },
};
