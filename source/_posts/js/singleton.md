---
title: singleton
date: 2019-01-07 23:08:44
tags: 单例模式
categories:
    - 设计模式
---
## 单例模式
单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

## demo
1. 标准的单例模式

```js
var Singleton = function (name) {
        this.name = name;
        this.instance = null;
    };
    Singleton.prototype.getName = function () {
        alert(this.name);
    };
    Singleton.getInstance = function (name) {
        if(!this.instance){
            this.instance = new Singleton(name);
        }
        return this.instance;
    };

var a = Singleton.getInstance('seven1');
var b = Singleton.getInstance('seven2');
alert(a === b); // true
```
或者：
```js
var Singleton = function (name) {
        this.name = name;
    };
    Singleton.prototype.getName = function () {
        alert(this.name);
    };
    Singleton.getInstance = (function (name) {
        var instance = null;
        return function (name) {
            if(!instance){
                instance = new Singleton(name);
            }
            return instance;
        };
    })();

var a = Singleton.getInstance('seven1');
var b = Singleton.getInstance('seven2');
alert(a === b); // true
```
缺点：不透明性。Singleton类的使用者必须知道这是一个单例类，跟以往通过 new XXX的方式来获取对象不同，这里偏要使用Singleton.getInstance来获取对象。
2. 透明的单例模式

```js
var CreateDiv = (function () {
        var instance;
        var CreateDiv = function (html) {
            if(instance){
                return instance
            }
            this.html = html;
            this.init();
            return instance = this;
        };

        CreateDiv.prototype.init = function () {
            var div = document.createElement('div');
            div.innerHTML = this.html;
            document.body.appendChild(div);
        };
        return CreateDiv;
    })();

var a = new CreateDiv('seven1');
var b = new CreateDiv('seven2');

alert(a === b); // true
```
缺点：使用了自执行的匿名函数和闭包，并且让这个匿名函数返回真正的Singleton 构造方法，增加了程序复杂度