import path from "path";

const getPath = (...pathSegment) => {
  return path.resolve(process.cwd(), ...pathSegment);
};
export default getPath;
