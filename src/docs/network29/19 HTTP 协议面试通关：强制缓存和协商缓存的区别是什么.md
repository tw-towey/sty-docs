超文本传输协议（HyperText Transfer Protocol，HTTP）是目前使用最广泛的应用层协议。在网站、App、开放接口中都可以看到它。HTTP 协议设计非常简单，但是涵盖的内容很多。相信你平时工作中已经多多少少接触过这个协议，这一讲我们会挑选其中一部分重点介绍，比如高频面试内容，以及容易产生理解误区的内容，帮助你深入学习 HTTP 协议。

### WWW

1990 年蒂姆·伯纳斯·李开发了第一个浏览器，书写了第一个 Web 服务器程序和第一张网页。网页用的语言后来被称作**超文本标记语言（HTML）**，而在服务器和客户端之间传输网页的时候，伯纳斯·李没有直接使用传输层协议，而是在 TCP 的基础上构造了一个应用层协议，这个就是**超文本传输协议 HTTP**。

万维网（World Wide Web， WWW）是伯纳斯·李对这一系列发明，包括 Web 服务、HTTP 协议、HTML 语言等一个体系的综合。

### 请求响应和长连接

HTTP 协议采用请求/返回模型。客户端（通常是浏览器）发起 HTTP 请求，然后 Web 服务端收到请求后将数据回传。

HTTP 的请求和响应都是文本，你可以简单认为 HTTP 协议利用 TCP 协议传输文本。当用户想要看一张网页的时候，就发送一个文本请求到 Web 服务器，Web 服务器解析了这段文本，然后给浏览器将网页回传。

**那么这里有一个问题，是不是每次发送一个请求，都建立一个 TCP 连接呢**？ 当然不能这样，为了节省握手、挥手的时间。当浏览器发送一个请求到 Web 服务器的时候，Web 服务器内部就设置一个定时器。在一定范围的时间内，如果客户端继续发送请求，那么服务器就会重置定时器。如果在一定范围的时间内，服务器没有收到请求，就会将连接断开。这样既防止浪费握手、挥手的资源，同时又避免一个连接占用时间过长无法回收导致内存使用效率下降。

这个能力可以利用 HTTP 协议头进行配置，比如下面这条请求头：

```java
Keep-Alive: timeout=5s
```

会告诉 Web 服务器连接的持续时间是 5s，如果 5s 内没有请求，那么连接就会断开。

### HTTP 2.0 的多路复用

Keep-Alive 并不是伯纳斯·李设计 HTTP 协议时就有的能力。伯纳斯·李设计的第一版 HTTP 协议是 0.9 版，后来随着协议逐渐完善，有了 1.0 版。而 Keep-Alive 是 HTTP 1.1 版增加的功能，目的是应对越来越复杂的网页资源加载。从 HTTP 协议诞生以来，网页中需要的资源越来越丰富，打开一张页面需要发送的请求越来越多，于是就产生了 Keep-Alive 的设计。

同样，当一个网站需要加载的资源较多时，浏览器会尝试并发发送请求（利用多线程技术）。浏览器会限制同时发送并发请求的数量，通常是 6 个，这样做一方面是对用户本地体验的一种保护，防止浏览器抢占太多网络资源；另一方面也是对站点服务的保护，防止瞬时流量过大。

在 HTTP 2.0 之后，增加了多路复用能力。和之前我们讲 RPC 框架时提到的多路复用类似，请求、返回会被拆分成切片，然后混合传输。这样请求、返回之间就不会阻塞。你可以思考，对于一个 TCP 连接，在 HTTP 1.1 的 Keep-Alive 设计中，第二个请求，必须等待第一个请求返回。如果第一个请求阻塞了，那么后续所有的请求都会阻塞。而 HTTP 2.0 的多路复用，将请求返回都切分成小片，这样利用同一个连接，请求相当于并行的发出，互相之间不会有干扰。

### HTTP 方法和 RestFul 架构

伴随着 HTTP 发展，也诞生了一些著名的架构，比如 RestFul。在面试中，经常会遇到 RestFul，RestFul 是 3 个单词的合并缩写：

- Re（Representational）
    
- st（State）
    
- Ful（Transfer）
    

这个命名非常有趣，让我联想到 grep 命令的命名，global regular pattern match。这是一种非常高端的命名技巧，提取词汇中的一个部分组合成为一个读起来朗朗上口的新词汇，建议你在实战命名的时候也可以考虑试试。

**在 RestFul 架构中，状态仅仅存在于服务端，前端无状态**。状态（State）可以理解为业务的状态，这个状态是由服务端管理的。这个无状态和服务端目前倡导的无状态设计不冲突，现在服务端倡导的无状态设计指的是容器内的服务没有状态，状态全部存到合适的存储中去。所以 Restful 中的 State，是服务端状态。

**前端（浏览器、应用等）没有业务状态，却又要展示内容，因此前端拥有的是状态的表示，也就是 Representation**。比如一个订单，状态存在服务端（数据库中），前端展示订单只需要部分信息，不需要全部信息。前端只需要展示数据，展示数据需要服务端提供。所以服务端提供的不是状态，而是状态的表示。

前端没有状态，当用户想要改变订单状态的时候，比如支付，这个时候前端就向服务端提交表单，然后服务端触发状态的变化。这个过程我们称为**转化（Transfer）**。从这个角度来看，Restful 讲的是一套前端无状态、服务端管理状态，中间设计转化途径（请求、函数等）的架构方法。这个方法可以让前后端职责清晰，前端负责渲染， 服务端负责业务。前端不需要业务状态，只需要展示。服务端除了关心状态，还要提供状态的转换接口。

#### HTTP 方法

在 Restful 架构中，除了约定了上述整体架构方案之外，还约束了一些实现细节，比如用名词性的接口和 HTTP 方法来设计服务端提供的接口。

我们用 GET 获取数据，或者进行查询。比如下面这个例子，就是在获取 id 为 123 的订单数据：

```java
GET /order/123
```

GET 是 HTTP 方法，/order 是一种名词性质的命名。这样设计语义非常清晰，这个接口是获取订单的数据（也就是订单的 Representation 用的）。

对于更新数据的场景，按照 HTTP 协议的约定，PUT 是一种幂等的更新行为，POST 是一种非幂等的更新行为。举个例子：

```java
PUT /order/123 
{...订单数据}
```

上面我们用 PUT 更新订单，如果订单 123 还没有创建，那么这个接口会创建订单。如果 123 已经存在，那么这个接口会更新订单 123 的数据。为什么是这样？因为 PUT 代表幂等，对于一个幂等的接口，请求多少遍最终的状态是一致的，也就是说操作的都是同一笔订单。

如果换成用 POST 更新订单：

```java
POST /order
{...订单数据}
```

POST 代表非幂等的设计，像上面这种用 POST 提交表单的接口，调用多次往往会产生多个订单。也就是非幂等的设计每次调用结束后都会产生新的状态。

另外在 HTTP 协议中，还约定了 DELETE 方法用于删除数据。其实还有几个方法，感兴趣的同学可以查询下，比如 OPTIONS、PATCH，然后我们在留言区中讨论。

### 缓存

在 HTTP 的使用中，我们经常会遇到两种缓存，**强制缓存和协商缓存**，接下来我举两个场景来说明。

#### 强制缓存

你的公司用版本号管理某个对外提供的 JS 文件。比如说 libgo.1.2.3.js，就是 libgo 的 1.2.3 版本。其中 1 是主版本，2 是副版本，3 是补丁编号。每次你们有任何改动，都会更新 libgo 版本号。在这种情况下，当浏览器请求了一次 libgo.1.2.3.js 文件之后，还需要再请求一次吗？

整理下我们的需求，浏览器在第一次进行了`GET /libgo.1.2.3.js`这个操作后，如果后续某个网页还用到了这个文件（libgo.1.2.3.js），我们不再发送第二次请求。这个方案要求浏览器将文件缓存到本地，并且设置这个文件的失效时间（或者永久有效）。这种请求过一次不需要再次发送请求的缓存模式，在 HTTP 协议中称为**强制缓存**。当一个文件被强制缓存后，下一次请求会直接使用本地版本，而不会真的发出去。

**使用强制缓存时要注意，千万别把需要动态更新的数据强制缓存**。一个负面例子就是小明把获取用户信息数据的接口设置为强制缓存，导致用户更新了自己的信息后，一直要等到强制缓存失效才能看到这次更新。

#### 协商缓存

我们再说一个场景：小明开发了一个接口，这个接口提供全国省市区的 3 级信息。先问你一个问题，这个场景可以用强制缓存吗？小明一开始觉得强制缓存可以，然后突然有一天接到运营的通知，某市下属的两个县合并了，需要调整接口数据。小明错手不急，更新了接口数据，但是数据要等到强制缓存失效。

为了应对这种场景，HTTP 协议还设计了**协商缓存**。协商缓存启用后，第一次获取接口数据，会将数据缓存到本地，并存储下数据的摘要。第二次请求时，浏览器检查到本地有缓存，将摘要发送给服务端。服务端会检查服务端数据的摘要和浏览器发送来的是否一致。如果不一致，说明服务端数据发生了更新，服务端会回传全部数据。如果一致，说明数据没有更新，服务端不需要回传数据。

从这个角度看，协商缓存的方式节省了流量。对于小明开发的这个接口，多数情况下协商缓存会生效。当小明更新了数据后，协商缓存失效，客户端数据可以马上更新。**和强制缓存相比，协商缓存的代价是需要多发一次请求**。

### 总结

这一讲我们讨论了 HTTP 协议中的一些面试难点和理解误区。目前 HTTP 协议已经发展到了 2.0 版本，不少网站都更新到了 HTTP 2.0。大部分浏览器、CDN 也支持了 HTTP 2.0。如果你感兴趣可以自行查阅更多关于 HTTP 2.0 解决队头阻塞、HPack 压缩算法、Server Push 等资料。

另外 HTTP 3.0 协议也在建设当中，HTTP 3.0 对 HTTP 2.0 兼容，主要调整发生在网络底层。HTTP 3.0 开始采用 UDP 协议，并在 UDP 协议之上，根据 HTTP 协议的需求特性，研发了网络层、应用层去解决可靠性等问题。

这一讲就到这里，发现求知的乐趣，我是林䭽。感谢你学习本次课程，下一讲我们将学习《17 | 流媒体技术：直播网站是如何实现的？》，再见！