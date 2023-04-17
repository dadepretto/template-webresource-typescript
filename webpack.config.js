const glob = require("glob");
const path = require("path");

const entryFiles = glob.sync("./src/*.@(ts|js)", {
  ignore: ["src/global.d.ts"],
});

const entry = entryFiles.reduce((acc, filePath) => {
  const entryName = path.basename(filePath, path.extname(filePath));
  acc[entryName] = `./${filePath}`;
  return acc;
}, {});

module.exports = [
  {
    mode: "development",
    entry,
    output: {
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts"],
    },
    devtool: "source-map",
  },
  {
    mode: "production",
    entry,
    output: {
      filename: "[name].min.js",
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts"],
    },
    devtool: "source-map",
  },
];
