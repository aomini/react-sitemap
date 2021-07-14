import path from "path";
import fs from "fs";

export const exportFile = (filePath, content) => {
  const folder = path.dirname(filePath);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  fs.writeFileSync(filePath, content);
};
