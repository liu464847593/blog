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

```
//typeof 可以检测变量的数据类型
- undefined
- boolean
- string
- number
- object
- function

```
!> null表示一个空对象指针，typeof null 为object

## arguments
是一个类数组对象（并不是一个Array的实例），因为可以用方括号访问它的每一个元素
