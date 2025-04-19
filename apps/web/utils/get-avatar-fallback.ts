export const getAvatarFallback = (name: string) => {
  return name
    ?.split(" ")
    .map((letter) => letter[0])
    .join("")
    .toUpperCase();
};
