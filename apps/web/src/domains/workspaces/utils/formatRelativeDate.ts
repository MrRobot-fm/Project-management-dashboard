import { formatDate } from "./formatDate";

export const formatRelativeDate = (value: string | Date) => {
  const date = new Date(value);
  const diffInDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays <= 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return formatDate(date);
};
