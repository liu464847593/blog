## 盒模型

组成：`margin` + `border` + `padding` + `content`
- W3C的标准盒模型：`width` = `content`
- IE盒模型：`width` = `border` + `padding` + `content`
- 弹性盒子模型

二者之间可以通过CSS3的 `box-sizing` 属性来转换  
`box-sizing: content-box` 是W3C盒模型  
`box-sizing: border-box` 是IE盒模型  

## 垂直水平居中
- `flex` 
- `position` + `transform`
- `position` + 负`margin`
- 已知宽高 设置各个方向的距离都是0，再将`margin`设为`auto`

## 三栏布局 （左右固定中间自适应）
- `flex`
- `position` + `margin`
- `float` + `margin`
- `calc`
- `圣杯`
- `双飞翼`

圣杯布局
```
  .container {
    padding-left: 220px;
    padding-right: 220px;
  }
  .left {
    float: left;
    width: 200px;
    height: 400px;
    background: red;
    margin-left: -100%;
    position: relative;
    left: -220px;
  }
  .center {
    float: left;
    width: 100%;
    height: 500px;
    background: yellow;
  }
  .right {
    float: left;
    width: 200px;
    height: 400px;
    background: blue;
    margin-left: -200px;
    position: relative;
    right: -220px;
  }

```

```
  <article class="container">
    <div class="center">
      <h2>圣杯布局</h2>
    </div>
    <div class="left"></div>
    <div class="right"></div>
  </article>
```

双飞翼布局
```
    .container {
        min-width: 600px;
    }
    .left {
        float: left;
        width: 200px;
        height: 400px;
        background: red;
        margin-left: -100%;
    }
    .center {
        float: left;
        width: 100%;
        height: 500px;
        background: yellow;
    }
    .center .inner {
        margin: 0 200px; //新增部分
    }
    .right {
        float: left;
        width: 200px;
        height: 400px;
        background: blue;
        margin-left: -200px;
    }
```
```
    <article class="container">
        <div class="center">
            <div class="inner">双飞翼布局</div>
        </div>
        <div class="left"></div>
        <div class="right"></div>
    </article>

```

## BFC
`块格式化上下文`：它是一个独立的容器，并且容器里元素的布局不会影响到容器外

形成`bfc`条件
- 根元素 `<html>`
- 浮动元素（元素的 `float` 不是 `none`）
- 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 `display` 为 `inline-block`）
- 表格单元格（元素的 `display` 为 `table-cell`，`HTML`表格单元格默认为该值）
- 表格标题（元素的 `display` 为 `table-caption`，`HTML`表格标题默认为该值）
- 匿名表格单元格元素（元素的 `display` 为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是`HTML`
   `table`、`row`、`tbody`、`thead`、`tfoot` 的默认属性）或 `inline-table`）
- `overflow` 值不为 `visible` 的块元素
- `display` 值为 `flow-root` 的元素
- `contain` 值为 `layout`、`content` 或 `paint` 的元素
- 弹性元素（`display` 为 `flex` 或 `inline-flex` 元素的直接子元素）
- 网格元素（`display` 为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 `column-count` 或 `column-width` 不为 `auto`，包括 `column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的`BFC`，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

特性

- 内部`box`会在垂直方向，一个接一个地放置。
- `Box`垂直方向的距离由`margin`决定，在一个`BFC`中，两个相邻的块级盒子的垂直外边距会产生折叠。
- 在`BFC中`，每一个盒子的左外边缘（`margin-left`）会触碰到容器的左边缘(`border-left`)（对于从右到左的格式来说，则触碰到右边缘）
- 形成了`BFC`的区域不会与`float box`重叠
- 计算`BFC`高度时，浮动元素也参与计算
### 解决的问题
- 父元素塌陷
- 外边距重叠
- 清除浮动

## 清除浮动
- `clearfix` 伪类
- 额外加一个div，`clear:both`
- 触发父盒子BFC，`overflow:hidden`

## 绝对定位和相对定位

`relative`： 相对于原来位置移动，不会脱离文档流。

`absolute`：相对最近的非 `static` 定位祖先元素偏移，如果找不到，将以 `初始包含快` 为参照物。脱离文档流
>初始包含块：包含 `html`元素的块，具有视口的尺寸
