---
title: vue项目优化
date: 2018-12-04 20:01:30
categories:
    - vue
tags:
    - vue
---
## 什么要优化？
1. 减少打包体积
2. 项目加载更快

## gzip压缩
此功能需要后端处理

## 路由懒加载
```vue
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
##引入CDN
类似vue,vuex,vue-router,echarts 都可以使用cdn引入
```vue
//index.html
<script src="//cdn.bootcss.com/vue/2.2.5/vue.min.js"></script>

// build/webpack.base.conf.js
externals: {
    // 'vue': 'Vue',
    // 'vuex': 'Vuex',
    // 'vue-router': 'VueRouter',
    // 'element-ui':'ELEMENT',
    // 'echarts':'Echarts'
  },
```
## 组件化
功能重复的模块拆出来，模块化，方便维护，如只是一个地方用到了第三方插件也以封装成组件,减少体积

## 图片转base64
```vue
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  },
```

## 路由页面缓存
使用`keep-alive`缓存页面

## 参考
1. https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
2. https://juejin.im/post/5b39d8b0f265da59aa2da473