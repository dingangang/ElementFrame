const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  // 这里是配合开发，最后文件会部署在服务器的子目录下，需要调整nginx的配置
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
  publicPath: process.env.NODE_ENV === 'production'
    ? '/static/exhibition/'
    : '/',
  // vue-echarts 配置，转义node-modules中的文件
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: config => {
    if (IS_PROD) {
      // 生产环境下gzip压缩
      const plugins = []
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
    // 雪碧图配置
    const resolve = {
      modules: ['node_modules', 'spritesmith-generated']
    }
    const plugins = [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, 'src/assets/icon'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'src/assets/images/sprite.png'),
          css: path.resolve(__dirname, 'src/assets/style/sprites/_spriteMixin.scss')
        },
        apiOptions: {
          cssImageRef: '../images/sprite.png',
          generateSpriteName: function (sprite) {
            // let cName = ''
            let beginName = sprite.split('\\').pop().split('.')[0]
            let prefix = 'icon-'
            return prefix + beginName
          }
        }
      })
    ]
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
    config.resolve.modules = [
      ...config.resolve.modules,
      ...resolve.modules
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        data: `@import '@/assets/style/base/_variables.scss';`
      }
    },
    sourceMap: process.env.NODE_ENV !== 'production'
  }
}
