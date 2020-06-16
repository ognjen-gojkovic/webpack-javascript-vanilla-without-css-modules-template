const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcPath = path.resolve(__dirname, "src");

function HtmlWebpackConfig(url) {
  const templateHtml = fs.readdirSync(url);
  const newArray = templateHtml.filter((file) => {
    return file.includes(".html");
  });
  return newArray.map((file) => {
    console.log("file: ", file);
    if (file.match("index.html")) {
      return new HtmlWebpackPlugin({
        filename: `${file}`,
        template: path.resolve(__dirname, "src", `${file}`),
        inject: true,
        minify: {
          removeComments: false,
          collapseWhitespace: false,
          removeRedundantAttributes: false,
          removeEmptyAttributes: false,
          removeStyleLinkTypeAttributes: false,
          keepClosingSlash: false,
          minifyCSS: false,
          minifyURLs: false,
        },
      });
    } else {
      return new HtmlWebpackPlugin({
        filename: `${file}`,
        template: path.resolve(__dirname, "src", `${file}`),
        inject: true,
        minify: {
          removeComments: false,
          collapseWhitespace: false,
          removeRedundantAttributes: false,
          removeEmptyAttributes: false,
          removeStyleLinkTypeAttributes: false,
          keepClosingSlash: false,
          minifyCSS: false,
          minifyURLs: false,
        },
      });
    }
  });
}

const outerFiles = HtmlWebpackConfig(srcPath);

module.exports = merge(common, {
  output: {
    filename: "./assets/js/[name].bundle.js",
    path: path.resolve(__dirname, "dist/"),
    publicPath: "",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 3000,
    compress: true,
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./assets/css/[name].css",
    }),
  ].concat(outerFiles),
});
