# 2 Docker安装

Docker 的官网地址：`https://www.docker.com/`，在官网可以找到 `Docker Engine` 的安装步骤。

下面进行 Docker 环境的安装，正常情况下 Docker 都是运行在 Linux 服务器上的，因为 Docker 依赖于宿主机的操作系统内核，也就是依赖已经存在并运行的 Linux 内核环境，Docker 只是在已经运行的 Linux 上制造了一个隔离的文件环境，所以所在的主机必须是 Linux 操作系统。即使在 Windows 操作系统也可以安装 Docker，但前提是必须先安装一个虚拟机，并在其中安装Linux操作系统。然后，在虚拟机中的Linux系统上运行Docker。

  

## 2.1 Ubuntu安装Docker

所以这里以Ubuntu 22.04 为例，安装 Docker（其他Linux版本，例如 CentOS，也可以在官网找到安装步骤）。

CentOS 安装和卸载说明：https://docs.docker.com/engine/install/centos/

### 1 卸载旧版本（如果有）

```
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### 2 更新包索引并安装依赖

```
sudo apt-get update

sudo apt-get install ca-certificates curl gnupg
```


### 3 添加Docker官方GPG密钥

```
sudo mkdir -m 0755 -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg
```


### 4 添加Docker APT仓库

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 5 安装Docker引擎

```
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 6 启动Docker服务

```
sudo systemctl start docker
```

### 7 查看Docker版本

```
docker version
```

![](http://p4ui.toweydoc.tech:20080/images/stydocs/20231226102019.60713e8b.jpg)

### 8 防止Docker自动更新

```
sudo apt-mark hold docker-ce
```

### 9 允许非root用户使用Docker

默认情况下只有root权限才可以使用Docker，使用下列命令将用户加入到Docker组，以便该用户无需 sudo 即可执行 docker 命令：

```
sudo usermod -aG docker $USER

newgrp docker
```


**注意:** 将本地用户添加到 docker 组后，请确保注销并再次登录。

### 10 运行Hello World

```
sudo docker run hello-world
```


`docker run hello-world` 是运行 `hello-world` 镜像，会在本地查看有没有 `hello-world` 镜像，如果有会直接运行镜像，如果没有会下载镜像，下载完成再运行镜像。

![](http://p4ui.toweydoc.tech:20080/images/stydocs/20240124092557.18980cdc.jpg)

执行结果：

![](http://p4ui.toweydoc.tech:20080/images/stydocs/20231226101316.1d5dc6d8.jpg)

`hello-world` 镜像是 Docker 提供的一个极简的示例镜像，用于测试 Docker 是否正确安装和运行。`hello-world` 容器在运行完其任务后会自动停止。这个容器的任务非常简单，只是输出 "Hello from Docker!" 这一条消息，然后完成其工作。

## 2.2 阿里云镜像加速

Docker 官方提供了镜像仓库是 `DockerHub` ，但是服务器是在国外的，在国内使用下载镜像会很慢，所以我们配置阿里云镜像服务后，下载镜像会快很多。

### 1 注册并登录阿里云

网址：`https://www.aliyun.com/`

直接注册登录

###  2 获取镜像加速地址

搜索镜像服务：

![](http://p4ui.toweydoc.tech:20080/images/stydocs/20240123234026.52f27981.jpg)

获取加速地址：

![](http://p4ui.toweydoc.tech:20080/images/stydocs/20240123234400.cba00306.jpg)

### 3 配置镜像加速

按照上面配置镜像加速的脚本，依次执行：

```
sudo mkdir -p /etc/docker
```


```
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxxxxx.mirror.aliyuncs.com"]    # 这里配置的是你自己的地址，别搞错了
}
EOF
# 重新加载服务
sudo systemctl daemon-reload
# 重启docker服务
sudo systemctl restart docker
```

有了加速器，下载镜像速度能快很多。