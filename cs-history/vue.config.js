module.exports = {
  devServer: {
    disableHostCheck: false,
    host: "127.0.0.1",
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: null
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assers': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
};
