# 使用编程语言客户端操作 Redis

目前我们进行的操作都是通过 Redis 的命令行客户端 [redis-cli](https://so.csdn.net/so/search?q=redis-cli&spm=1001.2101.3001.7020) 进行的。

开发者也可以通过 Redis 图形管理软件操作，例如 [RDM（Redis Desktop Manager）](https://rdm.dev/)（收费，可免费试用 14 天）。

也可以使用 Redis 官网列出的每个语言支持的程序客户端：[https://redis.io/clients](https://redis.io/clients)，其中标记星星的代表推荐的意思。

以 Node.js 开发的 Redis 客户端为例，推荐下面两个：

- [node-redis](https://github.com/redis/node-redis)：诞生比较早（2010 年），相当的稳定，性能也非常好
- [ioredis](https://github.com/luin/ioredis)：后来出现的（2015 年），功能和 node-redis 差不多，阿里巴巴在用

本文以 ioredis 为例介绍如何使用程序客户端操作 [Reids](https://so.csdn.net/so/search?q=Reids&spm=1001.2101.3001.7020)。

# ioredis 官方介绍

ioredis 是一款功能强大的 Redis 客户端，在全球最大的在线商务公司阿里巴巴和许多其它优秀公司都有使用。

- 功能齐全。支持集群，哨兵，流，流水线，当然还有支持 Lua 脚本和发布/订阅（具有二进制消息的支持）。
- 高性能
- 令人愉快的 API。它的异步 API 支持回调函数与 Promise
- 命令参数和返回值的转换
- 透明键前缀
- Lua 脚本的抽象，允许您定义自定义命令。
- 支持二进制数据
- 支持 TLS
- 支持离线队列和就绪检查
- 支持ES6类型，例如 Map 和 Set
- 支持GEO命令（Redis 3.2 不稳定）
- 复杂的错误处理策略
- 支持 NAT 映射
- 支持 autopeling 自动流水线功能

相关链接：

- [Github](https://github.com/luin/ioredis)
- [API 文档](https://github.com/luin/ioredis/blob/master/API.md)

# 快速开始

## 安装

```shell
# 初始化项目
mkdir ioredis-demo
cd ioredis-demo
npm init -y

# 安装 ioredis
npm install ioredis
```

## 基本用法

在项目目录中创建执行文件 `index.js`：

```js
const Redis = require('ioredis')

// 1. 建立连接

// 创建 Redis 实例
// 默认本地连接 127.0.0.1:6379
const redis = new Redis()

// 2. 操作 Redis 数据库

// 回调函数方式
redis.set('foo', '1', (err, ret) => {
  if (err) {
    return console.log('写入失败')
    // return console.log('写入失败', err)
  }
  console.log('写入成功')
  // console.log('写入成功', ret)
})

// Promise 方式
redis
  .get('foo')
  .then(ret => {
    console.log('获取成功', ret)
  })
  .catch(err => {
    console.log('获取失败')
    // return console.log('获取失败', err)
  })

// async/await 方式
async function main() {
  try {
    const ret = await redis.get('foo')
    console.log(ret)
  } catch (err) {
    console.log('获取失败')
  }
}

main()

```

官方示例：https://github.com/luin/ioredis/tree/master/examples

# 远程连接

## 修改配置

外部主机连接 Redis 实例需要受两个配置参数限制：

- `bind`：指定本机可以接受连接的网卡地址，默认 `127.0.0.1` 和 `::1`。
- `protected-mode`：保护模式，Redis 3.2 后加入的新特性，默认开启。

**注意**：由于 `bind` 指定的是本机可以接受的网卡地址，而不是绑定允许连接的外部主机 IP。

`bind` 默认只绑定了本地 IP `127.0.0.1`，所以外部主机无法连接，Linux 可以通过 `ifconfig` 命令查看所有网卡地址：

![在这里插入图片描述](http://p6ui.toweydoc.tech:20080/images/stydocs/b2fd11b594d641c993ca9b01cfcd771c.png)

以我的服务器为例，可以这样配置以允许外部主机访问：

```shell
# 每个地址的前缀 `-`，表示如果地址不可用，redis 不会启动失败
bind 127.0.0.1 -::1 -172.26.26.38

# 也可以侦听全部地址
bind * -::*

# 以下配置同侦听全部地址一样
# 1. 注释 bind
# bind 127.0.0.1 -::1

# 2. 配置 0.0.0.0
bind 0.0.0.0
```

**但是**，仅仅配置 `bind` 还不能保证外部主机可以连接。

当保护模式（protected-mode）开启时，如果满足以下任意条件：

1. 服务器未使用 `bind` 指令显示绑定到一组 IP 地址
2. 未配置密码

服务器仍会拒绝外部主机连接 Redis。

所以 Redis 数据库要在没有设置密码（默认）的情况下通过外部连接，需要修改两个配置：

1. 配置 `bind`，允许外部主机连接
2. 关闭保护模式 `protected-mode no`

除此之外还要检查服务器防火墙是否开放了 Redis 服务占用的端口号，例如阿里云需要单独配置安全组。

> 注意：为了保护数据安全，开放远程连接需谨慎操作。

## 重启 Redis

要使配置生效，需要停止 Redis 服务并指定配置文件重启：

```shell
redis-cli shutdown
redis-server <配置文件路径>
```

## 创建实例

```js
const Redis = require('ioredis')

// 远程连接：指定地址和端口
const redis = new Redis({
  port: 6379, // Redis 数据库端口
  host: 'xxx.xxx.xxx.xxx' // Redis 数据库地址
})
```

# 安全注意

默认情况下 Redis 服务器没有设置密码，如果服务器通过 root 用户开启，并且服务器开通了端口的外网的访问限制，允许攻击者远程登录到 Redis 中，那么容易遭到恶意攻击，例如：

- 通过 Redis 内置命令将自己的公钥写入服务器，进而可以免密登录
- 在服务器中植入恶意脚本，设置可疑计划任务，例如挖矿

例如：

![在这里插入图片描述](http://p6ui.toweydoc.tech:20080/images/stydocs/bdb87fabc8a643c69fb0134f1c5dcafb.png)

所以实际使用时建议为 Redis 服务创建单独的用户，用此用户启动 Redis 服务器，并禁止远程登录，设置 Redis 密码等。

# Redis Pipeling（流水线）

官方文档：[Using pipelining to speedup Redis queries – Redis](https://redis.io/topics/pipelining)

## Request/Response 协议和 RTT

Redis 是一个 TCP 服务器，使用 client-server 模型和所谓的 request/response 协议。

意味着通常通过以下步骤完成请求：

- 客户端（如 redis-cli）向服务器发送一个 query，并从 socket 读取服务器响应，通常以阻塞方式
- 服务器处理命令并将响应发送回客户端

客户端和服务器通过网络连接，数据包从客户端传输到服务器，再从服务器返回到客户端以进行应答都需要时间，这个**往返时间**称为 **RTT（Round Trip Time）**.

当客户端需要同一时间执行多个请求时（例如，向同一个列表中添加多个元素，或使用多个 key 填充数据库），很容易看出这会如何影响性能。客户端发送新命令之前，总要等待前一个命令的回复。

例如，如果 RTT 时间为 250 毫秒（在网速非常慢的情况下），即使服务器每秒能处理 100k 个请求，我们也最多每秒处理 4 个客户端请求。哪怕 RTT 很短，处理大量写入操作也是个很大的问题。

好在有一种方法可以改进这个问题：**Redis Pipeling**

## Redis Pipeling

实现一个 request/response 服务器，即使客户端尚未读取旧响应，也能处理新请求。

通过这种方式，可以在根本不等待回复的情况下向服务器发送多个命令，服务器将被迫使用内存对回复进行排队，最后在一步中读取全部回复。以此减少 RTT 往返时间，并大大提高 Redis 服务器中每秒可执行的操作数。

这被称为 **pipeling（流水线）**，是一种被广泛使用了几十年的技术。

pipeline 看起来很像事务，但它只是 Redis 提供的一个提高 request/response 效率的功能，它不是原子性的，没有任何保证。

# ioredis Pipeline

如果要发送一批命令（例如 > 5），可以使用 pipeline 将命令在内存中排队，然后将它们一次性发送到 Redis。这样，性能提高了 50％〜300％。

`redis.pipeline()` 创建一个 `Pipeline` 实例。您可以像 `Redis` 实例一样在其上调用任何 Redis 命令。这些命令在内存中排队，并通过调用 `exec` 方法刷新到 Redis。

## 示例

批量操作一次性发送给 Redis：

```js
const Redis = require('ioredis')

const redis = new Redis()

async function main() {
  try {
    // 创建 Pipeline 实例
    const pipeline = redis.pipeline()
    // 批量添加数据
    for (let i = 0; i < 100; i++) {
      pipeline.set(`${i}-foo`, i)
    }
    const ret = await pipeline.exec()
    console.log(ret)
  } catch (err) {
    console.log('操作失败', err)
  }
}

main()

```

## 官方示例

`exec` 方法可以接受一个回调，参数：

- `err` 始终为 `null`
- `results` 是与排队命令相对应的响应数组，每个响应的格式都是 `[err, result]`

```js
const pipeline = redis.pipeline();
pipeline.set("foo", "bar");
pipeline.del("cc");
pipeline.exec((err, results) => {});
```

你也可以链式调用：

```js
redis
  .pipeline()
  .set('foo', 'bar')
  .del('cc')
  .exec((err, results) => {})
```

每个链式命令还可以接受一个回调，当命令得到回复时将调用该回调：

```js
redis
  .pipeline()
  .set("foo", "bar")
  .get("foo", (err, result) => {
    // result === 'bar'
  })
  .exec((err, result) => {
    // result[1][1] === 'bar'
  });
```

除了单独向流水线队列添加命令外，还可以将命令和参数以数组形式传递给构造函数：

```js
redis
  .pipeline([
    ["set", "foo", "bar"],
    ["get", "foo"],
  ])
  .exec(() => {
    /* ... */
  });
```

`length` 属性显示流水线中的命令数：

```js
const length = redis.pipeline().set("foo", "bar").get("foo").length;
// length === 2
```

# Transaction 事务

大多数时候，事务命令 `multi` & `exec` 与 pipeline 一起使用。因此，在调用 `multi` 时，默认情况下会自动创建 `Pipeline` 实例，因此您可以像使用管道一样使用 `multi`：

```js
redis
  .multi() // 默认返回一个 Pipeline 实例
  .set("foo", "bar")
  .get("foo")
  .exec((err, results) => {
    // results === [[null, 'OK'], [null, 'bar']]
  });
```

如果事务的命令链中存在语法错误（例如参数数量错误、命令名称错误的等），则会在 ioredis 被识别，不会执行向 Redis 发送任何命令，并返回错误：

```js
redis
  .multi()
  .set("foo")
  .set("foo", "new value")
  .exec((err, results) => {
    // err:
    //  { [ReplyError: EXECABORT Transaction discarded because of previous errors.]
    //    name: 'ReplyError',
    //    message: 'EXECABORT Transaction discarded because of previous errors.',
    //    command: { name: 'exec', args: [] },
    //    previousErrors:
    //     [ { [ReplyError: ERR wrong number of arguments for 'set' command]
    //         name: 'ReplyError',
    //         message: 'ERR wrong number of arguments for \'set\' command',
    //         command: [Object] } ] }
  });
```

就接口而言，`multi` 与 `pipeline` 的区别在于，当为每个链接的命令指定回调时，将传递排队状态给回调，而不是命令的结果：

```js
redis
  .multi()
  .set("foo", "bar", (err, result) => {
    // result === 'QUEUED'
  })
  .exec(/* ... */);
```

如果要使用不带 pipeline 的事务，请将 `{ pipeline: false }` 传递给 `multi`，每个命令将立即发送到 Redis，而无需等待 `exec` 调用（不过建议还是使用 pipeline 提高效率）：

```js
redis.multi({ pipeline: false }); // 返回一个 Promise
redis.set("foo", "bar"); // 注意没有链式调用
redis.get("foo");
redis.exec((err, result) => {
  // result === [[null, 'OK'], [null, 'bar']]
});
```

`multi` 的构造函数还接受一批命令：

```js
redis
  .multi([
    ["set", "foo", "bar"],
    ["get", "foo"],
  ])
  .exec(() => {
    /* ... */
  });
```

pipeline 支持内联事务，这意味着您可以将 pipeline 中的命令子集分组为一个事务：

```js
redis
  .pipeline() // 创建 pipeline
  .get("foo")
  .multi() // 开启事务
  .set("foo", "bar")
  .get("foo")
  .exec() // 执行事务命令
  .get("foo")
  .exec(); // 执行 pipeline 命令
```

# 错误处理

Redis 服务器返回的所有错误都是 `ReplyError` 的实例，可以通过 Redis 进行访问：

```js
const Redis = require("ioredis");
const redis = new Redis();
// This command causes a reply error since the SET command requires two arguments.
redis.set("foo", (err) => {
  err instanceof Redis.ReplyError;
});
```

这是 `ReplyError` 的错误堆栈：

```plain
ReplyError: ERR wrong number of arguments for 'set' command
    at ReplyParser._parseResult (/app/node_modules/ioredis/lib/parsers/javascript.js:60:14)
    at ReplyParser.execute (/app/node_modules/ioredis/lib/parsers/javascript.js:178:20)
    at Socket.<anonymous> (/app/node_modules/ioredis/lib/redis/event_handler.js:99:22)
    at Socket.emit (events.js:97:17)
    at readableAddChunk (_stream_readable.js:143:16)
    at Socket.Readable.push (_stream_readable.js:106:10)
    at TCP.onread (net.js:509:20)
```

默认情况下，错误堆栈没有任何意义，因为整个堆栈都发生在 ioredis 模块本身而不是代码中。因此，要找出代码中发生错误的地方并不容易。 ioredis 提供了一个选项 `showFriendlyErrorStack` 来解决该问题。启用 `showFriendlyErrorStack` 时，ioredis 将为您优化错误堆栈：

```javascript
const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });
redis.set("foo");
```

输出将是：

```plain
ReplyError: ERR wrong number of arguments for 'set' command
    at Object.<anonymous> (/app/index.js:3:7)
    at Module._compile (module.js:446:26)
    at Object.Module._extensions..js (module.js:464:10)
    at Module.load (module.js:341:32)
    at Function.Module._load (module.js:296:12)
    at Function.Module.runMain (module.js:487:10)
    at startup (node.js:111:16)
    at node.js:799:3
```

这次，堆栈告诉您错误发生在代码的第三行。但是，优化错误堆栈会大大降低性能。因此，默认情况下，此选项是禁用的，只能用于调试目的。不建议在生产环境中使用此功能。