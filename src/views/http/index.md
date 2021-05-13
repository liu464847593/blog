## keep-alive
`Connection:keep-aclive`  
建立长连接，能在多次HTTP之间重用一个TCP连接，从而减少创建/关闭多个TCP连接的开销（响应时间，CPU资源，减少拥堵等）  
[http](https://shimo.im/mindmaps/xGCWpVVJQx8VxxpD)  
[https](https://shimo.im/mindmaps/gCpqKgrqdKdTdhdX)  

## HTTP状态码
|状态码|描述|
|:---|:---:|
|200|请求成功|
|301|永久重定向|
|302|临时重定向|
|307|临时重定向，不允许浏览器将原本为 POST 的请求重定向到 GET 请求上|
|400|客户端请求的语法错误，服务器无法理解|
|401|请求要求用户的身份认证|
|403|服务器理解请求客户端的请求，但是拒绝执行此请求|
|404|找不到资源|
|500|服务器内部错误，无法完成请求|
|...|...|