# 文件打开与关闭

前面的 API 是将文件中的数据一次性的读取/写入到内存中，这种方式对于大体积的文件来说，显然不合理。

所以需要实现一个可以边读边写或边写边读的操作方式，这就需要将文件的打开、读取、写入、关闭看作各自独立的环节。

打开/关闭 API：

- open：打开文件
- close：关闭文件

```js
// open & close
const fs = require('fs')
const path = require('path')

// fs.open(path[, flags[, mode]], callback)
// open 接口的回调函数接收的第二个参数是文件描述符，用于追踪文件资源
fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
  console.log(fd) // 第一个打开的文件的文件描述符是 3

  // fs.close(fd[, callback])
  fs.close(fd, err => {
    // 回调仅接收 err
    console.log('关闭成功')
  })
})

```

# 大文件读写操作

大文件读写操作的数据传输如图：

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/10e05760de534f8db49f228e938f2eb4.png)

A文件中的数据要想拷贝到B文件中，默认情况下需要内存作为中转。

如果是一次性的操作，就会存在内存占满并且溢出的潜在问题。

因此我们更期望有一个中间暂存区，一点一点的读取，然后一点一点的写入。

而这个中间暂存区就是 Buffer。

---

读取/写入 API：

- read：从 fd 指定的文件中读取数据
    - 这里是将数据从磁盘文件中写入到 buffer 中
- write：向 fs 指定的文件写入数据
    - 将缓冲区里的内容写入到磁盘文件中

```js
// read
const fs = require('fs')

// 定义一个 Buffer 用于存储文件读取的数据
const buf = Buffer.alloc(10)

// 首先打开一个文件
// A.txt 内容：1234567890
fs.open('A.txt', 'r', (err, readFd) => {
  // fs.read(fd, [options,] callback)
  // options 中的选项也可以单独作为参数使用：fs.read(fd, buffer, offset, length, position, callback)
  // 读取操作只会读取一次，并不会持续读取到读完所有数据
  fs.read(
    readFd, // 用于指定读取的文件
    {
      buffer: buf, // 数据将写入的缓冲区
      offset: 0, // buffer 中写入数据的起始位置
      length: 3, // 读取文件数据的字节数
      position: 0 // 读取文件数据的起始位置。如果为 null 或 -1 就会从当前文件位置开始读取，并自动更新当前文件位置，所以一般不需要指定它
    },
    (err, bytesRead, buffer) => {
      // bytesRead 实际读取的字节数
      // buffer 最终读取的数据
      console.log(bytesRead) // 3
      console.log(buffer) // <Buffer 31 32 33 00 00 00 00 00 00 00>
      console.log(buffer.toString()) // 123
    }
  )
})

```

```js
// write
const fs = require('fs')

// 定义一个已有数据的 Buffer，作为写入文件的数据
const buf = Buffer.from('1234567890')

fs.open('B.txt', 'w', (err, writeFd) => {
  // fs.write(fd, buffer[, offset[, length[, position]]], callback)
  // 也可以写入字符串：fs.write(fd, string[, position[, encoding]], callback)
  // offset 从 buffer 的哪个位置取数据
  // length 从 buffer 中读取数据的字节数
  // position 文件中写入数据的起始位置。如果为 null 或 -1 就会从当前文件位置开始写入，并自动更新当前文件位置，所以一般不需要指定它
  fs.write(writeFd, buf, 1, 3, 0, (err, bytesWritten, buffer) => {
    // bytesWritten 实际写入的字节数
    // buffer 指向写入的数据源
    console.log(bytesWritten) // 3
    console.log(buffer === buf) // true
  })
})

```

> 开发时记得将开启的文件关闭 `close`。

# 文件拷贝自定义实现

默认情况下 Nodejs 提供了 copyFile 用于拷贝，但它是基于 readFile 和 writeFile 这类一次性的读写操作。

针对于大体积的文件来说，它是不合适的。

下面基于其它文件读写 API 实现适用于大文件的文件拷贝功能。

```js
// 将 A 文件内容拷贝到 B 文件
// A.txt 内容：1234567890abcdefghigklmn

// 01 打开 A 文件，利用 read 将数据保存到 buffer 暂存起来
// 02 打开 B 文件，利用 write 将 buffer 中的数据写入到 B 文件中

// 数据单次拷贝
const fs = require('fs')
const buf = Buffer.alloc(10)

// 打开 A 文件
fs.open('A.txt', 'r', (err, readFd) => {
  // 打开 B 文件
  fs.open('B.txt', 'w', (err, writeFd) => {
    // 从打开的 A 文件读取数据
    fs.read(readFd, buf, 0, 10, 0, (err, bytesRead, buffer) => {
      // 将 buffer 中的数据写入到 B 文件中
      fs.write(writeFd, buf, 0, 10, 0, (err, bytesWritten) => {
        console.log('写入成功')
      })
    })
  })
})

```

当前只拷贝了一次读取的内容，还需要进行调整：

```js
// 将 A 文件内容拷贝到 B 文件
// A.txt 内容：1234567890abcdefghigklmn

// 01 打开 A 文件，利用 read 将数据保存到 buffer 暂存起来
// 02 打开 B 文件，利用 write 将 buffer 中的数据写入到 B 文件中

// 数据完全拷贝
const fs = require('fs')
const buf = Buffer.alloc(10)

const BUFFER_SIZE = buf.length // 每次读取数据的字节数

fs.open('A.txt', 'r', (err, readFd) => {
  fs.open('B.txt', 'w', (err, writeFd) => {
    function next() {
      // position 指定为 null 自动更新读取文件的起始位置位置
      fs.read(readFd, buf, 0, BUFFER_SIZE, null, (err, bytesRead, buffer) => {
        if (bytesRead === 0) {
          // 内容读取完毕，关闭文件
          fs.close(readFd, () => {})
          fs.close(writeFd, () => {})
          console.log('拷贝完成')
          return
        }

        // 不指定 positio  自动更新写入文件的起始位置位置
        fs.write(writeFd, buf, 0, bytesRead, (err, bytesWritten) => {
          // 再次读取数据
          next()
        })
      })
    }

    // 首次启动读取
    next()
  })
})

```

相对于 readFile 和 writeFile 一次性读写，这种方式会减轻内存的消耗，提高代码执行性能。

不过，对于 Nodejs 来说，针对这样的需求，更好的方式是使用流操作。

# 目录操作 API

目录操作 API 同 文件操作 API 一样，大多存在同步和异步两种方式，这里只列举异步 API，同步 API 可以参考 Nodejs 文档。

常用 API：

- access：判断用户是否具有当前文件或目录的操作权限
- stat：获取目录及文件信息
- mkdir：创建目录 make directory
- rmdir：删除目录 remove directory
- readdir：读取目录中的内容
- unlink：删除文件
- rm：删除文件和目录
    - 新增于 v14.14.0，rmdir 递归删除的替代推荐
    - Nodejs v14.14.0 推荐使用 `fs.rm` 代替 `fs.rmdir` 的 `recursive` 选项
    - Nodejs v16.0.0 弃用 `fs.rmdir` 的 `recursive` 选项，使用将导致错误

```js
const fs = require('fs')

// access
// 常用于判断目录或文件是否存在
// windows 环境下一般对文件都具有可读可写不可执行的权限
fs.access('data.txt', err => {
  // 仅接收 err
  if (err) {
    console.log(err)
  } else {
    console.log('有操作权限')
  }
})

// stat
fs.stat('data.txt', (err, stats) => {
  // 回调返回一个 `fs.stats` 类，该对象提供有关文件的信息
  console.log(stats.size) // 内容字节数
  console.log(stats.isFile()) // 是否文件
  console.log(stats.isDirectory()) // 是否目录
})

// mkdir
// 默认情况下创建的是路径最后部分，创建前提是保证父级目录全部存在
// 假设下例 a/b 不存在
fs.mkdir('a/b/c', err => {
  // 仅接收err
  if (err) {
    console.log(err) // 进入这里
  } else {
    console.log('c 创建成功')
  }
})

// 也可以通过选项实现递归创建
// recursive 表示递归，默认为 false，开启后将执行递归目录创建
fs.mkdir('a/b/c', { recursive: true }, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('a b c 创建成功') // 进入这里
  }
})
```

```js
const fs = require('fs')

// rmdir
// 默认情况下删除的是路径的最后部分
// 如果删除的不是目录类型或者路径不存在，则会报错，windows 环境下报 `ENOENT` 错误
fs.rmdir('a/b/c', err => {
  // 仅接收 err
  if (err) {
    console.log(err)
  } else {
    console.log('c 删除成功')
  }
})

// 默认情况下删除非空目录（目录下存在其它目录或文件）则会报错
fs.rmdir('a', err => {
  if (err) {
    console.log(err) // 报 `ENOTEMPTY` 错误
  } else {
    console.log('a 删除成功')
  }
})

// 同 mkdir 一样，rmdir 也提供一个 recursive 选项用于递归删除
// 不过官方 v16.0.0 已弃用这个选项，而推荐使用 fs.rm()
fs.rmdir('a', { recursive: true }, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('a 删除成功')
  }
})
```

v14.14.0 版本开始推荐使用 `fs.rm()` 实现递归删除，v16.0.0 开始禁止使用 `fs.rmdir(path, {recursive: true}, callback)` 实现递归删除。

```js
const fs = require('fs')

// rm
fs.rm(
  'a',
  {
    force: true, // 如果 path 不存在，异常是否被忽略，默认 false
    recursive: true // 是否递归删除，默认 false
  },
  err => {
    if (err) {
      console.log(err)
    } else {
      console.log('a 删除成功')
    }
  }
)

```

```js
const fs = require('fs')

// readDir
/*
  示例目录：

  └─ a
      ├─ b
      │   └─ b.txt
      └─ a.txt
 */

// 仅读取当前目录下一层文件列表，不会递归读取
fs.readdir('a', (err, files) => {
  // files 是文件名组成的数组
  console.log(files) // [ 'a.txt', 'b' ]
})

fs.readdir('a/b', (err, files) => {
  console.log(files) // [ 'b.txt' ]
})

```

```js
const fs = require('fs')

// unlink
// 删除的是 path 的最后部分，如果文件不存在则报错
fs.unlink('a/a.txt', err => {
  // 仅接收 err
  if (err) {
    console.log(err)
  } else {
    console.log('文件删除成功')
  }
})

// 如果删除的文件是目录类型，则报错
fs.unlink('a', err => {
  if (err) {
    console.log(err) // 报错不允许操作
  } else {
    console.log('不会进入到这里')
  }
})

```

# 同步模拟递归创建目录

使用同步 API 模拟 `fs.mkdir(path, {recursive: true})` 递归创建目录，了解同步 API 的使用：

```js
const fs = require('fs')
const path = require('path')

function makeDirSync(dirPath) {
  const items = dirPath.split(path.sep) // 获取当前平台的路径分隔符 `/` 或 `\`

  for (let index = index; i <= items.length; index++) {
    const dir = items.slice(0, index).join(path.sep)
    try {
      // 判断是否具有操作权限（即文件是否存在）
      fs.accessSync(dir)
    } catch (err) {
      // 不存在则创建
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync(path.join('a/b/c'))

```

# 异步模拟递归创建目录

使用异步 API 模拟 `fs.mkdir(path, {recursive: true})` 递归创建目录，了解异步 API 的 Promise 使用。

回调方式：

```js
const fs = require('fs')
const path = require('path')

function makeDirAsync(dirPath, cb) {
  const items = dirPath.split(path.sep)
  let index = 1

  function next() {
    if (index > items.length) return cb && cb()

    const dir = items.slice(0, index++).join(path.sep)

    fs.access(dir, err => {
      if (err) {
        fs.mkdir(dir, next)
      } else {
        next()
      }
    })
  }

  next()
}

makeDirAsync(path.join('a/b/c'), () => {
  console.log('创建完成')
})

```

Promise 方式：

Nodejs 中有一个 util 实用工具，其中的 `promisify` 方法用于将 Nodejs 中常用的 err-first 回调风格的 API 转化成返回 promise 的 API。

```js
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 将 access 和 mkdir 转化成 promise 风格
const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function makeDirAsync(dirPath) {
  const items = dirPath.split(path.sep)

  for (let index = 1; index <= items.length; index++) {
    const dir = items.slice(0, index).join(path.sep)

    try {
      await access(dir)
    } catch (err) {
      await mkdir(dir)
    }
  }
}

makeDirAsync(path.join('a/b/c'))

```

# 异步模拟递归删除目录

通过模拟 Nodejs 原生递归删除的功能，了解其它 API 的使用：

```js
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 01 判断当前传入的路径是否是一个文件，如果是文件直接删除
// 02 如果当前传入的路径是目录，需要继续读取目录中的内容，然后再执行删除操作
// 03 将删除行为定义成一个函数，然后递归复用
// 04 将文件名称拼接成在删除时可以使用的路径

function removeDir(dirPath, cb) {
  // 判断路径的类型
  fs.stat(dirPath, (err, stats) => {
    if (stats.isDirectory()) {
      // 目录 --> 继续读取
      fs.readdir(dirPath, (err, files) => {
        const dirs = files.map(file => {
          return path.join(dirPath, file)
        })

        // 记录当前目录下删除的文件数
        let index = 0

        // 定义递归删除的方法
        function next() {
          // 内容全部删除
          if (index === dirs.length) return fs.rmdir(dirPath, cb)

          // 当前要删除的文件
          let current = dirs[index++]
          removeDir(current, next)
        }

        next()
      })
    } else {
      // 文件 --> 直接删除
      fs.unlink(dirPath, cb)
    }
  })
}

removeDir('a', () => {
  console.log('删除完成')
})
```