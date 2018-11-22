---
title: 前后端rsa加密解密
date: 2018-11-19 09:55:53
categories:
    - vue
tags:
    - rsa加密
---

## 什么是rsa?
>RSA加密算法是一种非对称加密算法。在公开密钥加密和电子商业中RSA被广泛使用。RSA是1977年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的。当时他们三人都在麻省理工学院工作。RSA就是他们三人姓氏开头字母拼在一起组成的。

## 原理
1. 乙方生成两把密钥（公钥和私钥）。公钥是公开的，任何人都可以获得，私钥则是保密的。
2. 甲方获取乙方的公钥，然后用它对信息加密。
3. 乙方得到加密后的信息，用私钥解密。

## 前端
前端使用jsencrypt插件进行加密
```vue
<template>
  <div class="pageWrapper">
    <x-header :left-options="{backText: ''}">手机号登录</x-header>



    <Group class="inputBox" label-width="5.5em" label-align="justify" gutter="0">
      <x-input title="手机号码：" placeholder="请输入手机号码" required is-type="china-mobile" :max="11" v-model="phoneNumber"></x-input>
      <x-input title="密&emsp;码：" placeholder="请输入密码" type="password" required v-model="passWord"></x-input>
    </Group>


    <div class="login_button_wrapper">
      <x-button type="primary" class="login_button" @click.native="getKey">登录</x-button>
    </div>

  </div>
</template>

<script>
import JsEncrypt from 'jsencrypt';
import usersApi from '../api/users';

export default {
    name: 'login',
    components: {},
    data() {
        return {
            phoneNumber: '', // 手机号码
            passWord: '', // 密码
            publicKey: ''
        };
    },
    methods: {
        /**
         * @description 登录
         */
        login() {
            const obj = {
                phoneNumber: this.phoneNumber,
                passWord: this.passWord,
            };
            let encrypt = new JsEncrypt();
            encrypt.setPublicKey(this.publicKey);
            let data = {
                jsEncrypt: encrypt.encrypt(JSON.stringify(obj))
            };
            this.$http.post(usersApi.login, data).then((res) => {
                if (res.data.code === 0) {
                    const userId = JSON.stringify(res.data.data.userId);
                    localStorage.setItem('userId', userId);
                    this.$router.push({ path: '/' });
                }
            });
        },
        getKey() {
            this.$http.get('/users/publicKey').then((res) => {
                this.publicKey = res.data.data;
                this.login();
            });
        }
    }
}
</script>

```

## 后端
本文后端使用express
后端使用node自带的crypto模块进行解密
```js
const fs = require('fs');
const crypto = require('crypto');

const publicKey = fs.readFileSync('D:/software/SSL/mingw64/bin/public_key.pem', 'utf-8'); //公钥
const privateKey = fs.readFileSync('D:/software/SSL/mingw64/bin/private_key.pem', 'utf-8'); // 私钥


/**
 * @descriptiones 加密
 * @param str 要加密的数据
 */
let encrypted = function (str) {
    let buffer = new Buffer(str);
    let encrypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buffer);
    return encrypted.toString('base64');
};

/**
 * @descriptiones 解密
 * @param str 要解密的数据
 */
let decrypted = function (str) {
    let buffer = new Buffer(str, 'base64');
    let decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buffer);
    console.log(decrypted.toString("utf8"),111);
    return decrypted.toString("utf8");
};



 let str = myCrypto.decrypted(req.body.jsEncrypt); // 解密后的数据
```

## 为什么RSA公钥每次加密得到的结果都不一样？
不管是使用RSA私钥进行签名还是公钥进行加密，操作中都需要对待处理的数据先进行填充，然后再对填充后的数据进行加密处理。

简单说来，PKCS #1 v1.5规定的填充格式为：
```
EB = 00 || BT || PS || 00 || D

D: data （指待处理数据，即填充前的原始数据）
PS: padding string （填充字符串）
BT: block type （数据块类型）
EB: encryption block （待加密的数据块，经过填充后结果）
||: 表示连接操作 （X||Y表示将X和Y的内容连接到一起）


"填充后数据" = "00" + "数据块类型" + "填充字符串" + "00" + "原始数据"
```
“填充块类型”BT决定了紧挨着的”填充字符串”PS的内容。 
BT的可能取值包括00, 01和02：

针对私钥处理的数据，BT取值为00或01; 
BT取值为00时，PS为全00的字符串
BT取值为01时，PS为全FF的字符串，通过填充得到的整数会足够大，可以阻止某些攻击，因此也是推荐的填充方式
针对公钥处理的数据，BT取值为02； 
使用伪随机的16进制字符串填充PS，而且每次操作进行填充的伪随机书都是独立的
针对公钥处理的数据，其填充内容为伪随机的16进制字符串，每次操作的填充内容都不一样。这就是为什么每次使用公钥加密数据得到的结果都不一样了。
## 参考
https://blog.csdn.net/guyongqiangx/article/details/74930951