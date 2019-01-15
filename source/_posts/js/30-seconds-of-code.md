---
title: 30 秒就能理解的 JavaScript 代码片段
date: 2019-01-15 17:14:14
tags: JS
categories:
    - JS
---
```js
/**
 * @description 返回包含当前URL参数的对象。
 * @param url
 * @return {{}}
 */
const getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
        {}
    );
/**
 * @description 判断值是否为空
 * @param val
 * @return {boolean}
 */
const isEmpty = val => val == null || !(Object.keys(val) || val).length;

/**
 * @description 深拷贝对象
 * @param obj
 * @return {*}
 */
const deepClone = obj => {
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
        key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
    );
    return Array.isArray(obj) && obj.length
        ? (clone.length = obj.length) && Array.from(clone)
        : Array.isArray(obj)
            ? Array.from(obj)
            : clone;
};

/**
 * @description 浏览器生成uuid 需要引入crypto
 * @return {*|string|void}
 */
const UUIDGeneratorBrowser = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
/**
 * @description node 生成uuid
 */
const crypto = require('crypto');
const UUIDGeneratorNode = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
    );
```



## 参考
1.https://github.com/30-seconds/30-seconds-of-code
2.https://www.css88.com/30-seconds-of-code/
