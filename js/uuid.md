---
title: uuid
date: 2018-12-03 22:24:56
categories:
    - JS
tags:
    -uuid
---

## uuid
>通用唯一识别码（英语：Universally Unique Identifier，UUID），是用于计算机体系中以识别信息数目的一个128位标识符，还有相关的术语：全局唯一标识符（GUID）。
>根据标准方法生成，不依赖中央机构的注册和分配，UUID具有唯一性，这与其他大多数编号方案不同。重复UUID码概率接近零，可以忽略不计。

## JS 如何生成uuid
```js
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log(uuidv4())
```


## 参考
1. https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E5%94%AF%E4%B8%80%E8%AF%86%E5%88%AB%E7%A0%81
2. https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript