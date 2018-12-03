const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const EJSBuilderPlugin = require('./lib/ejs-builder');

module.exports = {
  entry: './src/styles/app.scss',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'import-glob-loader',
        enforce: 'pre',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new EJSBuilderPlugin(),
    new ExtractTextPlugin('./styles/app.css'),
    new CopyWebpackPlugin([
      { from: './src/images', to: path.resolve(__dirname, 'dist', 'images') },
      { from: './src/_redirects', to: path.resolve(__dirname, 'dist') },
    ]),
  ],
};
