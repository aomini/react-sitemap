import path from "path";
import axios from "axios";
import chalk from "chalk";
import asyncSiteMapGenerate from "./sitemap";
import getConfigPath from "./sitemap/paths/getConfigPath";
import loadFile from "./sitemap/utils/loadFile";
import { exportFile } from "./sitemap/utils/export-file";
import withSitemapIndex from "./sitemap/withSitemapIndex";

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
  const { apiUrl, siteMaps } = loadFile(getConfigPath());
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
    });
    chunks = [...chunks, ...computedChunk];

    console.log(chalk.green(`-${fetchObj.name} sitemap generated`));

    if (index + 1 === siteMaps.length) {
      console.log(chalk.bgGreen("DONE"));
      exportFile(
        path.join(process.cwd(), "public", "sitemap_index.xml"),
        withSitemapIndex(buildIndexSitemapXml(chunks))
      );
    }
  });
}
