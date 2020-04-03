---
title: vue项目实现px转为rem
date: 2018-12-24 21:35:32
categories:
    - vue
tags:
    - px2rem
---
## 安装px2rem-loader lib-flexible
```npm
npm install px2rem-loader  lib-flexible --save 
```
## main.js
```js
import 'lib-flexible/flexible';
```
## build/utils.js
```js
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUni: 75
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
  }
```
设置完成后直接用px做单位按照750的设计稿写代码，像素不用减半

## 问题？
1. 如果使用的ui框架是vux,会发现vux样式缩小。解决方案：
```js
//webpack.base.conf.js中 vuxLoader
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    'progress-bar',
    {
      name: 'less-theme',
      path: 'src/styles/theme.less' // 相对项目根目录路径
    },
    {
      name: 'duplicate-style',
      options: {
        cssProcessorOptions : {
          safe: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: [
              'iOS >= 7',
              'Android >= 4.1'
            ]
          }
        }
      }
    },{
      name: 'after-less-parser',
      fn: function (source) {
        if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
          source = source.replace(/px/g, 'PX')
        }
        // 自定义的全局样式大部分不需要转换
        if (this.resourcePath.replace(/\\/g, '/').indexOf('App.vue') > -1) {
          source = source.replace(/px/g, 'PX').replace(/-1PX/g, '-1px')
        }
        return source
      }
    }, {
      name: 'style-parser',
      fn: function (source) {
        if (this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') > -1) {
          source = source.replace(/px/g, 'PX')
        }
        // 避免转换1PX.less文件路径
        if (source.indexOf('1PX.less') > -1) {
          source = source.replace(/1PX.less/g, '1px.less')
        }
        return source
      }
    }
  ]
})
```

## 参考
1. https://segmentfault.com/a/1190000016866076
2. https://github.com/airyland/vux/issues/1796