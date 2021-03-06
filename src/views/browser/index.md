## 事件流
`事件流`：页面接受事件的顺序
- `事件冒泡流`：事件开始时由最具体的元素接收，逐级向上传播到不具体的节点
- `事件捕获流`：不太具体的节点应该更早接收到事件，最具体的节点应该最后接收到事件

`事件委托`：利用事件冒泡，将事件监听器设置在父节点上，并让子节点发生的事情冒泡到父节点上

### DOM事件流
事件捕获阶段 -> 处于目标阶段 -> 事件冒泡阶段

`event.stopPropagation()`：阻止捕获和冒泡阶段中当前事件的进一步传播  
`event.preventDefault();`：阻止事件触发后默认动作

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

## 跨域
>跨域是由浏览器同源策略引起的，是指页面请求的接口地址，必须与页面url地址处于同域上（即域名，端口，协议相同）。
这是为了防止某域名下的接口被其他域名下的网页非法调用，是浏览器对JavaScript施加的安全限制。

### 解决方案
- `JSONP`：利用script标签可跨域的特点，在跨域脚本中可以直接回调当前脚本的函数
- `CORS`：服务器设置HTTP响应头中Access-Control-Allow-Origin值，解除跨域限制
- 代理和反向代理

### 代理
>代理，也称正向代理，是指一个位于客户端和目标服务器(target server)之间的服务器，为了从目标服务器取得内容，客户端向代理发送一个请求并指定目标(目
标服务器)，然后代理向目标服务器转交请求并将获得的内容返回给客户端。

数据流程：  
数据请求过程：`浏览器`->`代理服务器`->`目标服务器`  
数据返回过程：`目标服务器`->`代理服务器`->`浏览器`

### 反向代理
>反向代理（Reverse Proxy）是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给inter
>net上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

数据流程：  
数据请求过程：`浏览器`->`【反向代理服务器->处理数据的服务器】`  
数据返回过程：`【处理数据的服务器->反向代理服务器】`->`浏览器`

## 浏览器缓存
[浏览器缓存](https://shimo.im/mindmaps/g3Jpx6dQyxKRXygH/)

## 浏览器渲染原理
- 浏览器接收到 `HTML` 文件并转换为 `DOM` 树（`字节数据`->`字符串`->`Token`->`Node`->`DOM`）
- 将 `CSS` 文件转换为 `CSSOM` 树 （`字节数据`->`字符串`->`Token`->`Node`->`CSSOM`）
- 生成渲染树(当我们生成 `DOM` 树和 `CSSOM` 树以后，就需要将这两棵树组合为渲染树)
- 根据渲染树来布局，以计算每个节点的几何信息
- 将各个节点绘制到屏幕上

## 存储

|特性|cookie|localStorage|sessionStorage|indexDB|
|:---|:---:|:---:|:---:|:---:|
|数据生命周期|一般由服务器生成，可以设置过期时间	|除非被清理，否则一直存在|页面关闭就清理|除非被清理，否则一直存在|
|数据存储大小|4K|5M|5M|无限|
|与服务端通信|每次都会携带在 header 中，对于请求性能影响	|不参与|不参与|不参与|