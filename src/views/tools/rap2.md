## 什么是rap2
阿里妈妈前端团队出品的开源接口管理工具RAP第二代

## 环境要求
- Node.js 8.9.4+
- MySQL 5.7+
- Redis 4.0+

## 步骤
1. redis 目录下 启动redis-server
```npm
redis-server
```
2. 创建数据库 msqyl命令
```npm
CREATE DATABASE IF NOT EXISTS RAP2_DELOS_APP DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```
3. 初始化
```npm
npm install
```
4. 配置文件
```npm
 目录：rap2-delos/src/config
   文件：`config.dev.ts`;其中dev，表示开发环境，其他同理
   修改：`config.dev.ts`文件中`db`对象中`username`，`password`参数与**本地**或者**开发环境**的数据库信息匹配
```
  
5. 安装 && TypeScript编译
```npm
npm install -g typescript
npm run build
```
6. 初始化数据库表
```npm
npm run create-db
```
7. 执行mocha测试用例和js代码规范检查
```npm
npm run check
```
8. 启动开发模式的服务器 监视并在发生代码变更时自动重启
```npm
npm run dev
```
看到浏览器中如下提示，表示**服务端delos**已经部署成功

> RAP2后端服务已启动，请从前端服务(rap2-dolores)访问。 RAP2 back-end server is started, please visit via front-end service (rap2-dolores).

## 前端页面
```
npm install
npm run build

npm install -g serve
serve -s ./build -p 80
```

## 常见问题
1. npm run build 报错（src/routes/router.ts:18:31 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.）   
打开 `tsconfig.json` 文件，找到 `noImplicitAny`，改为 false


## 参考
1. https://github.com/thx/rap2-delos 后端服务
2. https://github.com/thx/rap2-dolores 前端服务
