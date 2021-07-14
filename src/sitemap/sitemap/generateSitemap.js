import buildSitemapXml from "./buildSitemapXml";
import { exportFile } from "../utils/export-file";

const generateSitemap = (chunk) => {
  const sitemapXml = buildSitemapXml(chunk.fields);
  exportFile(chunk.path, sitemapXml);
};
export default generateSitemap;
