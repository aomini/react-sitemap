import path from "path";
import { resolveSitemapChunks } from "../utils/chunkjs";
import createUrl from "../utils/createUrl";
import generateSitemap from "./generateSitemap";

const generateNonDynamicPages = (siteUrl, nonDynamicPages = []) => {
  if (!nonDynamicPages.length) return [];

  const prefix = "static-pages";
  const chunks = nonDynamicPages.map((page) => ({
    loc: createUrl(siteUrl, page),
    lastmod: new Date().toISOString(),
  }));

  const exportPath = path.resolve(process.cwd(), "public", prefix);

  const sitemapChunks = resolveSitemapChunks(exportPath, [chunks]);

  sitemapChunks.forEach((chunk) => {
    generateSitemap(chunk);
  });
  return sitemapChunks;
};
export default generateNonDynamicPages;
