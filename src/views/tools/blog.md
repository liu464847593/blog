## 利用docsify搭建自己的博客
---
## 什么是docsify？
>`docsify` 是一个动态生成文档网站的工具。不同于 `GitBook`、`Hexo` 的地方是它不会生成将 `.md` 转成 `.html` 文件，所有转换工作都是在运行时进行。
>这将非常实用，如果只是需要快速的搭建一个小型的文档网站，或者不想因为生成的一堆 `.html` 文件“污染” commit 记录，只需要创建一个 `index.html` 就可以开始写文档而且直接部署在 `GitHub Pages`。

## 安装docsify
```bash
  npm i docsify-cli -g
```

## 初始化项目
```bash
  docsify init ./docs
```

## 本地预览网站
```bash
  docsify serve docs
```
这里可以自己写个脚本npm， `npm init` 创建 `package.json` 文件，加入
```bash
 "scripts": {
    "start": "docsify serve"
  }
```
下次直接使用 `npm run start` 就可以启动项目了

## jenkins 一键发布docsify

### 安装docker
```shell
yum -y install docker
```
### 给Docker守护进程配置加速器
docker使用原镜像下载太慢了，这里替换下镜像
```shell
// 通过配置文件启动Docker,修改/etc/docker/daemon.json 文件并添加上 registry-mirrors 键值
sudo vim /etc/docker/daemon.json
```
```
{
 "registry-mirrors": ["https://registry.docker-cn.com"]
}
```
```shell
sudo service docker restart
```

### 安装jenkins
```shell
docker pull jenkinsci/blueocean
```
```shell
// 可以进入jenkins容器输入命令
docker exec -it jenkins-blueocean /bin/bash
```



## 参考地址：
1. docsify介绍：https://docsify.js.org/#/zh-cn/
2. docker安装：https://www.w3cschool.cn/docker/centos-docker-install.html
3. docker更换为国内镜像：https://www.jianshu.com/p/84b6fe281b4d
4. jenkins 安装 https://jenkins.io/zh/doc/book/installing/
5. jenkins 配置 https://cloud.tencent.com/developer/article/1461397

