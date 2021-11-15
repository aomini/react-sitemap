## config file example:

```js
module.exports = {
  /** Name of the domain */
  siteUrl: "https://example.com",

  /** Api url from which data is to be fetched */
  apiUrl: "https://api.example.com/v1/",

  /** Static pages (non-dynamic-routes) */
  nonDynamicPages: ["vendors", "/", "about-us"],

  /** Dynamic routes/ slug/ pages */
  siteMaps: [
    {
      url: "/vendor/list", // api endpoint
      path: "/vendors/[slug]", // path of the slugs generated from this endpoint
      name: "vendors", // name of the xml file, vendors.xml/ vendors-1.xml is created
    },
    // {
    //   url: "/question/list-slug",
    //   name: "questions",
    // },
  ],

  /** optional stylesheet using XSLT*/
  sitemapStylesheet: "xml/sitemap.xsl",
  urlsetStylesheet: "xml/urlset.xsl",
};
```
