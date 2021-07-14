import path from "path";

export const toChunks = (arr, chunkSize) => {
  return arr.reduce(
    (prev, _, i) =>
      i % chunkSize ? prev : [...prev, arr.slice(i, i + chunkSize)],
    []
  );
};

export const resolveSitemapChunks = (baseSitemapPath, chunks) => {
  const folder = path.dirname(baseSitemapPath);
  const prefix = path.basename(baseSitemapPath);

  return chunks.map((chunk, index) => {
    const filename = `${prefix}${index > 0 ? `-${index}` : ""}.xml`;

    return {
      path: `${folder}/${filename}`,
      fields: chunk,
      filename,
    };
  });
};
