---
title: 适配器模式
date: 2019-02-15 20:42:39
tags: 适配器模式
categories:
    - 设计模式
---
## 什么是适配器模式
解决两个软件实体间的接口不兼容的问题

## demo
```js
var googleMap = {
    show:function() {
        console.log('开始渲染谷歌地图');
    }
};
var baiduMap = {
    show:function() {
        console.log('开始渲染百度地图');
    }
};
var baiduMapAdapter = {
    show:function () {
        return baiduMap.show();
    }
}
renderMap(googleMap);
renderMap(baiduMapAdapter);
```

