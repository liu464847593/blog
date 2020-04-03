---
title: 模板方法模式
date: 2019-01-31 10:48:04
tags: 模板方法模式
categories:
    - 设计模式
---
## 什么是模板方法模式
模板方法模式是一种只需要使用继承就可以实现的非常简单的模式
由两部分组成：  
1.抽象父类  
2.具体实现的子类  
通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。  
子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法

## demo
```js
var Beverage = function () {};
Beverage.prototype.boilWater = function () {
    console.log('把水煮沸');
};
Beverage.prototype.brew = function () {};
Beverage.prototype.pourInCup = function () {};
Beverage.prototype.addCondiments = function () {};

Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
}

var Coffee = function () {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
};
var Coffee = new Coffee();
Coffee.init();


var Tea = function () {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function () {
    console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function () {
    console.log('把茶倒进杯子');
};
Tea.prototype.addCondiments = function () {
    console.log('加柠檬');
};
var tea = new Tea();
tea.init();


// Beverage.prototype.init 是模板方法
```

## 钩子方法
```js
    var Beverage = function () {};
    Beverage.prototype.boilWater = function () {
        console.log('把水煮沸');
    };
    Beverage.prototype.brew = function () {
        throw new Error('子类必须重写brew方法')
    };
    Beverage.prototype.pourInCup = function () {
        throw new Error('子类必须重写pourInCup方法')
    };
    Beverage.prototype.addCondiments = function () {
        throw new Error('子类必须重写addCondiments方法')
    };
    Beverage.prototype.customerWantsCondiments = function(){
        return true
    };
    Beverage.prototype.init = function () {
        this.boilWater();
        this.brew();
        this.pourInCup();
        if (this.customerWantsCondiments()){
            this.addCondiments();
        }
    }

    var CoffeeWithHook = function () {};
    CoffeeWithHook.prototype = new Beverage();
    CoffeeWithHook.prototype.brew = function () {
        console.log('用沸水冲泡咖啡');
    };
    CoffeeWithHook.prototype.pourInCup = function () {
        console.log('把咖啡倒进杯子');
    };
    CoffeeWithHook.prototype.addCondiments = function () {
        console.log('加糖和牛奶');
    };
    CoffeeWithHook.prototype.customerWantsCondiments = function () {
        return window.confirm('请问需要调料吗');
    };
    var CoffeeWithHook = new CoffeeWithHook();
    CoffeeWithHook.init();
```
## 好莱坞原则
允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候，以何种方式去使用这些底层组件
```js
    var Beverage = function (param) {
        var boilWater = function () {
            console.log('把水煮沸');
        };
        var brew = param.brew || function () {
            throw  new Error('必须传递brew方法')
        };
        var pourInCup = param.pourInCup || function () {
            throw  new Error('必须传递pourInCup方法')
        };
        var addCondiments = param.addCondiments || function () {
            throw  new Error('必须传递addCondiments方法')
        };
        var F = function () {
        };
        F.prototype.init = function () {
            boilWater();
            brew();
            pourInCup();
            addCondiments();
        };
        return F
    };

    var Coffee = Beverage({
        brew:function () {
            console.log('用沸水冲泡咖啡');
        },
        pourInCup:function () {
            console.log('把咖啡倒进杯子');
        },
        addCondiments:function () {
            console.log('加糖和咖啡');
        }
    })

    var Tea = Beverage({
        brew:function () {
            console.log('用沸水浸泡茶叶');
        },
        pourInCup:function () {
            console.log('把茶倒进杯子');
        },
        addCondiments:function () {
            console.log('加柠檬');
        }
    })

    var coffee = new Coffee();
    coffee.init();
    var tea = new Tea();
    tea.init();
```


