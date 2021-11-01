# css
### 垂直水平居中的几种方式
### 三栏布局 （左右固定中间自适应）
### 什么是BFC？
### 怎么清除浮动
### 绝对定位和相对定位的区别
### 自适应的正方形
<details>
<summary>代码</summary>

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
</details> 

### css 实现图形
<details>
<summary>代码</summary>


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
</details> 

### flex：1代表什么
flex:1 === flex: 1 1 0%

- `flex-grow`: 项目的放大比例
- `flex-shrink`: 项目的缩小比例
- `flex-basis`: 项目的本来大小

### 如何解决移动端 Retina 屏 1px 像素问题
1. `border-image` 实现
```css
.border-image-1px {
  border-bottom: 1px solid #666;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-image-1px {
    border-bottom: none;
    border-width: 0 0 1px 0;
    -webkit-border-image: url(../img/linenew.png) 0 0 2 0 stretch;
    border-image: url(../img/linenew.png) 0 0 2 0 stretch;
  }
}
```
2. `background-image` 实现
```css
.background-image-1px {
  background: url(../img/line.png) repeat-x left bottom;
  -webkit-background-size: 100% 1px;
  background-size: 100% 1px;
}
```
3. `box-shadow`实现
```css
.box-shadow-1px {
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```
4. `viewport + rem` 实现
```html
<!--在devicePixelRatio = 2 时，输出viewport：-->
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
<!--在devicePixelRatio = 3 时，输出viewport：-->
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">
```
5. 伪类 + transform 实现
```css
.scale-1px{
  position: relative;
  border:none;
}
.scale-1px:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #000;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```