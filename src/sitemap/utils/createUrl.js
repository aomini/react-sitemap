const createUrl = (basePath, url) => {
  return new URL(url, basePath);
};
export default createUrl;
