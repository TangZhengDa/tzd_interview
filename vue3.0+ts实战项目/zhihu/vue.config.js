module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}