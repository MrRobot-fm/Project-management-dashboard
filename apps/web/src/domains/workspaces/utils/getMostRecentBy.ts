export const getMostRecentBy = <
  TItem extends { [key in TKey]: string | Date },
  TKey extends "updatedAt" | "createdAt"
>(
  items: TItem[],
  key: TKey
) =>
  [...items].sort(
    (left, right) =>
      new Date(right[key]).getTime() - new Date(left[key]).getTime()
  )[0];
