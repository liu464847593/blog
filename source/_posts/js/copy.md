---
title: JS 深浅拷贝对象数组
date: 2018-12-18 17:56:51
tags: JS
categories:
    - JS
---
## 拷贝对象
浅拷贝
```js
// Shallow copy
var newObject = jQuery.extend({}, oldObject);

var newObject = Object.assign({}, oldObject);
var newObject = Object.create(oldObject);
```
深拷贝
```js
// Deep copy
var newObject = jQuery.extend(true, {}, oldObject);

// 假设您的对象中只有变量而不是任何函数，您可以使用：
var newObject = JSON.parse(JSON.stringify(oldObject));
```

## 拷贝数组
```js
var newArray = oldArray.slice();
var array2 = [].concat(array1);
```

## 参考
1. https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript?page=1&tab=votes#tab-top
2. https://stackoverflow.com/questions/7486085/copy-array-by-value