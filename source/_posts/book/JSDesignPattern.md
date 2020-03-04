---
title: JSDesignPattern
date: 2020-03-02 21:15:34
tags:
---
## 第1章 面向对象的JavaScript

JS是通过原型委托的方式来实现对象之间的继承

编程语言分为两类：静态类型语言和动态类型语言

静态类型语言：在编译的时候便已确定变量的类型
优点：在编译的时候就能发现类型不匹配的错误
缺点：迫使程序员依照强类契约来编程序，为变量规定数据类型

动态类型语言：程序运行的时候，待变量被赋予某个值才会具有的类型。
优点：代码数量更少，简洁
缺点：无法保证变量的类型

JS是一门经典的动态类型语言

多态：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果
```js

var makeSound = function( animal ){
    if ( animal instanceof Duck ){
        console.log( '嘎嘎嘎' );
    }else if ( animal instanceof Chicken ){
        console.log( '咯咯咯' );
    }
};

var Duck = function(){};
var Chicken = function(){};

makeSound( new Duck() );      // 嘎嘎嘎
makeSound( new Chicken() );   // 咯咯咯

// 封装后
var makeSound = function (animal) {
  animal.sound();
};
var Duck = function () {};
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎');
};
var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log('咯咯咯');
};
var Dog = function () {};
Dog.prototype.sound = function () {
  console.log('汪汪汪');
};
makeSound(new Duck());
makeSound(new Chicken());
makeSound(new Dog());
```

多态最根本的作用就是把过程化的条件分支语句转化为对象的多态性，从而消除这些条件语句分支
```js
var googleMap = {
  show: function () {
    console.log('开始渲染地图');
  }
};

var baiduMap = {
  show: function () {
    console.log('开始百度地图');
  }
};

var renderMap = function (type) {
  if (type === 'google'){
    googleMap.show()
  }else if(type === 'baidu'){
    baiduMap.show()
  }
};
renderMap('google');
renderMap('baidu');

// 多态
var renderMap = function (map) {
 if (map.show instanceof Function){
   map.show()
 }
};
```

原型编程范型基本原则：
- 所有的数据都是对象
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
- 对象会记住它的原型
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型

基本类型：undefined,null,number,boolean,string
引用类型：function,object

Object.create(null) 可以创建没有原型的对象

## 第2章 this,call,和apply

this的指向
1.当函数作为对象的方法被调用时，this指向该对象
2.当函数不作为对象的属性被调用时，this总是指向全局对象（浏览器里指的是window，在es5的strict模式下，this指向undefined）
3.当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的this指向返回的这个对象
(如果构造器显式地返回了一个object类型地对象，那么此次运算结果返回这个对象，如果构造器不显式地返回了任何数据，或者是返回的一个非对象类型地数据，就不会造成上述问题)
4.Function.prototype.call 或者 Function.prototype.apply 动态地改变传入函数的this

call和apply的区别
- apply接受2个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，当作参数传递给被调用的函数
- call传入的参数不固定，第一个参数代表this的指向，从第二个参数开始往后，每个参数被依次传入函数
- 当使用call或者apply时，如果第一个参数为null，this指向默认宿主对象，在浏览器是window，如果是严格模式this还是null

[].shift.call(arguments) (因为arguments是个类数组对象不能和数组一样进行操作，借用array.prototype对象上的方法对arguments进行push,shift操作)
Array.prototype.slice 可以把arguments转成真正数组
Array.prototype.shift 截取arguments头一个元素

借用Array.prototype.push的对象还要有两个条件
- 对象本身要可以存取属性
- 对象的length属性可以读写