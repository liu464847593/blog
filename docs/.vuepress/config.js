module.exports = {
  base: '/',
  title: '追风',
  description: 'Just playing around',
  themeConfig: {
    //logo: '/assets/img/logo.jpg', // 导航栏 Logo
    sidebar: {
      '/views/InterviewQuestions/':['css','js','vue','webpack','github'],
    },
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
          {text: 'http', link: '/views/http/index.md'},
          {text: '安全', link: '/views/security/index.md'}
        ]
      },
      { text: '算法', link: '/views/algorithm/index.md' },
      { text: '设计模式', link: '/views/js/JSDesignPattern.md' },
      { text: '面试题', link: '/views/InterviewQuestions/css.md' },
      { text: '学习',
        items: [
          {text: 'linux', link: '/views/linux/linux.md'},
          {text: 'mysql', link: '/views/mysql/index.md'},
          {text: 'node', link: '/views/node/index.md'},
          {text: 'markdown', link: '/views/others/markdown.md'},
          {text: 'jenkins', link: '/views/tools/jenkins.md'},
          {text: '问题', link: '/views/question/index.md'},
        ]
      },
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