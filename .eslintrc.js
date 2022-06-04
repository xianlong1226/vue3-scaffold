module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser',
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    // 配置 jsx
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off'
  }
}
