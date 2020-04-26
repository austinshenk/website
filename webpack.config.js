const path = require('path');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        exclude: [/elm-stuff/, /node_modules/],
        // see https://github.com/webpack-contrib/css-loader#url
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"
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
      use: [{
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
        exclude: [/node_modules/],
        terserOptions: {
          mangle: true,
          compress: {
            ecma: "2016",
            pure_funcs: ["F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
            pure_getters: true,
            keep_fargs: false,
            booleans_as_integers: true,
            unsafe_comps: true,
            unsafe_arrows: true,
            unsafe_Function: true,
            unsafe_math: true,
            unsafe_methods: true,
            unsafe_proto: true,
            unsafe_regexp: true,
            unsafe_undefined: true,
            unsafe: true,
            toplevel: true,
            passes: 2
          }
        },
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
    })
  ]
};

//module.exports = smp.wrap(webpackConfig);
module.exports = webpackConfig;