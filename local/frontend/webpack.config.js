const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './src/index.js',  // React 項目入口

  output: {
    path: path.resolve(__dirname, '../static/'),  // React 构建输出的静态文件目录
    filename: 'js/[name].[contenthash].js',  // 输出的 JavaScript 文件
    publicPath: '/static/',  // 设置公共路径
    clean: true  // 每次构建时清理输出目录
  },

  plugins: [
    new BundleTracker({ 
      path: path.resolve(__dirname, '../'),  // 将生成的 webpack-stats.json 放在根目录
      filename: 'webpack-stats.json'  // 追踪文件
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',  // 静态资源生成规则
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',  // 分割打包优化
    },
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
