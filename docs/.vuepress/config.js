module.exports = {
  base: '/',
  title: '追风',
  description: 'Just playing around',
  themeConfig: {
    //logo: '/assets/img/logo.jpg', // 导航栏 Logo
    sidebar: 'auto', // 自动生成侧栏
    nav: [ // 导航栏链接
      {
        text: '前端',
        items: [
          {text: 'CSS', link: '/views/css/index.md'},
          {text: 'JS', link: '/language/japanese/'},
          {text: 'Vue', link: '/language/japanese/'},
          {text: 'Webpack', link: '/language/japanese/'}
        ]
      },
      { text: '面试题', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/liu464847593' },
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '/assets/img'
      }
    }
  }
}