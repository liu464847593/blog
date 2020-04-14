## 什么是vue
`Vue`是一套用于构建用户界面的渐进式框架。  

如果你已经有一个现成的服务端应用，也就是非单页面应用，可以将Vue.js作为该应用的一部分嵌入其中，带来更加丰富的交互体验  

`渐进式框架`就是把框架分层  
分层就是说可以只用最核心的视图层渲染功能来快速开发一些需求，也可以使用一整套全家桶来开发大型应用  

最核心的部分是视图层渲染，往外是组件机制，再加上路由机制，再加入状态管理，最外层是构建工具
![](../../../src/asstes/img/js/vue.jpg)

## 变化侦测
变化侦测是响应式系统的核心，作用是侦测数据的变化。当数据变化时，会通知视图进行相应的更新

一个状态所绑定的依赖不再是具体的DOM节点，而是一个组件。状态变化后，会通知到组件，组件内部再使用虚拟DOM进行对比，重新渲染

利用`object.defineProperty` 侦测变化
```js
function defineReactive(data,key,val) {
  object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (val === newVal){
        return
      }
      val = newVal
    }
  })
}
```
### 如何收集依赖
在`getter`中收集依赖，在`setter`中触发依赖
```js
function defineReactive(data,key,val) {
  let dep = []; // 存储被收集的依赖，依赖是个函数
  object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    get: function () {
      dep.push(window.target)
      return val
    },
    set: function (newVal) {
      if (val === newVal){
        return
      }
      for (let i = 0;i<dep.length;i++){
        dep[i](newVal,val) // 循环触发依赖
      }
      val = newVal
    }
  })
}
```
封装Dep类解耦
```js
export default class Dep{
  constructor(){
    this.subs = []
  }

  addSub(sub){
    this.subs.push(sub)
  }

  removeSub(sub){
    remove(this.subs,sub)
  }

  depend(){
    if (window.target){
      this.addSub(window.target)
    }
  }

  notify(){
    const subs = this.subs.slice()
    for (let i = 0,l=subs.length;i<l;i++){
      subs[i].update()
    }
  }
}

function remove(arr,item) {
  if (arr.length){
    const index = arr.indexof(item)
    if (index > -1){
      return arr.splice(index,1)
    }
  }
}

function defineReactive(data,key,val) {
  let dep = new Dep(); // 存储被收集的依赖
  object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend()
      return val
    },
    set: function (newVal) {
      if (val === newVal){
        return
      }
      val = newVal
      dep.notify()
    }
  })
}
```

### watcher
---
我们收集的依赖是`window.target`其实就是`Watcher`

原理：先把自己设置到全局唯一的指定位置，然后读取数据，触发这个数据的`getter`，接着`getter`读取当前正在读取数据的`Watcher`，并把这个`Watcher`收集到
Dep中

`Watcher`是一个中介的角色，数据发送变化时通知它，然后它再通知其它地方
```js
// keypath  当data.a.b.c 属性发生变化时，触发第二个参数中的函数
vm.$watch('a.b.c', function (newVal, oldVal) {
  // 做点什么
})
```
如何实现
```js
export default class Watcher{
  constructor (vm,expOrFn,cb){
    this.vm = vm
    // 执行this.getter(),就可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }
  get(){
    window.target = this
    let value = this.getter.call(this.vm,this.vm)
    window.target = undefined
    return value
  }

  updata(){
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm,this.value,oldValue)
  }
}
```

```js
const bailRe = /[^\w.$]/;

export function parsePath(path) {
  if (bailRe.test(path)) {
    return
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
```

### 递归侦测所有key
```js
/**
 * Observer类会附加到每一个被侦测的object上
 * 一旦被附加上，Observer会将object的所有属性转换为getter/setter形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
 */
export class Observer{
  constructor(value){
    this.value = value
    if (!Array.isArray(value)){
      this.walk(value)
    } 
  }

  /**
   * walk 会将每一个属性都转换为getter/setter形式来侦测变化
   * 这个方法只有在数据类型为object时被调用
   */
  walk(obj){
    const keys = Object.keys(obj)
    for(let i=0;i<keys.length;i++){
      defineReactive(obj,keys[i],obj[keys[i]])
    }
  }
}

function defineReactive(data,key,val) {
  if (typeof val === 'object'){
    new Observer(val)
  }
  let dep = new Dep(); // 存储被收集的依赖
  object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend()
      return val
    },
    set: function (newVal) {
      if (val === newVal){
        return
      }
      val = newVal
      dep.notify()
    }
  })
}
```

### 关于object的问题
`getter`/`setter`只能追踪一个数据是否修改，无法追踪新增属性和删除属性  
为obj新增属性，删除属性，vue无法检测到变化，所有不会向依赖发送通知 要用到 `vm.$set`，`vm.$delete`
