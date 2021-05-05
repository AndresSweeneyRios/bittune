const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|webp|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].bundle.js",
    chunkFilename: '[name].bundle.js',
  },

  mode: process.env.NODE_ENV || "development",

  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',

  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 25112,
    historyApiFallback: true,
  },
})
