// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      prettier: prettierPlugin,
      'react-hooks': reactHooks, // 👈 aquí lo registramos
      'react-refresh': reactRefresh, // 👈 y este también
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Reglas recomendadas de eslint
      ...js.configs.recommended.rules,
      // Reglas recomendadas de react-hooks
      ...reactHooks.configs['recommended-latest'].rules,
      // Reglas de vite react-refresh
      ...reactRefresh.configs.vite.rules,
      // Desactiva conflictos con prettier
      ...eslintConfigPrettier.rules,

      // Tus reglas personalizadas
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          tabWidth: 2,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxSingleQuote: true,
          endOfLine: 'auto',
        },
      ],
    },
  },
])
