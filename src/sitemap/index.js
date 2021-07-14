const path = require("path");
const axios = require("axios");
const chalk = require("chalk");

import withSitemapIndex from "./withSitemapIndex";
import generateSitemap from "./sitemap/generateSitemap";
import { exportFile } from "./utils/export-file";
import { toChunks, resolveSitemapChunks } from "./utils/chunkjs";
import loadFile from "./utils/loadFile";
import getConfigPath from "./paths/getConfigPath";

const fetchVendors = async (params) => {
  return await axios.get(`https://stg.api.exampirate.com/v1/vendor/list`, {
    params: {
      limit: 2,
      ...params,
    },
  });
};

const fetchQuestions = async (params) => {
  return await axios.get(
    `https://stg.api.exampirate.com/v1/question/list-slug`,
    {
      params: {
        limit: 5000,
        ...params,
      },
    }
  );
};

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
  const { total, current, page, prefix, xmlFields } = computedParams;
  const { data } = await fetcher({ page });

  if (current < total || current === 0) {
    const count = data.count;
    const currentRowsCount = data.rows.length;
    const { siteUrl } = loadFile(getConfigPath());

    const fields = data.rows.map((x) => ({
      loc: path.join(siteUrl, x.slug), // Absolute url
      lastmod: new Date().toISOString(),
    }));

    return await asyncSiteMapGenerate(fetcher)({
      ...computedParams,
      total: count,
      current: current + currentRowsCount,
      page: page + 1,
      xmlFields: [...xmlFields, ...fields],
    });
  }

  /** Generate xml files with the computed xmlFields */
  const chunks = toChunks(xmlFields, 3000);

  const exportPath = path.resolve(process.cwd(), "public", prefix || "sitemap");

  const sitemapChunks = resolveSitemapChunks(exportPath, chunks);

  sitemapChunks.forEach((chunk) => {
    generateSitemap(chunk);
  });
  return sitemapChunks;
};
export default asyncSiteMapGenerate;

const buildIndexSitemapXml = (sitemaps) => {
  const { siteUrl } = loadFile(getConfigPath());
  return sitemaps
    .map((sitemap) =>
      `
    <sitemap>
      <loc>${path.join(siteUrl, sitemap.filename)}</loc>
    </sitemap>
  `.trim()
    )
    .join("");
};

const execute = async () => {
  console.log(chalk.yellow("Sitemap generation initiated..."));

  const vendorChunks = await asyncSiteMapGenerate(fetchVendors)({
    prefix: "vendors",
  });
  console.log(chalk.green("vendors generated"));
  console.log(chalk.yellow("Questions sitemap initiated..."));

  const questionChunks = await asyncSiteMapGenerate(fetchQuestions)({
    prefix: "questions",
  });

  console.log(chalk.green("Questions sitemap generated"));

  exportFile(
    path.join(process.cwd(), "public", "sitemap_index.xml"),
    withSitemapIndex(buildIndexSitemapXml([...vendorChunks, ...questionChunks]))
  );
  console.log(chalk.bgGreen.bold("Done"));
};
