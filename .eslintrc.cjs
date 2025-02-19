/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // Disable strict TypeScript rules
    "@typescript-eslint/no-unused-vars": "off", // No warnings for unused variables
    "@typescript-eslint/no-unnecessary-type-assertion": "off", // Remove type assertion warnings
    "@typescript-eslint/no-unsafe-assignment": "off", // Allow any type assignments
    "@typescript-eslint/no-explicit-any": "off", // Allow usage of 'any'
    "@typescript-eslint/no-non-null-assertion": "off", // Allow '!' non-null assertions
    "@typescript-eslint/explicit-function-return-type": "off", // Don't force return types
    "@typescript-eslint/require-await": "off", // Don't require 'await' if not needed
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;