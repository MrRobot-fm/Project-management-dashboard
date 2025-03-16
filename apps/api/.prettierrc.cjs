/* eslint-disable no-undef */
/** @type {import("prettier").Options} */
module.exports = {
  semi: true,
  tabWidth: 2,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^express",
    "^~/routes",
    "^~/controllers",
    "^~/middlewares",
    "^~/assets",
    "^~/public",
    "^[^]",
    "^[./]",
  ],
};
