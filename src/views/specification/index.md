## 基本原则
---
结构、样式、行为分离  
尽量确保文档和模板只包含 `HTML` 结构，样式都放到样式表里，行为都放到脚本里。

### 缩进
统一两个空格缩进（总之缩进统一即可），不要使用 `Tab` 或者 `Tab`、空格混搭。

### 文件编码
使用不带 BOM 的 UTF-8 编码。

- 在 HTML中指定编码 `<meta charset="utf-8">` ；
- 无需使用 `@charset` 指定样式表的编码，它默认为 UTF-8；

### 一律使用小写字母
```html
<!-- Recommended -->
<img src="google.png" alt="Google">

<!-- Not recommended -->
<A HREF="/">Home</A>
```

```css
/* Recommended */
color: #e5e5e5;

/* Not recommended */
color: #E5E5E5;
```

### 省略外链资源 URL 协议部分
省略外链资源（图片及其它媒体资源）URL 中的 `http` / `https` 协议，使 URL 成为相对地址，避免Mixed Content 问题，减小文件字节数。

其它协议（`ftp` 等）的 URL 不省略。
```
<!-- Recommended -->
<script src="//www.w3cschool.cn/statics/js/autotrack.js"></script>

<!-- Not recommended -->
<script src="http://www.w3cschool.cn/statics/js/autotrack.js"></script>
```

```css
/* Recommended */
.example {
  background: url(//www.google.com/images/example);
}

/* Not recommended */
.example {
  background: url(http://www.google.com/images/example);
}
```

### 统一注释
通过配置编辑器，可以提供快捷键来输出一致认可的注释模式。

HTML 注释

- 模块注释

```html
<!-- 文章列表列表模块 -->
<div class="article-list">
...
</div>
```

- 区块注释

```
<!--
@name: Drop Down Menu
@description: Style of top bar drop down menu.
@author: Ashu(Aaaaaashu@gmail.com)
-->
```

JavaScript 注释
- 单行注释
必须独占一行。`//` 后跟一个空格，缩进与下一行被注释说明的代码一致。
- 多行注释
避免使用 `/*...*/` 这样的多行注释。有多行注释内容时，使用多个单行注释。
- 函数/方法注释
- 函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识；
- 参数和返回值注释必须包含类型信息和说明；
- 当函数是内部函数，外部不可访问时，可以使用 @inner 标识；
```javascript
/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
function foo(p1, p2, p3) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}
```

- 文件注释
文件注释用于告诉不熟悉这段代码的读者这个文件中包含哪些东西。 应该提供文件的大体内容, 它的作者, 依赖关系和兼容性信息。如下:
```javascript
/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @author user@meizu.com (Firstname Lastname)
 * Copyright 2015 Meizu Inc. All Rights Reserved.
 */
```

## HTML
HTML
尽量遵循 HTML 标准和语义，但是不要以牺牲实用性为代价。任何时候都要尽量使用最少的标签并保持最小的复杂度。

## 通用约定
---
### 标签
- 自闭合（self-closing）标签，无需闭合 ( 例如： img input br hr 等 )；
- 可选的闭合标签（closing tag），需闭合 ( 例如：`</li>` 或 `</body> `)；
- 尽量减少标签数量；

```
<img src="https://atts.w3cschool.cn/attachments/image/cimg/google.png" alt="Google">
<input type="text" name="title">

<ul>
  <li>Style</li>
  <li>Guide</li>
</ul>

<!-- Not recommended -->
<span class="avatar">
  <img src="...">
</span>

<!-- Recommended -->
<img class="avatar" src="...">
```

#### Class 与 ID
- class 应以功能或内容命名，不以表现形式命名；
- class 与 id 单词字母小写，多个单词组成时，采用中划线-分隔；
- 使用唯一的 id 作为 Javascript hook, 同时避免创建无样式信息的 class；

```
<!-- Not recommended -->
<div class="j-hook left contentWrapper"></div>

<!-- Recommended -->
<div id="j-hook" class="sidebar content-wrapper"></div>
```

#### 属性顺序
HTML 属性应该按照特定的顺序出现以保证易读性。

- id
- class
- name
- data-xxx
- src, for, type, href
- title, alt
- aria-xxx, role

```
<a id="..." class="..." data-modal="toggle" href="###"></a>

<input class="form-control" type="text">

<img src="..." alt="...">
```

#### 引号
属性的定义，统一使用双引号。

```
<!-- Not recommended -->
<span id='j-hook' class=text>Google</span>

<!-- Recommended -->
<span id="j-hook" class="text">Google</span>
```

#### 嵌套
`a 不允许嵌套 div`这种约束属于语义嵌套约束，与之区别的约束还有严格嵌套约束，比如`a 不允许嵌套 a`。

严格嵌套约束在所有的浏览器下都不被允许；而语义嵌套约束，浏览器大多会容错处理，生成的文档树可能相互不太一样。

#### 语义嵌套约束

- `<li>` 用于 `<ul>` 或 `<ol>` 下；
- `<dd>`, `<dt>` 用于 `<dl>` 下；
- `<thead>`, `<tbody>`, `<tfoot>`,`<tr>`, `<td>` 用于 `<table>` 下；

#### 严格嵌套约束
- inline-Level 元素，仅可以包含文本或其它 inline-Level 元素;
- `<a>`里不可以嵌套交互式元素`<a>`、`<button>`、`<select>`等;
- `<p>`里不可以嵌套块级元素`<div>`、`<h1>~<h6>`、`<p>`、`<ul>/<ol>/<li>`、`<dl>/<dt>/<dd>`、`<form>`等。

#### 布尔值属性
HTML5 规范中 disabled、checked、selected 等属性不用设置值。
```html
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
  <option value="1" selected>1</option>
</select><input type="text" disabled>
         
<input type="checkbox" value="1" checked>

<select>
  <option value="1" selected>1</option>
</select>
```

### 语义化
语义化
没有 `CSS` 的 `HTML` 是一个语义系统而不是 UI 系统。
此外语义化的 HTML 结构，有助于机器（搜索引擎）理解，另一方面多人协作时，能迅速了解开发者意图。

常见标签语义

标签|语义
-|-
`<p>`|段落
`<h1> <h2> <h3> ...`|标题
`<ul>`|无序列表
`<ol>`|有序列表
`<blockquote>`|大段引用
`<cite>`|一般引用
`<b>`|为样式加粗而加粗
`<strong>`|为强调内容而加粗
`<i>`|为样式倾斜而倾斜
`<em>`|为强调内容而倾斜
`code`|代码标识
`abbr`|缩写


### HEAD
#### 文档类型
为每个 HTML 页面的第一行添加标准模式（standard mode）的声明， 这样能够确保在每个浏览器中拥有一致的表现。

```html
<!DOCTYPE html>
```
#### 语言属性
为什么使用 lang="zh-cmn-Hans" 而不是我们通常写的 lang="zh-CN" 呢? 请参考知乎上的讨论: 网页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"？
```html
<!-- 中文 -->
<html lang="zh-Hans">

<!-- 简体中文 -->
<html lang="zh-cmn-Hans">

<!-- 繁体中文 -->
<html lang="zh-cmn-Hant">

<!-- English -->
<html lang="en">
```

#### 字符编码
- 以无 BOM 的 utf-8 编码作为文件格式;
- 指定字符编码的 meta 必须是 head 的第一个直接子元素；
```html
<html>
  <head>
    <meta charset="utf-8">
    ......
  </head>
  <body>
    ......
  </body>
</html>
```

#### IE 兼容模式
优先使用最新版本的IE 和 Chrome 内核
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```
#### SEO 优化
```html
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- SEO -->
    <title>Style Guide</title>
    <meta name="keywords" content="your keywords">
    <meta name="description" content="your description">
    <meta name="author" content="author,email address">
</head>
```

#### viewport
- `viewport`: 一般指的是浏览器窗口内容区的大小，不包含工具条、选项卡等内容；
- `width`: 浏览器宽度，输出设备中的页面可见区域宽度；
- `device-width`: 设备分辨率宽度，输出设备的屏幕可见宽度；
- `initial-scale`: 初始缩放比例；
- `maximum-scale`: 最大缩放比例；
为移动端设备优化，设置可见区域的宽度和初始缩放比例。
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
#### iOS 图标
- apple-touch-icon 图片自动处理成圆角和高光等效果;
- apple-touch-icon-precomposed 禁止系统自动添加效果，直接显示设计原图;
```html
<!-- iPhone 和 iTouch，默认 57x57 像素，必须有 -->
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">

<!-- iPad，72x72 像素，可以没有，但推荐有 -->
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-72x72-precomposed.png" sizes="72x72">

<!-- Retina iPhone 和 Retina iTouch，114x114 像素，可以没有，但推荐有 -->
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-114x114-precomposed.png" sizes="114x114">

<!-- Retina iPad，144x144 像素，可以没有，但推荐有 -->
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-144x144-precomposed.png" sizes="144x144">
```

#### favicon
在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 favicon.ico 。为了保证 favicon 可访问，避免404，必须遵循以下两种方法之一：
- 在 Web Server 根目录放置 favicon.ico 文件；
- 使用 link 指定 favicon；
```html
<link rel="shortcut icon" href="path/to/favicon.ico">
```
#### HEAD 模板
```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Style Guide</title>
    <meta name="description" content="不超过150个字符">
    <meta name="keywords" content="">
    <meta name="author" content="name, email@gmail.com">

    <!-- 为移动设备添加 viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- iOS 图标 -->
    <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">

    <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
    <link rel="shortcut icon" href="path/to/favicon.ico">
</head>
```
## CSS
### 通用约定
代码组织
- 以组件为单位组织代码段；
- 制定一致的注释规范；
- 组件块和子组件块以及声明块之间使用一空行分隔，子组件块之间三空行分隔；
- 如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动；
良好的注释是非常重要的。请留出时间来描述组件（component）的工作方式、局限性和构建它们的方法。不要让你的团队其它成员 来猜测一段不通用或不明显的代码的目的。

提示：通过配置编辑器，可以提供快捷键来输出一致认可的注释模式。
```css

/* ==========================================================================
   组件块
 ============================================================================ */

/* 子组件块
 ============================================================================ */
.selector {
  padding: 15px;
  margin-bottom: 15px;
}

/* 子组件块
 ============================================================================ */
.selector-secondary {
  display: block; /* 注释*/
}

.selector-three {
  display: inline;
}
```

#### Class 和 ID
- 使用语义化、通用的命名方式；
- 使用连字符 - 作为 ID、Class 名称界定符，不要驼峰命名法和下划线；
- 避免选择器嵌套层级过多，尽量少于 3 级；
- 避免选择器和 Class、ID 叠加使用；
- 出于性能考量，在没有必要的情况下避免元素选择器叠加 Class、ID 使用。

元素选择器和 ID、Class 混合使用也违反关注分离原则。如果HTML标签修改了，就要再去修改 CSS 代码，不利于后期维护。
```css
/* Not recommended */
.red {}
.box_green {}
.page .header .login #username input {}
ul#example {}

/* Recommended */
#nav {}
.box-video {}
#username input {}
#example {}
```

#### 声明块格式
- 选择器分组时，保持独立的选择器占用一行；
- 声明块的左括号 { 前添加一个空格；
- 声明块的右括号 } 应单独成行；
- 声明语句中的 : 后应添加一个空格；
- 声明语句应以分号 ; 结尾；
- 一般以逗号分隔的属性值，每个逗号后应添加一个空格；
- rgb()、rgba()、hsl()、hsla() 或 rect() 括号内的值，逗号分隔，但逗号后不添加一个空格；
- 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替-0.5px）；
- 十六进制值应该全部小写和尽量简写，例如，#fff 代替 #ffffff；
- 避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;；
```css
/*  Not recommended  */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Recommended */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

#### 声明顺序
相关属性应为一组，推荐的样式编写顺序

Positioning
Box model
Typographic
Visual
由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型决定了组件的尺寸和位置，因此排在第二位。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。
```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box model */
  display: block;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin: 10px;
  float: right;
  overflow: hidden;

  /* Typographic */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  color: #fff;
  opacity: .8;

  /* Other */
  cursor: pointer;
}
```

#### 引号使用
url() 、属性选择符、属性值使用双引号。 参考 Is quoting the value of url() really necessary?
```css
/* Not recommended */
@import url(//www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}

/* Recommended */
@import url("//www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}

.selector[type="text"] {

}
```

#### 媒体查询（Media query）的位置
将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。
```css
.element { ... }
.element-avatar { ... }
.element-selected { ... }

@media (max-width: 768px) {
  .element { ...}
  .element-avatar { ... }
  .element-selected { ... }
}
```

#### 不要使用 @import
与 <link> 相比，@import 要慢很多，不光增加额外的请求数，还会导致不可预料的问题。

#### 链接的样式顺序：
a:link -> a:visited -> a:hover -> a:active（LoVeHAte）

#### 无需添加浏览器厂商前缀
使用 Autoprefixer 自动添加浏览器厂商前缀，编写 CSS 时不需要添加浏览器前缀，直接使用标准的 CSS 编写。

Autoprefixer 通过 Can I use，按兼容的要求，对相应的 CSS 代码添加浏览器厂商前缀。

### Less 规范
LESS
代码组织
代码按以下顺序组织：

1. @import
2. 变量声明
3. 样式声明
```less
@import "mixins/size.less";

@default-text-color: #333;

.page {
  width: 960px;
  margin: 0 auto;
}
```

#### @import 语句
@import 语句引用的文需要写在一对引号内，.less 后缀不得省略。引号使用 ' 和 " 均可，但在同一项目内需统一。

```less
/* Not recommended */
@import "mixins/size";
@import 'mixins/grid.less';

/* Recommended */
@import "mixins/size.less";
@import "mixins/grid.less";
```
#### 混入（Mixin）
1. 在定义 mixin 时，如果 mixin 名称不是一个需要使用的 className，必须加上括号，否则即使不被调用也会输出到 CSS 中。
2. 如果混入的是本身不输出内容的 mixin，需要在 mixin 后添加括号（即使不传参数），以区分这是否是一个 className。
```less
/* Not recommended */
.big-text {
  font-size: 2em;
}

h3 {
  .big-text;
  .clearfix;
}

/* Recommended */
.big-text() {
  font-size: 2em;
}

h3 {
  .big-text(); /* 1 */
  .clearfix(); /* 2 */
}
```

#### 避免嵌套层级过多
- 将嵌套深度限制在2级。对于超过3级的嵌套，给予重新评估。这可以避免出现过于详实的CSS选择器。
- 避免大量的嵌套规则。当可读性受到影响时，将之打断。推荐避免出现多于20行的嵌套规则出现。

#### 字符串插值
变量可以用类似ruby和php的方式嵌入到字符串中，像@{name}这样的结构: `@base-url: "http://assets.fnord.com"; background-image: url("@{base-url}/images/bg.png")`;


## Javascript
注释
原则

As short as possible（如无必要，勿增注释）：尽量提高代码本身的清晰性、可读性。
As long as necessary（如有必要，尽量详尽）：合理的注释、空行排版等，可以让代码更易阅读、更具美感。
单行注释

必须独占一行。`//` 后跟一个空格，缩进与下一行被注释说明的代码一致。

多行注释

避免使用 `/*...*/` 这样的多行注释。有多行注释内容时，使用多个单行注释。

函数/方法注释

函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识。；
参数和返回值注释必须包含类型信息和说明；
当函数是内部函数，外部不可访问时，可以使用 @inner 标识；
```javascript
/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
function foo(p1, p2, p3) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}
```

文件注释

文件注释用于告诉不熟悉这段代码的读者这个文件中包含哪些东西。 应该提供文件的大体内容, 它的作者, 依赖关系和兼容性信息。如下:
```javascript
/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @author user@meizu.com (Firstname Lastname)
 * Copyright 2009 Meizu Inc. All Rights Reserved.
 */
```

命名
变量, 使用 Camel 命名法。
```javascript
var loadingModules = {};
```

私有属性、变量和方法以下划线 _ 开头。
```javascript
var _privateMethod = {};

```
常量, 使用全部字母大写，单词间下划线分隔的命名方式。
```javascript
var HTML_ENTITY = {};

```
函数, 使用 Camel 命名法。
函数的参数, 使用 Camel 命名法。
```javascript
function stringFormat(source) {}
function hear(theBells) {}
```

类, 使用 Pascal 命名法
类的 方法 / 属性, 使用 Camel 命名法
```javascript
function TextNode(value, engine) {
    this.value = value;
    this.engine = engine;
}

TextNode.prototype.clone = function () {
    return this;
};
```

枚举变量 使用 `Pascal` 命名法。
枚举的属性， 使用全部字母大写，单词间下划线分隔的命名方式。
```javascript
var TargetState = {
    READING: 1,
    READED: 2,
    APPLIED: 3,
    READY: 4
};
```

由多个单词组成的 缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。
```javascript
function XMLParser() {}

function insertHTML(element, html) {}

var httpRequest = new HTTPRequest();
```

命名语法
类名，使用名词。
```javascript
function Engine(options) {}

```
函数名，使用动宾短语。
```javascript
function getStyle(element) {}

```
boolean 类型的变量使用 is 或 has 开头。
```javascript
var isReady = false;
var hasMoreCommands = false;
```

Promise 对象用动宾短语的进行时表达。
```javascript
var loadingData = ajax.get('url');
loadingData.then(callback);
```


