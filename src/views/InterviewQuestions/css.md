# css

## 盒模型

组成：`margin` + `border` + `padding` + `content`
- W3C的标准盒模型：`width` = `content`
- IE盒模型：`width` = `border` + `padding` + `content`
- 弹性盒子模型

## 垂直水平居中
- `flex` 
- `position` + `transform`
- `position` + 负`margin`
- 已知宽高 设置各个方向的距离都是0，再将`margin`设为`auto`

## 三栏布局 （左右固定中间自适应）
- flex
- position + margin
- float + margin
- calc
- 圣杯
- 双飞翼

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
### 解决的问题
- 父元素塌陷
- 外边距重叠
- 清除浮动

## 清除浮动
- clearfix 伪类
- 额外加一个div，clear:both
- 触发父盒子BFC，overflow:hidden

## 绝对定位和相对定位

`relative`： 相对于原来位置移动，不会脱离文档流。

`absolute`：相对最近的非 `static` 定位祖先元素偏移，如果找不到，将以 `初始包含快` 为参照物。脱离文档流
>初始包含块：包含 `html`元素的块，具有视口的尺寸

## 重绘和回流
`重绘` 是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘  
`回流` 是布局或者几何属性需要改变就称为回流  
以下情况发生`回流`：
- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

`回流`必定会发生`重绘`，`重绘`不一定会引发`回流`。  

## 自适应的正方形
```css
.square {
    width: 10vw;
    height: 10vw;
    background: red;
}
/*第二种*/
.square {
   width: 10%;
   padding-bottom: 10%; 
   height: 0; // 防止内容撑开多余的高度
   background: red;
}
```
## css 实现图形
```css
/*三角形*/
.triangle {
    width:0;
    height:0;
    border: 30px solid transparent;
    border-top-color: red;
}
/*梯形*/
.trapezoid{
    width:100px;
    height:100px;
    border: 30px solid transparent;
    border-top-color: red;
}
/*圆形*/
.round{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
}
/*半圆*/
.semicircle{
    width:100px;
    height:50px;
    border-radius: 50px 50px 0 0;
    background-color: red;
}
```
