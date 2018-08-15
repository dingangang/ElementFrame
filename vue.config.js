const SpritesPlugin = require('webpack-spritesmith')
const path = require('path')

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      // 跨域请求配置
      '/proxy': {
        target: 'http://192.168.115.229:8083', // 请将此处换成对应的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '/'
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      // 雪碧图相关
      new SpritesPlugin({
        // 目标小图标
        src: {
          cwd: path.resolve(__dirname, './public/images/icons'),
          glob: '*.png'
        },
        // 输出雪碧图文件及样式文件
        target: {
          image: path.resolve(__dirname, './src/assets/sprite.png'),
          css: [
            [path.resolve(__dirname, './src/css/_sprite.scss'), {
              format: 'function_based_template'
            }]
          ]
        },
        customTemplates: {
          function_based_template: path.resolve(__dirname, './public/sprite_handlebars_template.handlebars')
        },
        // 样式文件中调用雪碧图地址写法
        apiOptions: {
          cssImageRef: '~@/assets/sprite.png?v=' + Date.parse(new Date())
        },
        spritesmithOptions: {
          algorithm: 'binary-tree',
          padding: 4
        }
      })
    ]
  }
}
