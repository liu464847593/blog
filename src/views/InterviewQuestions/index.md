## 什么是MVVM，比MVC有什么区别
不管是 React 还是 Vue，它们都不是 MVVM 框架，只是有借鉴 MVVM 的思路

- View：用户看到的视图
- Model：本地数据和数据库中的数据

传统的 MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。
![](../../../src/asstes/img/InterviewQuestions/mvc.jpeg)
但是 MVC 有一个巨大的缺陷就是控制器承担的责任太大了，随着项目愈加复杂，控制器中的代码会越来越臃肿，导致出现不利于维护的情况。

在 MVVM 架构中，引入了 ViewModel 的概念。ViewModel 只关心数据和业务的处理，不关心 View 如何处理数据，在这种情况下，View 和 Model 都
可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel。
![](../../../src/asstes/img/InterviewQuestions/mvvm.jpeg)
以 Vue 框架来举例，ViewModel 就是组件的实例。View 就是模板，Model 的话在引入 Vuex 的情况下是完全可以和组件分离的。

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
如果无脑替换所有的 DOM 这种场景来说，Virtual DOM 的局部更新肯定要来的快。但是如果你可以人肉也同样去局部替换 DOM，那么 Virtual DOM 必然
没有你直接操作 DOM 来的快，毕竟还有一层 diff 算法的损耗。

## 路由原理
本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式

- Hash 模式
当 # 后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化
- History 模式
history.pushState 和 history.replaceState 改变 URL。

## vue 生命周期
- beforeCreate
  是获取不到 props 或者 data 中的数据的
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed