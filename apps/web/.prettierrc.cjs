/* eslint-disable no-undef */
/** @type {import("prettier").Options} */
module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react",
    "^next",
    "^~/middleware",
    "^~/services",
    "^~/lib",
    "^~/utils",
    "^~/hooks",
    "^~/types",
    "^~/routes",
    "^~/pages",
    "^@workspace/ui",
    "^~/components",
    "^~/assets",
    "^~/public",
    "^~/styles",
    "^[^]",
    "^[./]",
  ],
};
