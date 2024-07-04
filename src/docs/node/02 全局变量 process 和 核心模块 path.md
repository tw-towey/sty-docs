# 全局变量 process
## 获取进程信息

```js
// 1 资源

// 1.1 内存

// 占用 arrayBuffers
// 声明一个大小为 1000 的 Buffer
// Buffer.alloc(1000)

console.log(process.memoryUsage())
// {
//   rss: 24879104, // 常驻内存
//   heapTotal: 4509696, // 脚本执行之初申请的总的内存大小
//   heapUsed: 2415608, // 当前脚本在执行中实际使用的内存大小
//   external: 808874, // 底层 C/C++ 模块所占据的内存大小
//   arrayBuffers: 9386 // 缓冲区，代表一块独立的空间，不占据 V8 的内存，默认也会先申请一块空间
// }

// 1.2 CPU

console.log(process.cpuUsage())
// {
//   user: 31000, // 用户占用的 CPU 时间片段
//   system: 78000 // 操作系统占用的 CPU 时间片段
// }

```

```js
// 2 运行环境

// 2.1 运行目录
console.log(process.cwd())

// 2.2 node 环境信息
console.log(process.version) // node 版本
console.log(process.versions) // 更多版本信息

// 2.3 cpu 架构
console.log(process.arch) // x64

// 2.4 用户环境（开发环境）
console.log(process.env.NODE_ENV)
console.log(process.env.PATH)

// 2.5 系统平台
console.log(process.platform) // win32

```

```js
// 3 运行状态

// 3.1 启动参数(如 node <脚本文件> 1 -a 2 -b)
console.log(process.argv) // [<node 启动程序绝对路径>, <脚本文件绝对路径>, '1', '-a', '2', '-b']

// 3.2 进程 PID
console.log(process.pid)

// 3.3 运行时间
setTimeout(() => {
  console.log(process.uptime()) // 脚本从运行开始到结束总共消耗的时间
}, 3000)

```

## 执行进程操作

```js
// 1 事件监听

// 注册一个退出事件
// 退出事件在当前脚本文件执行完成之后触发
// code 是退出时的状态码
process.on('exit', code => {
  console.log('exit ' + code)
  setTimeout(() => {
    console.log('exit 事件不支持异步代码')
  }, 1000)
})

process.on('beforeExit', code => {
  console.log('before exit ' + code)
  // beforeExit 事件中执行异步代码会让将要退出的脚本继续执行
  // 结果会导致 beforeExit 触发死循环
})

console.log('脚本执行结束')

// 主动退出不会触发 beforeExit
// process.exit()

// 脚本执行结束
// exit 0
// before exit 0

```

下面简单了解一下管道、流：

```js
// 2 标准输出

console.log = data => {
  // stdout 标准输出
  // stdout 返回一个流对象
  process.stdout.write('---' + data + '\n')
}

console.log(11)
console.log(22)

const fs = require('fs')

// 创建一个可读流 读取 test.txt 的内容
fs.createReadStream('test.txt')
  // 通过一个管道将数据流向（传递）下一个处理者
  // 传递给标准输出，就会打印到控制台
  .pipe(process.stdout)

```

```js
// 3 标准输入

// stdin 同样返回一个流
process.stdin
  // 允许在控制台输入内容
  // 将控制台输入的内容流向 stdout 输出
  // 类似复印的效果
  .pipe(process.stdout)
```

```js
// 3 标准输入

// 设置标准输入的字符编码集
process.stdin.setEncoding('utf-8')

// 监听 readable 事件
// 当有可从流中读取的数据时，会触发 readable 事件
// 数据会被读入内部缓冲区
process.stdin.on('readable', () => {
  // 从内部缓冲区取出一些数据并返回
  let chunk = process.stdin.read()
  if (chunk) {
    process.stdout.write('data ' + chunk)
  }
})

```

# 内置模块之 path

[Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020) 内置的模块需要通过 require 导入当前的脚本中使用。

path 模块的主要作用是用于处理文件或目录的路径。

**常用 API**

- `basename()`：获取路径中基础名称
- `dirname()`：获取路径中目录路径
- `extname()`：获取路径中扩展名称
- `isAbsolute()`：判断路径是否为绝对路径
- `join()`：拼接多个路径片段
- `resolve()`：返回绝对路径
- `parse()`：解析路径
- `format()`：序列化路径，与 `parse()` 相反
- `normalize()`：规范化路径

```js
const path = require('path')

/** 1 获取路径中的基础名称
 * 01 返回的是接收路径当中的最后一部分，忽略前后的路径分隔符
 * 02 第二个可选参数表示扩展名，如果没有设置则返回完整带后缀的文件名称
 * 03 第二个参数也可以看作从后截取的字符串
 * 04 第二个参数会匹配当前路径的基础名称，如果匹配失败则忽略
 */

console.log(path.basename('D:/a/b/c/demo.js')) // demo.js
console.log(path.basename('D:/a/b/c/demo.js', '.js')) // demo
console.log(path.basename('D:/a/b/c/demo.js', '.css')) // demo.js
console.log(path.basename('/a/b/c')) // c
console.log(path.basename('/a/b/c/')) // c

/** 2 获取路径中的目录路径
 * 01 返回路径中最后一个部分的上一层目录所在路径，忽略前后的路径分隔符
 *
 */
console.log(path.dirname('D:/a/b/c/demo.js')) // D:/a/b/c
console.log(path.dirname('/a/b/c')) // /a/b
console.log(path.dirname('/a/b/c/')) // /a/b

/** 3 获取路径中的扩展名
 * 返回文件路径的文件的扩展名
 * 实际上匹配的是路径中最后一部分从最后一次出现`.`字符到结尾的部分，保留 `.`
 */
console.log(path.extname('D:/a/b/c/demo.js')) // .js
console.log(path.extname('/a/b/c.d.e.css')) // .css
console.log(path.extname('/a/b/c.')) // .
console.log(path.extname('/a/b/c')) // 空

/** 4 解析路径
 * 01 接收一个路径，返回一个包含路径信息的对象
 */
console.log(path.parse('/a/b/c/demo.js'))
// {
//   root: '/', // 根路径
//   dir: '/a/b/c', // 同 dirname
//   base: 'demo.js', // 同 basename 完整名称
//   ext: '.js', // 同 extname
//   name: 'demo' // 最后一部分的文件名
// }
console.log(path.parse('/a/b/c'))
console.log(path.parse('/a/b/c/'))
console.log(path.parse('a/b/c'))

/** 5 序列化路径
 * 与 parse() 相反
 */
console.log(path.format(path.parse('a/b/c')))

/* 6 判断路径是否为绝对路径 */
console.log(path.isAbsolute('foo')) // false
console.log(path.isAbsolute('/foo')) // true
console.log(path.isAbsolute('///foo')) // true

/** 7 拼接路径
 * 01 使用当前平台的分隔符作为界定符拼接给定的路径片段
 * 02 空字符串会被作为 `.` 拼接
 */
console.log(path.join('a/b', 'c', 'demo.js')) // a\b\c\demo.js
console.log(path.join('a/b', 'c', '../', 'demo.js')) // a\b\demo.js
console.log(path.join('a/b', 'c', '/demo.js')) // a\b\c\demo.js
console.log(path.join('a ', ' ', 'demo.js')) // a \ \demo.js

/** 8 规范化路径
 * 01 将路径分隔符替换为当前平台的分隔符 `/` 或 `\`
 * 02 将连续的分隔符替换为1个
 * 03 保留尾随的分隔副
 * 04 空字符串路径会被转化成 `.`
 */
console.log(path.normalize('')) // .
console.log(path.normalize('a///b/c../d')) // a\b\c..\d
console.log(path.normalize('a//\\/b/c\\/d/')) // a\b\c\d\

/** 9 返回绝对路径
 * 将路径或路径片段的序列解析为绝对路径
 * 给定的路径序列从右往左处理，每个后续的路径都会被追加到前面，直到构建绝对路径
 * 如果处理完所有给定的路径还没有生成绝对路径，则使用当前工作目录`__dirname`
 */
console.log(path.resolve()) // 同 __dirname
console.log(path.resolve('a', 'b')) // <__dirname>/a/b
console.log(path.resolve('a', '/b')) // <盘符>:/b
console.log(path.resolve('/a', '/b')) // <盘符>:/a
console.log(path.resolve('a', 'b', '../c')) // <__dirname>/a/c
```