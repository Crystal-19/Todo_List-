module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'react-app',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jxs: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [],
  root: true,
  rules: {
    'semi': [2, 'never'],
    'no-duplicate-imports': 'error',
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
