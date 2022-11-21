const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключили плагин для работы с HTML
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //подключили плагин удаляющий содержимое папки dist при сборке проекта в development
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
  // указали первое место, куда заглянет webpack, — файл index.js в папке src
  entry: { main: "./src/scripts/index.js" },

  // указали в какой файл будет собираться весь js и дали ему имя
  output: {
    path: path.resolve(__dirname, "dist"), // переписали точку выхода, используя утилиту path
    filename: "main.js",
    publicPath: "",
  },

  mode: "development", // добавили режим разработчика

  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [
      // rules — это массив правил

      //добавим в него объект правил для бабеля
      //webpack прогоняет код через babel-loader
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },

      // правило для обработки изображений
      {
        test: /\.(png|svg|jpg|JPG|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]--[hash][ext]",
        },
      },

      //правило для обработки шрифтов
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]--[hash][ext]",
        },
      },

      {
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },

  devtool: "inline-source-map",

  //подключаем дополнительные плагины(массив плагинов)
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
