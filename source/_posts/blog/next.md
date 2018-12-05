---
title: next 定制自己的博客主题
date: 2018-12-05 16:03:43
tags: hexo
categories:
    - blog
---

## 下载next
```npm
 cd your-hexo-site
 git clone https://github.com/iissnan/hexo-theme-next themes/next
```

## 启动主题
打开 站点配置文件， 找到 theme 字段，并将其值更改为 next。
```npm
theme: next
```
主题配置官网讲述的很详细，再次不多述。

## 常见问题
1. 上传到github 没有看到效果？  
    hexo 的缓存很严重，每次执行`hexo clean` 后再上传
2. 第一次使用next主题 xxx.github.io 看不到效果？
    删除项目下的`_git`文件和`public` 文件 执行`hexo clean` 再次上传文件

## 参考
1. http://theme-next.iissnan.com/