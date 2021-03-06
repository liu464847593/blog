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

## vue的nextTick实现原理以及应用场景
- 将回调添加到任务队列中延迟执行
- 提供在特殊场合下可以强制使用宏任务方法
- 为了兼容Promise,会把微任务降级成宏任务

场景：下一次 dom 更新数据后调用回调函数

## 列表组件key的作用
key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的  
index作为key，和不带key的效果是一样的。index作为key时，每个列表项的index在变更前后也是一样的，都是直接判断为sameVnode然后复用

## Vue的整个实现原理

## axios 底层原理
## keep-alive 原理
