## 工作流程
1. 读取`webpack`的配置参数；
2. 启动`webpack`，创建`Compiler`对象并开始解析项目；
3. 从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 对不同文件类型的依赖模块文件使用对应的`Loader`进行编译，最终转为`Javascript`文件；
5. 整个过程中webpack会通过发布订阅模式，向外抛出一些`hooks`，而`webpack`的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

在`webpack`源码中主要依赖于`compiler`和`compilation`两个核心对象实现。

`compiler`对象是一个全局单例，他负责把控整个`webpack`打包的构建流程。  
`compilation`对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，`compiler`都会重新生成一个新的`compilation`对象，
负责此次更新的构建过程。  
而每个模块间的依赖关系，则依赖于AST语法树。每个模块文件在通过`Loader`解析完成之后，会通过`acorn`库生成模块代码的AST语法树，通过语法树就可以分析这个
模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。

最终`Webpack`打包出来的`bundle`文件是一个`IIFE`的执行函数。


## Loader 工作流程简述

### loader特点
1. `Loader` 是一个 `node` 模块；
2. `Loader` 可以处理任意类型的文件，转换成 webpack 可以处理的模块；
3. `Loader` 可以在 `webpack.config.js` 里配置，也可以在 require 语句里内联；
4. `Loader` 可以根据配置从右向左链式执行；
5. `Loader` 接受源文件内容字符串或者 `Buffer`；
6. `Loader` 分为多种类型：同步、异步和 `pitching`，他们的执行流程不一样；
7. `webpack` 为 `Loader` 提供了一个上下文，有一些 api 可以使用；

假设有一个 js-loader，它的工作流程简单来说是这样的：

1. `webpack.config.js` 里配置了一个 `js` 的 `Loader`；
2. 遇到 `js` 文件时，触发了 `js-loader`;
3. `js-loader` 接受了一个表示该 `js` 文件内容的 `source`;
4. `js-loader` 使用 `webapck` 提供的一系列 `api` 对 `source` 进行转换，得到一个 `result`;
5. 将 `result` 返回或者传递给下一个 `Loader`，直到处理完毕。

## 热更新原理
1. 当修改了一个或多个文件
2. 文件系统接收更改并通知webpack
3. webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新
4. HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp
5. HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新