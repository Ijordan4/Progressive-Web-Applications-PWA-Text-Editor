const MyHtmlWebpackPlugin = require("html-webpack-plugin");
const MyWebpackPwaManifest = require("webpack-pwa-manifest");
const MyPath = require("path");
const { MyInjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      myMain: "./src/js/index.js",
      myInstall: "./src/js/install.js",
      myDatabase: "./src/js/database.js",
      myEditor: "./src/js/editor.js",
      myHeader: "./src/js/header.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: MyPath.resolve(__dirname, "dist"),
    },
    plugins: [
      
      new MyHtmlWebpackPlugin({
        template: "./index.html",
        title: "My JATE",
      }),

     
      new MyInjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

    
      new MyWebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "My Just Another Text Editor",
        short_name: "My JATE",
        description: "My just another text editor",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "./",
        icons: [
          {
            src: MyPath.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: MyPath.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
