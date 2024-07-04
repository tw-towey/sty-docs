# HTTP 模块

基于 NodeJS 中的 http 模块，掌握 HTTP 协议中一些必要的内容组成以及一些常见功能实现的原理，如缓存、编码、断点续传、防盗链等。

## 快速使用

net 模块创建服务：

```js
const net = require('net')

// 创建服务端
const server = net.createServer()

server.listen(1234, () => {
  console.log('服务端启动，访问 localhost:1234')
})

server.on('connection', socket => {
  socket.on('data', data => {
    console.log(data.toString())
  })

  socket.end('test http request')
})

```

net 模块主要用于创建 TCP 服务器或客户端，对应传输层。

http 模块依赖 net 模块，用于实现 HTTP 服务器或客户端，对应应用层。

http 模块创建服务：

```js
const http = require('http')

// 创建客户端
const server = http.createServer((req, res) => {
  // 针对于请求和响应完成各自的操作
  console.log('接收到请求')
})

server.listen(1234, () => {
  console.log('服务端启动，访问 localhost:1234')
})

```

## 获取 http 请求信息

```js
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // ----- 01 请求行 -----
  // 请求路径
  // console.log(req.url)
  // url 模块可以解析路径
  const { pathname, query } = url.parse(req.url, true)
  console.log(pathname, query)

  // 请求方式
  console.log(req.method)

  // 协议版本号
  console.log(req.httpVersion)

  // ----- 02 请求头 -----
  // console.log(req.headers)

  // ----- 03 请求体 -----
  // 可以在中断使用 curl 命令发送 post 请求： curl -v -X POST -d "' -d "'name':'Tom'" http://localhost:1234/
  const arr = []
  req.on('data', chunk => {
    arr.push(chunk)
  })

  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})

server.listen(1234, () => {
  console.log('server is running...')
})

```

## 设置 http 响应

```js
const http = require('http')

const server = http.createServer((req, res) => {
  // request 相当于一个可读流
  // response 相当于一个可写流

  // 写数据，end后才会完成写入
  // res.write('ok')
  // res.end()

  // 或者
  // res.end('ok')

  // 设置状态码
  res.statusCode = 302
  // 设置响应头
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end('你好张三')
})

server.listen(1234, () => {
  console.log('server is running...')
})

```

# 客户端代理

代理可以解决浏览器跨域请求的问题。

服务器之间是不存在跨域的，可以使用 NodeJS 创建一个客户端代理，由它代替浏览器客户端直接向服务端发送请求。

浏览器客户端也可以将发送给服务端的请求发送给客户端代理，由客户端代理转为发送，解决跨域问题。

```js
// 服务端
const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // const { pathname, query } = url.parse(req.url, true)
  // console.log(pathname, query)

  const arr = []
  req.on('data', chunk => {
    arr.push(chunk)
  })

  req.on('end', () => {
    const body = Buffer.concat(arr).toString()
    // console.log(body)
    const contentType = req.headers['content-type']

    // 根据不同格式进行解析
    if (contentType === 'application/json') {
      const obj = JSON.parse(body)
      obj.age = 20
      res.end(JSON.stringify(obj))
    } else if (contentType === 'application/x-www-form-urlencoded') {
      const obj = querystring.parse(body)
      res.end(JSON.stringify(obj))
    }
  })
})

server.listen(1234, () => {
  console.log('server is running...')
})

```

```js
// 客户端代理
const http = require('http')

// 直接发送 get 请求
// http.get(
//   {
//     host: 'localhost',
//     port: 1234,
//     path: '/?a=1'
//   },
//   res => {}
// )

const options = {
  host: 'localhost',
  port: 1234,
  path: '/?a=1',
  method: 'POST',
  headers: {
    // 'Content-Type': 'application/json' // json 格式
    'Content-type': 'application/x-www-form-urlencoded' // form 表单格式
  }
}

// 创建一个可以发送请求的客户端
const req = http.request(options, res => {
  const arr = []

  res.on('data', chunk => {
    arr.push(chunk)
  })

  res.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})

// 发送请求
// 字符串
// req.end('你好张三')

// json 格式
// req.end('{"name": "张三"}')

// form 表单
req.end('a=1&b=2')

```

# 客户端代理解决跨域

```js
// 服务端
const http = require('http')

const server = http.createServer((req, res) => {
  const arr = []

  req.on('data', chunk => {
    arr.push(chunk)
  })

  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
    res.end('获取到了客户端的数据')
  })
})

server.listen(1234, () => {
  console.log('外部服务端启动了')
})

```

```js
// 客户端代理
const http = require('http')

const options = {
  host: 'localhost',
  port: 1234,
  path: '/',
  method: 'POST'
}

const server = http.createServer((request, response) => {
  const req = http.request(options, res => {
    const arr = []

    res.on('data', chunk => {
      arr.push(chunk)
    })

    res.on('end', () => {
      const ret = Buffer.concat(arr).toString()
      response.setHeader('content-type', 'text/html;charset=utf-8')
      response.end(ret)
    })
  })

  req.end('你好张三')
})

server.listen(1000, () => {
  console.log('本地服务端启动了')
})

```

浏览器客户端访问代理的客户端 `localhost:1000` 即可。

# HTTP 静态服务

使用 http 模块开启一个服务端，由浏览器充当客户端，按照一定的路径访问目标服务器提供的静态资源。

## 初始化

安装工具：`npm install mime`

示例文件：

```bash
├─ www
│   └─ index.html # 测试用 html 文件
├─ index.css # 测试用 css 文件
├─ index.html # 测试用 html 文件
└─ server.js
```

## 示例代码

www/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <link rel="stylesheet" href="../index.css" />
  </head>
  <body>
    <h2>www/index.html</h2>
  </body>
</html>

```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <h2>root/index.html</h2>
  </body>
</html>

```

index.css

```css
body {
  background-color: lightblue;
}

```

server.js

```js
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  // 1 路径处理
  let { pathname, query } = url.parse(req.url)
  // 处理中文路径
  pathname = decodeURIComponent(pathname)
  // 拼接绝对路径
  const absPath = path.join(__dirname, pathname)

  // 2 目标资源状态处理
  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    if (statObj.isFile()) {
      // 路径对应的目标是一个文件，可以直接读取然后回写
      fs.readFile(absPath, (err, data) => {
        // mime 包可以通过传入文件名获取对应的 mime 类型
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    } else {
      // 目录
      fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    }
  })
})

server.listen(1234, () => {
  console.log('server is running...')
})

```

## 测试

- 访问 `localhost:1234/index.html`
- 访问 `localhost:1234/www`

# 静态服务工具

使用 NodeJS 内置模块和一些第三方工具包实现类似 serve 的命令行工具，调用相应的命令可以在指定的目录下开启一个 web 服务。

### npm link

`npm link` 可以帮助我们模拟包安装后的状态，它会在系统中做一个快捷方式映射，让本地的包就好像 install 过一样，可以直接使用。

将`package.json`下bin目录下的命令连接至全局

```json
{
  "name": "unzip",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "bin": {
    "unzip": "./unzip.js"
  },
}
```

执行命令

```bash
npm link #创建连接
npm install -g #安装全局依赖 如果不想全局安装可以直接使用`pnpm install`;
```

运行

```bash
unzip #就可以执行unzip.js
```

查看连接地址;

`windows`版执行命令

```bash
npm config get prefix
C:\Users\tony\AppData\Roaming\npm
```

windows下执行文件在`C:\Users\tony\AppData\Roaming\npm`目录下

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/8e31f169-f3b8-42e8-b35d-bae5acc43ea2.png)

`unzip`命令全局包地址在`C:\Users\tony\AppData\Roaming\npm\node_modules\node`文件夹下

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/424393c4-409a-41c9-abbc-99f036cec418.png)

`mac`版执行命令

```bash
npm config get prefix
/usr/local
```

mac下执行文件在`/usr/local/bin`目录下

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/b6047af4-3d85-4ac4-918b-6332be26e6c3.png);

`unzip`命令全局包地址在`/usr/local/lib/node_modules/node`文件夹下

删除链接

```bash
npm unlink # 在对于命令的目录文件夹下执行
```



## 初始化项目

创建目录 myserver。

在目录下创建文件 `bin/www.js`（处理命令行选项和执行主要逻辑） 和 `main.js`（存放主要逻辑）

`npm init -y` 初始化 `package.json`，并修改可执行文件路径：

```json
{
  "name": "myserver",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "bin": {
    "myserver": "bin/www.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

安装工具包：

- commander 用于处理命令行选项
- mime 用于自动获取文件 MIME 类型
- ejs JavaScript 模板引擎，方便渲染数据

编写脚本 `bin/www.js`：

```js
#! /usr/bin/env node
// bin/www.js

const { program } = require('commander')

console.log('test')

// 设置选项
program.option('-p --port', 'set server port')

// 解析处理命令行选项
program.parse(process.argv)

```

将模块链接到全局 `npm link`（在 myserver 目录下执行）。

mac端如果启动运行报错

```shell
env: node\r: No such file or directory
```

原因及解决方式

注意看 ‘\r’ 这个字符， 解析器居然把换行符也当做路径的一部分！把文件换行方式 CRLF 改为 LF 即可。

查看命令选项，运行 `myserver --help`

## commander 使用

```js
#! /usr/bin/env node
// bin/www.js

const { program } = require('commander')

// 配置信息
const options = {
  '-p --port <dir>': {
    description: 'init server port', // 说明
    example: 'myserver -p 3306' // 示例
  },
  '-d --directory <dir>': {
    description: 'init server directory',
    example: 'myserver -d c:'
  }
}

function formatConfig(configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

// 批量设置选项
formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description)
})

program.on('--help', () => {
  console.log('\nExamples: ')
  formatConfig(options, (cmd, val) => {
    console.log(val.example)
  })
})

// 模块名称
program.name('myserver')
// 版本号
const version = require('../package.json').version
program.version(version)

// 解析处理选项
program.parse(process.argv)

// 获取选项
const cmdConfig = program.opts()
console.log(cmdConfig)

```

测试运行 `myserver -p 3000 -d e:`

## 启动 web 服务

```js
#! /usr/bin/env node
// bin/www.js

const { program } = require('commander')

// 配置信息
const options = {
  '-p --port <dir>': {
    description: 'init server port', // 说明
    example: 'myserver -p 3306' // 示例
  },
  '-d --directory <dir>': {
    description: 'init server directory',
    example: 'myserver -d c:'
  }
}

function formatConfig(configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

// 批量设置选项
formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description)
})

program.on('--help', () => {
  console.log('\nExamples: ')
  formatConfig(options, (cmd, val) => {
    console.log(val.example)
  })
})

// 模块名称
program.name('myserver')
// 版本号
const version = require('../package.json').version
program.version(version)

// 解析处理选项
program.parse(process.argv)

// 获取选项
const cmdConfig = program.opts()

const Server = require('../main.js')
new Server(cmdConfig).start()

```

```js
// main.js
const http = require('http')

// 合并配置
function mergeConfig(config) {
  return {
    port: 1234,
    directory: process.cwd(),
    ...config
  }
}

class Server {
  constructor(config) {
    this.config = mergeConfig(config)
  }
  start() {
    const server = http.createServer(this.serverHandle.bind(this))

    server.listen(this.config.port, () => {
      console.log(`服务已经启动，地址：http://localhost:${this.config.port}`)
    })
  }
  serverHandle(req, res) {
    console.log('接收到请求')
  }
}

module.exports = Server

```

运行 `myserver` 启动 web 服务器，访问 *http://localhost:1234*

## 处理文件资源

```js
// main.js
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const mime = require('mime')

// 合并配置
function mergeConfig(config) {
  return {
    port: 1234,
    directory: process.cwd(),
    ...config
  }
}

class Server {
  constructor(config) {
    this.config = mergeConfig(config)
  }
  start() {
    const server = http.createServer(this.serverHandle.bind(this))

    server.listen(this.config.port, () => {
      console.log(`服务已经启动，地址：http://localhost:${this.config.port}`)
    })
  }
  async serverHandle(req, res) {
    let { pathname } = url.parse(req.url)
    // 处理中文路径
    pathname = decodeURIComponent(pathname)

    // 拼接绝对路径
    const absPath = path.join(this.config.directory, pathname)

    try {
      const statObj = await fs.stat(absPath)

      if (statObj.isFile()) {
        // 文件
        this.fileHandle(req, res, absPath)
      } else {
        // 目录
      }
    } catch (err) {
      // 路径不存在
      this.errorHandle(req, res, err)
    }
  }
  errorHandle(req, res, err) {
    // 打印错误
    console.log(err)
    // 响应404
    res.stateCode = 404
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('Not Found')
  }
  // 处理文件
  fileHandle(req, res, absPath) {
    res.statusCode = 200
    res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
    // 创建可读流读取文件，写入到 res（可写流）
    createReadStream(absPath).pipe(res)
  }
}

module.exports = Server

```

测试：

- 运行 `myserver`
- 访问 http://localhost:1234/main.js

## 处理目录资源

```js
// main.js
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const mime = require('mime')
const ejs = require('ejs')
// promisify 用于将异步回调方法改成返回 Pormise 实例的方法
const { promisify } = require('util')

// 合并配置
function mergeConfig(config) {
  return {
    port: 1234,
    directory: process.cwd(),
    ...config
  }
}

class Server {
  constructor(config) {
    this.config = mergeConfig(config)
  }
  start() {
    const server = http.createServer(this.serverHandle.bind(this))

    server.listen(this.config.port, () => {
      console.log(`服务已经启动，地址：http://localhost:${this.config.port}`)
    })
  }
  async serverHandle(req, res) {
    let { pathname } = url.parse(req.url)
    // 处理中文路径
    pathname = decodeURIComponent(pathname)

    // 拼接绝对路径
    const absPath = path.join(this.config.directory, pathname)

    try {
      const statObj = await fs.stat(absPath)

      if (statObj.isFile()) {
        // 文件
        this.fileHandle(req, res, absPath)
      } else {
        // 目录
        // 展示目录下的文件，且可点击
        let dirs = await fs.readdir(absPath)
        dirs = dirs.map(item => ({
          path: path.join(pathname, item),
          dirs: item
        }))

        const renderFile = promisify(ejs.renderFile)
        const ret = await renderFile(path.resolve(__dirname, 'template.html'), {
          arr: dirs,
          parent: pathname !== '/',
          parentPath: path.dirname(pathname),
          title: path.basename(absPath)
        })
        res.end(ret)
      }
    } catch (err) {
      // 路径不存在
      this.errorHandle(req, res, err)
    }
  }
  errorHandle(req, res, err) {
    // 打印错误
    console.log(err)
    // 响应404
    res.stateCode = 404
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('Not Found')
  }
  // 处理文件
  fileHandle(req, res, absPath) {
    res.statusCode = 200
    res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
    // 创建可读流读取文件，写入到 res（可写流）
    createReadStream(absPath).pipe(res)
  }
}

module.exports = Server

```

创建模板文件 template.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h3>indexOf <%=title%></h3>
    <ul>
      <%if(parent) {%>
        <li><a href="<%=parentPath%>">../</a></li>
      <%}%>

      <%for(let i = 0; i < arr.length;i++) {%>
        <li><a href="<%=arr[i].path%>"><%=arr[i].dirs%></a></li>
      <%}%>
    </ul>
  </body>
</html>

```

测试：

- 运行 `myserver`
- 访问 http://localhost:1234