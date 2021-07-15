import path from "path";
import axios from "axios";
import chalk from "chalk";
import asyncSiteMapGenerate from "./sitemap";
import getConfigPath from "./sitemap/paths/getConfigPath";
import loadFile from "./sitemap/utils/loadFile";
import { exportFile } from "./sitemap/utils/export-file";
import withSitemapIndex from "./sitemap/withSitemapIndex";
import generateNonDynamicPages from "./sitemap/sitemap/generateNonDynamicPages";
import createUrl from "./sitemap/utils/createUrl";

const buildIndexSitemapXml = (sitemaps) => {
  const { siteUrl } = loadFile(getConfigPath());
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    sitemaps
      .map((sitemap) =>
        `
    <sitemap>
      <loc>${createUrl(siteUrl, sitemap.filename)}</loc>
    </sitemap>
  `.trim()
      )
      .join("")
  );
};

export async function cli() {
  const {
    siteUrl,
    apiUrl,
    nonDynamicPages = [],
    siteMaps,
  } = loadFile(getConfigPath());
  console.log(chalk.yellow("Sitemap generation initiated..."));
  let chunks = [];

  await Promise.all(
    siteMaps.map(async (fetchObj, index) => {
      const compositeUrl = createUrl(apiUrl, fetchObj.url);

      const fetcher = async (params) => {
        return await axios.get(compositeUrl, {
          params: {
            limit: 3000,
            ...params,
          },
        });
      };

      console.log(chalk.blue(`-${fetchObj.name} sitemap generation initiated`));

      const computedChunk = await asyncSiteMapGenerate(fetcher)({
        prefix: fetchObj.name,
        pathname: fetchObj.path,
        url: compositeUrl,
      });
      chunks = [...chunks, ...computedChunk];
      console.log(chalk.green(`-${fetchObj.name} sitemap generated`));
    })
  );
  const staticPagesChunk = generateNonDynamicPages(siteUrl, nonDynamicPages);
  console.log(chalk.green("-Static pages sitemap generated"));
  chunks = [...staticPagesChunk, ...chunks];

  exportFile(
    path.join(process.cwd(), "public", "sitemap_index.xml"),
    withSitemapIndex(buildIndexSitemapXml(chunks))
  );

  console.log(chalk.bgGreen("DONE"));
}
