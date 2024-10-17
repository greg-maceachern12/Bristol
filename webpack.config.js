module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint/lib/cli-engine/formatters/stylish')
          }
        }
      ]
    }
  ]
}
