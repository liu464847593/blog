---
title: 策略模式
date: 2019-01-16 20:44:23
tags: 策略模式
categories:
    - 设计模式
---

## 什么是策略模式
定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
策略模式的组成：  
1.策略类，封装了具体的算法，并负责具体的计算过程。  
2.环境类Context,接受客户的请求，随后把请求委托给某个策略类。

优点：  
1.利用组合，委托和多态等技术和思想，可以有效避免多重条件选择语句
2.提供了开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得他们易于切换，易于理解，易于扩展。
3.可以复用在系统其它地方，从而避免许多重复复制粘贴工作。
4.利用组合和委托来让Context拥有执行算法的能力，也是继承的一种更好轻便的代替方案。

缺点：
1.会在程序中增加许多策略类或者策略对象，但实际上这比把他们负责的逻辑砌在Context中要好。
2.必须了解所有的strategy，了解各个strategy之间的不同点才能选择一个合适的strategy.

## 使用策略模式计算奖金
绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资,绩效为B的人年终奖有2倍工资,现在计算员工的年终奖

面向对象：
```js
    var performanceS = function () {};
    performanceS.prototype.calculate = function (salary) {
        return salary * 4;
    };

    var performanceA = function () {};
    performanceA.prototype.calculate = function (salary) {
        return salary * 3;
    };

    var performanceB = function () {};
    performanceB.prototype.calculate = function (salary) {
        return salary * 2;
    };

    var Bonus = function () {
        this.salary = null; // 原始工资
        this.strategy = null; // 绩效等级对应的策略对象
    };
    Bonus.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    Bonus.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    Bonus.prototype.getBouns = function () {
        return this.strategy.calculate(this.salary)
    };

    var bouns = new Bonus();
    bouns.setSalary(10000);
    bouns.setStrategy(new performanceS());

    console.log(bouns.getBouns()); // 40000
    bouns.setStrategy(new performanceA());
    console.log(bouns.getBouns()); // 30000
```

JS版本的策略模式
```js
    var strategies = {
       'S':function (salary) {
           return salary * 4;
       },
       'A':function (salary) {
           return salary * 3;
       },
       'B':function (salary) {
           return salary * 2;
       }
   };
   var calulateBouns = function (level,salary) {
       return strategies[level](salary);
   };
   console.log(calulateBouns('S', 20000)); // 80000
   console.log(calulateBouns('A', 10000)); // 30000
```

策略模式实现动画
```js
    var tween = {
        linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        strongEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        strongEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        sineaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        sineaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    };
    var Animate = function (dom) {
        this.dom = dom;
        this.startTime = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.propertyName = null;
        this.easing = null;
        this.duration = null;
    }
    Animate.prototype.start = function (propertyName, endPos, duration, easing) {
        this.startTime = +new Date;
        this.startPos =  this.dom.getBoundingClientRect()[propertyName];
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];

        var self = this;
        var timeId = setInterval(function () {
            if (self.step() === false) {
                clearInterval(timeId);
            }
        }, 19);
    }
    Animate.prototype.step = function () {
        var t = +new Date;
        if (t >= this.startTime + this.duration) {
            this.update(this.endPos);
            return false;
        }
        var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        this.update(pos)
    }

    Animate.prototype.update = function (pos) {
        this.dom.style[this.propertyName] = pos + 'px';
    }
    var div = document.getElementById('div');
    var animate = new Animate(div);
    animate.start('left', 500, 1000, 'strongEaseOut');
    // animate.start('top',150,500,'strongEaseIn')
```

表单添加校验
```js
 var strategies = {
     isNotEmpty:function (value,errorMsg) {
         if(value === ''){
             return errorMsg;
         }
     },
     minLength:function (value,length,errorMsg) {
         if(value.length < length){
             return errorMsg
         }
     },
     isMobile:function (value,errorMsg) {
         if(!/(^1[3|5|8][0-9]{9}$).test(value)/){
             return errorMsg
         }
     }
 }

 var validataFunc = function () {
     var validator = new Validator();
     validator.add(registerForm.userName,'isNotEmpty','用户名不能为空')
     validator.add(registerForm.password,'minLength:6','密码长度不能少于6位')
     validator.add(registerForm.phoneNumber,'isMobile','手机号码格式不正确')

     var errorMsg = validator.start();
     return errorMsg;
 }
 var registerForm = document.getElementById('registerForm');
 registerForm.onsubmit = function () {
     var errorMsg = validataFunc();
     if(errorMsg){
         alert(errorMsg);
         return false;
     }
 }
 var Validator = function () {
     this.cache = [];
 }
 Validator.prototype.add = function (dom,rule,errorMsg) {
     var ary = rule.split(':');
     this.cache.push(function () {
         var strategy = ary.shift();
         ary.unshift(dom.value);
         ary.push(errorMsg);
         return strategies[strategy].apply(dom,ary);
     })
 }

 Validator.prototype.start = function () {
     for(var i = 0,validatorFunc;validatorFunc = this.cache[i++];){
         var msg = validatorFunc();
         if(msg){
             return msg;
         }
     }
 }
```

