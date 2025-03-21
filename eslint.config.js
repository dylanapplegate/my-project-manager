// eslint.config.js
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'
import jestPlugin from 'eslint-plugin-jest'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'], // Adjust the file patterns as needed
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...jestPlugin.configs['flat/recommended'].rules,
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
]
