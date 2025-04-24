export const getAvatarFallback = (name: string) => {
  return name
    ?.split(" ")
    .slice(0, 2)
    .map((letter) => letter[0])
    .join("")
    .toUpperCase();
};
