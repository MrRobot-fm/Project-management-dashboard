export const downloadAsset = async (file: { path: string; name: string } | undefined) => {
  if (!file) return;

  const response = await fetch(file.path);
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();

  URL.revokeObjectURL(url);
};
