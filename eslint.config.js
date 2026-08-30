import neostandard from 'neostandard'
import globals from 'globals'

export default [
  {
    ignores: ['node_modules/**', 'coverage/**', 'docs/**', '*.md']
  },
  ...neostandard({
    ignores: ['node_modules/**', 'coverage/**', 'docs/**']
  }),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'no-console': 'off',
      'no-process-exit': 'off'
    }
  },
  {
    files: ['*.test.js', 'tests/**/*.js'],
    rules: {
      'no-unused-expressions': 'off'
    }
  }
]
