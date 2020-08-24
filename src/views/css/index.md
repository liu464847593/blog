## BFC
`块格式化上下文`：它是一个独立的容器，并且容器里元素的布局不会影响到容器外

形成`bfc`条件
- 根元素 `<html>`
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML
   table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

特性

- 内部box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定，在一个BFC中，两个相邻的块级盒子的垂直外边距会产生折叠。
- 在BFC中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）
- 形成了BFC的区域不会与float box重叠
- 计算BFC高度时，浮动元素也参与计算

## div 水平垂直居中

```css
div.parent{
  display:flex;
}
div.child{
  margin:auto;
}
```
```css
/*1定宽高 使用定位+margin*/
element.style {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -250px;
    width: 500px;
    height: 500px;
    background: yellow;
    z-index: 1;
}
/*使用定位+transfrom*/
element.style {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    height: 500px;
    background: yellow;
    z-index: 1;
    transform: translate3d(-50%,-50%,0);
}
```

```css
/*不定宽高*/
element.style {
    position: absolute;
    left: 50%;
    top: 50%;
    background: yellow;
    z-index: 1;
    transform: translate3d(-50%,-50%,0);
}
```
```css
div.parent {
display: table;
}
div.child {
display: table-cell
vertical-align: middle;
text-align: center;
}
```
