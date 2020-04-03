---
title: 装饰者模式
date: 2019-02-13 20:57:24
tags: 装饰者模式
categories:
    - 设计模式
---

## 什么是装饰者模式
给对象动态地增加职责的方式称为装饰者模式

## 模拟传统面向对象的装饰者模式
```js
    var Plane = function () {};
    Plane.prototype.fire = function () {
        console.log('发射普通子弹');
    }
    var MissileDecorator = function (plane) {
        this.plane = plane
    }
    MissileDecorator.prototype.fire = function () {
        this.plane.fire();
        console.log('发射导弹');
    };

    var AtomDecorator = function (plane) {
        this.plane = plane;
    };
    AtomDecorator.prototype.fire = function () {
        this.plane.fire();
        console.log('发射原子弹');
    };

    var plane = new Plane();
    plane = new MissileDecorator(plane);
    plane = new AtomDecorator(plane);
    console.log(plane);
    plane.fire();
```
##JS装饰者
```js
    var plane = {
        fire:function () {
            console.log('发射普通子弹');
        }
    };
    var missileDecorator = function () {
        console.log('发射导弹');
    };
    var atomDecorator = function () {
        console.log('发射原子弹');
    };
    var file1 = plane.fire;
    plane.fire = function () {
        file1();
        missileDecorator();
    };
    var fire2 = plane.fire;
    plane.fire = function () {
        fire2();
        atomDecorator();
    };
    plane.fire()
```
## AOP装饰函数
```js
    Function.after = function (afterfn) {
        var __self = this;
        return function () {
            var ret = __self.apply(this,arguments);
            afterfn.apply(this,arguments);
            return ret;
        }
    };
    Function.prototype.before = function (beforefn) {
        var __self = this;
        return function () {
            beforefn.apply(this,arguments);
            return __self.apply(this,arguments)
        }
    };
    document.getElementById = document.getElementById.before(function () {
        alert(1)
    });
    var button = document.getElementById('button');
    console.log(button);
```
