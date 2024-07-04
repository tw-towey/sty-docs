# 模块化历程

## 前端开发为什么需要模块化？

最初的时候前端工作更多的是页面内容的制作，往往只是很简单的网页结构搭建，或 css 样式编写，再难点就是 UI 交互，前后端数据交互。

因此一个页面的开发工作量不会太大，所以也不会依赖太多的外部文件，其中的逻辑代码也不会有很多。

随着 Web 技术的发展，前端项目也越来越大，移动端的需求也越来越多，所以现在需要完成的都是**组件化的前端开发**。

在这种情况下，之前传统的前端开发模式中的一些问题也就逐渐的凸显出来了。

---

传统开发常见问题：

- 命名冲突和污染
- 代码冗余，无效请求过多，影响加载速度
- 文件间的依赖关系复杂，容易出错

这些问题都让前端项目变得难以维护，不方便复用。

因此在前端走向工程化的进程中，模块化的操作是必不可少的。

## 什么是模块？

模块可以理解为，大篇幅代码被一种程序化的结构和组织方式拆分之后而生成的小而精，并且具有低耦合特点的松散片段。

模块化开发更像是对这些片段进行组合使用，从而完成项目整体业务逻辑。

这样的项目也就更加容易维护和管理了。

## 模块化发展历程

### 常用模块化规范

- CommonJS 规范
- AMD 规范
- CMD 规范
- ES Module 规范

### CommonJS 规范

在早期的 ECMAScript 中根本不存在“模块化”这个概念，ES [Module](https://so.csdn.net/so/search?q=Module&spm=1001.2101.3001.7020) 也是都来才加进去的。

最早的时候模块化更多是前端开发人员本身的良好习惯和智慧的一个体现。

他们**利用函数、对象或自执行函数实现代码的分块管理。**

随着前端越来越重，模块化不仅仅是一项技术需求，慢慢地它也被写入到规范中。

之后随着 Nodejs 的兴起，**CommonJS 规范**的实现也慢慢成熟起来。

它规定每个 JS 文件都是一个模块，而每个模块都有自己的作用域，在这个作用域内部存在着变量、函数或类，这些都是私有的，外部不能直接使用。

接着它又提供了 `module.exports` 这样的操作，向外部选择性的导出变量。

如果其它的模块想要使用这些数据，可以使用 `require` 语法进行加载。

当前 Nodejs 采用的就是 CommonJS 规范。

CommonJS 实际上是一个超集，是整个语言层面上的一套规范（API 定义），类似 ECMAScript，模块化只是众多规范中的一种，它还包括实现 IO 流、二进制的操作或 Buffer 操作的规范等。

Nodejs 采用并实现了部分规范，可以很好的使用 JS 在 [Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020) 平台下进行开发。

### AMD规范

由于 CommonJS 规范中模块的加载都是**同步**完成的，这样其实并不适合在浏览器端进行使用。

因为在后端运行 JS 代码的时候，模块的内容加载一般都是可以直接从磁盘中读取的，所以速度并不会受到太大的影响。

而这种加载机制如果放在浏览器平台下使用，肯定就会出现问题，因此后面就出现了 **AMD** 这种实现**异步加载**模块操作的规范。

AMD 规范中提供了 `define` `require` 两个关键字实现模块化的操作。

最经典的代表应该就是 RequireJS 了。

### CMD 规范

之后又出现了 CMD 规范，它更像是站在巨人的肩膀上完成的产品。

它整合了 CommonJS 和 AMD 两个规范的特点，专门用于实现浏览器平台下异步模块的加载。

最经典的代表应该是 SeaJS。

### ES Module 规范

至此关于模块化规范的个人行为和社区驱动的行为也就差不多了。

因为在 2015 年的时候，TC39 发布了 ES6，在这一版中正式的将模块化纳入了规范里，即 **ES Module**，简写为 **ESM**。

它和其它的规范一样，提供了 `import` 和 `export` 关键字实现模块的导入导出，同时还有 `as` `export default` 这样的特有语法。

## 总结

- 模块化是前端走向工程化中的重要一环
- 早期 JavaScript 语言层面没有模块化规范，开发者利用函数、对象或自执行函数实现代码的分块管理
- 后来由个人或社区推动，产出了 CommonJS、AMD、CMD 这些模块化规范
- ES6 中将模块化纳入标准语言规范中
- 当下常用规范是 CommonJS 和 ES Module，前者用于 Node 平台下的开发，后者用于浏览器平台下的开发

# CommonJS 规范

CommonJS 的出现是为了弥补 JavaScript 中没有模块化标准的缺陷。

它的制定者希望通过这个标准倒逼浏览器做出一些改变，从而实现 JS 代码到处运行，还能够具备开发大型应用的能力。

> javascript: not just for browsers any more! —— [CommonJS](http://www.commonjs.org/)

但是由于浏览器平台本身所具备的一些特点，例如数据一般都是通过网络进行传输的，而且还存在单线程阻塞的加载方式，因此这就让 CommonJS 规范不能适用于浏览器平台。

所以目前来说，CommonJS 规范主要应用于 Nodejs 中。

CommonJS 是语言层面上的规范，类似于 ECMAScript，而**模块化**只是这个规范中的一部分。

## CommonJS 中如何定义模块化操作

CommonJS 规范将模块化分为三个部分：

- 模块引用：require 导入
- 模块定义：module.exports 导出
- 模块标识：传入 require 的具体参数
    - 也称为模块 ID（模块名称），一般是一个字符串或者以 `.`/`..`开头的相对路径、或者绝对路径

这些是对于模块化实现的规定，确定了规范后，语法层面上就会有具体的实现。

Nodejs 基于 CommonJS 模块化规范提供了具体实现：

- Nodejs 中任意一个文件都是一个模块，具有独立作用域
- 使用 require 导入其它模块
- 将模块 ID 传入 require 实现目标模块定位

## module 属性

任意 js 文件就是一个模块，具有独立作用域，可以直接使用 module，它表示主模块（入口文件），module 本身还拥有很多有用的属性：

- id：返回模块标识符，一般是一个绝对路径
- filename：返回当前模块的文件名称，也是绝对路径
- loaded：返回布尔值，表示模块是否完成加载
- parent：返回对象，存放调用当前模块的模块
- children：返回数组，存放当前模块调用的其它模块
- exports：返回当前模块需要暴露的内容
- paths：返回数组，存放不同目录下的 node\_modules 位置
    - 返回当前模块所在目录和上级所有目录拼接 node\_modules 的绝对路径，可以用于分析 Node 中模块加载的具体位置

## module.[exports](https://so.csdn.net/so/search?q=exports&spm=1001.2101.3001.7020) 和 exports 有什么区别

在 CommonJS 规范中只规定了通过 `module.exports` 执行模块的导出数据操作。

而单个 `exports` 实际上是 Nodejs 自己为了方便操作，提供给每个模块的变量，它实际上指向了 `module.exports` 指向的内存地址（对象引用地址）。

因此可以直接通过 `exports` 导出相应的内容，不能直接直接给 `exports` 重新赋值，这等于切断了 `exports` 和 `module.exports` 之间的联系。

## require 属性

基本功能是读入并且执行一个模块文件，返回这个模块中的 `exports` 对象，如果没有找到这个模块文件，就会报错。

require 的属性：

- resolve：方法，返回传入文件模块的绝对路径
- main：属性，返回主模块（入口文件）对象，可以用于判断当前模块是不是主模块（module 对象）

## 总结

- CommonJS 规范起初是为了弥补 JS 语言模块化缺陷
- CommonJS 是语言层面的规范，当前主要应用于 Nodejs
- CommonJS 规定模块化分为引入、定义、标识符三个部分
- `module` 在任意模块中可以直接使用，它包含模块信息
- `require` 用于接收标识符，加载导入目标模块
- `exports` 和 `module.exports` 都能导出模块数据
- CommonJS 规范定义模块的加载都是同步完成

# Nodejs 与 CommonJS

## 模块导入与导出

```js
// m.js
const age = 18

const addFn = (x, y) => {
  return x + y
}

module.exports = {
  age,
  addFn
}

/*

// 或者这样导出
exports.age = age
exports.addFn = addFn

// 但是不能这样
exports = {
  age,
  addFn
}

 */

```

```js
// main.js
const obj = require('./m.js')
console.log(obj) // { age: 18, addFn: [Function: addFn] }

```

## module

```js
// D:/a/b/c/m.js
module.exports = 111
console.log(module)

// D:/a/b/c/main.js
require('./m.js')
```

打印结果：

```js
Module {
  id: 'D:\\a\\b\\c\\m.js',
  path: 'D:\\a\\b\\c',
  exports: 111,
  parent: Module {
    id: '.',
    path: 'D:\\a\\b\\c',
    exports: {},
    parent: null,
    filename: 'D:\\a\\b\\c\\main.js',      
    loaded: false,
    children: [ [Circular] ],
    paths: [
      'D:\\a\\b\\c\\node_modules',
      'D:\\a\\b\\node_modules',
      'D:\\a\\node_modules',
      'D:\\node_modules'
    ]
  },
  filename: 'D:\\a\\b\\c\\m.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\a\\b\\c\\node_modules',
    'D:\\a\\b\\node_modules',
    'D:\\a\\node_modules',
    'D:\\node_modules'
  ]
}
```

## 同步加载

```js
// m.js
const name = '张三'
exports.name = name

// 定义一个耗时操作
let iTime = Date.now()
while (Date.now() < iTime + 2 * 1000) {}

console.log('m.js 被导入')


// main.js
const obj = require('./m.js')
console.log('m.js 被执行')

```

打印结果：

```js
m.js 被导入
m.js 被执行
```

## 主模块

```js
// m.js
console.log('m.js 是不是主模块？', require.main === module) // false

// main.js
require('./m.js')
console.log('main.js 是不是主模块？', require.main === module) // true

```

# 模块分类及加载流程

## Node 中的模块分类

- 内置模块：即 Nodejs 核心模块
- 文件模块：第三方模块（包）和自定义模块

## 模块加载速度

- 内置模块：Node 源码编译时写入到二进制文件中
    - 当 Node 进程被启用时，有些内置模块已经存在于内存中，因此不需要经历整个加载流程，所以加载速度会快一些
- 文件模块：代码运行时，动态加载
    - 需要经历整个加载流程，加载速度会慢一些

## 加载流程

1. 路径分析：将模块标识符转化为绝对路径，确定模块位置
2. 文件定位：确定目标模块中具体的文件和文件类型
3. 编译执行：按照路径找到具体模块的具体文件，依据文件类型采用对应的方式完成文件的编译执行，最终返回 `exports` 导出的对象

### 1、路径分析

#### 标识符

路径分析就是基于标识符进行模块查找。

标识符分为：

- 非路径标识符
    - 常见于核心模块和 npm 包，例如 path、fs、marked等，使用时直接写模块名称即可
- 路径标识符

#### 模块路径

Node 基于**模块路径**查找定位模块文件，它的表现形式就是一个路径数组，在当前模块中可以直接通过 `module.paths` 获取。

数组中的内容实际上就是当前模块所在目录的不同层级的 node\_modules 目录路径。

当加载某个模块的时候，Nodejs 会遍历这个数组中的每个路径，如果最终没有找到目标文件，就会抛出错误。

### 2、文件定位

在加载 js 模块的时候可以省略后缀 `.js`，如 `require('./m.js')` 也可以写作 `require('./m')`。

当省略后缀时，Nodejs 在文件定位的时候就无法获取文件的扩展名。

此时就会按照 `m.js --> m.json --> m.node` 的方式补足扩展名在每个模块路径中查找。

如果最终没有找到，Nodejs 就会认为这个标识符表示的是一个目录，就会把它当作一个包去处理。

Nodejs 首先会在这个路径下查找 package.json 文件，再使用 `JSON.parse()` 解析文件内容，获取文件中的 `main` 属性值。

如果 `main` 指向的路径也没有扩展名，同样会进行扩展名补足操作。

如果扩展名补足后依然找不到文件，甚至不存在 package.json 这个文件，Nodejs 就会默认将 `index` 作为目标模块中的具体文件名，再经过扩展名补足后查找。

首先会在这个路径下查找，接着就会按照模块路径数组一层一层查找。

如果最终还是没有找到，就会抛出异常。

### 3、编译执行

将某个具体类型的文件按照相应的方式进行编译执行。

Node 中每个模块都是一个对象，当确定了模块的文件位置之后，就会先创建一个新对象，然后按照之前的路径将其载入，从而完成编译执行。

针对不同类型的文件，编译方式也不一样。

#### JS 文件的编译执行

- 使用 fs 模块同步读入目标文件内容
- 对内容进行语法包装，生成可执行 JS 函数，并立即调用
- 调用函数时传入 exports、module、require 等属性值

#### JSON 文件的编译执行

将读取到的内容通过 `JSON.parse()` 进行解析，将结果返回给 exports 对象。

### 缓存优先原则

在模块加载流程中有一个细节就是**缓存优先原则**。

它的作用是为了提高模块加载速度。

在通过标识符确认了模块绝对路径后，首先会去缓存中查找是否存在期望的模块，如果有则直接使用，如果没有，就会执行一次完整的加载流程。

等到此次加载流程完成之后，就会使用路径作为索引，将当前的模块进行缓存，这样下次再加载该模块时就会优先使用缓存中的内容，从而提高加载速度。