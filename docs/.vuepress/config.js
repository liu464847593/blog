module.exports = {
  base: '/',
  title: '追风',
  description: 'Just playing around',
  themeConfig: {
    //logo: '/assets/img/logo.jpg', // 导航栏 Logo
    sidebar: 'auto', // 自动生成侧栏
    sidebarDepth: 0,
    nav: [ // 导航栏链接
      {
        text: '前端',
        items: [
          {text: 'CSS', link: '/views/css/index.md'},
          {text: 'JS', link: '/views/js/js.md'},
          {text: 'Vue', link: '/views/js/vue.md'},
          {text: 'Webpack', link: '/views/webpack/index.md'},
          {text: '浏览器', link: '/views/browser/index.md'},
          {text: 'http', link: '/views/http/index.md'}
        ]
      },
      { text: '算法', link: '/views/algorithm/index.md' },
      { text: '设计模式', link: '/views/js/JSDesignPattern.md' },
      { text: '面试题', link: '/guide/' },
      { text: 'GitHub推荐', link: '/views/github/index.md' },
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