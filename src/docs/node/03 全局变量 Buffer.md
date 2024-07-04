# 全局变量之 [Buffer](https://so.csdn.net/so/search?q=Buffer&spm=1001.2101.3001.7020)

Buffer 一般称之为 Buffer 缓冲区。

Buffer 让 JavaScript 可以操作二进制。

JavaScript 语言起初服务于浏览器平台，因此它内部主要操作的数据类型就是字符串。

Nodejs 的出现使得可以在服务端使用 JavaScript 进行编程，完成 IO 操作，例如文件的读写、网络服务中数据的传输等，在这个过程中就是用到了 Buffer。

## 二进制数据

用户使用软件获取信息，开发者使用语言处理和展示信息，这个“信息”其实就是数据，例如在客户端上看到的字符、视频、图片、音频等。

无论我们当前看到的是什么，对于计算机来说，它处理的都是数字，也就是二进制。

IO 行为操作的就是**二进制数据**。

## 流操作

Stream 流操作并非 Nodejs 独创，它本身已经存在很多年了。

可以将**“流”**理解为和字符串、数组类似的数据类型，用于存储数据，区别是它可以分段。

当进行大数据传输的时候就可以使用流操作，这样可以避免由于操作的数据内存过大。而出现的将内存占满的情况。

流操作配合管道技术，就可以将流当中的数据分段传输给下一个端，实现大数据的传输。

典型的应用场景就是现在我们看视频一般都是边下载边看。

## Buffer

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/00db84f8772e4b32a2679a6a177cd40b.png)

程序运行就会进行二进制的数据传输，而这个传输一般都是由 from 到 to 的过程，即数据的生产者和数据的消费者，中间就会使用流配合管道进行连接。

但是这个模型在实际工作的时候也会出现问题，比如数据的生产速度无法满足数据的消费速度，又或者数据的消费速度比生产速度慢了许多。

总归来说，不论出现哪种情况，数据都会有一个等待的过程，等待的时候那些多出来的数据，或者还不够一次消费的数据被存放在哪里呢？

这个时候就有了 Buffer，所以也称为 **Buffer 缓冲区**。

Nodejs 中 Buffer 就是一片内存空间，只不过这个内存空间有些特殊。

Nodejs 中的代码最终都是由 V8 引擎执行完成的，因此理论上所有的内存消耗应该都属于 V8 的堆内存，而 Buffer 是 V8 之外的一片空间，它的大小不占据 V8 堆内存的大小。

通过 `process.memoryUsage()` 获取的内存消耗的信息中有一个 `arrayBuffers`，指的就是 Buffer 申请的内存。

Buffer 的空间申请不是由 [Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020) 完成的，但是在使用层面上，它的空间分配又是由开发者编写的 JS 代码控制的，因此在空间回收的时候，它还是由 V8 的 GC（垃圾回收） 管理和回收，开发者无法参与其中。

## Buffer 总结

- Buffer 是 Nodejs 中的全局变量，无需 require
- Buffer 使得可以在 Nodejs 平台下的操作二进制数据
- Buffer 本身是一片内存空间，但是它不占据 V8 的堆内存大小，直接由 C++ 层面进行分配
- Buffer 内存的使用由 Node 控制，由 V8 的 GC 回收，无法进行人为参与
- Buffer 一般配合 Stream 流使用，充当数据缓冲区

# 创建 Buffer 实例

Buffer 是 Nodejs 内置的类，它相关的 API 其实就是这个类的静态方法。

有三种创建 Buffer 实例的方法：

- `Buffer.alloc(size[, fill[, encoding]])`：创建默认填充0的指定字节大小的 buffer
- `Buffer.allocUnsafe(size)`：创建指定字节大小的 buffer（不安全的创建方法），不会向创建的内存填充数据
- `Buffer.from(...)`：接收数据，创建 buffer（与前两者的区别是创建默认带数据的 buffer）

> **为什么 allocUnsafe 不安全？**
> 
> 关键在于给 Buffer 申请分配的内存是否被**初始化**。被初始化的内存即填充了默认的数据，例如 `0`。没被初始化的内存可能包含敏感的旧数据，这是不安全的。
> 
> Buffer.alloc() 分配的内存是初始化过的内存（被 `0` 填满覆写），这种创建方式虽然慢但被认为是安全的。
> 
> Buffer.allocUnsafe() 分配的内存没有被初始化，所以分配速度相当快，但内存中可能存在敏感旧数据，在 Buffer 可读的情况下，可能会泄露数据，这种方式被认为是不安全的。一般会建议手动通过 `buf.fill(0)` 初始化或写满这个 Buffer。
> 
> 虽然在使用 `Buffer.allocUnsafe()` 时有明显的性能优势，但必须额外小心，以避免给应用程序引入安全漏洞。
> 
> 参考：[Buffer(Buffer) - Buffer.from(), Buffer.alloc(), and Buffer.allocUnsafe()](https://www.bookstack.cn/read/nodejs-api-doc-cn/buffer-other.md)

> **为什么不使用 new 创建 Buffer？**
> 
> 在 Nodejs 的 v6 版本之前可以直接通过 new 实例化 Buffer 对象。
> 
> 但是这种方式提供给 Buffer 实例对象的操作权限实在是太大了，所以在后续的版本中对它进行了一些处理。
> 
> 主要还是使用这种方式分配的内存是没有初始化过的，包含敏感数据，Node.js 认为在分配内存的安全性上需要更加明确的区分，所以建议使用 Buffer 类的静态方法创建，而不是通过 new 实例化。

```js
// 创建空间大小是 10 字节的 buffer
// buffer 会以16进制格式存储每个字节的数据
const b1 = Buffer.alloc(10)
const b2 = Buffer.allocUnsafe(10)
console.log(b1) // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(b2)

// from 的第一个参数可以接收3种数据类型：字符串 数组 buffer
const b3 = Buffer.from('中') // utf8 一个汉字用3个字节表示
console.log(b3) // <Buffer e4 b8 ad>
console.log(b3.toString()) // 中

// from 的第一个参数如果是数组，数组元素应该都是数字格式（十进制、八进制或十六进制等），否则会被忽略
const b4 = Buffer.from([1, 2, '中']) // 汉字会被忽略
const b5 = Buffer.from([228/* 0xe4 的十进制 */, 0270/* 0xb8 的八进制 */, 0xad]) // 将汉字替换成数字
console.log(b4) // <Buffer 01 02 00>
console.log(b5) // <Buffer e4 b8 ad>

// from 的第一个参数如果是 buffer，创建的 buffer 只是传入的 buffer 的拷贝，并不会共享空间
const b6 = Buffer.alloc(3)
const b7 = Buffer.from(b6)
b6[0] = 1
console.log(b6)
console.log(b7)

```

# Buffer 实例方法

常用实例方法：

- fill：向 buffer 中反复填充数据，直到填满，返回填充后的 buffer
- write：向 buffer 中写入数据，返回写入的字节数
- toString：根据指定的字符编码将 buffer 解码为字符串
- slice：截取 buffer，类似数组的 slice
- indexOf：类似数组的 indexOf
- copy：从 buffer 数据源拷贝数据到目标 buffer 中

```js
// 创建一个空的 buffer
const buf = Buffer.alloc(6)

// fill
buf.fill('123') // 反复填充直到填满
console.log(buf) // <Buffer 31 32 33 31 32 33>
console.log(buf.toString()) // 123123
buf.fill('123456789')
console.log(buf.toString()) // 123456
buf.fill('0').fill('123', 1) // 第二个参数表示跳过填充的字节数
console.log(buf.toString()) // 012312
buf.fill('0').fill('123', 1, 3) // 第三个参数表示停止填充的位置索引（指定位置也不填充）
console.log(buf.toString()) // 012000
buf.fill(123) // 如果填充的是数字，则转化成十六进制填充
console.log(buf) // <Buffer 7b 7b 7b 7b 7b 7b>
console.log(buf.toString()) // {{{{{{
```

```js
// 创建一个空的 buffer
const buf = Buffer.alloc(6)

// write
// 与 fill 类似，但只会写入一次
buf.write('123')
console.log(buf) // <Buffer 31 32 33 00 00 00>
console.log(buf.toString()) // 123

buf.fill(0).write('123', 1)
console.log(buf) // <Buffer 00 31 32 33 00 00>

buf.fill(0).write('123', 1, 2) // 第三个参数是写入的字节数
console.log(buf) // <Buffer 00 31 32 00 00 00>

```

```js
// 创建一个空的 buffer
const buf = Buffer.from('abc你好')

// toString
// 第一个参数是解码的字符编码
// 第二个参数表示开始解码的字节索引位置
// 第三个参数表示停止解码的字节索引位置（不被解码）
console.log(buf) // <Buffer 61 62 63 e4 bd a0 e5 a5 bd>
console.log(buf.toString()) // abc你好
console.log(buf.toString('utf8', 1, 6)) // bc你

// slice
const b1 = buf.slice(1, 6)
console.log(b1) // <Buffer 62 63 e4 bd a0>
console.log(b1.toString()) // bc你

// indexOf
// 返回 Buffer 中指定字符的字节位置索引
// 第二个参数时查找开始的位置
const b2 = Buffer.from('a你b好a你b好')
console.log(b2.indexOf('你')) // 1
console.log(b2.indexOf('b')) // 4
console.log(b2.toString().indexOf('b')) // 2
console.log(b2.indexOf('b', 5)) // 12

```

```js
// copy
// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
// buf：复制的数据源 buffer
// target：目标 buffer
// targetStart：写入目标 buffer 的起始字节位置
// sourceStart：复制数据源 buffer 的起始字节位置
// sourceEnd：复制数据源 buffer 的结束字节位置（不包含）
// 复制的内容到指定 sourceEnd 或填充完目标 buffer 即结束

const b1 = Buffer.from('你好abcde')
const b2 = Buffer.alloc(6)

b1.copy(b2)
console.log(b1) // <Buffer e4 bd a0 e5 a5 bd 61 62 63 64 65>
console.log(b1.toString()) // 你好abcde
console.log(b2) // <Buffer e4 bd a0 e5 a5 bd>
console.log(b2.toString()) // 你好

const b3 = Buffer.alloc(6)
b1.copy(b3, 2, 3, 7)
console.log(b3) // <Buffer 00 00 e5 a5 bd 61>
console.log(b3.toString()) // 好

```

# Buffer 静态方法

常用静态方法：

- concat：将多个 buffer （数组）拼接成一个新的 buffer，便于获取多个 buffer 组成的数据
- isBuffer：判断当前数据是否是 Buffer 类型

```js
// concat
// 第一个参数是要拼接的 buffer 组成的数组
// 第二个参数是要限制的拼接结果的长度
const b1 = Buffer.from('你好')
const b2 = Buffer.from('世界')

const b3 = Buffer.concat([b1, b2])
console.log(b3.toString()) // 你好世界

const b4 = Buffer.concat([b1, b2], 9)
console.log(b4.toString()) // 你好世

// isBuffer
console.log(Buffer.isBuffer([])) // false
console.log(Buffer.isBuffer('123')) // false
console.log(Buffer.isBuffer(b1)) // true

```

# 自定义 Buffer 的 split

Buffer 在使用上有很多地方和数组类似，例如下标操作、length 属性（Buffer 长度是固定的，无法修改）等。

不过目前并没有对 Buffer 提供拆分（split）操作，而这个操作在业务中又非常常见，所以这里利用 Buffer 本身提供的原生方法自定义一个 split 方法。

```js
// 自定义 butter-split
Buffer.prototype.split = function (separator) {
  const len = Buffer.from(separator).length // 获取分割符字节数
  let res = [] // 最终返回结果
  let start = 0 // 查询起始位置
  let offset = 0 // 偏移量

  while ((offset = this.indexOf(separator, start)) !== -1) {
    res.push(this.slice(start, offset))
    start = offset + len
  }

  // 追加尾部
  res.push(this.slice(start))

  return res
}

const buf = Buffer.from('夫战，勇气也，一鼓作气，再而衰，三而竭，彼竭我盈，顾克之，')

console.log(buf.split('，').map(v => v.toString()))
```