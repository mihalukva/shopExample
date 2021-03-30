const  HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
var bodyParser = require("body-parser");
const fs = require("fs");
let vueExampleRouter=require('./server/vueExampleRouter.js')
const buildMode="production";

module.exports = {
  mode: buildMode,
  entry: {
    main: "./source/main.js",
  },
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, buildMode),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              transformAssetUrls: {
                video: ["src", "poster"],
                source: "src",
                img: "src",
                image: ["xlink:href", "href"],
                use: ["xlink:href", "href"],
              },
            },
          },
        ],
      },
      
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.min.js",
      vuex$: "vuex/dist/vuex.min.js",
      vueRouter$:"vue-router/dist/vue-router.min.js"
    },
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: buildMode,
      filename: 'index.html',
      template: './source/index.template'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./source/images", to: "images" },
        { from: "./source/icons", to: "icons" },
        { from: "./source/goods.json", to: "goods.json" },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, buildMode),
    open: "Chrome",
    before: function(app, server, compiler) {
      vueExampleRouter.setContentPath('../'+buildMode);
      app.use('/',vueExampleRouter.router)
    },
  },
};
//npx webpack --config webpack.prod.js
//npx webpack --watch --config webpack.prod.js 
//npx webpack serve --config webpack.prod.js