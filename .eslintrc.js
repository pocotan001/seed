/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["plugin:unicorn/recommended", "next/core-web-vitals", "prettier"],
  rules: {
    // Only allow absolute imports
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["..*"],
            message: "Usage of relative parent imports is not allowed.",
          },
        ],
      },
    ],
    // Avoid export default
    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    "import/no-default-export": "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        pathGroups: [
          {
            pattern: "~/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
  },
  overrides: [
    {
      files: [
        "./src/app/**/+(error|layout|loading|not-found|page|template).ts?(x)",
      ],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
      },
    },

    {
      files: ["**/?(*.)+(stories).ts?(x)"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
        "react-hooks/rules-of-hooks": "off",
      },
    },

    {
      files: ["**/?(*.)+(spec|test).ts?(x)"],
      extends: ["plugin:jest/recommended"],
    },

    {
      files: ["**/*.js"],
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
};

module.exports = config;
