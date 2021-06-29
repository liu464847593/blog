## Vue中的scoped原理及穿透方法
在标签加上v-data-something属性，再在选择器时加上对应[v-data-xxxx]，即CSS带属性选择器，以此完成类似作用域的选择方式。
防止全局同名CSS污染  
`/deep/` 用来穿透，选择器后面不会带[v-data-xxxx]

## vue 双向绑定原理
vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅
者，触发相应的监听回调。

## vue 生命周期
- `beforeCreate`  
  是获取不到 `props` 或者 `data` 中的数据的
- `created`  
    Vue 实例观察的数据对象data已经配置好，已经可以得到data的值，但Vue 实例使用的根 DOM 元素el还未初始化
- `beforeMount`  
    data和el均已经初始化，但此时el并没有渲染进数据，el的值为“虚拟”的元素节点
- `mounted`  
    此时el已经渲染完成并挂载到实例上
- `beforeUpdate`
    beforeUpdate函数在数据更新后虽然没立即更新数据，但是DOM中的数据会改变，这是Vue双向数据绑定的作用
- `updated`
    el中的数据都已经渲染完成，但只有updated钩子被调用时候，组件dom才被更新。
- `beforeDestroy`
    清除vue实例与DOM的关联
- `destroyed`

## vue父子组件生命周期执行顺序
加载渲染过程
```
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
```
更新过程
```
父beforeUpdate->子beforeUpdate->子updated->父updated
```
销毁过程
```
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```

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

## vue的nextTick实现原理以及应用场景
- vue用异步队列的方式来控制DOM更新和nextTick回调先后执行
- microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
- 因为兼容性问题，vue不得不做了microtask向macrotask的降级方案

场景：下一次 dom 更新数据后调用回调函数

## 列表组件key的作用
key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的  
index作为key，和不带key的效果是一样的。index作为key时，每个列表项的index在变更前后也是一样的，都是直接判断为sameVnode然后复用

## Vue 中的 computed 是如何实现的
computed本身是通过代理的方式代理到组件实例上的，所以读取计算属性的时候，执行的是一个内部的getter，而不是用户定义的方法。

computed内部实现了一个惰性的watcher，在实例化的时候不会去求值，其内部通过dirty属性标记计算属性是否需要重新求值。当computed依赖的任一状态
（不一定是return中的）发生变化，都会通知这个惰性watcher，让它把dirty属性设置为true。所以，当再次读取这个计算属性的时候，就会重新去求值。

##  Vue3.0要使用Proxy的原因
- `Proxy` 无需一层层递归为每个属性添加代理性能上更好
- 原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变

缺点：浏览器的兼容性不好

## 手写一个数据绑定
```
<input id="input" type="text" />
<div id="text"></div>

let input = document.getElementById("input");
let text = document.getElementById("text");
let data = { value: "" };
Object.defineProperty(data, "value", {
  set: function(val) {
    text.innerHTML = val;
    input.value = val;
  },
  get: function() {
    return input.value;
  }
});
input.onkeyup = function(e) {
  data.value = e.target.value;
};
```

## Vue的整个实现原理

## axios 底层原理
## keep-alive 原理
