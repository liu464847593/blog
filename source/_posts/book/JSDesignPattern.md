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

## 第3章 闭包和高阶函数

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

## 第4章 单例模式
单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
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
缺点：不透明性。Singleton类的使用者必须知道这是一个单例类，跟以往通过 new XXX的方式来获取对象不同，这里偏要使用Singleton.getInstance
来获取对象。
```js
// 透明的单例模式
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
```js
// 用代理实现单例模式
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

```js
// 惰性单例
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this,arguments));
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
## 第5章 策略模式
策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

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
## 第6章 代理模式
代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问。

内向的小明直接向女神A送花  （不用代理模式）
```js
//小明追MM
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
保护代理：B可以帮A过滤掉一些请求。比如送花的人年龄太打或者没有宝马的，这种请求可以直接在代理B处被拒绝掉。保护代理用于控制不同权限的对象对目
标的访问，但在JS中并不容易实现保护代理，因为我们无法判断谁访问了某个对象。

虚拟代理：花的价格不菲，代理B会选择在A心情好的时候再执行new Flower。虚拟代理会把一些开销很大的对象，延迟到真正需要它的时候才去创建
（最常用的一种代理模式）
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
虚拟代理实现图片懒加载
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

单一职责原则：一个类（包括对象和函数等）应该仅有一个引起它变化的原因。
假如有天不在需要预加载，那么只需要改成请求本体而不是请求代理对象即可

代理和本体接口的一致性优点：
1.用户可以放心地请求代理，他只关心是否得到想要的结果。
2.在任何使用本体的地方都可以替换成使用代理
```js
  var myImage = (function () {
      var imgNode = document.createElement('img');
      document.body.appendChild(imgNode);
      return function (src) {
        imgNode.src = src;
      }
    })();
    var proxyImage = (function () {
      var img = new Image;
      img.onload = function () {
        myImage.setSrc(this.src);
      }
      return function (src) {
        myImage.setSrc('xxx.gif');
        img.src = src;
      }
    })();
    proxyImage.setSrc('xxxx.png')
```

虚拟代理合并http请求
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

虚拟代理在惰性加载的应用
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

用高阶函数动态创建代理
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
## 第7章 迭代器模式
迭代器模式：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

实现自己的迭代器
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
迭代类数组对象和字面量对象
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

倒序迭代器
```js
  var reverseEach = function (ary,callback) {
    for (var l = ary.length - 1;l>=0;l--){
      callback(l,ary[l]);
    }
  }
  reverseEach([0,1,2],function (i,n) {
    console.log(n);
  })
```
中止迭代器：break 跳出循环


应用
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
## 第8章 发布-订阅模式
发布-订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

发布-订阅模式和观察者模式有区别
发布订阅模式：发布者和观察者不知道互相的存在，需要个第三方中介串联 类似中介接受售楼处消息，推送客户消息
观察者是互相知道的，类似售楼处直接对接客户

作用
1.广泛应用在异步编程中，这是一种替代传递回调函数的方案。
2.可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。

优点：1.时间上的解耦2.对象之间的解耦
缺点：需要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但订阅者始终存在内存中

DOM 事件
```js
document.body.addEventListener('click',function () {
    alert(2);
},false);
document.body.click();
```

自定义事件
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

发布-订阅模式的通用实现
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
取消订阅的事件
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
全局的发布-订阅对象
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
## 第9章 命令模式
命令模式中的命令指的是一个执行某些特定事情的指令
应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，
使得请求发送者和请求接受者能够消除彼此之间的耦合关系。

传统面向对象的命令模式
```js
    var setCommand = function (button, command) {
        button.onclick = function () {
            command.execute();
        }
    };
    var MenuBar = {
        refresh: function () {
            console.log('刷新菜单目录');
        }
    };
    var SubMenu = {
        add: function () {
            console.log('增加子菜单');
        },
        del: function () {
            console.log('删除子菜单');
        }
    }
    var RefreshMenuBarCommand = function (receiver) {
        this.receiver = receiver
    }
    RefreshMenuBarCommand.prototype.execute = function () {
        this.receiver.refresh()
    };
    var AddSubMenuComman = function (receiver) {
        this.receiver = receiver
    };
    AddSubMenuComman.prototype.execute = function () {
        this.receiver.add()
    };
    var DelsubMenuCommand = function (receiver) {
        this.receiver = receiver
    };
    DelsubMenuCommand.prototype.execute = function () {
        console.log('删除子菜单');
    };

    var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
    var addSubMenuComman = new AddSubMenuComman(SubMenu);
    var delsubMenuCommand = new DelsubMenuCommand(SubMenu);

    setCommand(button1, refreshMenuBarCommand);
    setCommand(button2, addSubMenuComman);
    setCommand(button3, delsubMenuCommand);
```

JS中的命令模式
```js
var bindClick = function (button,func) {
  button.onclick = func;
}
var MenuBar = {
  refresh:function () {
    console.log('刷新菜单界面');
  }
}
var SubMenu = {
  add:function () {
    console.log('增加子菜单');
  },
  del:function () {
    console.log('删除子菜单');
  }
}
bindClick(button1,MenuBar.refresh);
// 使用闭包
    var button1 = document.getElementById('button1');


    var setCommand = function (button, command) {
        button.onclick = function () {
            command.execute()
        }
    };
    var MenuBar = {
        refresh: function () {
            console.log('刷新菜单目录');
        }
    };
    var RefreshMenuBarCommand = function (receiver) {
        return {
            execute:function () {
                receiver.refresh()
            }
        }
    }


    var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);

    setCommand(button1, refreshMenuBarCommand);
```

撤销命令
```js
    var ball = document.getElementById('ball');
    var pos = document.getElementById('pos');
    var moveBtn = document.getElementById('moveBtn');
    var cancelBtn = document.getElementById('cancelBtn');

    var MoveCommand = function (receiver,pos) {
        this.receiver = receiver;
        this.pos = pos;
        this.oldPos = null;
    };
    MoveCommand.prototype.execute = function () {
        this.receiver.start('left',this.pos,1000,'strongEaseOut');
        this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
    }
    MoveCommand.prototype.undo = function () {
        this.receiver.start('left',this.oldPos,1000,'strongEaseOut');
    }
    var moveCommand;
    moveBtn.onclick = function () {
        var animate = new Animate(ball);
        moveCommand = new MoveCommand(animate,pos.value);
        moveCommand.execute()
    };
    cancelBtn.onclick = function () {
        moveCommand.undo()
    }
```

撤销和重做
```js
var Ryu = {
    attack: function () {
        console.log('攻击');
    },
    defense:function () {
        console.log('防御');
    },
    jump:function () {
        console.log('跳跃');
    },
    croush:function () {
        console.log('蹲下');
    }
}
var makeCommand = function (receiver,state) {
    return function () {
        receiver[state]();
    }
};
var commands = {
    '119':'jump',
    '115':'croush',
    '97':'defense',
    '100':'attack'
}
var commandStack = [];
document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = makeCommand(Ryu,commands[keyCode]);
    if (command){
        command();
        commandStack.push(command)
    }
}
document.getElementById('replay').onclick = function () {
    var command;
    while (command = commandStack.shift()){
        command();
    } 
};
```

宏命令是一组命令的集合，通过执行宏命令的方式可以一次执行一批命令。
```js
var closeDoorCommand = {
    execute:function() {
        console.log('关门');
    }
};
var openPcCommand = {
    execute:function() {
        console.log('开电脑');
    }
}
var openQQcomand = {
    execute:function() {
        console.log('登录QQ');
    }
}

var MacroCommand = function () {
    return{
        commanList:[],
        add:function (command) {
            this.commanList.push(command)
        },
        execute:function () {
            for (var i = 0, command; command = this.commanList[i++];){
                command.execute()
            }
        }
    }
}
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQcomand);
macroCommand.execute()
```

一般来说命令模式都会在command对象保存一个接收者来负责真正执行客户的请求，这种情况命令对象是"傻瓜式"的,好处是请求发起者和接受者得到了解耦。
没有接受者的命令叫只能命令和策略模式很接近，代码结构无法分辨，只能从意图分辨。
策略模式指向的问题域更小，所有策略对象的目标总数一致的，它们只是达到这个目标的不同手段，内部实现针对于算法。（不同的算法做同一件事情）
智能模式指向的问题域更广，command对象解决的目标更具有发散性（不同的命令做不同的事情）

## 第10章 组合模式
组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成。

组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构
1.表示树形结构。
2.利用对象多态性统一对待组合对象和单个对象。


更强大的宏命令
```js
    var MacroCommand = function () {
        return{
            commanList:[],
            add:function (command) {
                this.commanList.push(command)
            },
            execute:function () {
                for (var i = 0, command; command = this.commanList[i++];){
                    command.execute()
                }
            }
        }
    };
    var openAcCommand = {
        execute:function () {
            console.log('打开空调');
        }
    };
    var openTvCommand = {
        execute:function () {
            console.log('打开电视');
        }
    };
    var openSoundCommand = {
        execute:function () {
            console.log('打开音响');
        }
    };

    var macroCommand1 = MacroCommand();
    macroCommand1.add(openTvCommand);
    macroCommand1.add(openSoundCommand);


    var closeDoorCommand = {
        execute:function() {
            console.log('关门');
        }
    };
    var openPcCommand = {
        execute:function() {
            console.log('开电脑');
        }
    };
    var openQQcomand = {
        execute:function() {
            console.log('登录QQ');
        }
    };


    var macroCommand2 = MacroCommand();
    macroCommand2.add(closeDoorCommand);
    macroCommand2.add(openPcCommand);
    macroCommand2.add(openQQcomand);

    var macroCommand = MacroCommand();
    macroCommand.add(openAcCommand);
    macroCommand.add(macroCommand1);
    macroCommand.add(macroCommand2);

    var setCommand = (function(command){
         document.getElementById('button').onclick = function () {
             command.execute();
         }
    })(macroCommand);
```

组合模式例子（扫描文件夹）
```js
    var Folder = function (name) {
        this.name = name;
        this.files = [];
    };
    Folder.prototype.add = function (file) {
        this.files.push(file)
    };
    Folder.prototype.scan = function () {
        console.log('开始扫描文件夹：' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    }

    var File = function (name) {
        this.name = name;
    };
    File.prototype.add = function () {
        throw  new Error('文件下面不能再添加文件')
    };
    File.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    }

    var folder = new Folder('学习资料');
    var folder1 = new Folder('JavaScript');
    var folder2 = new Folder('jquery');

    var file1 = new File('JS设计模式与开发实践');
    var file2 = new File('精通JQuery');
    var file3 = new File('重构与模式');

    folder1.add(file1);
    folder2.add(file2);

    folder.add(folder1);
    folder.add(folder2);
    folder.add(file3);

    var folder3 = new Folder('NodeJs');
    var file4 = new  File('深入浅出NodeJs');
    folder3.add(file4);

    var file5 = new File('JS语言精髓与编程实践');

    folder.add(folder3);
    folder.add(file5);
    folder.scan();
```
注意
1.组合模式不是父子关系
2.对叶对象操作的一致性
3.双向映射关系
4.用职责链模式提高组合模式性能

引用父对象
```js
    var Folder = function (name) {
        this.name = name;
        this.parent = null;
        this.files = [];
    };
    Folder.prototype.add = function (file) {
        file.parent = this;
        this.files.push(file);
    };
    Folder.prototype.scan = function () {
        console.log('开始扫描文件夹：' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    }
    Folder.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1)
            }
        }
    };


    var File = function (name) {
        this.name = name;
        this.parent = null;
    };
    File.prototype.add = function () {
        throw  new Error('文件下面不能再添加文件')
    };
    File.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    }

    File.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1)
            }
        }
    };

    var folder = new Folder('学习资料');
    var folder1 = new Folder('JavaScript');

    var file1 = new File('深入浅出NodeJs');

    folder1.add(new File('JS设计模式与开发实践'));
    folder.add(folder1);

    folder.add(file1);
    folder1.remove();
    folder.scan();
```
合适使用组合模式
1.表示对象的部分-整体层次结构
2.客户希望统一对待树中的所有对象

## 第11章 模版方法模式
模版方法模式：只需要继承就可以实现的非常简答的模式

模版方法模式的组成：
1.抽象父类
2.具体的实现子类

Coffee or Tea
```js
  // 泡咖啡
var Coffee = function () {};
Coffee.prototype.boilWater = function () {
  console.log('把水煮沸');
};
Coffee.prototype.brewCoffeeGriends = function () {
  console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function () {
  console.log('把咖啡倒进杯子');
};
Coffee.prototype.addSugarAndMilk = function () {
  console.log('加糖和牛奶');
};
Coffee.prototype.init = function () {
  this.boilWater();
  this.brewCoffeeGriends();
  this.pourInCup();
  this.addSugarAndMilk();
}
var coffee = new Coffee();
coffee.init();

  // 泡茶
  var Tea = function () {};
  Tea.prototype.boilWater = function () {
    console.log('把水煮沸');
  };
  Tea.prototype.steepTeaBag = function () {
    console.log('用沸水浸泡茶叶');
  };
  Tea.prototype.pourInCup = function () {
    console.log('把茶水倒进杯子');
  };
  Tea.prototype.addLemon = function () {
    console.log('加柠檬');
  };
  Tea.prototype.init = function () {
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
  }
  var tea = new Tea();
  tea.init();
```
创建抽象父类
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

var Coffee = function() {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function() {
  console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶');
};
var coffee = new Coffee();
coffee.init();

var Tea = function() {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function() {
  console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function() {
  console.log('把茶倒进杯子');
};
Tea.prototype.addCondiments = function() {
  console.log('加柠檬');
};
var tea = new Tea();
tea.init();
```
JS 使用高阶函数
```js
var Beverage = function (param) {
  var boilWater = function () {
    console.log('把水煮沸');
  };
  var brew = param.brew || function () {
    throw new Error('必须传递brew方法');
  };
  var pourInCoup = param.pourInCoup || function () {
    throw new Error('必须传递pourInCoup方法');
  };
  var addCondiments = param.addCondiments || function () {
    throw new Error('必须传递addCondiments方法');
  };
  var F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCoup();
    addCondiments();
  };
  return F;
}
var Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡');
  },
  pourInCup: function () {
    console.log('把咖啡倒进杯子');
  },
  addCondiments: function () {
    console.log('加糖和牛奶');
  }
});

var Tea = Beverage({
  brew: function () {
    console.log('用沸水浸泡茶叶');
  },
  pourInCup: function () {
    console.log('把茶倒进杯子');
  },
  addCondiments: function () {
    console.log('加柠檬');
  }
});
var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
```

## 第12章 享元模式
享元模式是一种用于性能优化的模式。核心是运用共享技术来有效支持大量细粒度的对象。

```js
// 初始享元模式
    var Model = function (sex) {
        this.sex = sex;
    };
    Model.prototype.takePhoto = function () {
        console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
    };
    var maleModel = new Model('male'),
        femaleModel = new Model('femaleModel');
    for (var i = 1; i <= 50; i++) {
        maleModel.underwear = 'underwear' + i;
        maleModel.takePhoto();
    }
    for (var i = 1; i <= 50; i++) {
        femaleModel.underwear = 'underwear' + i;
        femaleModel.takePhoto();
    }
```
享元模式要求将对象的属性划分为`内部状态`与`外部状态`。  
内部状态：可以被对象共享的属性
外部状态：取决于外部场景并根据场景而变化
享元模式的目标是尽量减少共享对象的数量。  

如何划分内部状态和外部状态：  
- 内部状态存储于对象内部。  
- 内部状态可以被一些对象共享。  
- 内部状态独立于具体的场景，通常不会改变。  
- 内部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

```js
// 文件上传
    var Upload = function (uploadType) {
        this.uploadType = uploadType;
    };
    Upload.prototype.delFile = function (id) {
        uploadManager.setExternalState(id, this);
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom)
        }
        ;
        if (window.confirm('确认要删除该文件吗？' + this.fileName)) {
            return this.dom.parentNode.removeChild(this.dom);
        }
    }

    var UploadFactory = (function () {
        var createdFlyWeightObjs = {};
        return {
            create: function (uploadType) {
                if (createdFlyWeightObjs[uploadType]) {
                    return createdFlyWeightObjs[uploadType]
                }
                return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
            }
        }
    })();
    var uploadManager = (function () {
        var uploadDatabase = {};
        return {
            add: function (id, uploadType, fileName, fileSize) {
                var flyWeightObj = UploadFactory.create(uploadType);
                var dom = document.createElement('div');
                dom.innerHTML = '<span>文件名称：' + fileName + ',文件大小：' + fileSize + '</span>' +
                    '<button class="delFile">删除</button>';
                dom.querySelector('.delFile').onclick = function () {
                    flyWeightObj.delFile(id);
                }
                document.body.appendChild(dom);
                uploadDatabase[id] = {
                    fileName: fileName,
                    fileSize: fileSize,
                    dom: dom
                };
                return flyWeightObj;
            },
            setExternalState: function (id, flyWeightObj) {
                var uploadData = uploadDatabase[id];
                for (var i in uploadData) {
                    flyWeightObj[i] = uploadData[i];
                }
            }
        }
    })()
    var id = 0;
    window.startUpload = function (uploadType, files) {
        for (var i = 0, file; file = files[i++];) {
            var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
        }
    }
    startUpload('plugin', [
        {
            fileName: '1.txt',
            fileSize: 1000
        },
        {
            fileName: '2.html',
            fileSize: 3000
        },
        {
            fileName: '3.txt',
            fileSize: 5000
        }
    ])
    startUpload('flash', [
        {
            fileName: '4.txt',
            fileSize: 1000
        },
        {
            fileName: '5.html',
            fileSize: 3000
        },
        {
            fileName: '6.txt',
            fileSize: 5000
        }
    ])
```

享元模式的适用性:
- 一个程序中使用了大量的相似对象。  
- 由于使用了大量对象，造成很大的内存开销。  
- 对象的大多数状态都可以变为外部状态。  
- 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。 

通用对象池实现
```js
    var objectPoolFactory = function (createObjFn) {
        var objectPool = [];
        return {
            create:function () {
                var obj = objectPool.length === 0?
                    createObjFn.apply(this,arguments) : objectPool.shift();
                return obj;
            },
            recover:function (obj) {
                objectPool.push(obj);
            }
        }
    }
    var iframeFactory = objectPoolFactory(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.onload = function () {
            iframe.onload = null;
            iframeFactory.recover(iframe);
        }
        return iframe;
    })
    var iframe1 = iframeFactory.create();
    iframe1.src = 'https://www.baidu.com/';

    var iframe2 = iframeFactory.create();
    iframe1.src = 'https://QQ.com';

    setTimeout(function () {
        var iframe2 = iframeFactory.create();
        iframe1.src = 'http://163.com';
    },3000)
```

## 第13章 职责链模式
使多个对象都有机会处理请求，从而避免请求的发送者和接接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。  
优点： 请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。

实际开发的职责链模式
```js
    var order500 = function (orderType, pay, stock) {
        if (orderType === 1 && pay === true) {
            console.log('500元定金预购，得到100优惠券');
        } else {
            order200(orderType, pay, stock);
        }
    };
    var order200 = function (orderType, pay, stock) {
        if (orderType === 2 && pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            orderNomarl(orderType, pay, stock);
        }
    };
    var orderNomarl = function (orderType, pay, stock) {
        if (stock > 0) {
            console.log('普通购买，无优惠券');
        } else {
            console.log('手机库存不足');
        }
    };
    order500(1, true, 500);
    order500(1, false, 500);
    order500(2, true, 500);
    order500(3, false, 500);
    order500(3, false, 0);
```
缺点：违反开放-封闭原则，可能要增加300元预定或者去掉200元预定，就必须改动业务函数内部。

灵活可拆分的职责链节点
```js
    var order500 = function (orderType, pay, stock) {
        if (orderType === 1 && pay === true) {
            console.log('500元定金预购，得到100优惠券');
        } else {
            return 'nextSuccessor';
        }
    };
    var order200 = function (orderType, pay, stock) {
        if (orderType === 2 && pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            return 'nextSuccessor';
        }
    };
    var orderNomarl = function (orderType, pay, stock) {
        if (stock > 0) {
            console.log('普通购买，无优惠券');
        } else {
            console.log('手机库存不足');
        }
    };

    var Chain = function (fn) {
        this.fn = fn;
        this.successor = null;
    };
    Chain.prototype.setNextSuccessor = function (successor) {
        return this.successor = successor;
    };
    Chain.prototype.passRequest = function () {
        var ret = this.fn.apply(this,arguments);
        if (ret === 'nextSuccessor'){
            return this.successor && this.successor.passRequest.apply(this.successor,arguments);
        }
        return ret;
    };
    var chainOrder500 = new Chain(order500);
    var chainOrder200 = new Chain(order200);
    var chainOrderNormal = new Chain(orderNomarl);

    chainOrder500.setNextSuccessor(chainOrder200);
    chainOrder200.setNextSuccessor(chainOrderNormal);

    chainOrder500.passRequest(1,true,500);
    chainOrder500.passRequest(2,true,500);
    chainOrder500.passRequest(3,true,500);
    chainOrder500.passRequest(1,false,0);

    // var order300 = function () {};
    // chainOrder300 = new Chain(order300);
    // chainOrder500.setNextSuccessor(chainOrder300);
    // chainOrder300.setNextSuccessor(chainOrder200);
```

异步的职责链
```js
   Chain.prototype.next = function () {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    var fn1 = new Chain(function () {
        console.log(1);
        return 'nextSuccessor';
    });
    var fn2 = new Chain(function () {
        console.log(2);
        var self = this;
        setTimeout(function () {
            self.next();
        },1000);
    })
    var fn3 = new Chain(function () {
        console.log(3);
    })
    fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
    fn1.passRequest();
```
用AOP实现职责链
```js
    Function.prototype.after = function (fn) {
        var self = this;
        return function () {
            var ret = self.apply(this.arguments);
            if (ret === 'nextSuccessor'){
                return fn.apply(this,arguments);
            }
            return ret;
        }
    }

    var order = order500yuan.after(order200yuan).after(orderNomarl);
    order(1,true,500);
    order(2,true,500);
    order(3,false,500);
```
## 第14章 中介者模式
中介者模式的作用就是解除对象与对象之间的紧耦合关系。

泡泡堂
```js
    function Players (name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = 'alive';
    }

    Players.prototype.win = function () {
        console.log(this.name + 'won');
    };
    Players.prototype.lose = function () {
        console.log(this.name + 'lose');
    };

    Players.prototype.die = function () {
        this.state = 'dead';
        playerDirector.ReceiveMessage('playerDead', this);
    };
    Players.prototype.remove = function () {
        playerDirector.ReceiveMessage('removePlayer', this);
    };
    Players.prototype.changeTeam = function (color) {
        playerDirector.ReceiveMessage('changeTeam', this, color);
    };

    var playerFactory = function (name, teamColor) {
        var newPlayer = new Players(name, teamColor);
        playerDirector.ReceiveMessage('addPlayer', newPlayer);
        return newPlayer;
    }

    var playerDirector = (function () {
        var players = {},
            operations = {};

        operations.addPlayer = function (player) {
            var teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || [];
            players[teamColor].push(player);
        };

        operations.removePlayer = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor] || [];
            for (var i = teamPlayers.length - 1; i >= 0; i--) {
                if (teamPlayers[i] === player) {
                    teamPlayers.splice(i, 1);
                }
            }
        };

        operations.changeTeam = function(player,newTeamColor){
            operations.removePlayer(player);
            player.teamColor = newTeamColor;
            operations.addPlayer(player);
        };

        operations.playerDead = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor];
            var all_dead = true;
            for (var i = 0, player; player = teamPlayers[i++];) {
                if (player.state !== 'dead') {
                    all_dead = false;
                    break;
                }
            }
            if (all_dead === true) {
                for (var i = 0, player; player = teamPlayers[i++];) {
                    player.lose();
                }
                for (var color in players) {
                    if (color !== teamColor) {
                        var teamPlayers = players[color];
                        for (var i = 0, player; player = teamPlayers[i++];) {
                            player.win()
                        }
                    }
                }
            }
        };

        var ReceiveMessage = function () {
            var message = Array.prototype.shift.call(arguments);
            operations[message].apply(this, arguments);
        };
        return {
            ReceiveMessage: ReceiveMessage
        }
    })();

    var player1 = playerFactory('皮蛋', 'red'),
        player2 = playerFactory('小乖', 'red'),
        player3 = playerFactory('宝宝', 'red'),
        player4 = playerFactory('小强', 'red');

    var player5 = playerFactory('黑妞', 'blue'),
        player6 = playerFactory('葱头', 'blue'),
        player7 = playerFactory('胖墩', 'blue'),
        player8 = playerFactory('海盗', 'blue');

    player1.die();
    player2.die();
    player3.die();
    player4.die();


    // player1.remove();
    // player2.remove();
    // player3.die();
    // player4.die();

    // player1.changeTeam('blue');
    // player2.die();
    // player3.die();
    // player4.die();
```

购买商品
```
选择颜色： <select name="" id="colorSelect">
    <option value="">请选择</option>
    <option value="red">红色</option>
    <option value="blue">蓝色</option>
</select>

选择内存： <select name="" id="memorySelect">
    <option value="">请选择</option>
    <option value="32G">32G</option>
    <option value="16G">16G</option>
</select>

输入购买数量： <input type="text" id="numberInput"><br>
您选择了颜色：<div id="colorInfo"></div>
您选择了内存：<div id="memoryInfo"></div>
您选择了数量：<div id="numberInfo"></div>

<button id="nextBtn" disabled="true">请选择手机颜色和购买数量</button>
<script type="text/javascript">
    var goods = {
        'red|32G': 3,
        'red|16G': 0,
        'blue|32G': 1,
        'blue|16G': 6,
    };
    var mediator = (function () {
        var colorSelect = document.getElementById('colorSelect'),
            numberInput = document.getElementById('numberInput'),
            memorySelect = document.getElementById('memorySelect'),
            colorInfo = document.getElementById('colorInfo'),
            numberInfo = document.getElementById('numberInfo'),
            memoryInfo = document.getElementById('memoryInfo'),
            nextBtn = document.getElementById('nextBtn');

        return{
            changed:function (obj) {
                var color = colorSelect.value,
                    memory = memorySelect.value,
                    number = numberInput.value,
                    stock = goods[color + '|'+memory];

                if (obj === colorSelect){
                    colorInfo.innerHTML = color;
                } else if (obj === memorySelect){
                    memoryInfo.innerHTML = memory
                } else if (obj === numberInput){
                    numberInfo.innerHTML = number
                }

                if (!color){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = '请选择手机颜色';
                    return;
                }

                if (!memory){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = '请选择内存代销';
                    return;
                }

                if (!Number.isInteger(number - 0) && number <0){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = '请输入正确的购买数量';
                    return;
                }

                nextBtn.disabled = false;
                nextBtn.innerHTML = '放入购物车';
            }
        }
    })();

    colorSelect.onchange = function () {
        mediator.changed(this)
    };
    memorySelect.onchange = function () {
        mediator.changed(this)
    };
    numberInput.onchange = function () {
        mediator.changed(this)
    };

</script>
```
## 第15章 装饰者模式
装饰者模式：给对象动态地增加职责的方式

模拟传统面向对象的装饰者模式
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
    plane.fire(); // 分别输出：发射普通子弹，发射导弹，发射原子弹
```
JS装饰者
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

AOP装饰函数
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

代理模式和装饰者模式区别在于意图和设计目的
代理模式目的：当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者
装饰者模式的作用就是为对象动态加入行为

## 第16章 状态模式
把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部

优点：  
1. 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里  
2. 避免Context无线膨胀，状态切换的逻辑被分布在状态类中，也去掉了Context中原本过多的条件分支
3. 用对象代替字符串来记录当前状态，是的状态的切换更加一目了然。
4. Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

缺点： 会在系统中定义许多状态类。很难看出整个状态机的逻辑

状态模式和策略模式的区别相同点：都有一个上下文，一些策略或者状态，上下文把请求委托给这些类来执行
不同点：策略模式的各个策略类之间是平等又平行的，没有任何联系。而在状态模式中，状态和状态对应的行为是早已封装好的。

JS中的状态机
```js
    var Light = function () {
        this.currState = FSM.off;
        this.button = null;
    };
    Light.prototype.init = function () {
        var button = document.createElement('button'),
            self = this;
        button.innerHTML = '已关灯';
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            self.currState.buttonWasPressed.call(self);
        }
    };
    var FSM = {
        off: {
            buttonWasPressed: function () {
                console.log('关灯');
                this.button.innerHTML = '下一次按我是开灯';
                this.currState = FSM.on;
            }
        },
        on: {
            buttonWasPressed: function () {
                console.log('开灯');
                this.button.innerHTML = '下一次按我是关灯';
                this.currState = FSM.off;
            }
        }
    };
    var light = new Light();
    light.init();
```
```js
    var delegate = function (client,delegation) {
        return{
            buttonWasPressed:function () {
                return delegation.buttonWasPressed.apply(client,arguments);
            }
        }
    };
    var FSM = {
        off: {
            buttonWasPressed: function () {
                console.log('关灯');
                this.button.innerHTML = '下一次按我是开灯';
                this.currState = this.onState;
            }
        },
        on: {
            buttonWasPressed: function () {
                console.log('开灯');
                this.button.innerHTML = '下一次按我是关灯';
                this.currState = this.offState;
            }
        }
    };

    var Light = function () {
        this.offState = delegate(this,FSM.off);
        this.onState = delegate(this,FSM.on);
        this.currState = this.offState;
        this.button = null;
    };
    Light.prototype.init = function () {
        var button = document.createElement('button'),
            self = this;
        button.innerHTML = '已关灯';
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            self.currState.buttonWasPressed();
        }
    };
    var light = new Light();
    light.init();
```






