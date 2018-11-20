---
title: module 模块化
date: 2018-11-20 10:02:27
categories:
    - vue
tags:
    -module
---

## 简介
ES6 模块是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

## export
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
function f() {}
export {firstName, lastName, year, f};
```
## import
```js
// main.js
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

## 整体加载
```js
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default
不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。
```js
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
export default时，对应的import语句不需要使用大括号；  
不使用export default时，对应的import语句需要使用大括号。
本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

## import() 完成动态加载。
前面介绍过，import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。
```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```
```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```
import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。

## nodeJs
>1. module.exports 初始值为一个空对象 {}
>2. exports 是指向的 module.exports 的引用
>3. require() 返回的是 module.exports 而不是 exports

用法：
如果模块返回的函数或者变量不止一个，那它可以通过设定exports对象的属性来指明它们，但如果模块只返回一个函数或变量，则可以设定module.exports属性
## 参考
[Module 的语法](http://es6.ruanyifeng.com/#docs/module)