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

## 安装Node.JS
下载地址：https://nodejs.org/zh-cn/
选择LTS（长期支持版）

- Ubuntu 使用 `apt-get`
- CentOS 使用 `yum`
- macOS 使用 `homebrew`

- nvm：用于开发阶段，解决多版本共存，切换，测试等问题
- npm：解决NodeJs模块安装问题，其本身也是一个NodeJs模块，每次安装都会内置某个版本的npm
- nrm：解决npm镜像访问慢的问题，提供测速，切换下载源功能

