module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'perfectionist'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:perfectionist/recommended-natural',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'alphabetical',
        groups: ['top', 'unknown', 'callback'],
        'custom-groups': { top: ['id', 'key', 'ref'], callback: 'on*' },
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'alphabetical',
        'newlines-between': 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
}
