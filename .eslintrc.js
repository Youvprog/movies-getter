module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-essential", // This option doesn't impose formatting rules
    "plugin:vue/vue3-strongly-recommended", // This option imposes formatting rules on your code to improve readability
    "prettier",
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "vue/require-default-prop": "off",
  },
  plugins: ["vue", "import"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".vue"],
      },
    },
  },
};
