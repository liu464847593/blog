---
title: 迭代器模式
date: 2019-01-22 20:26:17
tags: 迭代器模式
categories:
    - 设计模式
---

## 什么是迭代器模式
提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

## 实现自己的迭代器
```js
var each=function (ary,callback) {
   for (var i = 0,l = ary.length;i<l;i++){
       callback.call(ary[i],i,ary[i])
   }
}
each([1,2,3],function (i,n) {
    alert([i,n])
})
```

## 内部迭代器和外部迭代器
内部迭代器：如each函数，each函数的内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用。
缺点：由于内部迭代器的迭代规则已经被提前规定，each函数无法同时迭代2个数组。

外部迭代器：必须显式地请求迭代下一个元素。增加了调用的复杂度，也增强了迭代器的灵活性，可以手工控制迭代的过程或者顺序。
```js
    var Iterator = function (obj) {
        var current = 0;
        var next = function () {
            current += 1;
        }
        var isDone = function () {
            return current >= obj.length
        }
        var getCurrItem = function () {
            return obj[current]
        }
        return {
            next: next,
            isDone: isDone,
            getCurrItem: getCurrItem,
            length: obj.length
        }
    };

    var compare = function (iterator1, iterator2) {
        if (iterator1.length !== iterator2.length) {
            alert('iterator1和iterator2不相等');
        }
        while (!iterator1.isDone() && !iterator2.isDone()) {
            if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
                throw new Error('iterator1和iterator2不相等');
            }
            iterator1.next();
            iterator2.next();
        }
        alert('iterator1和iterator2相等')
    }
    var iterator1 = Iterator([1,2,3]);
    var iterator2 = Iterator([1,2.3]);
    compare(iterator1,iterator2);
```

## 迭代类数组对象和字面量对象
```js
$.each = function (obj, callback) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike(obj);

        if (isArray) {
            for (; i < length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                value = callback.call(obj[i, i, obj[i]]);
                if (value === false) {
                    break;
                }
            }
        }
        return obj;
    }
```

## 倒序迭代器
倒序遍历来实现

## 中止迭代器
break 跳出循环

## 应用
```js
    var getActiveUploadObj = function () {
        try {
            return new ActiveXObject('TXFTNActiveX.FTNUpload');
        } catch (e) {
            return false
        }
    };
    var getFlashUploadObj = function () {
        if (supportFlash()) {
            var str = '<object type="application/x-shockwave-flash"></object>';
            return $(str).appendTo($('body'))
        }
        return false
    }
    var getFormUpladObj = function () {
        var str = '<input name="file" type="file" class="ui-file"/>';
        return $(str).appendTo($(body))
    }

    var iteratorUploadObj = function () {
        for (var i = 0,fn;fn=arguments[i++];){
            var uploadObj = fn();
            if (uploadObj !== false){
                return uploadObj
            } 
        }
    }
    var uploadObj = iteratorUploadObj(getActiveUploadObj,getFlashUploadObj,getFormUpladObj);
```



## 参考
1.JS设计模式与开发实践第七章迭代器模式
