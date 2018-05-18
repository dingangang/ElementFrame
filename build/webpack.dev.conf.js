'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const SpritesmithPlugin = require('webpack-spritesmith')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new SpritesmithPlugin({
      // 目标小图标
      src: {
        cwd: path.resolve(__dirname, '../static/phoneIcons/'),
        glob: '*.png'
      },
      // 输出雪碧图文件及样式文件
      target: {
        image: path.resolve(__dirname, '../src/assets/sprite.png'),
        //css: path.resolve(__dirname, '../src/assets/css/_sprite.scss')
        css: [
          // [path.resolve(__dirname, '../src/assets/css/sprite.css'),  {format: 'handlebars_based_template'}],
          // [path.resolve(__dirname, '../src/css/_sprite.scss'),  {format: 'handlebars_phone_template'}]]
          [path.resolve(__dirname, '../src/css/_sprite.scss'),  {format: 'handlebars_based_template'}]]

      },
      // 样式文件中调用雪碧图地址写法
      apiOptions: {
        cssImageRef: '../sprite.png',
        generateSpriteName: function(sprite) {
          //名字生成器，这里对应了不同后缀的名称
          //应用了模板 handlebars_based_template
          let cName = "";
          let beginName = sprite.split("\\").pop().split(".")[0];
          let prefix = '.icon-';
          if (beginName.indexOf('-hover') !== -1) {
            cName = prefix + beginName.replace(/-hover$/gi, ':hover');
          }
          if (beginName.indexOf('-active') !== -1) {
            cName = prefix + beginName.replace(/-active$/gi, '.active');
          }
          if (beginName.indexOf('-btn') !== -1) {
            cName = '.hover-item:hover '  + prefix + beginName.replace(/-btn$/gi, '');
          }
          if (beginName.indexOf('-bactive') !== -1) {
            cName = '.hover-item.active '  + prefix + beginName.replace(/-bactive$/gi, '');
          }
          if (beginName.indexOf('-bacthover') !== -1) {
            cName = '.hover-item.active:hover ' + prefix + beginName.replace(/-bacthover$/gi, '');
          }
          if (beginName.indexOf('choiced-') !== -1) {
            cName = beginName.replace(/choiced-/gi, choiced);
          }
          if (beginName.indexOf('-collapsed') !== -1) {
            cName = '.collapsed ' + prefix + beginName.replace(/-collapsed/gi, '');
          }
          if (beginName.indexOf('-collapsedb') !== -1) {
            cName = '.hover-item.collapsed:hover ' + prefix + beginName.replace(/-collapsedb/gi, '');
          }
          if(cName !== ""){
            sprite = cName;
          }else{
            sprite =  prefix + beginName;
          }

          return sprite
        }
      },
      spritesmithOptions: {
        algorithm: 'binary-tree',
        padding: 10,
      },
      customTemplates: {
        'handlebars_based_template': path.resolve(__dirname, '../src/assets/handler/css.handlebars'),
        // 'handlebars_phone_template': path.resolve(__dirname, '../src/assets/handler/remCss.handlebars')
      }
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
