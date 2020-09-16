## JS

### ['1', '2', '3'].map(parseInt) what & why ?
```js
/**
 * @param string 必需。要被解析的字符串。
 * @param radix 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
 * 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
 * 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
 */
parseInt(string, radix)
```
```js
['10','10','10','10','10'].map(parseInt);
// [10, NaN, 2, 3, 4]

// 实际上执行的代码
['1', '2', '3'].map((item, index) => {
	return parseInt(item, index)
})

parseInt('1', 0) // 1 默认是10为基数 1 = 0*10 + 1
parseInt('2', 1) // NaN  
parseInt('3', 2) // NaN, 3 不是二进制

// 所以
['1', '2', '3'].map(parseInt)
// 1, NaN, NaN
```
### 防抖和节流
防抖

触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
```js
function debounce(fn) {
      let timeout = null; // 创建一个标记用来存放定时器的返回值
      return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
          fn.apply(this, arguments);
        }, 500);
      };
    }
    function sayHi() {
      console.log('防抖成功');
    }

    var inp = document.getElementById('inp');
    inp.addEventListener('input', debounce(sayHi)); // 防抖
```
节流

高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
```js
function throttle(fn) {
      let canRun = true; // 通过闭包保存一个标记
      return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
      };
    }
    function sayHi(e) {
      console.log(e.target.innerWidth, e.target.innerHeight);
    }
    window.addEventListener('resize', throttle(sayHi));
```
## 下面的代码打印什么内容，为什么？
```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
```js
var b = 10;
(function b() {
   // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
   // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
    b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 10，不是20
})();
```


```js
var a = 10;
(function () {
    console.log(a); // undefined
    a = 5; // 局部a = 10
    console.log(window.a); // 10
    var a = 20; // 变量提升
    console.log(a); // 20
})()
```
```js
var a = {n: 1};
var b = a; // a,b 指向同一个地址
a.x = a = {n: 2}; // .优先级大于 = 所以先执行a.x, a = b = {n:1;x:undefined},再执行a = {n:2},再a.x = {n: 2},a指向旧对象 
                  // a = b = {n:1;x:{n: 2}}

console.log(a.x) // undefined a = {n:2}
console.log(b.x) // {n:2}  b = {n:1;x:undefined;x:{n: 2}}

```
```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c'; // c键名会转字符串'123'会覆盖掉b
console.log(a[b]); // c

// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';   // b,c是Symbol不相等
console.log(a[b]); // b

// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b'; // 对象类型会调用 toString 方法转换成字符串 [object Object]。
a[c]='c'; // 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
console.log(a[b]); c
```
```js
 function Foo () {
    Foo.a = function () {
      console.log(1)
    }
    this.a = function () {
      console.log(2)
    }
  }

  Foo.prototype.a = function () {
    console.log(3)
  }
  Foo.a = function () {
    console.log(4)
  }
  Foo.a();
  let obj = new Foo();
  obj.a();
  Foo.a();
```

```js
 function Foo () {
    Foo.a = function () {
      console.log(1)
    }
    this.a = function () {
      console.log(2)
    }
  }
  // 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行
  Foo.prototype.a = function () {
    console.log(3)
  }
  Foo.a = function () {
    console.log(4)
  }
  Foo.a(); //4  Foo 还没有实例化 Foo.a 优先级比Foo.prototype.a 高
  let obj = new Foo();  // 实例化Foo 重写了 Foo.a,新对象挂载了a
  obj.a(); // 2
  Foo.a(); // 1
```
```js
  var name = 'Tom';
  (function() {
    if (typeof name == 'undefined') {
      var name = 'Jack';
      console.log('Goodbye ' + name);
    } else {
      console.log('Hello ' + name);
    }
  })();
```
```js
  var name = 'Tom';
  (function() {
     var name;
    if (typeof name == 'undefined') {
      name = 'Jack';
      console.log('Goodbye ' + name);
    } else {
      console.log('Hello ' + name);
    }
  })(); // Goodbye Jack
```

```js
1 + "1" // '11'

2 * "2" // 4

[1, 2] + [2, 1] // 1,22,1 Javascript中所有对象基本都是先调用valueOf方法，如果不是数值，再调用toString方法。

"a" + + "b" //aNaN  是先+"b", 所以是NaN => "a" + NaN => "aNaN"
```

```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait(); // x,y,z 同时异步进行 包括setTimeout（10*1000）的执行时间
  await x;
  await y;
  await z;
  console.timeEnd();//default: 10001.52880859375ms
}
main();
```
```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd(); // 大概30s左右
}
main(); 
```

## var、let 和 const 区别的实现原理是什么
- var的话会直接在栈内存里预分配内存空间，然后等到实际语句执行的时候，再存储对应的变量，如果传的是引用类型，那么会在堆内
存里开辟一个内存空间存储实际内容，栈内存会存储一个指向堆内存的指针
- let的话，是不会在栈内存里预分配内存空间，而且在栈内存分配变量时，做一个检查，如果已经有相同变量名存在就会报错
- const的话，也不会预分配内存空间，在栈内存分配变量时也会做同样的检查。不过const存储的变量是不可修改的，对于基本类型来说
你无法修改定义的值，对于引用类型来说你无法修改栈内存里分配的指针，但是你可以修改指针指向的对象里面的属性

## 什么是MVVM，比MVC有什么区别
不管是 `React` 还是 `Vue`，它们都不是 `MVVM` 框架，只是有借鉴 `MVVM` 的思路

- `View`：用户看到的视图
- `Model`：本地数据和数据库中的数据

传统的 `MVC` 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。
![](../../../src/asstes/img/InterviewQuestions/mvc.jpeg)
但是 `MVC` 有一个巨大的缺陷就是控制器承担的责任太大了，随着项目愈加复杂，控制器中的代码会越来越臃肿，导致出现不利于维护的情况。

在 `MVVM` 架构中，引入了 `ViewModel` 的概念。`ViewModel` 只关心数据和业务的处理，不关心 `View` 如何处理数据，在这种情况下，`View` 和 `Model` 都
可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 `ViewModel` 中，让多个 `View` 复用这个 `ViewModel`。
![](../../../src/asstes/img/InterviewQuestions/mvvm.jpeg)   
以 `Vue` 框架来举例，`ViewModel` 就是组件的实例。`View` 就是模板，`Model` 的话在引入 `Vuex` 的情况下是完全可以和组件分离的。

`Vue`是通过`object.defineProperty`来实现`MVVM`

## 什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？
js 描述的dom对象
```js
const ul = {
  tag: 'ul',
  props: {
    class: 'list'
  },
  children: {
    tag: 'li',
    children: '1'
  }
}
```
如果无脑替换所有的 `DOM` 这种场景来说，`Virtual DOM`的局部更新肯定要来的快。但是如果你可以人肉也同样去局部替换 `DOM`，那么 `Virtual DOM` 必然
没有你直接操作 `DOM` 来的快，毕竟还有一层 `diff` 算法的损耗。

## 路由原理
本质就是监听 `URL` 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式

- `Hash` 模式   
当 `#` 后面的哈希值发生变化时，可以通过 `hashchange` 事件来监听到 URL 的变化
- `History` 模式    
`history.pushState` 和 `history.replaceState` 改变 `URL`。

## vue 生命周期
- `beforeCreate`
  是获取不到 `props` 或者 `data` 中的数据的
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`

## 组件通信
父组件到子组件 `props`，子组件到父组件`emit`   
`$parent`，`$children`对象来访问组件实例中的方法和数据   
`$listeners` 属性会将父组件中的 (不含 `.native` 修饰器的) `v-on` 事件监听器传递给子组件，子组件可以通过访问 `$listeners` 来自定义监听器。  
`.sync` 属性是个语法糖，可以很简单的实现子组件与父组件通信  
`this.$parent.$children` 进行兄弟组件通信   
`provide / inject`    跨多层次组件通信
`Vuex` 或者 `Event Bus`  进行任意组件通信

`$attrs：`包含了父作用域中不作为 `prop` 被识别 (且获取) 的 `attribute` 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 `prop` 时，这里会
包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

`$listeners：`包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的
组件时非常有用。

## computed和watch区别
`computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。    
`watch` 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作

## 输入 URL 到页面渲染的整个流程
- `DNS解析`
- `TCP握手`
- `TLS握手`
- `正式传输数据`
- `浏览器解析文件`
- `开始渲染`

