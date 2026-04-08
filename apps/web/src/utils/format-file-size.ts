export const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const base = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(base));

  return parseFloat((bytes / Math.pow(base, i)).toFixed(dm)) + " " + sizes[i];
};
