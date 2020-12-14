# css

## 盒模型

组成：`margin` + `border` + `padding` + `content`
- W3C的标准盒模型：`width` = `content`
- IE盒模型：`width` = `border` + `padding` + `content`

## 垂直水平居中
- `flex` 
- `position` + `transform`
- `position` + 负`margin`
- 已知宽高 设置各个方向的距离都是0，再将`margin`设为`auto`

## 三栏布局
- flex
- position + margin
- float + margin

## BFC

### 解决的问题
- 父元素塌陷
- 外边距重叠
- 清除浮动
