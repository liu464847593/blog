## 为什么要封装框架
搭框架就像建房子，地基必须稳，项目也是如此。封装一个好的框架也是为了更快速开发项目，不重复造轮子，便于维护，统一管理项目
`code once think twice`

## 怎么搭一个好的项目架构
这里用vue项目做demo

### vue-cil搭建项目架构
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳
衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。并不建议自己去搭脚手架，可以自己研究，但是在项目里面还是推荐拿过来直接用  
地址：https://cli.vuejs.org/zh/

### 移动端适配
移动端用postcss-pxtorem 和lib-flexible 适配  
- `lib-flexible` 会自动设置`html`的`font-size`值，`lib-flexible`已放弃，可使用 `amfe-flexible`
- `postcss-pxtorem`会把你写`px`单位转为`rem`

### ui框架
移动端推荐：vant  
pc端推荐：pc端用elementUi  
需要的话下载皮肤
ui组件如果用到2次以上建议封装成组件，而不是一个个去重制样式

选择框架需要考虑的：  
- 是否有团队维护（vux是个人维护的，现在很少维护了）  
- 文档是否清晰明了，组件是否丰富  
- start是否足够多，解决问题是否迅速，更新频率是否频繁，社区是否活跃  

### 引入公共样式
- Normalize.css 使浏览器更一致地渲染所有元素，并符合现代标准。它只针对需要规范化的样式。https://github.com/necolas/normalize.css/
它和reset.css区别：Normalize 相对「平和」，注重通用的方案，重置掉该重置的样式，保留有用的 user agent 样式，同时进行一些 bug 的修复，
这点是 reset 所缺乏的。Reset 相对「暴力」，不管你有没有用，统统重置成一样的效果，且影响的范围很大，讲求跨浏览器的一致性。
- common.css：清除浮动，1px-border，单行或多行文字省略

### 二次封装
- 封装自己的utils方法并挂载到vue原型上
- 二次封装axios，api统一管理，$api挂载到vue原型上方便调用,统一判断 `code`为`0`的情况，对请求异常统一处理，页面接口异常请求的回调
- 图片懒加载，加载失败图，占位图统一处理
- 路由的懒加载，模块化管理 vuex,图片，公共组件
- 2次用到同样的组件封装在公共components文件中，只是业务模块的就放在业务模块的components中，如果是公共组件不满足当前业务可以进行扩展，而不是重新封装一个

### 权限控制
类似菜单权限，按钮权限单独文件夹处理

### 代码管理
- [css命名BEM](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
- eslint规则
- style 样式规范
- git分支管理的把控
- git提交规范


### 输出文档
文档是最重要的，不仅仅代表了自己对整个项目的理解程度也是方便新加入的开发熟悉项目尽快上手  
文档包括：git提交规范，各个分支的含义，开发规范，封装的公共组件说明文档

### 参考
后台管理参考框架：https://github.com/PanJiaChen/vue-element-admin
