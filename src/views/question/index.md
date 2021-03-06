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
2. 尽量不用EventBus事件总线进行通信，在keepAlive的环境下，容易多次触发点击
 - EventBus 适合同一页面不同组件通信，不同页面通信要加唯一值防止其他页面多次触发

## 小程序
1. `picker`组件第一次滑动不会触发`bindcolumnchange`，原因：没有`value`值
2. 小程序不支持上传附件， `chooseMessageFile` 可以从客户端会话选择文件
3. 小程序提供富文本组件`editor`
4. 安卓 wx.getSystemInfoSync 获取 windowHeight 不准确 应该在 `onReady`周期里面调用

如何实现微信@人，删除人一并连@删除？
https://github.com/ichord/At.js/

小程序实现拖拽效果，类似支付宝
https://www.cnblogs.com/haha1212/p/11562944.html

## ie11
ie11 new Date() 为`Invalid Date`应该讲时间格式的 `-` 转`/`
