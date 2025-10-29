module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',                         // disable prop-types checks
    'no-unused-vars': ['error', { varsIgnorePattern: '^React$', args: 'none' }], // ignore unused React import
    'react/react-in-jsx-scope': 'off',                 // React import not required with new JSX transform
    'react/no-unescaped-entities': 'off'               // allow plain apostrophes in JSX
  },
};