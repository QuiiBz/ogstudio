/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./node_modules/@ogstudio/eslint/index"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
