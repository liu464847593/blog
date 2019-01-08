---
title: singleton
date: 2019-01-07 23:08:44
tags: 单例模式
categories:
    - 设计模式
---
## 单例模式
单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

## 标准的单例模式
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
## 透明的单例模式
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

## 用代理实现单例模式
```js
var CreateDiv = function (html) {
        this.html = html;
        this.init();
    };
CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function () {
    var instance;
    return function (html) {
        if(!instance){
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();

var a = new ProxySingletonCreateDiv('seven1');
var b = new ProxySingletonCreateDiv('seven2');
alert(a === b); // true
```
## 惰性单例
```js
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this.arguments));
    }
};
var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};
```

优点：
1. 把创建对象的职责和管理单例的职责分别放置在两个方法里 （单一职责原则）
2. 在适合的时候才创建对象，并且只创建唯一一个

## 参考
1.JS 设计模式和开发实践之单例模式