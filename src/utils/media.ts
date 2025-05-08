import path from "path";

const videoExtensions = [".m4v", ".mp4", ".mov"];

export const getFileType = (uri: string) => {
  const extension = path.extname(uri);

  return videoExtensions.includes(extension) ? "Video" : "Photo";
};
