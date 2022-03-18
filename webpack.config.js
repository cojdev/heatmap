const path = require('path');

const src = 'src';
const dist = 'public';

module.exports = {
  entry: `./${src}/index.tsx`,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `${dist}/js`),
    publicPath: `/js`,
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, dist),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
