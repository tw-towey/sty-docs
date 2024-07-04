# 链表结构

链表是一种存储数据的结构。

在文件可写流 `write` 方法工作的时候，有些被写入的内容需要在缓冲区中进行排队等待，而且遵循的是先进先出的规则。

为了存储这些排队的数据，在新版 Node 中就采用了链表的结构存储这些数据。

## 为什么不采用数组存储数据？

相对于链表结构，数组会有一些明显的缺点：

- 在多个语言下数组存储数据的长度具有上限
- 数组存在塌陷问题，在执行插入或删除元素的时候，有可能会移动其它元素的位置
- 在 JavaScript 中数组实际上是对象类型，在使用效率上会低一些

以上缺点只是相对于链表，实际使用中数组结构还是非常强大的。

## 链表

链表是由一系列**节点（node）**组合而成的集合。

每个节点都具有**指向下一个节点引用的属性（next）**。

将这些指向下一个节点的引用组合在一起就形成了一个**链**。

### 常见链表分类

- 双向链表：最常用，它的查询速度会更快一些
- 单向链表：本例讨论单向链表，它足够可写流的 write 方法使用
- 循环链表

## 单向链表结构

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/0d6cc379229e4abcb1252e3dcf34dd58.png)

链表结构其实就是一个容器，里面存放着三个物件：head、null 以及中间的 node 节点。

在 node 节点身上有一个 next 属性，指向下一个 node 节点。

同时 node 节点身上还有一个 element 属性，用于存放当前 node 节点具体数据。

head 指向第一个 node 节点，然后按照 next 指向的顺序依次向下传递，一直到最后一个 node 节点，它的 next 指向 null。

默认情况下，链表是空的（head = null），里面没有 node 节点。

所谓双向链表就是在每个 node 节点身上多一个类似 prev 的属性，指向上一个节点。

而循环链表就是将头尾节点连接起来。

## 链表的作用

链表的出现主要还是用来存储数据。

这个功能和数组类似，因此链表常见的动作无非就是数据的增加、删除、修改、查询以及清空之类的操作。

这些都需要在创建链表结构的时候自行实现。

# 单向链表实现

掌握单向链表结构的实现，以在自定义文件可写流的时候实现存储需要排队写入的数据。

1. 链表结构包含 node、head、null
2. 默认链表是空的，也就是 head 指向 null
3. 链表的操作类似数组，所以要有个属性记录节点的数量：size
4. 每个节点必须有一个属性指向下一个数据：next
5. 节点本身还要存储数据，使用一个属性存储：element
6. 使用链表结构的行为一般有：增加、删除、修改、查询、清空

## 初始实现和首部添加节点

```js
// 节点
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

// 链表
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  /**
   * 增加
   * @param {number} index [可选] 增加节点的位置
   * @param {*} element 节点的数据
   */
  add(index, element) {
    if (arguments.length === 1) {
      element = index // 第一个参数为节点数据
      index = this.size // 添加到末尾
    }

    // 处理边界
    if (index < 0 || index > this.size) {
      throw new Error('越界了')
    }

    if (index === 0) {
      // 添加到首部
      // 保留原有的 head 指向，作为新增节点的 next 指向
      const head = this.head
      // 新的 head 指向新增节点
      this.head = new Node(element, head)
    } else {
      // 添加到中间或尾部
      // 将链表从指定位置截断
      const prevNode = this._getNode(index - 1)
      // 前面最后节点的 next 指向新增节点
      // 后面最前节点的引用存入新增节点的 next
      prevNode.next = new Node(element, prevNode.next)
    }

    // 更新计数
    this.size++
  }
}

const l1 = new LinkedList()

l1.add('node1')
console.log(l1)

```

## 获取指定位置节点、添加节点、删除节点

```js
// 节点
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

// 链表
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  // 截取指定位置的节点
  _getNode(index) {
    // 处理边界
    if (index < 0 || index >= this.size) {
      throw new Error('越界了')
    }

    // 遍历获取节点
    let currentNode = this.head
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }

    return currentNode
  }

  /**
   * 增加
   * @param {number} index [可选] 增加节点的位置
   * @param {*} element 节点的数据
   */
  add(index, element) {
    if (arguments.length === 1) {
      element = index // 第一个参数为节点数据
      index = this.size // 添加到末尾
    }

    // 处理边界
    if (index < 0 || index > this.size) {
      throw new Error('越界了')
    }

    if (index === 0) {
      // 添加到首部
      // 保留原有的 head 指向，作为新增节点的 next 指向
      const head = this.head
      // 新的 head 指向新增节点
      this.head = new Node(element, head)
    } else {
      // 添加到中间或尾部
      // 将链表从指定位置截断，获取添加位置前面的节点
      // 节点的 next 指向新增节点
      // 节点之前 next 指向的引用存入新增节点的 next
      const prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }

    // 更新计数
    this.size++
  }

  // 删除指定位置的节点
  remove(index) {
    let rmNode = null

    if (index === 0) {
      rmNode = this.head
      if (!rmNode) {
        return undefined
      }
      this.head = rmNode.next
    } else {
      const prev = this._getNode(index - 1)
      rmNode = prev.next
      prev.next = rmNode.next
    }

    this.size--

    return rmNode
  }
}

const l1 = new LinkedList()

l1.add('node1')
l1.add('node2')
l1.add(1, 'node3')
console.log(l1)

l1.remove(1)
console.log(l1)

```

## 修改、查询和清空

```js
// 节点
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

// 链表
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  // 截取指定位置的节点
  _getNode(index) {
    // 处理边界
    if (index < 0 || index >= this.size) {
      throw new Error('越界了')
    }

    // 遍历获取节点
    let currentNode = this.head
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }

    return currentNode
  }

  /**
   * 增加
   * @param {number} index [可选] 增加节点的位置
   * @param {*} element 节点的数据
   */
  add(index, element) {
    if (arguments.length === 1) {
      element = index // 第一个参数为节点数据
      index = this.size // 添加到末尾
    }

    // 处理边界
    if (index < 0 || index > this.size) {
      throw new Error('越界了')
    }

    if (index === 0) {
      // 添加到首部
      // 保留原有的 head 指向，作为新增节点的 next 指向
      const head = this.head
      // 新的 head 指向新增节点
      this.head = new Node(element, head)
    } else {
      // 添加到中间或尾部
      // 将链表从指定位置截断，获取添加位置前面的节点
      // 节点的 next 指向新增节点
      // 节点之前 next 指向的引用存入新增节点的 next
      const prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }

    // 更新计数
    this.size++
  }

  // 删除指定位置的节点
  remove(index) {
    let rmNode = null

    if (index === 0) {
      rmNode = this.head
      if (!rmNode) {
        return undefined
      }
      this.head = rmNode.next
    } else {
      const prev = this._getNode(index - 1)
      rmNode = prev.next
      prev.next = rmNode.next
    }

    this.size--

    return rmNode
  }

  // 修改
  set(index, element) {
    const node = this._getNode(index)
    node.element = element
  }

  // 查询
  get(index) {
    return this._getNode(index)
  }

  // 清空
  clear() {
    this.head = null
  }
}

const l1 = new LinkedList()

l1.add('node1')
l1.add('node2')
l1.add(1, 'node3')
console.log(l1)

// l1.remove(1)
l1.set(1, 'node4')
console.log(l1)

console.log(l1.get(1))

l1.clear()
console.log(l1);

```

## 单向链表实现先进先出队列

使用单向链表实现一个先进先出的队列结构，用于在稍后实现文件可写流的 write 方法中存储需要排队写入的数据。

```js
// 节点
class Node {
  ...
}

// 链表
class LinkedList {
  ...
}

class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  // 入列
  enQueue(data) {
    this.linkedList.add(data)
  }

  // 出列
  deQueue() {
    return this.linkedList.remove(0)
  }
}

const q = new Queue()
console.log(q)

q.enQueue('node1')
q.enQueue('node2')
console.log(q)

let a = q.deQueue()
console.log(a)
a = q.deQueue()
console.log(a)
a = q.deQueue()
console.log(a)

```

# 模拟文件可写流

使用上面自定义的单向链表队列模拟文件可写流。

> 注意使用 CommonJS 方式导出 `Queue`。

核心就是实现 write 方法，它本身是一个异步操作，但当有多个 write 同时执行时，Node 内部就会将它们处理成串行的方式，这也是开发中经常使用的并行解决方案。

## 创建可写流和文件打开

```js
const fs = require('fs')
const EventEmitter = require('events')
// 自定义的单向链表队列
const Queue = require('./linked-queue')

class MyFileWriteStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.open()
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }
      // 正常打开文件
      this.fd = fd
      this.emit('open', fd)
    })
  }
}

const ws = new MyFileWriteStream('/test1.txt', {})

ws.on('open', fd => {
  console.log('open----', fd)
})

```

## write 方法和返回值

```js
const fs = require('fs')
const EventEmitter = require('events')
// 自定义的单向链表队列
const Queue = require('./linked-queue')

class MyFileWriteStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.open()

    this.writeOffset = this.start // 执行写入的偏移量
    this.writing = false // 当前是否正在执行写入
    this.length = 0 // 累计待写入量
    this.needDrain = false // 是否需要触发 drain 事件
    this.cache = new Queue()
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }
      // 正常打开文件
      this.fd = fd
      this.emit('open', fd)
    })
  }

  write(chunk, encoding, cb) {
    // 仅作了简单判断：字符串 或 buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    this.length += chunk.length

    const flag = this.length < this.highWaterMark

    this.needDrain = !flag

    if (this.writing) {
      // 当前正在执行写入，内容应该排队
      // this.cache.enQueue()
    } else {
      // 当前不是正在写入，执行写入
      this.writing = true
      this._write(chunk, encoding, cb)
    }

    return flag
  }

  _write(chunk, encoding, cb) {
    console.log('正在执行写入')
  }
}

const ws = new MyFileWriteStream('/test1.txt', {
  highWaterMark: 3
})

ws.on('open', fd => {
  console.log('open----', fd)
})

let flag = ws.write('1', 'utf8', () => {
  console.log('ok1')
})
console.log(flag)
flag = ws.write('2')
console.log(flag)
flag = ws.write('3')
console.log(flag)

```

## 执行写入、缓存、触发 drain 事件

```js
const fs = require('fs')
const EventEmitter = require('events')
// 自定义的单向链表队列
const Queue = require('./linked-queue')

class MyFileWriteStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.open()

    this.writeOffset = this.start // 执行写入的偏移量
    this.writing = false // 当前是否正在执行写入
    this.length = 0 // 累计待写入量
    this.needDrain = false // 是否需要触发 drain 事件
    this.cache = new Queue()
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }
      // 正常打开文件
      this.fd = fd
      this.emit('open', fd)
    })
  }

  write(chunk, encoding, cb) {
    // 仅作了简单判断：字符串 或 buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    this.length += chunk.length

    const flag = this.length < this.highWaterMark

    this.needDrain = !flag

    if (this.writing) {
      // 当前正在执行写入，内容应该排队
      this.cache.enQueue({ chunk, encoding, cb })
    } else {
      // 当前不是正在写入，执行写入
      this.writing = true
      this._write(chunk, encoding, cb)
    }

    return flag
  }

  _write(chunk, encoding, cb) {
    // 保证在 open 后执行
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        // 在执行回调的同时处理缓存队列
        this._write(chunk, encoding, cb)
      })
    }

    fs.write(this.fd, chunk, this.start, chunk.length, this.writeOffset, (err, written) => {
      // 更新写入偏移量
      this.writeOffset += written
      // 更新累计待写入量
      this.length -= written
      // 执行回调
      cb && cb()
      // 清空排队的内容
      this._clearBuffer()
    })
  }

  _clearBuffer() {
    const data = this.cache.deQueue()
    if (data) {
      this._write(data.element.chunk, data.element.encoding, data.element.cb)
    } else {
      if (this.needDrain) {
        // 重置写入写入状态（否则第一次drain后无法继续写入）
        this.writing = false
        // 重置 drain 状态
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}

const ws = new MyFileWriteStream('/test1.txt', {
  highWaterMark: 3
})

ws.on('open', fd => {
  console.log('open----', fd)
})

let flag = ws.write('1', 'utf8', () => {
  console.log('ok1')
})
console.log(flag)
flag = ws.write('2', 'utf8', () => {
  console.log('ok2')
})
console.log(flag)
flag = ws.write('3', 'utf8', () => {
  console.log('ok3')
})
console.log(flag)
flag = ws.write('4', 'utf8', () => {
  console.log('ok4')
})
console.log(flag)

ws.on('drain', () => {
  console.log('drain')
})

```

# pipe 方法的使用

pipe 方法可以看作是文件读写操作的终极语法糖。

无论是文件的可写流还是可读流，它们的核心目的都是去为了完成数据从一个文件中拿出来写入另一个文件中的操作。本质上是一个拷贝的作用。

在使用传统（fs模块）的 read 和 write 方法时，存在大量异步嵌套的语法现象。而采用流的方式可以在语法上解决这种嵌套的问题。

但是在使用时还是要通过文件的可读流进行数据的读取，接着使用文件的可写流完成数据的写入。

所以这个过程看起来还是非常麻烦，因此 Node 内部提供了一个 pipe 方法，它的底层是基于流来实现的，但是在使用上就会显得更加简便一些。

## 原生 pipe 使用

```js
const fs = require('fs')

const rs = fs.createReadStream('./A.txt', {
  highWaterMark: 4
})

const ws = fs.createWriteStream('./B.txt', {
  highWaterMark: 1
})

rs.pipe(ws)

```

## 补充模拟的文件可读流的 pause 和 resume

这里简单实现 pause 和 resume 方法，核心就是定义一个表示可读流是否在流动的状态：

```js
const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    // ...
    this.flowing = true // 是否在流动

    this.open()

    // 注册事件触发事件
    this.on('newListener', type => {
      if (type === 'data') {
        this.read()
      }
    })
  }

  open() {
    // ...
  }

  read() {
    // ...
    
    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes
        this.emit('data', buf.slice(0, readBytes))
        // 继续读取
        // this.read()
        // 判断是否暂停读取
        if (this.flowing) {
          this.read()
        }
      } else {
        this.emit('end')
        if (this.autoClose) {
          this.close()
        }
      }
    })
  }

  close() {
    // ...
  }

  pause() {
    if (this.flowing) {
      this.flowing = false
    }
  }

  resume() {
    if (!this.flowing) {
      this.flowing = true
      this.read()
    }
  }
}

module.exports = MyFileReadStream
```

> 注意：源码中更复杂，需要添加缓存机制、同步读取、返回读取数据、resume 中循环调用 `read()` 等，这里做的很简单。

## 模拟实现 pipe

使用之前模拟的文件可读流和文件可写流实现 pipe 方法。

> 注意要将模块通过 CommonJS 方式导出。

从原生使用上可知 pipe 方法是由文件可读流调用的，所以它是文件可读流的实例方法：

```js
const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    // ...
  }

  open() {
    // ...
  }

  read() {
    // ...
  }

  close() {
    // ...
  }

  pause() {
    // ...
  }

  resume() {
    // ...
  }

  pipe(ws) {
    this.on('data', chunk => {
      const flag = ws.write(chunk)
      if (!flag) {
        // 暂停读取
        this.pause()
        // 恢复读取
        ws.on('drain', () => {
          this.resume()
        })
      }
    })
  }
}

module.exports = MyFileReadStream
```

## 模拟 pipe 使用

```js
const fs = require('fs')

const MyFileReadStream = require('./read-stream');
const MyFileWriteStream = require('./write-stream');

const rs = new MyFileReadStream('./A.txt', {
  highWaterMark: 4
})

const ws = new MyFileWriteStream('./B.txt', {
  highWaterMark: 1
})

rs.pipe(ws)
```