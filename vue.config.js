
const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    xlsx: 'XLSX',
    moment: 'moment'
  },
  css: [],
  js: [
    '//unpkg.com/vue@2.6.10/dist/vue.min.js',
    '//unpkg.com/vue-router@3.0.3/dist/vue-router.min.js',
    '//unpkg.com/vuex@3.1.3/dist/vuex.min.js',
    '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    '//unpkg.com/xlsx@0.15.6/dist/xlsx.min.js',
    '//unpkg.com/moment@2.24.0/min/moment.min.js'
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
    // 添加别名
    config.resolve.alias.set('@', resolve('demo'))
      .set('@ant-design/icons/lib/dist$', resolve('./icons.js'))
    if (env) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  configureWebpack: config => {
    if (env) {
      config.externals = assetsCDN.externals
    }
  },
  css: {
    // extract: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // LESS全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./demo/less/theme.less')]
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: false
}
