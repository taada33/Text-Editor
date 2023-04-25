const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: '/src/js/index.js',
      install: '/src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Take notes with Javascript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        id: '/',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            // size: '96x96',
            sizes: [96, 128, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
    ],

    module: {
      rules: [
        {
          //matches files ending (.css), by escaping the period (\.) with case insensitivity (/i flag)
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //matches files ending .png or .svg or .jpg or .jpeg or .gif
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          //matches files ending in .mjs or .js
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ]},
  };
};
