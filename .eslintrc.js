module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:array-func/recommended',
    'prettier',
    'airbnb-base',
  ],
  plugins: ['node', 'array-func', 'jest', 'optimize-regex', 'prettier', 'promise', 'sql', 'security', 'unicorn'],
  parserOptions: {
    ecmaVersion: 2017,
    impliedStrict: true,
  },
  env: {
    browser: false,
    node: true,
    jest: true,
    es6: true,
    worker: false,
    serviceworker: false,
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': ['error', { consistent: true }],
    'array-func/prefer-array-from': 'off',
    'function-paren-newline': 'off',
    'no-underscore-dangle': 'off',
    'optimize-regex/optimize-regex': 'warn',
    'arrow-parens': ['error', 'always'],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
      },
    ],
    'sql/format': [
      'error',
      {
        ignoreExpressions: false,
        ignoreInline: true,
        ignoreTagless: true,
      },
    ],
    'sql/no-unsafe-query': [
      'error',
      {
        allowLiteral: false,
      },
    ],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['mongo-mock', 'mockdate', 'gm'],
      },
    ],
  },
};
