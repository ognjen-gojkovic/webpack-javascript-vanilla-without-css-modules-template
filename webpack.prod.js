const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssWebpackPlugin = require("mini-css-extract-plugin");

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
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      });
    } else {
      return new HtmlWebpackPlugin({
        filename: `${file}`,
        template: path.resolve(__dirname, "src", `${file}`),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      });
    }
  });
}

const outerFiles = HtmlWebpackConfig(srcPath);

module.exports = merge(common, {
  output: {
    filename: "./assets/js/[name].bundle.[contentHash].js",
    path: path.resolve(__dirname, "dist/"),
    publicPath: "",
  },
  plugins: [
    new MiniCssWebpackPlugin({
      filename: "./assets/css/[name].[contentHash].css",
    }),
  ].concat(outerFiles),
});
