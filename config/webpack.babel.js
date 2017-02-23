import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import htmlTemplate from '../src/template';

const prod = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: './build'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!autoprefixer-loader?browsers=last 2 versions"
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader"
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(prod ? 'production' : 'development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Swipple',
      favicon: '',
      hash: true,
      templateContent: htmlTemplate
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ]
};

if (prod) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
  config.plugins.push(new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/,
    cssProcessorOptions: { discardComments: { removeAll: true } }
  }))
}

module.exports = config;