import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
const webpackMode = process.env.WEBPACK_ENV ?? "development";

const config = {
  mode: webpackMode,
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  entry: {
    app: "./src/renderer/App/index.tsx",
    config: "./src/renderer/Config/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/renderer/default.html",
      filename: "app.html",
      scriptLoading: "blocking",
      inject: "body",
      minify: true,
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/renderer/default.html",
      filename: "config.html",
      scriptLoading: "blocking",
      inject: "body",
      minify: true,
      chunks: ["config"],
    }),
  ],
};

export default config;
