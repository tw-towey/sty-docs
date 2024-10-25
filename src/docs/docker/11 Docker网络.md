# 11 Docker网络

先说我们现在遇到的问题：

我们现在有一个 Redis 容器，一个 SpringBoot 项目容器，在 SpringBoot 项目的代码中如何访问 Redis 容器中的服务呢？

在 SpringBoot 项目中肯定不能使用 `localhost`，因为 `localhost` 表示当前的容器。之前都是将容器的端口映射到宿主机上的，所以我们访问容器中的服务器，都是通过 `宿主机IP+端口` 的方式来访问容器中的服务。所以在 SpringBoot 项目的容器中也可以通过 `宿主机IP + redis:6379端口` 来访问到 Redis 容器中的服务。

如果宿主机的IP不固定，会发生变化呢？那么容器之间该如何通信呢？

这就需要 Docker 网络了，Docker 网络主要解决的就是容器间的通信问题。

  

在启动了 Docker 之后，使用 `ifconfig` 命令查看网络信息，可以看到一个 docker0 的网络：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224115325.989c4f98.jpg)

**这个 docker0 就是 Docker 创建的虚拟网桥，用于容器与宿主机、容器与容器之间的网络通信。**

> 上面的 enp0s5 是一个网络接口，是宿主机的物理或虚拟网络接口；
> 
> lo：是一个回环接口，通常用于允许计算机与其自身进行网络通信。

## 11.1 网络模式

我们在使用虚拟机的时候，虚拟机会有不同的网络模式，例如桥接、共享等；和虚拟机有些类似，安装 Docker 以后，也会默认创建三种网络模式，可以通过 `docker network ls` 查看。

```
# 命令
docker network ls
```

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224173126.d221e77e.jpg)

默认会有 `bridge` 、`host` 、 `none` 三种模式。

  

网络操作有一些命令，这里先简单了解一下，可以通过帮助命令来查看有哪些命令：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224173627.229c4e94.jpg)

可以看到 `docker network` 有 connect 、create、disconnect、inspect、ls、prune、rm 命令。

### 1 创建网络

我们可以创建自己的网络，命令如下：

```
# 命令
docker network create 网络名称

# 举个栗子：
docker network create doubi-network
```

创建未完成，可以查看到网络，默认也是 `bridge` 模式。

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224173942.2bd49f48.jpg)

### 2 删除网络

删除也非常简单，命令如下：

```
# 命令
docker network rm 网络ID/名称

# 举个栗子：
docker network rm doubi-network
```

运行如下：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224174301.901d1548.jpg)

### 3 查看网络详细信息

可以通过如下命令查看网络的详细信息：

```
# 命令
docker network inspect 网络ID/名称

# 举个栗子：
docker network inspect bridge
```


查看名称为 `bridge` 的网络的详细信息：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224174937.f29c15d1.jpg)

上图可以看到 `bridge` 网络的网桥名称就是 `docker0` 。

  

下面来介绍一下各种网络模式，以及如何使用来解决问题的。

## 11.2 bridge网络模式

**bridge网络模式**：为每一个容器分配、设置 IP 等，并将容器连接到一个 `docker0` 虚拟网桥，Docker 网络默认使用的就是该模式。

所以我们一开始通过 `ifconfig` 查看网络的时候，看到的 `docker0` 就是为 `bridge` 网络模式提供的虚拟网桥，该模式下，每一个容器都会有一个 IP 地址，每个容器的网络是独立的，一般情况下我们都是使用的这种模式。

在 `docker run` 命令中使用 `--network bridge` 指定使用该模式，一般不用写，默认就是用的这一个，使用 docker0 网桥。**其实可以理解为 docker0 是一个路由器，各个容器都是连接到这个路由器上，通过这个路由器实现容器间的互连。**

  

下面演示一下，首先使用 ubuntu 镜像启动两个容器：

```
# 如果本地没有ubuntu镜像，则首先拉取一个ubuntu镜像
docker pull ubuntu

# 启动容器ubuntu-1
docker run -it --name ubuntu-1 ubuntu /bin/bash

# 启动容器ubuntu-2
docker run -it --name ubuntu-2 ubuntu /bin/bash
```


此时查看两个 ubuntu 容器的详细信息，详细信息很长，使用 `| tail -n 20` 只查看最后的20行，会显示出容器的网络信息：

```
# 查看容器ubuntu-1的详细信息
docker inspect ubuntu-1 | tail -n 20

# 查看容器ubuntu-2的详细信息
docker inspect ubuntu-2 | tail -n 20
```


运行如下：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224223609.8b383f6f.jpg)

通过上面可以看出，每个容器有自己的 IP。

  

此时在宿主机上，使用 `ip addr` 命令查看网络，会发现多了两个 `veth` 开头的虚拟网络接口，这两个虚拟网络接口用来和上面创建的两个容器进行通信，如下：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224233410.9b5594d7.jpg)

  

此时我们进入 `ubuntu-1` 容器内，使用 `ip addr` 查看一下网络，可以看到容器内有名称为 `eth0` 的虚拟网卡，在 `ubuntu-2` 容器内也是一样的：

> 如果容器中没有 `ip addr` 命令，可以使用 apt 命令安装一下：`apt update && apt-get install -y iproute2`

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224234310.24dee7de.jpg)

可以看到容器中的 `5: eth0@if6`，这里表示 `eth0` 的 `5` 和 宿主机的 `veth` 的 `6` 对应，可以再看一下上面宿主机的网络。

也就是说 `docker0` 网桥在宿主机上会给每个容器创建一个 `veth` 开头的虚拟网络接口，在容器内，会为每个容器会创建 `eth0` 的虚拟网络接口，使用 `veth-pair` 技术，每个 `veth` 会匹配容器内部的 `eth0`，两两配对，实现通信。如下图：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240224233303.e2a5e453.jpg)

所以容器间通信都需要经过 `docker0` ，`docker0` 相当于各个容器的网关。

  

默认情况下，容器在创建时会连接到这个默认桥接网络 `docker0`，`docker0` 网络通常使用默认的网段（172.17.0.0/16），并且它的IP地址是 `172.17.0.1`。而使用这个默认网络模式的容器，IP 地址一般从 `172.17.0.2` 开始。

所以上面 ubuntu-1 容器的 IP 是 `172.17.0.2` ，ubuntu-2 容器的 IP 是 `172.17.0.3`，此时进入到容器 ubuntu-1 可以通过 `ping 172.17.0.3` ping 通 ubuntu-2 容器的，如果容器内没有 `ping` 命令，可以通过 `apt update && apt install iputils-ping` 命令安装。

但是这里有一个问题，如果我们停掉容器 `ubuntu-2` ，启动另外一个容器 `ubuntu-3`，那么上面容器`ubuntu-2`的 IP `172.17.0.3` 可能会被重新分配给新的容器 `ubuntu-3`，也就是说容器的 IP 会发生变化。所以在实际生产环境中，容器之间通常不能直接使用IP地址。

想想我们在一个容器中部署了服务器，通过 IP 连接到其他容器的 mysql 或 redis 服务，容器 IP 变化，会导致无法连接到服务。

怎么解决这个问题呢？使用默认的网络是不行的，需要使用后面的自定义网络。

## 11.3 host网络模式

**host网络模式**：容器将不会虚拟出自己的网卡，所以没有自己的 IP，而是使用宿主机的 IP 和端口。

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225112803.626774e4.jpg)

  

在 `docker run` 命令中使用 `--network host` 指定使用该模式。

举个栗子，启动一个 tomcat 容器：

> 之前部署tomcat容器的时候，官方镜像的tomcat，首页在webapp.dist目录下，导致访问首页是404，这里为了简单，直接使用一个可以直接访问到首页的镜像。

```
# x86架构，使用host模式启动tomcat镜像
docker search billygoo/tomcat8-jdk8
docker run -d --network host --name tomcat-1 billygoo/tomcat8-jdk8

# 我的宿主机是arm64架构，上面的用不了，我自己弄了一个，如果你主机是arm架构，你可以使用我的这个
docker search doubibiji/tomcat10
docker run -d --network host --name tomcat-1 doubibiji/tomcat10
```


上面的命令使用 `host` 模式启动 tomcat 容器，这里没有进行端口映射，因为 `host` 模式使用的就是宿主机的端口，所以 tomcat 就是使用宿主机的 `8080` 端口。

如果指定端口，不仅没有作用，还会有一个警告：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225144953.5fcf3c47.jpg)

  

访问启动的 tomcat 直接使用 `http://宿主机IP:8080` 。

## 11.4 none网络模式

**none网络模式**：容器有独立的 Network namespace，但并没有对容器进行任何网络设置，如分配网卡、IP 等。这种模式下，容器禁用了网络功能，不能进行网络通信。如果需要，只能自己添加网络配置。

在 `docker run` 命令中使用 `--network none` 指定使用该模式。

举个栗子：

```
# 启动ubuntu容器，此时容器没有网络配置
docker run -it --network none --name ubuntu-1 ubuntu /bin/bash
```

none 网络模式一般很少用，这里不多解释。

## 11.5 container网络模式

**container网络模式**：容器不会创建自己的虚拟网卡和 IP ，而是和一个指定的容器共享 IP、端口，也就是用别的容器的IP和端口。

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225151234.872336e2.jpg)

在 `docker run` 命令中使用 `--network container:别的容器ID或名称` 指定使用该模式。

举个栗子：

这里如果用两个 tomcat 容器来演示，会有一个问题，因为容器2使用container模式，将使用容器1的IP和端口，而对于容器1而言，8080端口已经被容器1使用了，容器2就无法再使用容器1的8080端口了，所以会有问题。

使用ubuntu来演示：

```
# 如果本地没有ubuntu镜像，则首先拉取一个ubuntu镜像
docker pull ubuntu

# 启动容器ubuntu-1
docker run -it --name ubuntu-1 ubuntu /bin/bash

# 启动容器ubuntu-2，使用ubuntu-1的IP和端口
docker run -it --network container:ubuntu-1 --name ubuntu-2 ubuntu /bin/bash
```


进入到两个容器查看 IP，可以看到两个容器的 IP 是一样的。

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225153520.03dec5fb.jpg)

**注意，此时如果停掉容器1，那么容器2的网络也没有了，容器2就无法通信了，因为容器2是依赖容器1的。**

##  11.6 自定义网络模式

前面说了，因为容器的 IP 会发生变化，所以不能使用容器的 IP 来进行容器间的通信，需要使用自定义网络。

### 1 创建自定义网络

首先需要创建一个自定义网络，例如创建一个 `doubi-network`。

```
# 创建doubi-network网络
docker network create doubi-network
```

创建完网络，可以通过 `docker network ls` 查看到存在的网络：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225221336.367df152.jpg)

查看宿主机的网络，发现多了一个网络接口：

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225222151.3dabe340.jpg)

**这里需要注意，我们创建了一个新的网络，也是桥接模式的，但是它是一个新的桥接网络，和docker0是独立开的，他们可以有不同的配置和属性，从上面也可以看到，他们是不同的网段的。**

### 2 容器加入自定义网络

这里我们创建两个容器，`ubuntu-1` 和 `ubuntu-2` 容器，然后在创建容器的时候加入自定义网络：

```
# 创建ubuntu-1容器，并加入到doubi-network网络
docker run -it --network doubi-network --name ubuntu-1 ubuntu /bin/bash

# 创建ubuntu-2容器，并加入到doubi-network网络
docker run -it --network doubi-network --name ubuntu-2 ubuntu /bin/bash
```

  

如果容器已经存在了，可以使用 `docker network connect` 命令加入到网络：

```
docker network connect 网络名 容器ID/名称

# 举个栗子
docker network connect doubi-network ubuntu-1
```


###  3 实现容器间通信

此时查看 `ubuntu-1` 和 `ubuntu-2` 容器的网络，我这里 `ubuntu-1` 容器的 IP 是 `172.19.0.2`，`ubuntu-2` 容器的 IP 是 `172.19.0.3` 。

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225222541.c7b5c923.jpg)

此时进入到 `ubuntu-1` ，肯定是可以通过命令 `ping 172.19.0.3` 来 ping 通 `ubuntu-2` 容器的。

但是这里我们不使通过 IP 来 ping，而是通过服务名称来 ping。

直接在容器 `ubuntu-1` 中执行命令 `ping ubuntu-2` ，发现可以 ping 通 `ubuntu-2` 容器 。

![](http://p6ui.toweydoc.tech:20080/images/stydocs/20240225222843.ae5f39bf.jpg)

通过自定义网络，可以实现通过服务名（容器名称）来实现容器之间的通信。

如果我们的项目部署在一个容器中，另外有一个名称为 mysql 的容器服务，那么我们就可以在项目的容器中通过 `jdbc:mysql//mysql:3306/数据库名?characterEncoding=utf-8&serverTimezone=Asiz?Shanghai` 来连接到数据库服务，不用使用 IP 地址了。

###  4 还有一个问题

docker 容器默认使用的网络是 bridge，也是桥接模式，我们创建的网络也是桥接模式。

为什么默认的网络 bridge 只能通过 IP 来进行容器间的访问，自定义网络才能实现使用服务名来进行容器间的访问呢？

因为默认桥接网络不提供内置的服务发现机制，在默认桥接网络中，容器可以通过相互的IP地址进行通信，但无法通过服务名称进行DNS解析，因为 Docker 默认并没有提供 DNS 服务来支持容器名称解析。

创建的自定义网络，Docker 会启用内置的 DNS 服务，允许容器使用服务名称进行 DNS 解析，这意味着在用户定义网络上的容器可以通过其服务名称相互访问，而不仅仅是通过 IP 地址。

  

**总结：**

使用自定义网络可以实现容器之间的隔离，因为不在这个网络内的容器网段是不一样的，无法实现通信。而且自定义网络自带内置的DNS服务，使容器可以通过服务名称进行通信，而无需关心底层的IP地址。