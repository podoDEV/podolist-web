module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['tui', 'plugin:react/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    "indent": ["error", 2],
    'no-process-env': 0,
    'no-return-assign': 0,
    'no-warning-comments': 0,
    'no-shadow': 0,
    'spaced-comment': 0,
    'newline-before-return': 0,
    'padding-line-between-statements': 0,
    'dot-notation': [2, {allowKeywords: true}],
    'new-cap': [2, {capIsNew: false}],
    'lines-between-class-members': 0,
    complexity: 0,

    // react plugin
    'react/no-deprecated': 0,
    'react/jsx-no-target-blank': 0,
    'react/no-find-dom-node': 0,

    'prettier/prettier': 'error'
  }
};
