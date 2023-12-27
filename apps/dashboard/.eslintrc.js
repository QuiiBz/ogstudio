/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./node_modules/@ogstudio/eslint/nextjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
