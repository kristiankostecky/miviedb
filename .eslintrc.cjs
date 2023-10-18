module.exports = {
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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'perfectionist'],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'perfectionist/sort-imports': [
      'error',
      {
        'newlines-between': 'never',
        type: 'alphabetical',
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        'custom-groups': { callback: 'on*', top: ['id', 'key', 'ref'] },
        groups: ['top', 'unknown', 'callback'],
        type: 'alphabetical',
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'never', props: 'never' },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
