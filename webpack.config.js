const path = require('path');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const webpackConfig = {
  mode: "production",
  devtool: false,
  entry: {
    resume: [
      "./src/index.js",
      "./src/main.scss"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name]-[hash].js"
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".elm", ".scss", ".png"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['cache-loader', "babel-loader"]
      },
      {
        test: /\.scss$/,
        exclude: [/elm-stuff/, /node_modules/],
        // see https://github.com/webpack-contrib/css-loader#url
        use: [
          MiniCssExtractPlugin.loader, 'cache-loader', "css-loader", "postcss-loader", "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          MiniCssExtractPlugin.loader, 'cache-loader', "css-loader", "postcss-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/elm-stuff/, /node_modules/],
        loader: "file-loader"
      },
      {
      test: /\.elm$/,
      include: [path.resolve(__dirname, "src")],
      exclude: [/elm-stuff/, /node_modules/],
      use: ['cache-loader', {
        loader: "elm-webpack-loader",
        options: {
          optimize: true
        }
      }]
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: [/node_modules/]
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      // Use this template to get basic responsive meta tags
      template: "src/index.html",
      // inject details of output file at end of body
      inject: "head",
      minify: true,
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
    }),
    new CleanWebpackPlugin({
      root: __dirname,
      exclude: [],
      verbose: true,
      dry: false
    }),
    // Copy static assets
    new CopyWebpackPlugin([
      {
        from: "src/assets"
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
      test: /\.(js|css|html|svg)$/,
      minRatio: 1
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      minRatio: 1
    })
  ]
};

//module.exports = smp.wrap(webpackConfig);
module.exports = webpackConfig;