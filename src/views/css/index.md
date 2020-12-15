## css 或 js 实现多行文本溢出省略效果
```
单行：
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
多行：
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; //行数
overflow: hidden;
兼容：
p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;}
p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
background: -webkit-linear-gradient(left, transparent, #fff 55%);
background: -o-linear-gradient(right, transparent, #fff 55%);
background: -moz-linear-gradient(right, transparent, #fff 55%);
background: linear-gradient(to right, transparent, #fff 55%);
}
```
```js
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}
```
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

## 绝对定位和相对定位

`relative`： 相对于原来位置移动，不会脱离文档流。

`absolute`：相对最近的非 `static` 定位祖先元素偏移，如果找不到，将以 `初始包含快` 为参照物。脱离文档流
>初始包含块：包含 `html`元素的块，具有视口的尺寸

