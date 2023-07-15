const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlPageNames = [
  "rotation",
  "observable",
  "affine",
  "mesh2D",
  "webgl",
  "cube3D",
  "backfaceCulling",
  "rodriguesRotation",
];
const entry = htmlPageNames.reduce((entries, componentName) => {
  entries[componentName] = path.join(__dirname, `./${componentName}/index.ts`);
  return entries;
}, {});

entry.main = path.join(__dirname, "index.ts");

module.exports = env => ({
  mode: env.mode,
  devServer: {
    contentBase: "./dist",
  },
  entry: entry,
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
  devtool: env.mode === "development" ? "inline-source-map" : undefined,
  plugins: htmlPageNames
    .map(name => {
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./${name}/index.html`,
        chunks: [`${name}`], //we don't need to specify ts
        base: env.mode === "production" && {
          href: "https://hunkim98.github.io/canvas_with_math/",
        },

        //because we have already declared them in entry object
      });
    })
    .concat(
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: `index.html`,
        chunks: [],
        base: env.mode === "production" && {
          href: "https://hunkim98.github.io/canvas_with_math/",
        },
      }),
    ),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
  },
});
