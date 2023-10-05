const HtmlWebpackPlugin = require("html-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const entryPoints = {
  myMain: "./src/js/index.js",
  myInstall: "./src/js/install.js",
  myDatabase: "./src/js/database.js",
  myEditor: "./src/js/editor.js",
  myHeader: "./src/js/header.js",
};

const outputConfig = {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist"),
};

module.exports = {
  mode: "development",
  entry: entryPoints,
  output: outputConfig,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "My JATE",
    }),

    new workboxPlugin.InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "src-sw.js",
    }),

    new WebpackPwaManifest({
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
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
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
