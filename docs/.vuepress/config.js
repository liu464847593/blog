module.exports = {
  base: '/',
  title: '追风',
  description: 'Just playing around',
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '/assets/img'
      }
    }
  }
}