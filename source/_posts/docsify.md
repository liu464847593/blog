---
title: docsify
date: 2018-11-16 09:38:58
categories:
    - 文档网站生成工具
tags: docsify
---
## 什么是docsify？
>`docsify` 是一个动态生成文档网站的工具。不同于 `GitBook`、`Hexo` 的地方是它不会生成将 `.md` 转成 `.html` 文件，所有转换工作都是在运行时进行。
>这将非常实用，如果只是需要快速的搭建一个小型的文档网站，或者不想因为生成的一堆 `.html` 文件“污染” commit 记录，只需要创建一个 `index.html` 就可以开始写文档而且直接部署在 `GitHub Pages`。

## 快速开始
```bash
npm i docsify-cli -g
```

## 初始化项目
```bash
docsify init ./docs
```

## 本地预览
```bash
docsify serve docs
```
github:https://docsify.js.org