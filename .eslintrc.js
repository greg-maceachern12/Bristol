module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    extends: [
      '@nuxtjs',
      'plugin:nuxt/recommended'
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      // Add any custom rules here
    }
  }