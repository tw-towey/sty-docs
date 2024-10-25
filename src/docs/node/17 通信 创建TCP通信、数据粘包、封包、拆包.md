# 创建 TCP 通信

使用 NodeJS 提供的内置模块创建 TCP 的服务端与客户端的实例，然后让两者进行通信。

Net 模块实现了用于底层通信的接口，可以直接创建基于流操作的（TCP或IPC 的）服务端和客户端。

## 通信过程

- 创建服务端：接收和回写客户端数据
- 创建客户端：发送和接收服务端数据
- 数据传输：内置服务事件和方法读写数据

## 通信事件

**关于连接的常用事件：**

- listening 事件：调用 server.listen 方法之后触发
- connection 事件：新的连接建立时触发，也就是服务端每次收到客户端请求回调的时候，它的参数是 net.Socket 的对象实例（通常用 socket 表示），可以理解为一个双工流
- connect 事件：客户端建立连接时触发
- close 事件：当连接关闭时触发，如果当前还有连接存在，直到所有连接都结束之后才会触发这个事件
- error 事件：当错误出现的时候触发

**关于处理数据的常用事件和方法：**

- data 事件：当接收到数据的时候触发，其实就是从可读流中消费数据的操作
- write 方法：在 socket 上发送数据，默认是 UTF8 编码
    - net 模块创建的都是基于流的操作，所以它本身就是可读流和可写流的集合，data 事件用于消费数据，write 方法用于写入数据
- end 操作（事件&方法）：当 socket 的一端发送 FIN 包时触发，结束可读端

## NodeJS 实例

```js
// server.js
const net = require('net')

// 创建服务端实例
const server = net.createServer()

// 应用进程占用的端口
const PORT = 1234
// 客户端访问的主机地址
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务端已经开启，地址：${HOST}:${PORT}`)
})

server.on('connection', socket => {
  // 接收数据
  socket.on('data', chunk => {
    const msg = chunk.toString()
    console.log(msg)

    // 响应数据
    socket.write(Buffer.from('你好，' + msg))
  })
})

server.on('close', () => {
  console.log('服务端断开连接')
})

server.on('error', err => {
  // error address in use
  if (err.code === 'EADDRINUSE') {
    console.log('地址被占用')
  } else {
    console.log(err)
  }
})

```

```js
// client.js
const net = require('net')

// 创建连接
const client = net.createConnection({
  port: 1234,
  host: '127.0.0.1' // 等同于 localhost
})

client.on('connect', () => {
  // 发送数据
  client.write('张三')
})

// 接收响应
client.on('data', chunk => {
  console.log(chunk.toString())
})

client.on('error', err => {
  console.log(err)
})

client.on('close', () => {
  console.log('客户端断开连接')
})

```

- 运行服务端 `node server.js`
- 运行客户端 `node client.js`

# TCP 数据粘包

## 数据粘包

数据的通讯至少包含发送端和接收端两个部分。

发送端在工作时并不是实时的将手里的数据不停的传给接收端，而是存在一个缓冲区，等待数据累积到一定程度之后才会执行一次发送操作。

同样，接收端在处理数据的时候，也不是立马使用数据，它也会把接收到的数据先放到缓存中，然后再执行数据的获取和使用。

这样设计的好处就是可以减少 I/O 操作带来的性能消耗，但是对于数据使用来说就会产生粘包的问题。

数据是被放在缓存中的，在什么情况下才会开始执行发送，这个就取决于 TCP 的拥塞机制。

这里的**粘包**（nian bao）指的是由于接收端不知道数据之间的界限，在提取数据时会按照预估的字节数提取缓冲区的数据。

## 示例演示粘包现象

沿用上面的示例代码

```js
// server.js
const net = require('net')

// 创建服务端实例
const server = net.createServer()

// 应用进程占用的端口
const PORT = 1234
// 客户端访问的主机地址
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务端已经开启，地址：${HOST}:${PORT}`)
})

server.on('connection', socket => {
  // 接收数据
  socket.on('data', chunk => {
    const msg = chunk.toString()
    console.log(msg)

    // 响应数据
    socket.write(Buffer.from('你好，' + msg))
  })
})

```

```js
// client.js
const net = require('net')

// 创建连接
const client = net.createConnection({
  port: 1234,
  host: '127.0.0.1' // 等同于 localhost
})

client.on('connect', () => {
  // 发送数据
  client.write('张三')
  client.write('张三2')
  client.write('张三3')
  client.write('张三4')
})

// 接收响应
client.on('data', chunk => {
  console.log(chunk.toString())
})
```

客户端发送了四条消息，期望的结果是服务器接收并处理这四次请求，客户端接收响应并打印四次结果：

```bash
# 服务端打印
张三
张三2
张三3
张三4

# 客户端打印
你好，张三
你好，张三2
你好，张三3
你好，张三4
```

但实际结果是：

```bash
# 服务端打印
张三
张三2张三3张三4

# 客户端打印
你好，张三
你好，张三2张三3张三4
```

有3条请求被累积到一次处理，这就是**粘包**的现象，这也是基于流的操作和当前 TCP 实例的实现所产生的问题。

## 解决办法

最常见的办法是将数据的发送间隔时间拉长。

```js
// client.js
const net = require('net')

// 创建连接
const client = net.createConnection({
  port: 1234,
  host: '127.0.0.1' // 等同于 localhost
})

const dataArr = ['张三', '张三2', '张三3', '张三4']

client.on('connect', () => {
  // 发送数据
  for (let i = 0; i < dataArr.length; i++) {
    // 延迟发送
    setTimeout(() => {
      client.write(dataArr[i])
    }, i * 1000)
  }
})

// 接收响应
client.on('data', chunk => {
  console.log(chunk.toString())
})

client.on('error', err => {
  console.log(err)
})

client.on('close', () => {
  console.log('客户端断开连接')
})

```

虽然解决的粘包的问题，但是也降低了数据的传输效率。

更好的方式使用**封包拆包**解决。

# 数据的封包与拆包

## 数据包结构

它的核心思想是按照约定的自定义规则先把数据进行打包，在使用数据的时候再按照规则进行拆包。

本例使用长度编码的方式约定通信双方的数据传输方式。

![在这里插入图片描述](http://p6ui.toweydoc.tech:20080/images/stydocs/d58d2870c3134707a23c15cec23f57be.png)

首先将被传输的消息分为定长的消息头（以 header 表示）和不定长的消息体（以 body 表示）两个部分。

同时再将 header 分为序列号和消息长度两个部分，序列号作为区分不同消息包的编号，消息长度用来确定每次提取的内容长度。

## 数据传输过程

- encode：人为进行数据编码， 获取二进制数据包，然后封装成上面的数据包
- decode：接收端接收到这个数据包后按照规则拆解数据，获取指定长度的数据

## Buffer 数据读写

上面的过程需要使用 NodeJS 的 Buffer，主要是两个读写操作：

- writeInt16BE：将数据从指定位置写入到内存
- readInt16BE：从内存指定位置开始读取数据

> PS：还有 32 位的方法，本例使用 16 位就足够了

## 代码实现

```js
class MyTransform {
  constructor() {
    this.packageHeaderLen = 4 // 规定 header 的总长度
    this.serialNum = 0 // 序列号
    this.serialLen = 2 // 消息长度
  }

  // 编码
  encode(data, serialNum) {
    // 消息体
    // 将数据转化为二进制
    const bodyBuf = Buffer.from(data)

    // 消息头
    // 01 先按照指定的长度申请一片内存空间作为 header 使用
    const headerBuf = Buffer.alloc(this.packageHeaderLen)

    // 02 写入消息头信息
    headerBuf.writeInt16BE(serialNum || this.serialNum, 0)
    headerBuf.writeInt16BE(bodyBuf.length, this.serialLen)

    // 如果未指定序列号
    if (serialNum === undefined) {
      this.serialNum++
    }

    return Buffer.concat([headerBuf, bodyBuf])
  }

  // 解码
  decode(buffer) {
    const headerBuf = buffer.slice(0, this.packageHeaderLen)
    const bodyBuf = buffer.slice(this.packageHeaderLen)

    return {
      // readInt16BE 内部会自动读取有效的值
      serialNum: headerBuf.readInt16BE(),
      bodyLength: headerBuf.readInt16BE(this.serialLen),
      body: bodyBuf.toString()
    }
  }

  // 获取包的长度
  getPackageLen(buffer) {
    if (buffer.length < this.packageHeaderLen) {
      // 数据不完整，还不应该取数据
      return 0
    } else {
      return this.packageHeaderLen + buffer.readInt16BE(this.serialLen)
    }
  }
}

module.exports = MyTransform

```

测试：

```js
const MyTransformCode = require('./myTransform')
const MyTransform = require('./myTransform')

const ts = new MyTransformCode()

const str1 = '你好张三'

const encodeBuf = ts.encode(str1, 1)

// console.log(encodeBuf) // <Buffer 00 01 00 0c e4 bd a0 e5 a5 bd e5 bc a0 e4 b8 89>
// console.log(Buffer.from(str1)) // <Buffer e4 bd a0 e5 a5 bd e5 bc a0 e4 b8 89>

const decodeBuf = ts.decode(encodeBuf)

// console.log(decodeBuf) // { serialNum: 1, bodyLength: 12, body: '你好张三' }

const len = ts.getPackageLen(encodeBuf)
console.log(len) // 16

```

## 解决粘包

```js
// server.js
const net = require('net')
const MyTransform = require('./myTransform')

const server = net.createServer()

const ts = new MyTransform()
// 存储未处理的不完整的数据包
let overageBuffer = null

server.listen('1234', 'localhost')

server.on('listening', () => {
  console.log('服务端已经开启，地址：localhost:1234')
})

server.on('connection', socket => {
  socket.on('data', chunk => {
    // 拼接之前未处理的数据
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk])
    }

    // 每次提取的数据包的长度
    let packageLen = 0

    // 循环提取数据包
    while ((packageLen = ts.getPackageLen(chunk))) {
      // 提取一个数据包
      const packageCon = chunk.slice(0, packageLen)
      // 更新 chunk
      chunk = chunk.slice(packageLen)

      // 拆解数据包
      const ret = ts.decode(packageCon)
      console.log(ret)

      // 回送给客户端
      socket.write(ts.encode('你好，' + ret.body, ret.serialNum))
    }

    // 将未处理的不完整的数据包进行存储
    overageBuffer = chunk
  })
})

```

```js
// client.js
const net = require('net')
const MyTransform = require('./myTransform')

const client = net.createConnection({
  host: 'localhost',
  port: 1234
})

const ts = new MyTransform()
// 存储未处理的不完整的数据包
let overageBuffer = null

client.write(ts.encode('张三'))
client.write(ts.encode('张三2'))
client.write(ts.encode('张三3'))
client.write(ts.encode('张三4'))

client.on('data', chunk => {
  // 拼接之前未处理的数据
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk])
  }

  // 每次提取的数据包的长度
  let packageLen = 0

  // 循环提取数据包
  while ((packageLen = ts.getPackageLen(chunk))) {
    // 提取一个数据包
    const packageCon = chunk.slice(0, packageLen)
    // 更新 chunk
    chunk = chunk.slice(packageLen)

    // 拆解数据包
    const ret = ts.decode(packageCon)
    console.log(ret)
  }

  // 将未处理的不完整的数据包进行存储
  overageBuffer = chunk
})
```