# [Stream](https://so.csdn.net/so/search?q=Stream&spm=1001.2101.3001.7020) 流模块

## 流

**流**并不是 Nodejs 中独创的概念。

例如，可以直接在类 Unix 系统中使用 `ls | grep *.js` 查找当前目录下 `.js` 文件，这就是流操作的一种应用。

它会将管道左侧命令执行之后的结果数据，交给右侧的命令进行处理，这种通过流操作数据的方式，无论在空间还是时间上都会有明显的效率提升。

[Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020).js 诞生之初就是为了解决 IO 密集型的性能问题（密集型：阻塞导致的等待状态），其中文件操作系统和网络模块就实现了流接口。

**Node.js 中的流就是处理流式数据的抽象接口。**

Nodejs 中的 stream 模块提供了用于实现流接口的对象。

## 应用程序中为什么使用流来处理数据

想象一个场景，我们正在通过网络观看一部高清电影，它的大小是 1GB，客户端上大体流程就是：

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/2ce5f4d9fa474cc9b6105ef99250865d.png)

1. 首先应用程序会从服务器读取 1GB 的内容
2. 然后通过网络传输到客户端
3. 最后客户端执行下载提供观看。

如果应用程序在服务器读取文件时采用的 readFile 的方式，那么至少会存在两个常见的问题：

- 同步读取资源文件，用户需要等待数据全部读取完成
- 资源文件最终一次性加载到内存，开销较大
    - Nodejs 底层采用 V8 引擎，默认情况下 V8 提供的内存大小只有 1GB 左右

因此可以采用流的方式处理数据：

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/a964277e73ef470fa73cb8005d4381ca.png)

1. 可以先把资源文件像水一样，一点一点的抽到一个池子里
2. 然后再去选择需要的方式来抽干池子里的水

这样对于用户来说就可以分段的看到资源里的内容，同时对内存的使用开销也会明显友好很多。

除此之外，流操作还可以配合管道对分段的数据进行需求的加工。

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/4e5af19922804538ab190a5082608b99.png)

例如，原始的数据是字符串，可以利用管道将它传给能够实现数据转换为 Buffer 的单元，还可以传给执行压缩操作的单元。只要类型支持，语法正常，就可以一直往后传递处理，直到最后使用数据。

## 流处理数据的优势

- 时间效率：分段读取数据可以同时操作多个数据 chunk
- 空间效率：流的分段实现了每次只向内存中缓存指定大小的数据，降低内存开销
- 使用方便；配合管道进行连接，扩展程序变得简单。某一段的流无需关心其它部分做了什么，只需要在完成当前操作之后，再进入到具体的功能管道之中就可以了

## Nodejs 中流的分类

Node.js 内置了 stream 模块，它实现了几个流操作的对象：

- Readable：可读流，能够实现数据的读取
- Writable：可写流，能够实现数据的写操作
- Duplex：双工流，即可读又可写（Readable 和 Writable）。例如 net 模块中的 Socket
- Transform：转换流，可读可写，还能实现数据修改或转换（可以在读写数据时修改或转换数据的 Duplex 流）

## Node.js 流特点

- Stream 模块实现的四个类型的流操作对象都是抽象的。
    - 可以理解为“Class 类”
    - 如果想实现自己的可读流或可写流操作，就需要继承相应的 Class，然后重新它们内部提供的一个必须完成的方法
    - 但是这种方法一般是不常见的，因为 IO 操作所常用的 fs、net 以及 http 模块本身就已经实现了流操作的接口，所以在使用的时候可以直接调用具体模块所具有的事件和 API，达到生产和消费数据的操作
- 所有流都继承自 EventEmitter
    - 可以基于发布订阅的模式，让它们具备发布数据的读写事件，之后就交由事件循环来监控监听器的执行时机，从而完成数据的处理

## 示例代码

通过流操作代替 fs 的 readFile、copyFile 来复制一份文本文件。

```js
const fs = require('fs')

// 创建可读流
const rs = fs.createReadStream('test.txt')

// 创建可写流(如果目标文件不存在则会自动创建)
const ws = fs.createWriteStream('./test1.txt')

// 将可读流中的数据通过可写流消费
rs.pipe(ws)

```

## 总结

- Node.js 中 stream 是流操作的抽象接口集合。
- 可读、可写、双工、转换是单一类型流操作的抽象具体实现。
- 流操作的核心功能就是处理数据
- Node.js 诞生的初衷就是解决密集型 IO 事务
- Node.js 中处理数据的模块继承了流和 EventEmitter

# 可读流

## 概念

可读流是专门**生产供程序消费数据的流**。

最常见的数据生产方式就是读取磁盘文件或读取网络请求中的内容。

例如下面的示例：

```js
const fs = require('fs')

const rs = fs.createReadStream('test.txt')

rs.pipe(process.stdout)
```

`createReadStream` 就是创建了一个可读流。

fs 模块内部实现了 Readable 的具体接口，同时继承了 EventEmitter 类。

当前生产数据的方式其实就是读取指定路径的磁盘文件内容，最后得到一个可读流，相当于**数据源**。

途中使用 rs 变量进行表示，之后利用 `pipe` 管道操作把之前获取到的数据传递给 `process.stdout`（标准输出）。

Nodejs 中**标准输出**本身就是一个可写流，所以最终代码执行完成后就会在控制台打印 `test.txt` 文件中的内容。

## 自定义可读流

> Node.js 中处理数据的模块（如 zlib fs http等）本身继承了流，所以实际使用时一般不需要开发者自己实现某个类型的流操作，这里介绍如何自定义是为了更好的理解流操作的机制，以掌握如何使用这些模块。

### 如何自定义可读流

- 继承 stream 里的 Readable 类
    - Readable 类已经把可读流要做的很多工作实现了，我们只需要继承它即可
- 重写 `_read` 方法，内部调用 `push` 产出数据
    - `push` 方法把读取的数据添加到缓冲区
    - 这个缓冲区是一个链表结构，等待消费者读取使用

### 自定义可读流的问题

#### 1、底层数据读取完成之后如何处理？

解决办法：在底层数据读取完成后，可以给 `push` 方法传递一个 `null`，这样内部实现就会知道底层数据已经读取完毕了。

#### 2、消费者如何获取可读流中的数据？

对于这个问题，Readable 提供了两个事件：`readable` 和 `data`。

### 消费数据为什么存在两种方式？

主要为了满足不同使用场景，有时可能只需按需读取一定量的数据，而有时可能需要源源不断的将底层数据全部读出。

基于这样的需求，在 Readable 的实现上就存在着两种模式：**流动模式** 和 **暂停模式**。

对于使用者来说两者的区别就在于消费数据的时候是否需要主动调用 `read()` 方法读取数据。

下面通过图示了解主要逻辑步骤：

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/88aa677a2fa8443087add0d0e85b29b6.png)

- 先创建一个 Readable 对象的实现
- 然后调用 `_read()` 方法读取底层数据
- 接着触发 `push` 操作，把底层数据添加到缓存区

完成上述步骤后就相当于有了一个可读流，也就是数据源，接着数据就等待着被消费。内部提供了 readable 和 data 事件用于消费数据。

### 消费数据

- readable 事件：当流中存在可读取的数据时触发
    - 需要主动调用 `read` 方法消费数据
    - 这个过程中可能会触发 `_read()` 从而继续读取底层数据
    - 然后到缓存区，再到应用程序，直到消费者获取 `null` 就意味着底层数据被读取完成，这是它就会停下来
- data 事件：当流中数据块传给消费者后触发
    - 这个事件被监听后，就意味着可读流处于流动模式，这时数据就会被尽可能快的传递
    - 底层数据被读取后甚至都不会调用 `push` 进入缓存区，而直接的被消费掉
    - 同样的，被读取到 `null`，消费行为就会停止

readable 和 data 相当于白盒环境，可以获取每次读取的数据执行自定义的消费操作。pipe 相当于封装好的黑盒，它直接将所有可读流的数据传递给可写流。

_其它事件请参考官方文档。_

### 自定义可读流总结

- 明确数据生产与消费流程
- 利用已有 API 实现自定义的可读流
- 明确数据消费的事件使用

### 示例代码

```js
const { Readable } = require('stream')

// 定义数组存放数据，模拟底层数据
const source = ['Hello', 'world', 'bye-bye']

// 自定义类继承 Readable
class MyReadable extends Readable {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    const data = this.source.shift() || null
    this.push(data)
  }
}

// 消费数据
const myReadable = new MyReadable(source)

// 打印结果：
// Helloworld
// bye-bye
// 由于每次 read 就会触发 _read 读取数据，所以每次获取到的实际是读取两次的数据
myReadable.on('readable', () => {
  let data = null
  while ((data = myReadable.read()) !== null) {
    console.log(data.toString())
  }
})

// 打印结果：
// Hello
// world
// bye-bye
// data 事件触发会将 _read 读取的数据传递给回调，不需要手动读取，所以每次只传递读取一次的数据
// 注意：需注释上面的 readable，否则打印结果会不一样
myReadable.on('data', data => {
  console.log(data.toString())
})

```

# 可写流

## 概念

可读流用于生产数据，处于结构的上游。而**可写流用于消费数据**，处于结构的下游。

通过可写流可以把数据写入到指定的地方。常见的操作就是向磁盘文件中写入内容，或者对 TCP 或 HTTP 的网络**响应**进行操作。

```js
const fs = require('fs')

// 创建可读流 生产数据
const rs = fs.createReadStream('test.txt')

// 修改字符编码，便于后续使用
rs.setEncoding('utf-8')

// 创建可写流 消费数据
const ws = fs.createWriteStream('test1.txt')

// 监听事件调用方法完成具体的消费
rs.on('data', chunk => {
  // 执行数据写入
  ws.write(chunk)
})
```

## 自定义可写流

### 如何自定义可写流

- 继承 stream 模块的 Writable 类
- 重新 `_write` 方法，调用 `write` 方法，实现数据的写入操作

### 常见的事件

可写流有的常见事件：

- pipe 事件：可读流调用 `pipe()` 方法向可写流传输数据时触发
- unpipe 事件：可读流调用 `unpipe()` 方法切换可写流时触发（不常用）
- drain 事件：当 `writable.write()` 返回 `false`，则 drain 事件将在适合继续将数据写入流时触发
    - 由于一些原因（例如读的太快写的太慢）导致无法将数据写入流时，写入操作 `writable.write()` 会返回 `false` ，并将传入的 `chunk` 缓存
    - 此时应该停止写入操作，等待 drain 事件
    - 当流排空（操作系统允许写入）将触发 drain 事件，可以在事件回调中恢复写入。
    - pipe 方法封装了这些机制

_其它事件请参考官方文档_

### 示例代码

```js
const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor() {
    super()
  }

  // chunk 当前要写入的数据
  // en 编码集
  // done 回调
  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + '<----')
    done()
  }
}

const myWritable = new MyWritable()

myWritable.write('Hello world',
  'utf-8',
  () => {
    console.log('啊啊啊啊啊啊啊')
  }
)

```

# 双工流

## 概念

Duplex 是双工流，同时实现了 Readable 和 Writable。

在管道操作中，既可以作为上游生产数据，也可以作为下游消费数据。

## 自定义双工流

### 如何自定义双工流

- 继承 Duplex 类
- 重写 `_read` 方法，调用 `push` 生产数据
- 重写 `_write` 方法，调用 `write` 消费数据

### 示例代码

```js
const { Duplex } = require('stream')

// 模拟底层数据源
const source = ['hello', 'world', 'bye-bye']

// 自定义双工流
class MyDuplex extends Duplex {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    const data = this.source.shift() || null
    this.push(data)
  }

  _write(chunk, en, done) {
    process.stdout.write(chunk)
    done()
  }
}

const myDuplex = new MyDuplex(source)

// 监听读取
myDuplex.on('data', chunk => {
  console.log(chunk.toString())
})


// 写入数据
// myDuplex.write('My name is Happy', () => {
//   console.log('done');
// })

```

# 转换流

## 概念

Transform 本质上也是一个双工流。

它和 Duplex 的区别是，Duplex 中的读和写是相互独立的，它的读操作所创建的数据不能被写操作直接当作数据源使用。但是，在 Transform 中这个操作是可以的，也就是说在转换流的底层是将读写操作进行了联通。

除此之外，转换流还可以对数据执行相应的转换操作，具体的转换由开发者定义实现。

## 自定义转换流

### 如何自定义转换流

- 继承 Transform 类
- 重新写 `_transform` 方法，调用 `pull` 和 `callback`
    - 在 `_transform` 方法内部就可以将获取到的数据再交给可读流使用
    - 同时还可以完成自定义的转换操作
- 重新 `_flush` 方法，处理剩余数据
    - 这个方法不是必须的

### 示例代码

```js
const { Transform } = require('stream')

class MyTransform extends Transform {
  constructor() {
    super()
  }
  _transform(chunk, en, callback) {
    // push 经过转换后的数据
    this.push(chunk.toString().toUpperCase())

    // 回调是 error-first 风格的回调，第一个参数接收的是错误信息
    callback(null)
  }
}

const myTransform = new MyTransform()

// 可以调用可写流的 write 方法写入数据
myTransform.write('a')

// 可以监听可读流的事件
myTransform.on('data', chunk => {
  console.log(chunk.toString())
})

```

# 文件可读流

文件的可读流操作实际上就是继承了 Readable 和 EventEmitter 类的内置 API，可以通过 fs 创建使用。

## 示例代码

```js
const fs = require('fs')

// 参数1是底层数据来源
// 参数2是可选的选项对象
const rs = fs.createReadStream('./test.txt', {
  flags: 'r', // 以什么模式打开文件，`r` 表示可读模式
  encoding: null, // 编码，默认 `null，表示 Buffer
  fd: null, // 文件描述符，默认 null，从 `3` 开始
  mode: 0o66, // 权限，默认 438（十进制）或 0o66（八进制）
  autoClose: true, // 是否自动关闭文件
  start: 0, // 读取的起始位置
  // end: 3, // 读取的截至位置
  highWaterMark: 4 // 水位线，表示每次读取多少字节的数据
})
```

读取的测试文件：`test.txt`

```json
0123456789
```

## 文件可读流创建和消费

### 暂停模式和流动模式

通过暂停和恢复 data 事件可以切换暂停/流动模式。

```js
rs.on('data', chunk => {
  console.log(chunk.toString())

  // 暂停触发 data 事件：进入暂停模式
  rs.pause()

  setTimeout(() => {
    // 恢复触发 data 事件：进入流动模式
    rs.resume()
  }, 1000)
})
```

### readable 事件消费数据的流程

```js
rs.on('readable', () => {
  let data = null

  while ((data = rs.read(1)) !== null) {
    // 获取缓冲区存储的数据的长度
    const len = rs._readableState.length

    console.log(data.toString(), '---', len)
  }
})

// 打印结果：
// 0 --- 3
// 1 --- 2
// 2 --- 1
// 3 --- 0
// 4 --- 3
// 5 --- 2
// 6 --- 1
// 7 --- 0
// 8 --- 1
// 9 --- 0
```

- 可读流首先内部调用 `_read` 读取4个字节（highWaterMark）的数据 `0123` 放入缓冲区，触发 readable 事件
- readable 事件回调中通过调用 `read` 方法读取1个字节的数据
- 因为缓冲区有数据，所以从里面读取了 `0`
- 缓冲区还剩下 `123`，仍可以被消费，于是继续触发 readable 事件
- 直到缓冲区清空，可读流又会调用 `_read` 从底层数据源读取数据
- 直到底层数据被消费完

## 文件可读流事件与应用

介绍文件可读流常见的事件和使用方式。

### 常见事件

```js
// 文件打开
// 在创建或实例化可读流后就会触发
// 并不需要数据被消费时才会触发
rs.on('open', fd => {
  console.log(fd, '文件打开了')
})

// 文件关闭
// 默认情况下，可读流是一个暂停模式
// 所以 close 只能在数据被消费完才会触发
rs.on('close', () => {
  console.log('文件关闭了')
})

// 消费数据
rs.on('data', chunk => {
  console.log(chunk.toString())
})

// 当数据被消费完成之后，可读流关闭之前触发
rs.on('end', () => {
  console.log('当数据被清空之后触发')
})

// 可尝试修改文件路径抛出错误
rs.on('error', err => {
  console.log('出错了')
})

```

### 常见使用方式

可读流每次读取的都是不完整的数据片段，在使用用时需要将其暂时存储起来，当全部数据消费完再重新拼接。

```js
// 存放 Buffer 格式的数据片段
let bufferArr = []

// 消费数据
rs.on('data', chunk => {
  console.log(chunk.toString())
  bufferArr.push(chunk)
})

// 当数据被消费完成之后，可读流关闭之前触发
rs.on('end', () => {
  console.log('当数据被清空之后触发')
  // 拼接数据片段
  console.log(Buffer.concat(bufferArr).toString())
})

```

# 文件可写流

文件的可写流操作实际上就是继承了 Writeable 和 EventEmitter 类的内置 API，可以通过 fs 创建使用。

## 示例代码

```js
const fs = require('fs')

// 参数1是写入数据的目标文件
// 参数2是可选的选项对象
const ws = fs.createWriteStream('test.txt', {
  flags: 'w', // 以什么模式打开文件，`w` 表示写入模式
  mode: 438, // 权限
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3 // 1个汉字占3个字节
})
```

## 写入回调执行顺序

```js
ws.write('蚌埠住了', () => {
  console.log('ok1')
})

// 追加写入
ws.write('123456', () => {
  console.log('ok2')
})

// ok1 永远打印在 ok2 之前
```

可以看到 write 方法的异步回调是按照 writer 方法的调用顺序串行执行的。

## 数据类型

```js
// 报错
// ws.write(1, () => {
//   console.log('ok1')
// })

ws.write(Buffer.from('1'), () => {
  console.log('ok2')
})
```

对于可写流，它里面可写入的数据类型并不受限制。

Writable 中也有不同的模式，不同的模式可以写入不同的数据类型，例如如果是 objectMode 则可以写入 JavaScript 中任意类型的值。

但是当前示例是一个文件的可写流，而文件的可写流实际上是对 Writable 的重新实现和继承，所以它要求写入的数据必须是字符串或者是 Buffer。

## 常用事件

```js
// 可写流被创建就会触发 open 事件
ws.on('open', fd => {
  console.log('open', fd)
})

// close 是在数据写入操作全部完成后触发
ws.on('close', () => {
  console.log('close')
})

// 写操作并不能触发 close 事件
ws.write('1')

// 执行写入
// end 执行意味着写操作结束，从而触发 close 事件
// end 可以接收参数，会将参数和缓冲区里的数据执行写入，如果不传参数则只会写入缓冲区里的数据
ws.end()

ws.on('error', err => {
  console.log('在 end 之后不允许执行写操作')
})

ws.write('2')
```