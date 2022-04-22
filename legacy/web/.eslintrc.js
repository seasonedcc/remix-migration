module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  plugins: ['prettier', '@typescript-eslint'],

  rules: {
    '@next/next/no-html-link-for-pages': 0,
    '@next/next/no-img-element': 0,
    'import/no-anonymous-default-export': 0,
    'react/display-name': 0,
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
      },
    ],
  },
}
