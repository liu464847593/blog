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