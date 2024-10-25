# 背压机制

[Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020).js 的 steam 已经实现了可以保证数据平滑流动的背压机制。

通过 drain 事件和 highWaterMark 可以很好的控制数据写入速度和控制[内存](https://so.csdn.net/so/search?q=%E5%86%85%E5%AD%98&spm=1001.2101.3001.7020)消耗。

pipe 方法实现了这个背压机制。

## 数据读写时可能存在的问题

下面示例是将 A 文件内容拷贝到 B 文件中。

```js
const fs = require('fs')

const rs = fs.createReadStream('A.txt')
const ws = fs.createWriteStream('B.txt')

rs.on('data', chunk => {
  ws.write(chunk)
})
```

需要注意的是，数据从磁盘中读取出来速度，远远大于数据写入磁盘的速度，也就是消费者的速度往往跟不上生产者的速度。

这样就会出现产能过剩。

而 Writeable 的内部又维护了一个队列，在它不能实时的去消费由上游传输的数据时，它就会尝试把当前不能消化的数据先缓存到队列中。

但是队列的内存大小设置了上限，因此读写的过程中如果不实现一个背压机制，很可能会出现**内存溢出、GC频繁调用、其它进程变慢**的场景。

基于这种场景，就需要提供一种可以让数据生产者和消费者之间平滑流动的机制，这就是**背压机制**。

## 数据读取流程

![在这里插入图片描述](http://p6ui.toweydoc.tech:20080/images/stydocs/05ae2ecebd5d41f0babe814d7613c536.png)

数据的读取操作分为三个部分：

1. 底层数据
2. 缓冲区：缓存读取的数据。Readable 默认空间上限是16KB，在文件可读流中为 64KB。一旦读取流的缓冲区大小达到 highWaterMark 就会暂停从底层数据源读取数据，直到缓冲区的数据被消费。
3. 消费者：通过主动调用 `read` 方法或监听 `data` 事件来消费数据

数据读取分为两种模式：

- 流动模式
- 暂停模式（默认）

从消费者的视角来看，可读流就相当于一个水池，里面装满了要消费的数据。

但是池子外部有一个水龙头开关，如果处于流动模式，就相当于一直放水，直到放完位置。

如果在这个过程中，用水的人跟不上放水的速度，不可能拿着1升的杯子去接10升的水。

所以这时用水的人在受不了的情况下，就要想办法告诉可读流要停一停，等自己先消化一下。

此时可读流就可以去调用 `pause` 方法将流动模式切换为暂停模式，放水的阀门就会被关闭。

现在用水的人就可以先慢慢消化之前缓冲的水资源，等到都消费完之后，就可以告诉可读流可以继续放水了。

## 数据写入流程

![在这里插入图片描述](http://p6ui.toweydoc.tech:20080/images/stydocs/8640105f8cf04a1699ad299664b4462f.png)

数据的写入操作分为三个部分：

1. 生产者
2. 缓存区
3. 底层资源

数据从上游的生产者传递过来，然后可写流调用 `write()` 方法消费数据。

在可写流内部同样也有一片内存空间作为缓存队列，同样具有水位线（highWaterMark）。

如果某个时刻缓冲区的数据超过了水位线，就说明当前无法再消费更多的水资源。

此时 `write()` 方法调用后就会返回 `false` 给上游的生产者，让他暂停放水，等可写流将缓存的数据消费完，就会再触发 `drain` 事件通知上游的生产者可以继续放水了。

此时可读流就可以调用 `resume` 方法再次打开阀门。

如此往复就可以保证数据的平滑流动，既不会出现内存被撑爆的情况，也不会存在某一时刻无水可用。

这就是 `pipe()` 方法内部的实现原理。

## 模拟 pipe 中的背压机制

实际应用中很少自定义背压机制，除非要对每个获取的数据进行单独的处理。一般情况下使用 pipe 即可。模拟背压机制是为了更好的理解它的原理。

```js
const fs = require('fs')

const rs = fs.createReadStream('test.txt', {
  highWaterMark: 3
})

const ws = fs.createWriteStream('test1.txt', {
  highWaterMark: 1
})

let flag = true

rs.on('data', chunk => {
  flag = ws.write(chunk, () => {
    console.log('ok')
  })

  if (!flag) {
    rs.pause()
  }
})

ws.on('drain', () => {
  rs.resume()
})
```

使用 pipe 方法的话就相当于：

```js
const fs = require('fs')

const rs = fs.createReadStream('test.txt', {
  highWaterMark: 3
})

const ws = fs.createWriteStream('test1.txt', {
  highWaterMark: 1
})

rs.pipe(ws)

```

# 模拟文件可读流

参考原生文件可读流的使用，实现自定义可读流，以理解数据生产的流程以及文件可读流的一些原理。

## 创建可读流和文件打开

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
    this.end = options.end // 读取的结束位置
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 缓存区的水位线（B）

    this.open()
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
}

const rs = new MyFileReadStream('test.txt')

rs.on('open', fd => {
  console.log('open', fd)
})

rs.on('error', err => {
  console.log('error', err)
})

```

## 读取数据和关闭文件

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
    this.end = options.end // 读取的结束位置
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 缓存区的水位线（B）
    this.readOffset = 0 // 每次读取的起始位置

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

    // 原生 read 方法读取文件数据
    fs.read(this.fd, buf, 0, this.highWaterMark, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        // 更新偏移量
        this.readOffset += readBytes
        // 触发 data 事件
        this.emit('data', buf.slice(0, readBytes))
        // 继续读取
        this.read()
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
}

const rs = new MyFileReadStream('test.txt')

// rs.on('open', fd => {
//   console.log('open', fd)
// })

// rs.on('error', err => {
//   console.log('error', err)
// })

// 与原生 fs 一样，如果不绑定 data 事件就不会触发 end 和 close 事件
rs.on('end', () => {
  console.log('end')
})

rs.on('close', () => {
  console.log('close')
})

rs.on('data', chunk => {
  console.log(chunk)
})

```

## 控制每次读取的数据量

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
      console.log(readBytes)
      if (readBytes) {
        // 更新偏移量
        this.readOffset += readBytes
        // 触发 data 事件
        this.emit('data', buf.slice(0, readBytes))
        // 继续读取
        this.read()
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
}

const rs = new MyFileReadStream('test.txt', {
  highWaterMark: 3,
  end: 7
})

// rs.on('open', fd => {
//   console.log('open', fd)
// })

// rs.on('error', err => {
//   console.log('error', err)
// })

// 与原生 fs 一样，如果不绑定 data 事件就不会触发 end 和 close 事件
// rs.on('end', () => {
//   console.log('end')
// })

// rs.on('close', () => {
//   console.log('close')
// })

rs.on('data', chunk => {
  console.log(chunk)
})

```

## 可读流解决的问题

如果使用 fs 的文件读写 API 实现文件复制就会出现下面的嵌套：

```js
fs.open('A.txt', (err, readFd) => {
  fs.open('B.txt', (err, writeFd) => {
    // 需要管理缓存、读取位置、长度等参数
    fs.read(readFd, ..., chunk => {
      fs.write(writeFd, chunk, () => {})

      // 循环读取
      next()
    })
  })
})
```

流操作优雅的代替了这种嵌套。