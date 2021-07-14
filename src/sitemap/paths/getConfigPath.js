import fs from "fs";
import getPath from "./getPath";

const getConfigPath = () => {
  const configPath = getPath("react-sitemap.config.js");

  if (!fs.existsSync(configPath)) {
    throw new Error(`${configPath} does not exist.`);
  }

  return configPath;
};
export default getConfigPath;
