
const path = require('path')
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
const assetsCDN = {
  externals: {
    vue: 'Vue',
    axios: 'axios'
  },
  css: [],
  js: [
    '//unpkg.com/vue@2.6.10/dist/vue.min.js',
    '//unpkg.com/axios@0.19.0/dist/axios.min.js'
  ]
}
module.exports = {
  pages: {
    index: {
      entry: 'demo/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader').options({
        svgo: {
          plugins: [
            { cleanupIDs: false },
            { convertShapeToPath: false },
            { convertStyleToAttrs: false }
          ]
        }
      })
    // 添加别名
    config.resolve.alias.set('@', resolve('demo'))
      .set('@ant-design/icons/lib/dist$', resolve('./icons.js'))
    if (env) {
      // config.plugin('html').tap(args => {
      //   args[0].cdn = assetsCDN
      //   return args
      // })
    }
    return config
  },
  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.jsx', '.json', '.less', '.css', '.scss', '.jpg', '.png', '.svg']
    if (env) {
      // config.externals = assetsCDN.externals
    }
  },
  css: {
    // extract: false,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // LESS全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./demo/var.less')]
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: false
}
