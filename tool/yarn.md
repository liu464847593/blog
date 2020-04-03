---
title: yarn
date: 2018-12-10 22:05:00
categories:
    - tool
tags:
    - tool
---

## 什么是yarn?
>快速、可靠、安全的依赖管理工具。
1. 速度超快。  
Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
2. 超级安全。  
在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。
3. 超级可靠。  
使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。

## 为什么要用yarn?
1. npm 用的是国外的镜像下载时经常挂出错
2. 国内也有淘宝镜像的cnpm 但是下载的包过多且凌乱，用的是`_xxx@xx`的包，有时候会出错
3. 当然你也可以使用`npm install XXX  --registry=https://registry.npm.taobao.org ` 有时候也会出错

## 安装
```npm
npm install yarn
```
## 初始化一个新项目
```npm
yarn init
```

## 添加依赖包
```npm
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

## 将依赖项添加到不同依赖项类别中
分别添加到 devDependencies、peerDependencies 和 optionalDependencies 类别中：
```npm
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```
## 升级依赖包
```npm
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

## 移除依赖包
```npm
yarn remove [package]
```

## 安装项目的全部依赖
```npm
yarn
```
## npm 与 yarn 命令 对比
https://yarn.bootcss.com/docs/migrating-from-npm/

## 参考
1. https://yarn.bootcss.com/