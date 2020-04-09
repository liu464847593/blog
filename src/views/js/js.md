## JS的组成
- `核心（ECMAScript）`，提供核心语言功能
- `文档对象模型（DOM）`，提供访问和操作网页的方法和接口
- `浏览器对象模型（BOM）`，提供与浏览器交互的方法和接口

### ECMAScript
> ECMAScript 就是对实现该标准规定的各个方面内容的语言的描述

包括
- `语法`
- `类型`
- `语句`
- `关键字`
- `保留字`
- `操作符`
- `对象`

### DOM
> DOM是针对XML但经过扩展用于HTML的应用程序编程接口

- `核心 DOM` - 针对任何结构化文档的标准模型
- `XML DOM` - 针对 XML 文档的标准模型
- `HTML DOM` - 针对 HTML 文档的标准模型

### BOM
> 支持可以访问和操作浏览器窗口的浏览器对象模型,核心是window
- `location`
- `navigator`
- `screen`
- `history`
- `document`

## JS基本类型
- `Undefined`
- `Null`
- `Boolean`
- `Number`
- `String`
- `Object`

!>基本类型是按值来访问的  
引用类型的值是保存在内存中的对象，JS不能直接操作对象的内存空间，实际上是在操作对象的引用,但是如果是为对象添加属性实际上是在操作对象

基本类型存放在栈内存中 
引用类型存放在堆内存中  

栈是一种数据结构（先进后出） 类似push(),pop()  
队列数据结构是 先进先出 unshift(),shift()

从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上  
从一个变量向另一个变量复制引用类型的值时，会将存储在变量对象中的`指针`复制一份放到新变量分配的空间中，指针指向存储在堆中的另一个对象  
函数的参数都是按值来传递的
```
//typeof 可以检测变量的数据类型
- undefined
- boolean
- string
- number
- object
- function

// instanceof 检测是什么类型的对象 返回boolean 值
person instanceof Object

```
!> null表示一个空对象指针，typeof null 为object

## arguments
是一个类数组对象（并不是一个Array的实例），因为可以用方括号访问它的每一个元素  
`callee`指向拥有arguments对象的函数

## this
函数执行的环境对象  
`caller`保存着调用当前函数的函数的引用（如果是在全局作用域中调用当前函数，它的值为`null`）

## 执行环境及作用域
执行环境定义了变量或者函数有权访问的其他数据，决定了它们各自的行为  
某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变了和函数定义也随之销毁（全局执行环境直到应用程序退出完毕后才销毁）
当代码在一个执行环境中执行时，会创建变量对象的一个作用域链，用途是保证对执行环境有权访问的所有对象和函数的有序访问

## 垃圾回收
原理：找出那些不再继续使用的变量，然后释放其占用的内存
- 标记清除
- 引用计数

!> 将变量设置为null可以切断变量与它之前引用的值之间的连接

## 属性类型
- 数据属性
 * `[[Configurable]]`: 能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性 默认true
 * `[[Enumerable]]`: 能否通过for-in循环返回属性 默认true
 * `[[Writable]]`: 能否修改属性的值 默认true
 * `[[Value]]`: 包含这个属性的数据值 默认undefined
 
  >要修改属性默认的特性，必须用Object,defineProperty(),接收三个参数：属性所在的对象，属性的名字和一个描述符对象，
  Object,defineProperty()方法创建一个新属性时，如果不指定，`configurable`,`enumerable`,`writable` 默认`false`
- 访问器属性
 * `[[Configurable]]`: 能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性 默认true
 * `[[Enumerable]]`: 能否通过for-in循环返回属性 默认true
 * `[[Get]]`: 在读取属性时调用的函数 默认undefined
 * `[[Set]]`: 在写入属性时调用的函数 默认undefined
 
Object.getOwnPropertyDescriptor() 可以取得给定属性的描述符

## 创建对象 





