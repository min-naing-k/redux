module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: [ 'react-refresh' ],
  rules: {
    'no-console': 'warn',
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',
    'no-trailing-spaces': 'error',
    'space-before-blocks': 'error',
    semi: [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    'brace-style': [ 'error', '1tbs' ],
    'block-spacing': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', 'never' ],
    'arrow-spacing': [ 'error', { before: true, after: true } ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'switch-colon-spacing': [ 'error', { after: true, before: false } ],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'react-refresh/only-export-components': 'warn'
  }
};
