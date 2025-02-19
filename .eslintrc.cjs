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
    // Allow flexibility but enforce important checks
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn for unused vars, ignore "_"
    "@typescript-eslint/no-explicit-any": "warn", // Warn (but allow) 'any'
    "@typescript-eslint/explicit-function-return-type": "warn", // Warn (but allow missing return types)
    "@typescript-eslint/no-non-null-assertion": "warn", // Warn for `!` (non-null assertion)
    "@typescript-eslint/no-unsafe-assignment": "warn", // Warn for unsafe assignments
    "@typescript-eslint/no-unnecessary-type-assertion": "warn", // Warn unnecessary type assertions
    "@typescript-eslint/require-await": "warn", // Warn if async function doesn't use `await`
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;
