---
title: 观察者模式
date: 2019-01-23 20:54:56
tags: 观察者模式
categories:
    - 设计模式
---

## 发布-订阅模式
发布-订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

## 作用
1.广泛应用在异步编程中，这是一种替代传递回调函数的方案。
2.可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。

优点：1.时间上的解耦2.对象之间的解耦
缺点：需要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但订阅者始终存在内存中

## DOM 事件
```js
document.body.addEventListener('click',function () {
    alert(2);
},false);
document.body.click();
```

## 自定义事件
```js
    var salesOffices = {};
    salesOffices.clientList = [];
    salesOffices.listen = function (fn) {
        this.clientList.push(fn);
    };
    salesOffices.trigger = function () {
        for (var i = 0,fn;fn = this.clientList[i++];){
            fn.apply(this,arguments)
        }
    };
    salesOffices.listen(function (price,squareMeter) {
        console.log('价格=' + price);
        console.log('squareMeter=' + squareMeter);
    });
    salesOffices.listen(function (price,squareMeter) {
        console.log('价格=' + price);
        console.log('squareMeter=' + squareMeter);
    });

    salesOffices.trigger(2000000,88);
    salesOffices.trigger(3000000,110);
```
改写代码，让订阅者只订阅自己感兴趣的消息
```js
    var salesOffices = {};
    salesOffices.clientList = {};
    salesOffices.listen = function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    };
    salesOffices.trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    };
    salesOffices.listen('squareMeter88', function (price) {
        console.log('价格=' + price);
    });
    salesOffices.listen('squareMeter110', function (price) {
        console.log('价格=' + price);
    });

    salesOffices.trigger('squareMeter88', 2000000);
    salesOffices.trigger('squareMeter110', 3000000);
```
## 发布-订阅模式的通用实现
```js
    var event = {
        clientList: [],
        listen: function (key, fn) {
            if (!this.clientList[key]) {
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn);
        },
        trigger: function () {
            var key = Array.prototype.shift.call(arguments),
                fns = this.clientList[key];
            if (!fns || fns.length === 0) {
                return false;
            }
            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        }
    };

    var installEvent = function (obj) {
        for (var i in event) {
            obj[i] = event[i];
        }
    };

    var salesOffices = {};
    installEvent(salesOffices);
    salesOffices.listen('squareMeter88', function (price) {
        console.log('价格=' + price);
    });
    salesOffices.listen('squareMeter100', function (price) {
        console.log('价格=' + price);
    });

    salesOffices.trigger('squareMeter88', 2000000);
    salesOffices.trigger('squareMeter100', 3000000);
```

## 取消订阅的事件
```js
    var event = {
        clientList: [],
        listen: function (key, fn) {
            if (!this.clientList[key]) {
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn);
        },
        trigger: function () {
            var key = Array.prototype.shift.call(arguments),
                fns = this.clientList[key];
            if (!fns || fns.length === 0) {
                return false;
            }
            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        }
    };
    event.remove = function (key,fn) {
        var fns = this.clientList[key];
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1)
                }
            }
        }
    };

    var installEvent = function (obj) {
        for (var i in event) {
            obj[i] = event[i];
        }
    };

    var salesOffices = {};
    installEvent(salesOffices);
    salesOffices.listen('squareMeter88', fn1 = function (price) {
        console.log('价格=' + price);
    });
    salesOffices.listen('squareMeter100', fn2 = function (price) {
        console.log('价格=' + price);
    });

    salesOffices.remove('squareMeter88', fn1);
    salesOffices.trigger('squareMeter100', 3000000);
```

## 全局的发布-订阅对象
```js
    var Event = (function () {
        var clientList = {},
            listen,
            trigger,
            remove;

        listen = function (key, fn) {
            if (!clientList[key]) {
                clientList[key] = [];
            }
            clientList[key].push(fn);
        };
        trigger = function () {
            var key = Array.prototype.shift.call(arguments),
                fns = clientList[key];
            if (!fns || fns.length === 0) {
                return false;
            }
            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        }
        remove = function (key, fn) {
            var fns = clientList[key];
            if (!fns) {
                return false
            }
            if (!fn) {
                fns && (fns.length = 0);
            } else {
                for (var l = fns.length - 1; l >= 0; l--) {
                    var _fn = fns[l];
                    if (_fn === fn) {
                        fns.splice(l, 1)
                    }
                }
            }
        };

        return {
            listen: listen,
            trigger: trigger,
            remove: remove
        }
    })();


    Event.listen('squareMeter88', function (price) {
        console.log('价格=' + price);
    });


    Event.trigger('squareMeter88', 2000000);
```