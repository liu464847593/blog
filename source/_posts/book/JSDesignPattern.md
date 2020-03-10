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




