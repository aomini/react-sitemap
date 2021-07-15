const createUrl = (basePath, url) => {
  return new URL(url, basePath).href;
};
export default createUrl;
