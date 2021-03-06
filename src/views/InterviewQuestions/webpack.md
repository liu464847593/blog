### css-loader和style-loader的区别
- `css-loader` 解析 `import ` 和 `require`的内容并且返回css
- `style-loader` 往页面插入`style`标签放在`head`里面

### webpack的plugins和loaders的实现原理
webpack原理：
- 识别入口文件
- 通过逐层识别模块依赖(Commonjs、amd或者es6的import，webpack都会对其进行分析，来获取代码的依赖)
- webpack做的就是分析代码，转换代码，编译代码，输出代码
- 最终形成打包后的代码

loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack
打包过程中的某些节点，执行广泛的任务

### webpack如何优化编译速度
- 减少编译范围 modules、mainFields、noParse、includes、exclude、alias
- webpack-parallel-uglify-plugin 多线程压缩
- happyPack 多进程
- 配置dll
- tree-shaking 删除无用代码

### 常用loader,plugin
- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `postcss-loader`：应用postcss
- `less-loader`：解析less
- `sass-loader`：解析sass
- `babel-loader`：把 ES6 转换成 ES5
- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- `url-loader`：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去，

- `copy-webpack-plugin`：用于打包时复制文件。
- `html-webpack-plugin`：生成一个 HTML5 文件，包括使用 script 标签的 body 中的所有 webpack 包。
- `define-plugin`：定义环境变量

### 如何写一个webpack plugin
- 一个 `JS` 命名函数或一个类
- 在插件类/函数的 (`prototype`) 上定义一个 `apply` 方法。
- 通过 `apply` 函数中传入 `compiler` 并插入指定的事件钩子，在钩子回调中取到 `compilation` 对象
- 通过 `compilation` 处理 `webpack` 内部特定的实例数据
- 如果是插件是异步的，在插件的逻辑编写完后调用 `webpack` 提供的 `callback`


- `loader` 支持链式调用,遵循单一原则，每个`loader`只处理一件事情
- `loader` 获取源码，可以以返回值处理后的内容输出，也可以`this.callback()`,将内容返回给`webpack`，还可以通过`this.async()`生成
   callback函数输出出去
- `Loader` 是无状态的，我们不应该在 `Loader` 中保留状态
- 使用 `loader-utils `和 `schema-utils`为我们提供的实用工具