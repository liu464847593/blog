---
title: 前后端登录验证
date: 2018-11-22 10:09:03
categories:
    - vue
tags:
    - vue
---

## 登录验证介绍
1. 传统的session+cookie身份验证
用户登录后，服务端生成session 用于记录当前用户身份，再将session 发送给客户端生成cookie,客户端每次请求都会带上cookie，如果客户端的cookie 和服务端的session对应则用户验证通过
2. token 验证
用户登录后，服务端生成有效token ，再将token 发送给客户端，用户获取后一般存在localstorage，客户端每次请求带上token，如果token正常解析则用户验证通过

对比传统的校验方式，token校验有如下优势：

- 在基于token的认证，token通过请求头传输，而不是把认证信息存储在session或者cookie中。这意味着无状态。你可以从任意一种可以发送HTTP请求的终端向服务器发送请求。
- 可以避免CSRF攻击
- 当在应用中进行 session的读，写或者删除操作时，会有一个文件操作发生在操作系统的temp 文件夹下，至少在第一次时。假设有多台服务器并且 session 在第一台服务上创建。当你再次发送请求并且这个请求落在另一台服务器上，session 信息并不存在并且会获得一个“未认证”的响应。我知道，你可以通过一个粘性 session 解决这个问题。然而，在基于 token 的认证中，这个问题很自然就被解决了。没有粘性 session 的问题，因为在每个发送到服务器的请求中这个请求的 token 都会被拦截。

## 前端代码
vue axios 处理
```js
Vue.prototype.$http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

```
## 后端代码
express 处理
jsonwebtoken 用来生成token
express-jwt是用来验证token的
```js
// login
var jwt = require('jsonwebtoken');
 let token = jwt.sign({userId:result[0].userId},privateKey,{
                    algorithm: 'RS256',
                    expiresIn : 60 * 30 // 授权时效半小时
                });
                res.json({
                    code: 0,
                    data: {
                        userId: result[0].userId,
                        token: token
                    },
                    desc: '登录成功'
                });
                
// app.js
var expressJwt = require('express-jwt');
app.use(expressJwt({secret: publicKey,requestProperty: "auth"}).unless({path: ["/users/login", "/users/publicKey"]}));
```
## 注意
```
1.前端的token
    config.headers['authorization'] = `Bearer ${token}`;
    这么写 express-jwt 才能正确解析 
2.后端的加密顺序 是 私钥加密 再公钥解密
```

## 参考
https://juejin.im/post/5b06c6baf265da0db4791805  
https://juejin.im/post/5ac6fcb1f265da237f1e8994  
https://blog.csdn.net/qq_27818541/article/details/76656784