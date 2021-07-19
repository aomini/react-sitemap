const path = require("path");
const chalk = require("chalk");
import generateSitemap from "./sitemap/generateSitemap";
import { toChunks, resolveSitemapChunks } from "./utils/chunkjs";
import loadFile from "./utils/loadFile";
import getConfigPath from "./paths/getConfigPath";
import createUrl from "./utils/createUrl";

const initialParams = {
  /** Total count of data */
  total: 0,
  /** Count of fetched data */
  current: 0,
  /** Current page */
  page: 1,
  /** Fields for xml */
  xmlFields: [],
};

const asyncSiteMapGenerate = (fetcher) => async (params) => {
  const computedParams = {
    ...initialParams,
    ...params,
  };
  const { total, current, page, prefix, xmlFields, pathname, url } =
    computedParams;
  const { data } = await fetcher({ page });

  if (current < total || current === 0) {
    const count = data.count;
    const currentRowsCount = data.rows.length;
    const { siteUrl } = loadFile(getConfigPath());

    const fields = data.rows.map((x) => {
      if (!x.updated_at) {
        console.log(chalk.red.bold(`📣 ${url} is missing updated_at key`));
        throw new Error("Missing key updated_at");
      }
      return {
        loc: createUrl(
          siteUrl,
          pathname ? pathname.replace("[slug]", x.slug) : x.slug
        ), // Absolute url
        lastmod: x.updated_at,
      };
    });

    return await asyncSiteMapGenerate(fetcher)({
      ...computedParams,
      total: count,
      current: current + currentRowsCount,
      page: page + 1,
      xmlFields: [...xmlFields, ...fields],
    });
  }

  /** Generate xml files with the computed xmlFields */
  const chunks = toChunks(xmlFields, 1000);

  const exportPath = path.resolve(process.cwd(), "public", prefix || "sitemap");

  const sitemapChunks = resolveSitemapChunks(exportPath, chunks);

  sitemapChunks.forEach((chunk) => {
    generateSitemap(chunk);
  });
  return sitemapChunks;
};
export default asyncSiteMapGenerate;
