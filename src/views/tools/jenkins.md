## 什么是Jenkins
Jenkins是开源CI&CD软件领导者， 提供超过1000个插件来支持构建、部署、自动化， 满足任何项目的需要

## 安装docker
这里使用docker安装jenkins
```shell
yum -y install docker
```
## 给Docker守护进程配置加速器
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

## 安装jenkins
```shell
docker pull jenkinsci/blueocean
```
```shell
// 可以进入jenkins容器输入命令
docker exec -it jenkins-blueocean /bin/bash
```
## 运行容器
```shell
docker run \
  --name jenkins-blueocean \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  jenkinsci/blueocean
  // Tips：8080 端口用来公开访问 Web 界面，50000 端口允许访问远程 Java (JIRA) API。
```
## 配置jenkins
配置正常 访问 http://<ipaddress>:8080 可进入jenkins页面
- 解锁Jenkins 密码在 `/var/jenkins_home/secrets/initialAdminPassword `
- 选择安装推荐的插件
- 创建用户
- 配置实例

## 参考
1. docker安装：https://www.w3cschool.cn/docker/centos-docker-install.html
2. docker更换为国内镜像：https://www.jianshu.com/p/84b6fe281b4d
3. jenkins 安装 https://jenkins.io/zh/doc/book/installing/
4. jenkins 配置 https://cloud.tencent.com/developer/article/1461397
