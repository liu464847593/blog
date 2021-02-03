## 工作流程
1. 参数解析
2. 找到入口文件
3. 调用 `Loader` 编译文件
3. 遍历 `AST`，收集依赖
4. 生成 `Chunk`
6. 输出文件

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