const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/assets/js/index.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/img/[name].[ext]",
              // outputPath: "",
              // because it returns some wierd path we need to manually edit url string to correct path
              // remember it's javaScript object and it recives regular js code to edit all
              publicPath: (url) => {
                return url.replace("./assets", "..");
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/img",
          to: "./assets/img/[name].[ext]",
        },
        {
          from: "./src/assets/data",
          to: "./assets/img/[name].[ext]",
        },
      ],
    }),
  ],
};
