---
title: JS函数的节流和防抖
date: 2019-03-26 19:36:34
tags: JS
---
## 什么是节流？
>规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```js
 function throttle(fun, delay) {
        let last, deferTimer;
        return function (args) {
            let that = this;
            let _args = arguments;
            let now = +new Date();
            if (last && now < last + delay) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now;
                fun.apply(that,_args);
            }
        }
    }
```

## 什么是防抖？
>在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
```js
function debounce(fun, delay) {
    return function (args) {
        let that = this;
        let _args = args;
        clearTimeout(fun.id);
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
```

## 参考
1. https://juejin.im/post/5b8de829f265da43623c4261
2. https://www.jianshu.com/p/52ec7ede1200
