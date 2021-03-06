import loadFile from "../utils/loadFile";
import getConfigPath from "../paths/getConfigPath";

const withXMLTemplate = (content) => {
  const { urlsetStylesheet } = loadFile(getConfigPath());
  const xsltElement =
    urlsetStylesheet && urlsetStylesheet.includes(".xsl")
      ? `\n<?xml-stylesheet type="text/xsl" href="${urlsetStylesheet}" ?>\n`
      : "\n";
  return `<?xml version="1.0" encoding="UTF-8"?>${xsltElement}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`;
};

export { withXMLTemplate };
