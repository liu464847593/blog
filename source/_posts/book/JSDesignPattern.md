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

## 第3章 闭包和告高阶函数

闭包就是能够读取其他函数内部变量的函数。（不一定要返回函数）

变量的作用域指的是变量的有效范围
声明一个变量前面没有带var，这个变量就会变成全局变量
变量的搜索是从内到外的
闭包的作用
- 封装变量 把全局变量封装成私有的变量
- 延续局部的变量寿命（可能以后还需要用这些变量）

被引用的变量需要回收时候，把变量设为null

```js
var mult = (function () {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments,',');
    if (args in cache){
      return cache[args]
    }
    var a = 1;
    for (var i = 0,l=arguments.length;i<l;i++){
      a = a* arguments[i]
    }
    return cache[args] = a;
  }
})()
console.log(mult(1, 2, 3));

// 封装
var mult = (function () {
  var cache = {};
  var calculate = function () {
    var a = 1;
    for (var i = 0,l=arguments.length;i<l;i++){
      a = a* arguments[i]
    }
    return a;
  };
  return function () {
    var args = Array.prototype.join.call(arguments,',');
    if (args in cache){
      return cache[args]
    }

    return cache[args] = calculate.apply(null,arguments);
  }
})()
console.log(mult(1, 2, 3));
console.log(mult(1, 2, 3));
```

如果闭包的作用域链保存一些DOM节点就可能造成内存泄漏

---
高阶函数 满足以下条件
- 函数可以作为参数传递
- 函数可以作为返回值

Object.prototype.toString 可以判断数据是不是数组
```js
console.log(Object.prototype.toString.call('123')); // [object String]
console.log(Object.prototype.toString.call([1,2,3])); // [object Array]
```
```js
// 判断数据类型
  var isType = function (type) {
    return function (obj) {
      return Object.prototype.toString.call(obj) === '[object '+ type + ']';
    }
  }
  var isString = isType('String');
  var isArray = isType('Array');
  var isNumber = isType('Number');
  console.log(isArray([1, 2, 3]));
  
  // 单例模式
  var getSingle = function (fn) {
    var ret;
    return function () {
      return ret || (ret = fn.apply(this,arguments))
    }
  }
```

AOP（面向切面编程）：把一些跟核心业务逻辑模块无关的功能抽离出来，再通过动态织入的方式掺入业务逻辑模块中
```js
Function.prototype.before = function (beforefn) {
  var _self = this;
  return function () {
    beforefn.apply(this,arguments);
    return _self.apply(this,arguments)
  }
}
Function.prototype.after = function (afterfn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this,arguments);
    afterfn.apply(this,arguments);
    return ret
  }
}

var func = function () {
  console.log(2);
}
func = func.before(function () {
  console.log(1);
}).after(function () {
  console.log(3);
})
  func()
```

函数柯里化：一个curring函数首先接受一些参数，接受这些参数后并不会立即求值，而是继续返回另一个函数，刚才传入的参数在函数形成闭包中被保存起
来。待到函数被真正需要求值的时候，之前传入的所有参数都会一次性用于求值
1.curring 部分求值
```js
//demo
var cost = (function () {
  var args = [];
  return function () {
    if (arguments.length === 0){
      var money = 0;
      for (var i =0,l=args.length;i<l;i++){
        money +=args[i];
      }
      return money
    } else {
      [].push.apply(args,arguments)
    }
  }
})()
  cost(100)
  cost(200)
  cost(300)
console.log(cost());

// 柯里化
  var currying = function (fn) {
    var args = [];
    return function () {
      if (arguments.length === 0) {
        return fn.apply(this, args)
      } else {
        [].push.apply(args, arguments);
        return arguments.callee;
      }
    }
  }
  var cost = (function () {
    var money = 0;
    return function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        money += arguments[i];
      }
      return money
    }
  })()
  var cost = currying(cost);
  cost(100);
  cost(200);
  cost(300);
  console.log(cost());
```

callee: 当前正在执行的函数
caller：返回调用指定函数的函数

2.uncurring 调用对象的某个方法，不去关系原对象是否被设计拥有这个方法
```js
Function.prototype.uncurring = function () {
  var self =this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj,arguments)
  }
}
var push = Array.prototype.push.uncurring();
(function () {
  push(arguments,4);
  console.log(arguments);
})(1,2,3)

// 另一种uncurring
Function.prototype.uncurring = function () {
  var self =this;
  return function () {
    return Function.prototype.call.apply(self,arguments)
  }
}
```


