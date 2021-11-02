---
sidebar: auto
---

## 什么是vue
`Vue`是一套用于构建用户界面的渐进式框架。  

如果你已经有一个现成的服务端应用，也就是非单页面应用，可以将Vue.js作为该应用的一部分嵌入其中，带来更加丰富的交互体验  

`渐进式框架`就是把框架分层  
分层就是说可以只用最核心的视图层渲染功能来快速开发一些需求，也可以使用一整套全家桶来开发大型应用  

最核心的部分是视图层渲染，往外是组件机制，再加上路由机制，再加入状态管理，最外层是构建工具
![](/asstes/img/js/vue.jpg)

## 变化侦测


`变化侦测`是响应式系统的核心，作用是侦测数据的变化。当数据变化时，会通知视图进行相应的更新

### 渲染

`Vue.js` 通过状态生成DOM，并将其输出到页面上显示，这个过程叫做`渲染`

`变化侦测`是响应式系统的核心，作用是侦测数据的变化。当数据变化时，会通知视图进行相应的更新

一个状态所绑定的依赖不再是具体的DOM节点，而是一个组件。状态变化后，会通知到组件，组件内部再使用虚拟DOM进行对比，重新渲染

### 怎么检测变化侦测

- `Object.defineProperty`
- ES6的`Proxy`

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

### 通过Dep收集依赖
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

### Watcher的原理

我们收集的依赖是`window.target`其实就是`Watcher`

只有`Watcher`触发的`getter`才会收集依赖

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

  update(){
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm,this.value,oldValue)
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

### 无法追踪新增和删除属性
`getter`/`setter`只能追踪一个数据是否修改，无法追踪新增属性和删除属性  
为obj新增属性，删除属性，vue无法检测到变化，所有不会向依赖发送通知 要用到 `vm.$set`，`vm.$delete`

### 总结
- `defineReactive`定义响应式数据，只检测某一个属性
- `dep`收集依赖
- `Watcher`就是依赖。数据发生变化就通知它，它再通知其他地方
- `Observer` 通过 `walk` 将`Object` 每一个属性转换成`getter/setter`形式

#### data,observer,dep,watcher关系  
![](/asstes/img/js/vue1.jpg)

- `Data`通过`Observer`转化成`getter`/`setter`形式来追踪变化
- 当外界通过`Watcher`读取数据时，会触发`getter`从而将`Watcher`添加到依赖中
- 当数据发生了变化时，会触发setter，从而向`Dep`中的依赖（ `Watcher` ）发送通知
- `Watcher`接收到通知后，会向外界发送通知，变化通知到外界可能会触发试图更新，也有可可能触发用户的某个回调函数

## Array 的变化侦测

因为可以通过`Array`原型的方法改变数组内容，所以`Object`的`getter/setter`的实现方式行不通

### 怎么检测变化侦测

用一个拦截器覆盖掉`Array.prototype`。每当使用Array原型上的方法操作数组时，其实执行的都是拦截器中提供的方法，这样我们就可以追踪Array的变化

#### 拦截器
```js
/**
 * 利用arrayMethods覆盖Array.prototype
 */
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      return original.apply(this, args)
    },
    enumerable: true,
    writable: true,
    configurable: true
  })
})


export class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods // 只会覆盖掉需要转换响应式的数据原型
    } else {
      this.walk(value)
    }
  }
}
```

如果没有`__proto__` 直接将arrayMethods身上的方法设置到被侦测的数组上
```js
/**
 * 判断浏览器是否支持__proto__
 * 支持则使用protoAugment函数覆盖原型
 * 不支持则使用copyAument函数将拦截器的方法直接挂载到value上
 */
import {arrayMethods}from './array'

const  hasProto = '__proto__' in {}; // 判断__proto__是否可用
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAument : copyAument
      augment(value,arrayMethods,arraykeys)
    } else {
      this.walk(value)
    }
  }
  ......
}

function protoAugment(target,src,keys) {
  target.__proto__ = src
}
function copyAument(target,src,keys) {
  for (let i =0;l=keys.length;i<l;i++){
    const key = keys[i]
    def(target,key,src[key])
  }
}
```

### 如何收集依赖

`Array` 在`getter`中收集依赖，在拦截器中触发依赖

```js
/**
 * 依赖列表存在Observer
 * Observer必须要在getter和拦截器中都访问到
 */
export class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new dep()
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAument : copyAument
      augment(value,arrayMethods,arraykeys)
    } else {
      this.walk(value)
    }
  }
  ......
}
```

```js
  function defineReactive(data,key,val) {
    let childOb = observe(val)
    let dep = new Dep(); // 存储被收集的依赖
    object.defineProperty(data,key,{
      enumerable: true,
      configurable: true,
      get: function () {
        dep.depend()
        if (childOb){
          childOb.dep.depend()
        } 
        return val
      },
      set: function (newVal) {
        if (val === newVal){
          return
        }
        dep.notify()
        val = newVal
      }
    })
  }
  /**
   * 尝试为value创建一个Observe实例，
   * 如果创建成功，直接返回新建的Observe实例
   * 如果value已经存在一个Observe实例，则直接返回它
   */
  export function observe(value,asRootData) {
    if(!isObject(value)){
      return
    }
    let ob
    if (hasOwn(value,'__ob__') && value.__ob__ instanceof Observe){
      ob = value.__ob__
    } else{
      ob = new Observe(value)
    }
    return ob
  }
```

### 拦截器中获取Observe
```js
function def(obj,key,val,enumerable) {
    Object.defineProperty(obj,key,{
      value:val,
      enumerable: !!enumerable,
      writable:true,
      configurable:true
    })
  }

/**
 * 通过__ob__拿到Observe实例
 * 通过__ob__判断是不是响应式数据，
 * 是就直接返回，不是就new Observer将数据转成响应式数据，
 */
export class Observe{
  constructor(value){
    this.val = value
    this.dep = new Dep()
    def(value,'__ob__',this) // 拿到Observe实例和标记是否被Observe转换成响应式数据
    if (Array.isArray(value)){
      const augment = hasProto
      ? protoAugment
      : copyAugment
      augment(value,arrayMethods,arraykeys)
    } else{
      this.walk(vaule)
    }
  }
  ......
}
```

### 向数组依赖发送通知
```js
  ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    const original = arrayProto[method];
    def(arrayMethods,method,function mutator(...args) {
      const result = original.apply(this,args)
      const ob = this.__ob__
      ob.dep.notify() // 向依赖发送消息
      return result
    })
  })
```

### 侦测数组中的元素变化
```js
/**
 * 把Object和Array都转成getter/setter形式
 */
export class Observe{
  constructor(value) {
   this.value = value
    def(value,'__ob__',this)
    if (Array.isArray(value)){
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  /**
   * 侦测Array中的每一项
   */
  observeArray(items){
    for (let i=0,l=items.length;i<l;i++){
      observe(items[i])
    } 
  }
  ......
}
```
### 侦测新增数组元素的变化
```js
/**
 * 把新增的数据暂存在inserted中，再把它转换成响应式数据
 */
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  const original = arrayProto[method];
  def(arrayMethods,method,function mutator(...args) {
    const result = original.apply(this,args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted) // 检测新增元素变化
    ob.dep.notify() // 向依赖发送消息
    return result
  })
})
```
### 总结
- Array是通过创建拦截器去覆盖数组原型来追踪变化
- Observer只针对需要侦测变化的数据使用`_prototype_`来覆盖原型，不支持`_prototype_`的直接挂载到数组上
- 在getter中收集依赖，依赖是保存在Observer上，通过`_ob_`可以访问
- `_ob_`作用：1. 标记数据是否被侦测变化 2.通过`_ob_`获取到Observer实例上
- 新增的数据也要变化侦测

## vm.$watch


### 原理
```js
/**
 * new Watcher 实现$watch
 * 有immediate会立即执行
 * 返回一个unwatchFn用来取消观察
 */
Vue.prototype.$watch = function (expOrFn,cb,options) {
  const vm = this
  options = options || {}
  const watcher = new Watcher(vm,expOrFn,cb,options)
  if (options.immediate){ // 有immediate参数立即执行
    cb.call(vm,watcher.value)
  }
  return function unwatchFn() {
    watcher.teardown() // 取消观察数据,把watcher实例从当前正在观察的人状态列表中移除
  }
}

export default class Watcher{
  constructor(vm,expOrFn,cb){
    this.vm = vm
    if(typeof expOrFn === 'function'){
      this.getter = expOrFn
    }else{
      this.getter = parsePath(expOrFn)
    }
    this.cb = cb
    this.value = this.get()
  }
  ......
}
```

#### unwatch 原理
```js
/**
 * 从所有依赖项的Dep列表中将自己移除
 */
teardown(){
  let i = this.deps.length
  while (i--){
    this.deps[i].removeSub(this)
  }
}
  
export default class Dep{
  ......
  removeSub(sub){
    const index = this.subs.indexOf(sub)
      if (index > -1){
        return this.subs.splice(index,1)
      }
  }
  ......
}
```

#### deep参数原理

有`deep`则在`window.target = undefined` 之前调用`traverse`来处理`deep`逻辑

`traverse（val）`递归`value`所有子值来触发收集依赖
- `val`如果不是`Array`和`Object`或者已经被冻结则直接返回
- 拿到`val`的`dep.id`,用`id`保证不会重复收集依赖
- 如果是数组，将数组的每一项递归调用`_traverse`
- 如果是`Object`，循环`Object`所有`key`,执行一次读取操作，再递归子值

## vm.$set

### 原理

- `Array`,通过 `splice` 方法添加新增元素。拦截器会侦测到 `target` 发生变化并自动把 `val` 转化成响应式，最后返回 `val`
- `key` 已经在 `target` 中，说明 `key` 已经被侦测变化，直接用 `key` 和 `val` 改数据 会自动向依赖发送通知
- 新增的 `key` ，如果 `target` 不是响应式（没有`_ob_`属性），直接通过`key`和`value`在`target`上设置，是响应式的使用`defineReactive`
将新增属性转化成 `getter`/`setter`形式
- 最后向`target`依赖发送变化通知并返`val`

```js
export function set(target,key,value) {
  if (Array.isArray(target) && isValidArrayIndex(key)){
    target.length = Math.max(target.length,key)
    target.splice(key,1,value)
    return value
  }

  // key已经存在target
  if (key in target && !(key in Object.prototype)){
    target[key] = val
    return val
  }
  
  
  const ob = target.__ob__
  if (target._isVue || (ob && ob.vmCount)){
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data' + 
      'at runtime - declare it upfront in the data option'
    )
    return val
  } 
  if (!ob){
    target[key] = val
    return  val
  } 
  defineReactive(ob.value,key,val)
  ob.dep.notify()
  return val
}
```

## vm.$delete

### 原理

- 如果是数组`splice`删除指定元素,拦截器自动向依赖发送通知  
- 如果是对象则`delete`删除对象属性，如果`target`是响应式数据就发送通知
- 如果`key`不是`target`属性直接退出即可
- 数据是响应式才发送通知（判断ob）

```js
export function del(target,key) {
  if (Array.isArray(target) && isValidArrayIndex(key)){ // 处理数组
    target.splice(key,1)
    return
  }
  const ob = target.__ob__
  if (target._isVue || (ob && ob.vmCount)){
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data' +
      '- just set it to null'
    )
    return
  }
  if (!hasOwn (target,key)){
    return
  }
  
  if (!ob){
    return;
  }
  delete target[key]
  ob.dep.notify()
}
```

## 虚拟DOM
是一个用于表示真实 DOM 结构和属性的 JavaScript 对象

`渲染`：将状态(应用中所有的变量都叫状态)作为输入，并生成DOM输出到页面上显示

### 虚拟DOM是怎么更新DOM的
通过状态生成一个虚拟节点树，然后使用虚拟节点树进行渲染。在渲染之前，会使用新生成的虚拟节点数和上一次生成的虚拟节点数进行对比，只渲染不同的部分。  
`虚拟节点树`：由组件树建立起来的整个虚拟节点（vnode）树

### 为什么要引入虚拟DOM
`Vue1.0` 是通过更细粒度的绑定来更新视图。因为粒度太细，每一个绑定都有一个对应的`watcher`来观察状态的变化，这样会有一些内存开销以及一些依赖追踪的开销

`Vue2.0` 引入虚拟DOM。组件级别是一个`watcher`实例。当这个状态发生变化时，只通知到组件，然后组件内部通过虚拟DOM去进行对比和渲染

`Vue.js` 通过模版来描述状态与视图之间的映射关系，所有它会先将模版编译成渲染函数，然后执行渲染函数生成虚拟节点，最后使用虚拟节点更新视图

### 虚拟DOM作用
- 提供与真实DOM节点所对应的虚拟节点vnode
- 将虚拟节点vnode和旧虚拟节点oldVnode进行对比，然后更新视图

## 什么是VNode
是一个`Javascript`中的一个普通对象，是从`VNode`类实例化的对象。简单来说，`vnode`可以理解为节点描述对象，它描述了应该怎样去创建真实的DOM节点

### VNode的作用
每次渲染视图都是先创建vnode，然后使用它创建真实DOM插入页面中，将上次渲染视图的vnode缓存起来，并与当前新创建的vnode进行对比，只更新发生变化的节点

### VNode 类型
- `注释节点` (只有`text`，`isComment`属性)
- `文本节点` (只有`text`属性)
- `元素节点` (存在`tag`,`data`,`children`,`context`)
- `组件节点` (存在`componentOptions`，`componentInstance`)
- `函数式组件` (存在`functionalContext`,`functionalOptions`)
- `克隆节点` (`isCloned`:`true`)

## patch

### 什么是patch

虚拟DOM最核心的部分，它可以将vnode渲染成真实的DOM

path的过程：
- 创建新增节点
- 删除已经废弃的节点
- 修改需要更新的节点

当`oldVnode`不存在时，直接使用vnode渲染视图  
当`oldVnode`和`vnode`都存在但并不是同一个节点时，使用vnode创建的DOM元素替换旧的DOM元素  
当`oldVnode`和`vnode`是同一个节点时，使用更详细的对比操作对真实的DOM节点进行更新

#### 新增节点
- 当`oldVnode`不存在而`vnode`存在时，需要使用`vnode`生成真实的`DOM`元素并将其插入到视图当中
- 当`vnode`和`oldVnode`完全不是同一个节点时,需要使用`vnode`生成真实的DOM元素并将其插入到视图当中

#### 删除节点
- 当一个节点只在`oldVnode`中存在时，需要从`DOM`中删除

#### 更新节点
- 新旧两个节点是用同一个节点，使用更详细的对比操作对真实DOM节点进行更新

### 创建节点
只有`元素类型`，`注释类型`，`文本类型` 的类型节点会被创建并插入到DOM

#### 创建节点的过程

创建一个元素节点，如果有子节点也创建出来并插入到刚创建的节点下，再把当前节点插入指定父节点下面。如果这个指定的父节点已经被渲染到视图，那么当前这个
节点插入进去之后，会将当前节点（包括其子节点）渲染到视图中

### 删除节点
```js
  /**
   * 删除vnodes数组从startIdx到endIdx的内容
   */
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (isDef(ch)) {
        removeNode(ch.elm)
      }
    }
  }
  /**
   * 为了跨平台所以对节点进行封装
   */
  const nodeOps = {
    removeChild(node, child) {
      node.removeChild(child)
    }
  }

  /**
   * 删除单个节点
   */
  function removeNode(el){
    const parent = nodeOps.parentNode(el)
    if (isDef(parent)){
      nodeOps.removeChild(parent,el)
    }
  }
```

### 更新节点
- 静态节点不需要进行更新
- 新虚拟节点有文本属性
  - 和旧虚拟节点文本属性不一样时，直接调用`setTextContent`方法把试图中的真实DOM节点内容改成新虚拟节点的文本
- 新虚拟节点无文本属性
  - 有children
    - 旧虚拟节点有children，需要详细对比新旧两个虚拟节点
    - 旧虚拟节点无children，说明就虚拟节点是空标签或有文本的文本节点。如果是文本节点，先把文本清空让它变成空标签，然后将新虚拟节点中的children
    挨个创建成真实的DOM元素节点并将其插入到视图中的DOM节点下面
  - 无children 说明新创建的节点是空节点，删除就虚拟节点的所有内容
  
#### 更新子节点
四种操作：更新节点，新增节点，删除节点，移动节点

##### 创建子节点
在`oldChildren`中没有找到新子节点相同的节点，执行创建节点的操作并将该节点插入到`oldChilren中所有未处理节点的前面`  

##### 更新子节点
当两个节点是同一个节点并且位置相同只需要进行更新节点的操作。  
如果位置不同除了对真实DOM节点进行更新外，还需要对真实DOM进行移动节点的操作

##### 移动子节点
从左到右循环newChildren,每循环一个节点就去oldChildren中寻找与这个节点相同的节点处理，`把需要移动的节点移动到所有未处理节点的最前面`

##### 删除子节点
删除那些`oldChildren`中存在但`newChildren`中不存在的节点

#### 优化策略
并不是所有子节点的位置都会发生移动，我们可以通过`新前和旧前`，`新后和旧后`，`新后和旧前`，`新前和旧后`快捷查找，如果是同一个节点进入更新操作，如果
不是再循环查找节点

- 新前：newChildren中未处理的第一个节点
- 新后：newChildren中未处理的最后一个节点
- 旧前：oldChildren中未处理的第一个节点
- 旧后：oldChildren中未处理的最后一个节点

- 新前和旧前: 位置相同不需要移动节点，更新节点即可
- 新后和旧后: 位置相同不需要移动节点，更新节点即可
- 新后和旧前: 位置不同，将节点移动到oldChildren中所有未处理节点最后面
- 新前和旧后: 位置不同，将节点移动到oldChildren中所有未处理节点最前面

#### 哪些节点是未处理过的
准备oldStartIdx(oldChildren开始的下标),oldEndIdx(oldChildren结束的下标）,newStartIdx（newChildren开始的下标）和newEndIdx（newChildren结束的下标）
从两边向中间循环

- 当开始位置耽于等于结束位置，说明所有节点都遍历过了，则结束循环
- oldChildren先循环完毕，如果newChildren还有剩余节点说明都是新增的节点（newStartIdx和newEndIdx之间的节点），直接把它们插入到DOM就行
- newChildren先循环完毕，如果oldChildren还有剩余节点说明都是废弃节点（oldStartIdx和oldEndIdx之间的节点），直接把它们从DOM删除

   
## 模板编译

主要目标是生成渲染函数。渲染函数的作用是每次执行它，它就会使用当前最新状态生成一份新的`vnode`，然后使用这个`vnode`进行渲染

模版编译三部分：
- 将模板解析为AST （解析器）
- 遍历AST标记静态节点（优化器）
- 使用AST生成渲染函数 （代码生成器）

#### 什么是AST
JS的一个对象，用来描述一个节点，一个对象表示一个节点，对象的属性来保存节点所需的各种数据

### 解析器
一个用JS对象描述的节点树就是AST
包括：
- HTML解析器
- 文本解析器
- 过滤器解析器

作用：通过模板得到AST（抽象语法树）

#### 解析器的内部原理
HTML解析器通过触发`开始标签钩子函数`，`结束标签钩子函数`，`文本标签钩子函数`以及`注释钩子函数`来构建AST节点

AST的层级关系是通过维护一个栈来记录层级关系。通过触发钩子函数的start把当前构建的节点推入栈中，每当触发钩子函数end时，从栈弹出一个节点

#### HTML解析器原理
循环HTML模版字符串，每轮循环都从HTML模版中截取一小段字符串，触发不同的钩子函数，然后重复以上过程，直到HTML模版被截成一个空字符时循环结束

#### 文本解析器原理
- 正则判断文本是否为带变量的文本，纯文本不需要处理
- 带变量的文本需要使用文本解析器进一步解析。用正则表达式匹配文本中的变量，先把变量左边的文本添加到数组中，然后把变量改成`_s(x)`形式添加到数组，
如果变量后面还有变量，则重复以上动作，直到所有变量都添加到数组中。如果最后一个变量的后面有文本，将它添加到数组中。再将这些数组元素用`+`连接起来变成
字符串

截取类型
- 开始标签
- 结束标签
- HTML注释
- DOCTYPE
- 条件注释
- 文本


### 优化器

#### 优化器作用
在AST中找出静态子树并打上标记  

#### 优化器好处
- 每次重新渲染时，不需要为静态子树创建节点
- 在虚拟DOM中打补丁的过程可以跳过

#### 步骤
- 在AST中找出所有静态节点并打上标记
- 在AST中找出所有静态根节点并打上标记

#### 怎样才是一个静态节点
- 不能使用动态绑定语法（不能用`v-`,`@`,`:`开头的属性）
- 不能使用`v-if`,`v-for`,或者`v-else`指令
- 不能是内置标签（标签名不能是`slot`或者`component`）
- 不能是组件，即标签名必须是保留标签
- 当前节点的父节点不能是带`v-for`指令的`template`标签
- 节点中不存在动态节点才有的属性

#### 总结
静态节点的子节点必须是静态节点

递归标记节点，遇到的第一个静态节点就是静态根节点，同时不再向下查找

- 如果一个静态根节点的子节点只有一个文本节点，那么它不会将它标记成静态根节点，即便它属于静态根节点
- 如果找到的静态根节点是一个没有子节点的静态节点，那么也不会将它标记成静态根节点。因为这两种情况下，优化大于收益

### 代码生成器
将AST转换成渲染函数中的内容，这个内容可以称为代码字符串

#### 渲染函数生成vnode的原因
渲染函数执行了`createElement`从而创建Vnode

生成代码字符串：
- 元素节点 `createELement` `_c`
- 文本节点 `createTextVnode` `_v`
- 注释节点 `createEmptyVnode` `_e`

#### 总结
通过递归`AST`生成字符串，最先生成根节点，然后在子节点字符串生成后，将其拼接在根节点的参数中，子节点的子节点拼接在子节点的参数中，这样一层层拼接，
直到最后拼接成完整字符串，最后将字符串拼在`width`中返回调用者


## 实例方法与全局API的实现原理

### vm.$on
- 当`event`参数是数组是时，遍历数组，将其中每一项调用`vm.$o`n,使回调注册到数组中每项事件名所指定的事件列表
- 当`event`参数不是数组时，向事件列表中添加回调。

`vm._events` 用来存储事件

### vm.$emit
- 使用事件名从vm.events中取出对应事件监听器回调函数列表，然后依次执行列表中的监听器回调并将参数传递给监听器回调

### vm.$off
- 如果没有提供参数，移除所有事件监听器  
    ```
    vm._events = Object.create(null)
    ```
    如果第一个参数是数组，遍历数组，每一项调用`vm.$off`
- 如果只提供事件名，移除该事件所有监听器  
  * 将事件名在`vm._events`中的属性设置为null
- 如果同时提供了事件名与回调，只移除这个回调的监听器
  * 取出`vm._events`的事件列表并遍历，如果某项和`fn`相同，使用`splice`移除

### vm.$once
- 在vm.$once中调用vm.$on监听自定义事件，自定义事件触发后会执行拦截器，将监听器从事件列表移除
```js
Vue.prototype.$once = function (event,fn){
  const vm = this
  function on(){
    vm.$off(event,on)
    fn.apply(vm,arguments)
  }
  on.fn = fn
  vm.$on(event,on)
  return vm
}
```

### vm.$forceUpdate
vm._watcher就是vue实例的watcher
```js
Vue.prototype.$forceUpdate = function (){
  const vm = this
  if (vm._watcher){
    vm._watcher.update()
  }
}
```

### vm.$destroy
- 触发beforeDestroy钩子函数
- 清理当前组件与父组件的连接(将当前组件从父组件实例的$children属性中删除)
- 销毁实例上的所有watcher(执行watcher的teardown方法)
- 将模版的所有指令解绑
- 触发destory钩子函数
- 移除实例上的所有事件监听器

### vm.$nextTick
下次微任务执行时更新DOM。vm.$nextTick会将回调添加到微任务中。只有在特殊情况下才会降级成宏任务，默认会添加到微任务

vm.$nextTick会将回调添加到任务队列中延迟执行，在回调执行前，反复调用vm.$nextTick，只会向任务队列添加一个任务。vue内部有一个列表用来存储vm.$nextTick
参数中提供的回调。在一轮事件循环中，vm.$nextTick只会向任务队列添加一个任务，多次使用vm.$nextTick只会将回调添加到回调列表中缓存起来。当任务触发时
依次执行列表中的所有回调并清空列表。

### vm.$mount
- 完整版
 先检查template或者el选项所提供的模版是否已经转化成渲染函数，如果没有立即进入编译过程，将模版编译成渲染函数，完成之后再进入挂载与渲染流程中
 
- 运行版
 没有编译步骤，默认实例上已经存在渲染函数，如果不存在，则会设置一个。
 
### Vue.extend
创建一个Sub函数并继承了父级

- 创建一个子类
- 将父类的原型继承到子类中
- 将父类的options选项继承到子类中，如果选项存在props，则初始化。存在computed也初始化
- 将父类存在的属性依次复制到子类

### Vue.directive
注册或获取全局指令
```js
Vue.options = Object.create(null)
Vue.options['directives'] = Object.create(null)
Vue.directive = function (id,definition){
  if (!definition){
    return this.options['directives'][id]
  }else{ // 注册
    if (typeof  definition === 'function'){
      definition = {bind:definition,update:definition}
    }
    this.options['directives'][id] = definition
    return definition
  }
}
```

### Vue.filter
```js
Vue.options['filters'] = Object.create(null)
Vue.filter = function (id,definition){
  if (!definition){
    return this.options['filters'][id]
  }else{
    this.options['filters'][id] = definition
    return definition
  }
}
```

### Vue.component
```js
Vue.options['components'] = Object.create(null)
Vue.component = function (id,definition){
  if (!definition){
    return this.options['components'][id]
  }else{
    if (isPlainObject(definition)){
      definition.name = definition.name || id
      definition = Vue.extend(definition)
    }
    this.options['components'][id] = definition
    return definition
  }
}
```

## 为什么Vue.js使用异步更新队列
vue 的变化侦测通知只发送到组件，组件用到的所有状态的变化都会通知到同一个watcher，等到所有状态修改完后，然后虚拟DOM会对比整个组件进行对比更改DOM

vue.js是将收到通知的watcher实例添加到队列缓存起来，并且在添加到队列之前检查其中是否已经存在相同的watcher，只有不存在时，才将watcher实例添加到队列中。
然后在下一次事件循环中，vue.js会让队列的watcher触发渲染流程并清空队列。这样就可以保证即便在同一事件循环中有两个状态发送改变，watcher最后只执行一次渲染流程

## 什么是事件循环
JS是一门单线程且非阻塞的脚本语言。意味着JS在执行代码任何时候都只有一个主线程来处理所有任务。非阻塞是指当代码需要处理异步任务时，主线程会挂起这个任务，当
异步任务处理完毕后，主线程再根据一定规则去执行相应回调。

当任务处理完毕后，JS会将这个事件加入一个队列，我们称这个队列为事件队列。事件队列的事件不会立刻执行回调，而是等待当前执行栈中的所有任务执行完毕后，主线程会查找事件队列中是否有任务

异步任务分为：
- 微任务
- 宏任务
不同类型的任务会被分配到不同任务队列中

当执行栈中的所有任务都执行完毕后，会去检查微任务队列中是否有事件存在，如果存在，则会依次执行微任务队列中事件对应的回调，直到为空。
然后去宏任务队列取出一个事件，把对应的回调加入当前执行栈，当执行栈中的所有任务都执行完毕后，检查微任务队列是否有事件存在。无限重复此过程，就
形成了一个无限循环，这个循环叫作事件循环

微任务事件包括但不限于：
- Promise.then
- MutationObserve
- Object.observe
- process.nextTick

宏任务事件包括但不限于：
- setTimeout
- setInterval
- setImmediate
- MessageChannel
- requestAnimationFrame
- I/O
- UI交互事件

## vue生命周期
- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroyed`
- `destroyed`
- `activated`  被 keep-alive 缓存的组件激活时调用。
- `deactivated`  被 keep-alive 缓存的组件停用时调用。
- `errorCaptured` 当捕获一个来自子孙组件的错误时被调用

1. 初始化阶段：`new Vue()` 到 `created`。 主要是在Vue.js实例上初始化属性，事件，以及响应式数据，如`props`，`methods`，`data`，`computed`，`watch`，`provide`和`inject`等
2. 模板编译阶段：`created` 到 `beforeMount`。主要是将模版编译成渲染函数，只存在完整版，如果只包含运行时的构建版本中执行new Vue（），则不会存在这个阶段
3. 挂载阶段：`beforeMount` 到 `mounted`。将模版渲染到指定的DOM中。vue会开启Watcher来持续追踪依赖变化
4. 卸载阶段：`beforeDestory` 到 `destroyed` vue会将自身从父组件移除，取消实例上所有依赖的追踪并且移除所有的事件监听器

## new vue() 发生了什么
<img width="500" src="https://images-cdn.shimo.im/GI0DqzLscmewOYoD__thumbnail.jpg"/>

- `initLifecycle` 初始化实例属性。在Vue实例上设置一些属性并提供一个默认值

- `initEvents` 初始化事件。将父组件在模版中使用的 `v-on` 注册事件添加到子组件的事件监听系统中

- `initRender` 初始化渲染

- `initjections` 初始化inject。inject和provide一起使用，他们允许祖先组件向其所有子孙后台注入依赖，并在其上下游关系成立的事件始终生效

- `initState` 初始化状态。 包括 `props`,`methods`,`data`,`computed`,`watch`

- `initProvide` 初始化provide

Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

执行this.xxx 其实是调用了proxy 进行了拦截调用 this._data.xxx 

### callhook内部原理
从vm.$options中获取生命周期钩子函数列表，遍历列表，执行每一个生命周期钩子

### handleError 原理
依次执行父组件的`errorCaptured`钩子函数和全局的`config.errorHandler`


## 指令

### 原理概述
在模版解析阶段，我们在将指令解析到AST，然后使用AST生成代码字符串的过程中实现某些内置指令的功能，最后在虚拟DOM渲染的过程中触发自定义指令的
钩子函数使指令生效

```
// v-if
<li v-if="has">if</li>
<li v-else>else</li>

编译成

(has)
? _c('li',[_v('if')])
: _c('li',[_v('else)])
```
```
// v-for
<li v-for="(item,index) in list">v-for{{index}}</li>
_l((list),function(item,index){
  return _c('li',[
    _v('v-for'+ _s(index))
  ])
)
// _l 是renderList函数，_v函数创建文本节点
```

## 过滤器

### 过滤器原理
```
{{message | capitalize}} 会编译成

/** 执行了capitalize过滤器函数并把message当参数传递，接着将结果当作参数返回给toString函数。
 *  最终结果保存到Vnode中的text属性中（直接被渲染视图）
 * _f是resolveFilter 从this.$options.filters中找出注册的过滤器并返回
 * _s是toString
 */ 
_s(_f("capitalize")(message))
```
串联过滤器
```
{{message | capitalize | suffix}} 最终编译
_s(_f("suffix")(_f("capitalize")(message)))
```
串联过滤器接收参数
```
{{message | capitalize | suffix('!')}} 最终编译
_s(_f("suffix")(_f("capitalize")(message,'!')))
```
### 解析过滤器
vue 在对模板进行编译的时候，会将模板字符解析成抽象语法树 AST，通过`parseFilter`函数解析`filter`



## 最佳实践

- 为列表渲染设置属性key
- 在v-if/v-if-else/v-else 中使用key
- 避免v-if和v-for一起使用（v-for比v-if优先级高）
- 为组件样式设置作用域
- 避免隐形的父子组件通信 优先通过prop和实践进行父子组件通信，而不是使用this.$parent或改变prop
- 单文件组件文件名应该是单词首字母大写或者横线连接
- 基础组件名用特定前缀，比如 Base，App或V
- 单例组件应该以The前缀命名
- 和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
- 模版中的组件名应该是单词首字母大写
- data必须是个函数
- prop指定类型

## Vue2和Vue1区别
- vue2开始引入虚拟DOM
- 一个状态所绑定的依赖不再是具体的DOM节点而是一个组件
- 数据发生变化时通知到组件，组件内部再通过虚拟dom重新渲染


参考：https://cn.vuejs.org/v2/style-guide/

## Vue.use
用法：`Vue.use(plugin)`  
参数：`{Object| Function} plugin`  
用法：安装`Vue.js`插件。如果插件是一个对象，必须提供`install`方法。如果插件是一个函数，它会被作为i`nstall`方法。调用用`install`方法时，会将`Vue`作为
参数传入。`install`方法被同一个插件多次调用，插件也只会被安装一次.
```js
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) { // 判断是否被注册，如果注册过则终止
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1) // 除第一个参数外，剩余所有参数将得到的列表赋值到args中
    args.unshift(this) // 把vue添加到最前面，包装install方法第一个参数是vue
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
```


