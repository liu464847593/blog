---
title: vue使用v-for提示undefined
date: 2018-11-26 11:39:06
categories: question
tags: question
---
## 场景
用vue，v-for实现列表渲染的时候，提示`xxx undefined`

## 注意
> 不推荐同时使用 v-if 和 v-for  
当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

## 解决方案
``` vuejs
1. <template v-if="menu">
        <div v-for="item in menu.items">{{ item.text }}</div>
    </template>
    
2. <div v-for="item in (menu ? menu.items : [])">{{ item.text }}</div>    
```

## 参考
1. https://cn.vuejs.org/v2/guide/conditional.html
2. https://cn.vuejs.org/v2/guide/list.html#v-for-with-v-if
3. https://stackoverflow.com/questions/43740813/vuejs-v-for-how-to-check-list-undefined-before-continue
