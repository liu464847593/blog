---
title: 代理模式
date: 2019-01-21 20:52:17
tags: 代理模式
categories:
    - 设计模式
---

## 什么是代理模式
为一个对象提供一个代用品或占位符，以便控制对它的访问。

## 小明追MM
内向的小明直接向女神A送花  （不用代理模式）
```js
     var Flower = function () {};
     var xiaoming = {
         sendFlower:function (target) {
             var flower = new Flower();
             target.receiveFlower(flower);
         }
     };
     var A ={
         receiveFlower:function (flower) {
             console.log('收到花' + flower);
         },
     };
     xiaoming.sendFlower(A)
```
内向的小明 通过女神的朋友B送花给女神A
    
```js
    var Flower = function () {};
    var xiaoming = {
        sendFlower:function (target) {
            var flower = new Flower();
            target.receiveFlower(flower);
        }
    };
    var B = {
        receiveFlower:function (flower) {
            A.receiveFlower(flower);
        }
    };
    var A ={
        receiveFlower:function (flower) {
            console.log('收到花' + flower);
        },
    };
    xiaoming.sendFlower(B);
```
本质上没有区别，引入一个代理对象看似更复杂

B能在A心情好的时候送花，成功率大大提高
```js
    var Flower = function () {};
    var xiaoming = {
        sendFlower:function (target) {
            var flower = new Flower();
            target.receiveFlower(flower);
        }
    };
    var B = {
        receiveFlower:function (flower) {
            A.listenGoodMood(function () {
                A.receiveFlower(flower)
            })
        }
    };
    var A ={
        receiveFlower:function (flower) {
            console.log('收到花' + flower);
        },
        listenGoodMood:function (fn) {
            setTimeout(function () {
                fn();
            },1000)
        }
    };
    xiaoming.sendFlower(B);
```

## 保护代理和虚拟代理
保护代理：B可以帮A过滤掉一些请求。比如送花的人年龄太打或者没有宝马的，这种请求可以直接在代理B处被拒绝掉。保护代理用于控制不同权限的对象对目标的访问，但在JS中并不容易实现保护代理，因为我们无法判断谁访问了某个对象。
虚拟代理：花的价格不菲，代理B会选择在A心情好的时候再执行new Flower。虚拟代理会把一些开销很大的对象，延迟到真正需要它的时候才去创建（最常用的一种代理模式）
```js
    var B = {
        receiveFlower: function (flower) {
            A.listenGoodMood(function () {
                var flower = new Flower();
                A.receiveFlower(flower);
            })
        }
    }
```

## 虚拟代理实现图片懒加载
```js
    var myImage = (function () {
        var imgNode = document.createElement('img');
        document.body.appendChild(imgNode);
        return{
            setSrc:function (src) {
                imgNode.src = src;
            }
        }
    })();
    var proxyImage = (function () {
        var img = new Image;
        img.onload= function () {
            myImage.setSrc(this.src);
        }
        return{
            setSrc:function (src) {
                myImage.setSrc('xxx.gif');
                img.src = src;
            }
        }
    })();
    proxyImage.setSrc('xxxx.png')
```

## 代理的意义
单一职责原则：一个类（包括对象和函数等）应该仅有一个引起它变化的原因。
假如有天不在需要预加载，那么只需要改成请求本体而不是请求代理对象即可

## 代理和本体接口的一致性
优点：1.用户可以放心地请求代理，他只关心是否得到想要的结果。
2.在任何使用本体的地方都可以替换成使用代理

## 虚拟代理合并http请求
```js
var synchronousFile = function (id) {
    console.log('开始同步文件，id为：' + id);
};
var proxySynchronousFile = (function () {
    var cache = [],timer;
    return function (id) {
        cache.push(id);
        if(timer) return;
        timer = setTimeout(function () {
            synchronousFile(cache.join(','));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        },2000)
    }
})();

var checkbox = document.getElementsByTagName('input');
for(var i = 0,c;c = checkbox[i++];){
    c.onclick = function () {
        if(this.checked === true){
            proxySynchronousFile(this.id)
        }
    }
}
```

## 虚拟代理在惰性加载的应用
```js
var miniConsole = (function () {
    var cache = [];
    var handler = function (ev) {
        if(ev.keyCode === 113){
            var script = document.createElement('script');
            script.onload = function () {
                for (var i = 0,fn;fn=cache[i++];){
                    fn()
                }
            };
            script.src = 'miniConsole.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            document.body.removeEventListener('kwydown',handler);
        }
    };
    document.body.addEventListener('keydown',handler,false);
    return{
        log:function () {
            var args = arguments;
            cache.push(function () {
                return miniConsole.log.apply(miniConsole,args)
            })
        }
    }
})();
miniConsole.log(11);

// miniConsole 代码
    miniConsole = {
        log:function () {
            Array.prototype.join.call(arguments);
        }
    };
```

## 缓存代理
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果
```js
    var mult = function () {
        console.log('开始计算乘积');
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return a;
    };
    mult(2, 3,); // 6
    mult(2, 3, 4); // 24

    var proxyMult = (function () {
        var cache = {};
        return function () {
            debugger
            var args = Array.prototype.join.call(arguments,',');
            if(args in cache){
                return cache[args]
            }
            return cache[args] = mult.apply(this,arguments);
        }
    })();
    proxyMult(1,2,3,4);
    proxyMult(1,2,3,4);
```

## 用高阶函数动态创建代理
```js
var mult = function () {
    var a = 1;
    for (var i = 0,l=arguments.length;i<l;i++){
        a =a*arguments[i];
    }
    return a;
};
var plus = function () {
    var a = 0;
    for (var i = 0,l=arguments.length;i<l;i++){
        a =a+arguments[i];
    }
    return a;
};
var createProxyFactory = function (fn) {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments,',');
        if (args in cache){
            return cache[args];
        }
        return cache[args] = fn.apply(this,arguments);
    }
}
var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);

alert(proxyMult(1,2,3,4));
alert(proxyMult(1,2,3,4));
alert(proxyPlus(1,2,3,4));
alert(proxyPlus(1,2,3,4));
```



