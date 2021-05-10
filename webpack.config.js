const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env) => {
  const prod = env && env.production;
  return {
    mode: prod ? "production" : "development",
    entry: prod ? "./src/freeflow.js" : "./src/main.js",
    devServer: {
      index: "index.html",
      hot: true,
      watchContentBase: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "freeflow.js",
      library: "FreeFlow",
      libraryTarget: "umd",
      libraryExport: "default",
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  };
};