/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@ogstudio/eslint/nextjs.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
