import path from "path";
import axios from "axios";
import chalk from "chalk";
import asyncSiteMapGenerate from "./sitemap";
import getConfigPath from "./sitemap/paths/getConfigPath";
import loadFile from "./sitemap/utils/loadFile";
import { exportFile } from "./sitemap/utils/export-file";
import withSitemapIndex from "./sitemap/withSitemapIndex";
import generateNonDynamicPages from "./sitemap/sitemap/generateNonDynamicPages";

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

export async function cli() {
  const {
    siteUrl,
    apiUrl,
    nonDynamicPages = [],
    siteMaps,
  } = loadFile(getConfigPath());
  console.log(chalk.yellow("Sitemap generation initiated..."));
  let chunks = [];

  siteMaps.forEach(async (fetchObj, index) => {
    const fetcher = async (params) => {
      return await axios.get(apiUrl + fetchObj.url, {
        params: {
          limit: 3000,
          ...params,
        },
      });
    };

    console.log(chalk.blue(`-${fetchObj.name} sitemap generation initiated`));

    const computedChunk = await asyncSiteMapGenerate(fetcher)({
      prefix: fetchObj.name,
      url: apiUrl + fetchObj.url,
    });

    console.log(chalk.green(`-${fetchObj.name} sitemap generated`));

    if (index + 1 === siteMaps.length) {
      const staticPagesChunk = generateNonDynamicPages(
        siteUrl,
        nonDynamicPages
      );
      console.log(chalk.green("-Static pages sitemap generated"));
      chunks = [...staticPagesChunk, ...chunks, ...computedChunk];

      exportFile(
        path.join(process.cwd(), "public", "sitemap_index.xml"),
        withSitemapIndex(buildIndexSitemapXml(chunks))
      );

      console.log(chalk.bgGreen("DONE"));
    }
  });
}
