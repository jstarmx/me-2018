const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const EJSBuilderPlugin = require('./lib/ejs-builder');

const babelrc = fs.readFileSync(path.resolve(__dirname, '.babelrc'), 'utf-8');

module.exports = {
  entry: './src/styles/app.scss',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
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
      { from: './src/images', to: path.resolve(__dirname, 'dist/images') },
      { from: './src/_redirects', to: path.resolve(__dirname, 'dist') },
      { from: './src/scripts', to: path.resolve(__dirname, 'dist/scripts') },
      {
        from: './src/scripts',
        to: path.resolve(__dirname, 'dist/scripts/nomodule'),
        transform: content =>
          babel.transform(content, JSON.parse(babelrc)).code,
      },
    ]),
  ],
};
