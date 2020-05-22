## vue
1. 使用`v-for`实现列表渲染的时候，提示`xxx undefined`

> 不推荐同时使用 v-if 和 v-for  
当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

解决方案
``` vuejs
1. <template v-if="menu">
        <div v-for="item in menu.items">{{ item.text }}</div>
    </template>
    
2. <div v-for="item in (menu ? menu.items : [])">{{ item.text }}</div>    
```

## 小程序
1. `picker`组件第一次滑动不会触发`bindcolumnchange`，原因：没有`value`值

如何实现微信@人，删除人一并连@删除？

