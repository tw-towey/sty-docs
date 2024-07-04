# 浏览器中的 Event Loop

## 示例代码

```js
// 宏任务
setTimeout(() => {
  console.log('s1')
  // 微任务
  Promise.resolve().then(() => {
    console.log('p1')
  })
  // 微任务
  Promise.resolve().then(() => {
    console.log('p2')
  })
})

// 宏任务
setTimeout(() => {
  console.log('s2')
  // 微任务
  Promise.resolve().then(() => {
    console.log('p3')
  })
  // 微任务
  Promise.resolve().then(() => {
    console.log('p4')
  })
})

```

### 执行分析

Event Loop 中管理着两个队列：宏任务队列和微任务队列。

- 最先执行的是同步代码
- 当执行到第一个 setTimeout 方法时会创建宏任务，但任务不会立即执行，会添加到宏任务队列
- 接着执行到第二个 setTimeout，再次向队列中添加宏任务
- 当同步代码执行完成，会先检查微任务队列中是否有要执行的任务
- 此时微任务队列为空，接着检查宏任务队列中是否有要执行的任务
- 宏任务队列不为空，于是按照先进先出原则执行队列中的任务
- 首先执行第一个 setTimeout 创建的任务中的代码
- 先是会打印 `s1`
- 当执行到第一个 Promise，会创建一个微任务，但是任务不会立即执行，会添加到微任务队列
- 接着第二个 Promise 也会向微任务队列添加创建的任务，此时宏任务执行结束
- 每个宏任务执行完成后都会去清空（处理）微任务队列中的任务
- 此时检查微任务队列不为空，于是按照先进先出原则执行队列中的任务
- 在依次打印 `p1` 和 `p2`后，微任务队列清空，再次检查宏任务队列，取出第二个 setTimeout 创建的任务去执行
- 先是打印了 `s2`，接着创建了两个微任务，并添加到微任务队列
- 当这个宏任务执行完成后，又会检查微任务队列
- 接着会依次打印 `p3` 和 `p4`
- 最终打印结果：`s1 p1 p2 s2 p3 p4`

## 示例代码2

```js
setTimeout(() => {
  console.log('s1')
  Promise.resolve().then(() => {
    console.log('p2')
  })
  Promise.resolve().then(() => {
    console.log('p3')
  })
})

Promise.resolve().then(() => {
  console.log('p1')
  setTimeout(() => {
    console.log('s2')
  })
  setTimeout(() => {
    console.log('s3')
  })
})
```

### 执行分析

- 首先执行同步代码
- 执行到 s1 时向宏任务队列添加一个宏任务，但不立即执行
- 接着执行到 p1，向微任务队列添加一个微任务，但不立即执行
- 同步代码执行完毕后检查微任务队列，提取并执行 p1 任务
- 首先打印 `p1`，接着向宏任务队列中添加了两个宏任务
- 微任务队列清空，检查宏任务队列
- 提取并执行最先添加的 s1 任务
- 首先打印 `s1`，接着向微任务队列添加两个微任务
- s1 宏任务执行结束，再次检查微任务队列
- 依次提取并执行 p2 和 p3 任务，分别打印了 `p2`和 `p3`
- 微任务队列清空，检查宏任务队列
- 提取 s2 任务并执行，打印 `s2`后执行结束
- 检查微任务队列为空，再次检查宏任务队列
- 提取 s3 任务并执行，打印 `s3`后全部执行完毕
- 最终打印结果：`s1 p1 p2 p3 s2 s3`

## 完整事件循环执行顺序

- 从上到下执行所有的同步代码
- 执行过程中将遇到的宏任务和微任务添加到相应的队列
- 同步代码执行完毕后，执行满足条件的微任务回调
- 微任务队列执行完毕后执行所有满足需求的宏任务回调
- 循环上述操作
- 注意：每执行一个宏任务之后都会立刻检查微任务队列

# Nodejs 中的事件循环

## Nodejs 事件循环机制

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/195038958ae14dc882c3634ccfc45f61.png)

在浏览器环境下有两个队列：宏任务队列和微任务队列。

但在 Nodejs 环境下除了微任务队列，还有六个宏任务队列，分别是：

- timers：执行 setTimeout 和 setInterval 回调
- pending callbacks：执行系统操作的回调，例如 tcp udp
- idle，prepare：只在系统内部进行调用（不需要关注）
- poll：执行 I/O 相关的回调
- check：执行 setImmediate 中的回调
- close callbacks：执行 close 事件的回调

每个队列中存放的都是 callbacks 回调函数。

## Nodejs 完整事件循环

- 执行同步代码，将不同的任务添加到相应的队列
- 所有同步代码执行后回去执行满足条件的微任务
- 所有微任务代码执行后会按照上面图示中的顺序执行六个队列中的任务
- 首先会执行 timer 队列中满足的宏任务
- timer 中的所有宏任务执行完成后就会依次切换队列
- 切换并清空全部六个队列后，就会重新从 timer 开始检查，直到所有队列都没有任务了，代码执行结束
- 注意：每执行一个宏任务之后都会立刻检查微任务队列

> 旧版本的 [node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020) 是在切换宏任务队列之前检查微任务队列，而不是与浏览器一样在每个宏任务执行完成后就会检查微任务队列。
> 
> 新版本的 node 改为与浏览器保持一致。

## 示例代码

```js
// timer 宏任务
setTimeout(() => {
  console.log('s1')
})

// 微任务
Promise.resolve().then(() => {
  console.log('p1')
})

// 同步代码
console.log('start')

// nextTick 不是事件循环的一部分
// 它创建的回调任务会在同步代码执行完成后优先处理
// 可以理解为插入所有其它方式创建的微任务之前
process.nextTick(() => {
  console.log('tick')
})

// check 宏任务
setImmediate(() => {
  console.log('s2')
})

// 同步代码
console.log('end')

```

### 执行分析

- 首先执行同步代码
- 执行到 setTimeout 时向 timer 队列中添加 s1 任务
- 接着向微任务队列中添加 p1 任务
- 接着打印 `start`
- 接着向微任务队列添加 tick 任务，它排在所有其它方式创建的微任务之前
- 接着向 check 队列添加 s2 任务
- 接着打印 `end`，同步代码执行完，开始检查微任务队列
- 提取微任务队列中的 tick 任务并执行，打印 `tick`
- 提取 p1 任务并执行，打印 `p1`
- 微任务队列清空，开始按顺序检查6个宏任务队列
- 首先检查 timer 队列，提取 s1 任务并执行，打印 `s1`
- 任务执行完检查微任务队列，接着再检查 timer 队列
- timer 队列为空，切换并检查下一个队列，一直到 check 队列
- 提取 s2 任务并执行，打印 `s2`
- 最终全部队列清空
- 最终打印结果：`start end tick p1 s1 s2`

## 示例代码2

```js
setImmediate(() => {
  console.log('s2')

  Promise.resolve().then(() => {
    console.log('p3')
  })

  process.nextTick(() => {
    console.log('t2')
  })
})

Promise.resolve().then(() => {
  console.log('p1')
})

console.log('start')

setTimeout(() => {
  console.log('s1')

  Promise.resolve().then(() => {
    console.log('p2')
  })

  process.nextTick(() => {
    console.log('t1')
  })
})

console.log('end')

```

### 执行分析

- 首先执行同步代码
- 接着向 check 队列添加 s2 任务
- 接着向微任务队列添加 p1 任务
- 接着打印 `start`
- 接着向 timer 队列添加 s1 任务
- 接着打印 `end`，同步代码执行完成，检查微任务队列
- 提取并执行 p1 任务，打印 `p1`，微任务队列清空，检查 timer 队列
- 提取并执行 s1 任务，打印 `s1`
- 向微任务队列添加 p2 任务
- 向微任务队列添加 t1 任务，排在 p2 任务之前
- s1 任务执行完成，校验微任务队列
- 提取并执行 t1 任务，打印 `t1`
- 提取并执行 p2 任务，打印 `p1`，微任务队列清空
- timer 队列清空，切换并检查其它队列，一直到 check 队列
- 提取并执行 s2 任务，打印 `s2`
- 先后添加 p3 和 t2 微任务，t2 排在 p3 之前
- s2 任务执行完毕，校验微任务队列
- 先后执行 t2 和 p3 任务，打印 `t2` 和 `p3`，微任务队列清空
- 依次校验和切换宏任务队列，最后执行完成
- 最终打印结果：`start end p1 s1 t1 p2 s2 t2 p3`

# Nodejs 与浏览器事件循环区别

- 任务队列数不同
- 微任务优先级不同

## 任务队列数

- 浏览器只有两个任务队列：宏任务队列和微任务队列
- Nodejs 除了微任务队列还有六个宏任务队列

## 微任务优先级

- 浏览器事件循环中，微任务存放于事件队列，先进先出
- Nodejs 中 process.nextTick 优先于 promise.then

# Nodejs 事件循环常见问题

## setTimeout 和 setImmediate 顺序

### 同步代码中运行

```js
setTimeout(() => {
  console.log('timeout')
})

setImmediate(() => {
  console.log('immediate')
})

```

上面的脚本在终端执行的结果理论上是 `timeout immediate`。

但是如果不断的尝试（例如 nodemon 执行脚本，不断保存文件触发执行），执行结果可能会出现 `immediate timeout` 的情况。

导致的结果是因为 `setTimeout` 的第二个参数 delay，表示在多长时间之后向任务队列添加任务回调。

一般开发者想表示立即向事件队列添加任务时会将第二个参数设置为 `0`，或不设置（以为默认值是 `0`），但其实并不是。

Nodejs 会将 `1-2147483647` 范围之外的值强制设置为 `1`，而浏览器环境下最小值是 4ms。

> [Nodejs 文档](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args)  
> When `delay` is larger than `2147483647` or less than `1`, the `delay` will be set to `1`. Non-integer delays are truncated to an integer.
> 
> [window.setTimeout - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#%E5%AE%9E%E9%99%85%E5%BB%B6%E6%97%B6%E6%AF%94%E8%AE%BE%E5%AE%9A%E5%80%BC%E6%9B%B4%E4%B9%85%E7%9A%84%E5%8E%9F%E5%9B%A0%EF%BC%9A%E6%9C%80%E5%B0%8F%E5%BB%B6%E8%BF%9F%E6%97%B6%E9%97%B4)  
> 在浏览器中，`setTimeout()`/`setInterval()`的每调用一次定时器的最小间隔是4ms，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的setInterval的回调函数阻塞导致的。

并且，delay 参数只是交给定时器线程计算的时间，当时间到达，定时器线程就会等待主线程空闲时添加任务回调到队列，所以当主线程代码阻塞时，及时到达了 delay 的时间，任务也可能并不会被立即添加到 timer 队列。

而 setImmediate 不需要延时，所以它有可能早于预期的 setTimeout 任务被添加到 check 队列。

### I/O 事件回调中运行

```js
const fs = require('fs')

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)

  setImmediate(() => {
    console.log('immediate')
  })
})
```

根据 Nodejs 的事件循环机制，宏任务队列都会按照顺序去切换检查任务。

上面代码的执行步骤是：

- 首先执行同步代码，接着向 poll 队列添加任务
- 同步代码执行完毕，检查微任务队列为空，开始按顺序检查宏任务队列
- 一直切换到 poll 队列，提取任务并执行
- 不论主线程是否阻塞，最终结果就是向 timer 队列和 check 队列分别添加任务，但不管 setTimeout 向队列添加任务的速度有多快，poll 队列清空后，仍会继续按顺序向下切换队列，所以首先切换到的永远是 check 队列
- 当执行完 check 队列中的 setImmediate 回调，事件循环才会从头检查宏任务队列，这时才轮到 timer 队列中的 setTimeout 任务（前提是此时任务已经被添加到 timer 队列）

所以上面代码的执行结果永远是 `immediate timeout`。

### 总结

- 默认情况下 setTimeout（立即执行时） 和 setImmediate 回调的执行顺序是随机的
- 而如果将它们放在 I/O 事件回调中，setImmediate 将永远优先于 setTimeout 执行