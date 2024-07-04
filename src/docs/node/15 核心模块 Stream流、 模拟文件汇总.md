# 模拟文件汇总

## 文件可读流

```js
const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.fd = null
    this.path = path
    this.flags = options.flags || 'r' // 文件打开模式，默认可读模式
    this.mode = options.mode || 438 // 权限位，默认438 （wr权限）
    this.autoClose = options.autoClose || true // 读取完是否自动关闭文件
    this.start = options.start || 0 // 读取的起始位置
    this.end = options.end // 读取的结束位置(包含结束位置的数据)
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 缓存区的水位线（B）
    this.readOffset = 0 // 每次读取的起始位置
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
    // 原生 open 方法打开指定位置上的文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }

      this.fd = fd
      this.emit('open', fd)
    })
  }

  read() {
    // 注册 data 事件是同步代码，
    // 注册 data 事件的时机可能早于 fs.open 的回调，此时 fd 还未赋值
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }

    // 申请指定大小的缓存空间
    const buf = Buffer.alloc(this.highWaterMark)

    // 要读取的数据量
    const howMuchToRead = this.end ? Math.min(this.end - this.readOffset + 1, this.highWaterMark) : this.highWaterMark

    // 原生 read 方法读取文件数据
    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        // 更新偏移量
        this.readOffset += readBytes
        // 触发 data 事件
        console.log('read 结果：',buf.slice(0, readBytes).toString());
        this.emit('data', buf.slice(0, readBytes))
        // 继续读取
        // this.read()
        // 判断是否暂停读取
        if (this.flowing) {
          this.read()
        }
      } else {
        // 没有数据可读

        // 先触发 end 再触发 close
        this.emit('end')
        if (this.autoClose) {
          this.close()
        }
      }
    })
  }

  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
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

## 单向链表队列

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

  // 删除指定位置的节点，并返回删除的节点
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

module.exports = Queue

```

## 文件可写流

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

module.exports = MyFileWriteStream
```