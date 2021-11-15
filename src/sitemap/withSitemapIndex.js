const withSitemapIndex = (sitemaps) => {
  const { stylesheet } = loadFile(getConfigPath());
  let xsltElement = "";
  if (stylesheet) {
    xsltElement = `<?xml-stylesheet type="text/xsl" href="${stylesheet}" ?>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>${xsltElement}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`;
};
export default withSitemapIndex;
