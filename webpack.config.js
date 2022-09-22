const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlPageNames = ["rotation", "observable", "affine", "mesh2D"];
const entry = htmlPageNames.reduce((entries, componentName) => {
  entries[componentName] = path.join(__dirname, `./${componentName}/index.ts`);
  return entries;
}, {});
const htmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: `./${name}/index.html`,
    chunks: [`${name}`], //we don't need to specify ts
    //because we have already declared them in entry object
  });
});

entry.main = path.join(__dirname, "index.ts");

module.exports = {
  entry: entry,
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: htmlPlugins,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
