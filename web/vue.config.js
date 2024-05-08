const { defineConfig } = require('@vue/cli-service')
const { devtools } = require('vue')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
})
