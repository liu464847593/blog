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
exports.encrypted = function (str) {
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
exports.decrypted = function (str) {
    let buffer = new Buffer(str, 'base64');
    let decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buffer);
    console.log(decrypted.toString("utf8"),111);
    return decrypted.toString("utf8");
};



 let str = JSON.parse(myCrypto.decrypted(req.body.jsEncrypt)); // 解密后的数据
```