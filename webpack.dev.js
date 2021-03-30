const  HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
var bodyParser = require("body-parser");
const fs = require("fs");
let vueExampleRouter=require('./server/vueExampleRouter.js')
const buildMode="development";


module.exports = {
  mode: buildMode,
  entry: {
    main: "./source/main.js",
  },
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, buildMode),
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/i,
        use: [
          {
            loader: "url-loader",
            options: { limit: 8192 },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      vuex$: "vuex/dist/vuex.esm.js",
      vueRouter$:"vue-router/dist/vue-router.esm.js"
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
    hot: true,
    contentBase: path.join(__dirname, buildMode),
    open: "Chrome",
    before: function(app, server, compiler) {
      vueExampleRouter.setContentPath('../'+buildMode);
      app.use('/',vueExampleRouter.router)
    },

  },
};
//npx webpack --config webpack.dev.js

//npx webpack serve --config webpack.dev.js
