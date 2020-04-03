---
title: download
date: 2019-01-07 21:37:17
tags: JS
categories:
    - JS
---
## 文件下载
1. a标签下载
```js
 var funDownload = function (content, filename) {
     // 创建隐藏的可下载链接
     var eleLink = document.createElement('a');
     eleLink.download = filename;
     eleLink.style.display = 'none';
     // 字符内容转变成blob地址
     var blob = new Blob([content]);
     eleLink.href = URL.createObjectURL(blob);
     // 触发点击
     document.body.appendChild(eleLink);
     eleLink.click();
     // 然后移除
     document.body.removeChild(eleLink);
 };
```
2.form 表单下载
```js
submitFormPost:function(url){
      $('<form method="post" action="' + url + '"></form>').appendTo('body').submit().remove();
    }
```

## 参考
1.https://www.zhangxinxu.com/wordpress/2016/04/know-about-html-download-attribute/