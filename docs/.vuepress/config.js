module.exports = {
  base: '/',
  title: '追风',
  description: 'Just playing around',
  themeConfig: {
    //logo: '/assets/img/logo.jpg', // 导航栏 Logo
    sidebar: {
      '/views/InterviewQuestions/':['css','js','vue','webpack','github'],
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    },
    sidebarDepth: 0,
    nav: [ // 导航栏链接
      {
        text: '前端',
        items: [
          {text: 'CSS', link: '/views/css/js.md'},
          {text: 'JS', link: '/views/js/js.md'},
          {text: 'Vue', link: '/views/js/vue.md'},
          {text: 'Webpack', link: '/views/webpack/js.md'},
          {text: '浏览器', link: '/views/browser/js.md'},
          {text: 'http', link: '/views/http/js.md'}
        ]
      },
      { text: '算法', link: '/views/algorithm/js.md' },
      { text: '设计模式', link: '/views/js/JSDesignPattern.md' },
      { text: '面试题', link: '/views/InterviewQuestions/css.md' },
      { text: 'GitHub推荐', link: '/views/github/js.md' },
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