---
title: 将一维数组转换成树结构
date: 2018-11-30 13:49:06
tags: JS
categories:
    - JS
---

## 场景
express 查询数据库得到一维数组，需要转出树结构输出给前端
数组中每个元素需要：
1. 拥有唯一的id
2. 拥有唯一的的parentId,并且指向他父级id

## demo
```js
var result = [
                     {
                         "id": "12",
                         "parentId": "0",
                         "text": "Man",
                         "level": "1",
                         "children": null
                     },
                     {
                         "id": "6",
                         "parentId": "12",
                         "text": "Boy",
                         "level": "2",
                         "children": null
                     },
                             {
                         "id": "7",
                         "parentId": "12",
                         "text": "Other",
                         "level": "2",
                         "children": null
                     },
                     {
                         "id": "9",
                         "parentId": "0",
                         "text": "Woman",
                         "level": "1",
                         "children": null
                     },
                     {
                         "id": "11",
                         "parentId": "9",
                         "text": "Girl",
                         "level": "2",
                         "children": null
                     }
                 ];
function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== "0") {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}
console.log(list_to_tree(result));
```

## 参考
1. https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
