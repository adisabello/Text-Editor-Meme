const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name]-[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: '[name][ext]'
    },
    devServer:{
      static: {
        directory: path.resolve(__dirname, 'dist')
      },
      port: 8081,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "J.A.T.E",
        filename: 'index.html',
        template: 'index.html'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './sw.js'
      }),
      new CopyPlugin({
        patterns: [
          {from: './favicon.ico', to: ""},
          {from: './manifest.json', to: ""},
          {from: './logo.png', to: ""},
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader','css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.png$/i,
          type: 'asset/resource'
        }
      ],
    },
  };
};
