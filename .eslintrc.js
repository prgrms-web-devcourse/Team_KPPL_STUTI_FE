module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    '@emotion/eslint-plugin',
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'desc',
        },
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'import/named': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
