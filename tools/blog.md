## 利用docsify搭建自己的博客
---
## 安装docsify
```bash
  npm i docsify-cli -g
```

## 初始化项目
```bash
  docsify init ./docs
```

## 本地预览网站
```bash
  docsify serve docs
```
这里可以自己写个脚本npm， `npm init` 创建 `package.json` 文件，加入
```bash
 "scripts": {
    "start": "docsify serve"
  }
```
下次直接使用 `npm run start` 就可以启动项目了



参考地址：https://docsify.js.org/#/zh-cn/