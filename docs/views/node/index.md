---
sidebar: auto
---
## 什么是Node.JS
Node.JS不是JavaScript应用，不是编程语言。Node.JS是JavaScript的运行环境

Node.JS是基于CommonJs规范的实现，即每个文件都是一个模块
```js
// 创建模块
module.exports = function () {
  console.log('Hello CommonJs!');
}

// 引用模块
const hello = require('./hello_commonjs');
hello()
```
```js
const http = require('http');

http.createServer(function (req,res) {
  let status = 200
  res.writeHead(status,{'Content-Type':'text/plain'});
  res.end('hello nodeJs\n')
}).listen(3000,'127.0.0.1')
```
- require：用来引入模块
- export：用来导出模块
- module.exports：对外导出的对象只能有1个
- exports：对外导出的值可以有多个

!> 导出的核心是module.exports，exports只是module.exports的引用而已

## 安装Node.JS
下载地址：https://nodejs.org/zh-cn/
选择LTS（长期支持版）

- Ubuntu 使用 `apt-get`
- CentOS 使用 `yum`
- macOS 使用 `homebrew`

- nvm：用于开发阶段，解决多版本共存，切换，测试等问题
- npm：解决NodeJs模块安装问题，其本身也是一个NodeJs模块，每次安装都会内置某个版本的npm
- nrm：解决npm镜像访问慢的问题，提供测速，切换下载源功能

## 异常处理
- uncaughtException
```js
 process.on('uncaughtException',function(err){
    console.log(err);
  })
```
- 同步代码使用`try/catch`进行异常捕获，异步代码使用`Promise`
- `PM2` 自动重启模块

## Event Loop
Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者
执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

![](/assets/img/node/node_eventLoop.png)

- timer

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。
同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

- I/O

I/O 阶段会处理一些上一轮循环中的少数未执行的 I/O 回调

- idle, prepare

idle, prepare 阶段内部实现，这里就忽略不讲了。

- poll

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

1. 回到 timer 阶段执行回调
2. 执行 I/O 回调
并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制  
如果 poll 队列为空时，会有两件事发生   
如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调    
如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去    
当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

- check

check 阶段执行 setImmediate

- close callbacks

close callbacks 阶段执行 close 事件

参考：https://juejin.im/post/6844903761949753352#heading-12
