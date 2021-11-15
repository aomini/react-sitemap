import loadFile from "./utils/loadFile";
import getConfigPath from "./paths/getConfigPath";

const withSitemapIndex = (sitemaps) => {
  const { sitemapStylesheet } = loadFile(getConfigPath());
  const xsltElement = sitemapStylesheet
    ? `\n<?xml-stylesheet type="text/xsl" href="${sitemapStylesheet}" ?>\n`
    : "\n";
  return `<?xml version="1.0" encoding="UTF-8"?>${xsltElement}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`;
};
export default withSitemapIndex;
