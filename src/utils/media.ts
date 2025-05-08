import path from "path";

const videoExtensions = [".m4v", ".mp4", ".mov"];

export const getMediumType = (uri: string) => {
  const extension = path.extname(uri);
  return videoExtensions.includes(extension) ? "video" : "picture";
};
