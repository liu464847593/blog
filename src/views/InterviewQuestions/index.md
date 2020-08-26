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

