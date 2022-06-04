const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

const buildEnv = process.env.BUILD_ENV
const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = {
	entry: {},
	output: {
    hashFunction: 'md5',
    hashDigestLength: 6,
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
    filename: '[name].web.[chunkhash].js',
    chunkFilename: '[name].web.[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: () => {
      return './'
    }
  },
	target: 'web',
	module: {
		rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }, {
      test: /\.m?js$/,
      loader: 'babel-loader',
      exclude: file => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
      )
    }, {
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }, {
      test: /\.css$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }, {
      test: /\.postcss$/,
      use: [
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
      type: 'asset/resource'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|webp)(\?.*)?$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 100
        }
      }
    }]
	},
	plugins: [
		new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new NodePolyfillPlugin({
      excludeAliases: ['console']
    }),
    new HtmlWebpackPlugin({
      title: '智联招聘直播',
      template: './templates/index.html'
    })
	],
	resolve: {
		alias: {
			components: path.join(__dirname, 'components'),
      // env: path.join(__dirname, `../env/${buildEnv}.json`)
		}
	},
  optimization: {
    splitChunks: { // 提取node_modules中的代码到vendor.js中，并进行缓存，加快编译速度
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
	devtool: 'cheap-module-source-map',
}

if (isProd) {
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[name].[contenthash].css'
  }))
}

//业务入口文件所在的目录
let entries = []
let entryDir = path.join(__dirname, '/pages/')
glob.sync(entryDir + '*').forEach(function (entry) {
	let basename = path.basename(entry)
	entries.push({
    name: basename,
    path: entry
  })
})

entries.forEach(function (entry) {
	//添加entry
	webpackConfig.entry[entry.name] = [path.join(entry.path, 'index.ts')]
})

module.exports = webpackConfig
