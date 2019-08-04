const VueLoaderPlugin = require('vue-loader/lib/plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

// Opti
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js', '.json']
  },

  optimization: {
	minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
            loader: 'babel-loader',
            exclude: file => (
              /node_modules/.test(file) &&
              !/\.vue\.js/.test(file)
              )
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ],
      },
    ]
  },
  plugins: [
	  new VueLoaderPlugin(),
	  new HTMLPlugin({
      template: 'src/index.html',
      vueCdn: devMode ? 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js' : 'https://cdn.jsdelivr.net/npm/vue'

    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
	  }),
  ],
}
