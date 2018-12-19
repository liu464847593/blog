---
title: webstorm 获取注册码
date: 2018-12-19 10:27:12
categories: webstorm
tags: webstorm
---

## 步骤
1. 打开 `C:\Windows\System32\drivers\etc` 的`host`文件，最后一行添加`0.0.0.0 account.jetbrains.com`
2. 打开 `http://idea.lanyus.com/` 获取注册码，将注册码粘贴于webstorm

## 问题
1. 出现 host 拒绝访问的提示：
解决：复制host文件到桌面并修改，再把修改好的文件覆盖到之前的文件路径