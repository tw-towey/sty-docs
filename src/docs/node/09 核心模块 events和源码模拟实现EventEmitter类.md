# events 事件模块

## events 与 EventEmitter

- node.js 是基于事件驱动的异步操作架构，内置 events 模块
- events 模块提供了 EventEmitter 类
    - 这个类的实例对象具备注册事件、发布事件和删除事件的一系列事件模型机制的常规操作
- node.js 中很多内置核心模块继承 EventEmitter 类
    - 所以开发者在使用的时候无需单独的引入 events 模块。

## EventEmitter 常见 API

- on：注册事件监听器
- emit：触发事件，按照注册的顺序同步调用每个事件监听器
- once：注册事件监听器，但只在第一次事件发布的时候执行，之后就被删除
- off：移除监听器

```js
const EventEmitter = require('events')

const ev = new EventEmitter()

// on
ev.on('事件1', () => {
  console.log('事件1执行')
})

const handler = () => {
  console.log('事件1执行---顺序2')
}
ev.on('事件1', handler)

// once
ev.once('事件2', () => {
  console.log('事件2执行')
})

// emit
ev.emit('事件1')
ev.emit('事件1')
ev.emit('事件2')
ev.emit('事件2')

// off
ev.off('事件1', handler)
ev.emit('事件1')

```

注册的处理函数也可以传参：

```js
const EventEmitter = require('events')

const ev = new EventEmitter()

ev.on('事件1', (a, b) => {
  console.log(a, b)
})

ev.emit('事件1', 1, 2)

```

事件处理函数（非箭头函数）中的 `this` 指向 EventEmitter 实例：

```js
ev.on('事件1', function() {
  console.log(this)
  console.log(this === ev) // true
})
ev.on('事件1', () => {})
ev.on('事件2', () => {})
ev.emit('事件1')
```

EventEmitter 实例中可以查看监听了什么事件以及每个事件上绑定的处理函数，例如：

```js
EventEmitter {
  _events: [Object: null prototype] {
    '事件1': [ [Function], [Function] ],
    '事件2': [Function]
  },
  _eventsCount: 2,
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
}
```

其它内置模块使用事件：

```js
const fs = require('fs')
const crs = fs.createReadStream()
crs.on('data', () => {
  // ..
})
```

## 事件驱动机制

[Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020),js 中有 Event Loop 事件循环机制，在事件触发后就会将回调函数添加到 Event Loop 中，当主线程代码执行完成后，就会按照内部的实现机制执行 Event Loop 中的回调函数，从而实现异步编程。

# 发布订阅

发布订阅模式是一个模型，定义了对象间一对多的依赖关系，而且不同对象间还实现了解耦，对象之间不需要认识彼此。

## **发布订阅可以解决什么问题？**

由于语言本身所具备的特性，在实现某个具体需求的时候可能会连续使用多个异步的 API，如果这些 API 的调用互相依赖彼此的调用结果，就会产生很多回调嵌套。

这种风格的代码编写和维护阅读在没有 Promise 之前是很让人头疼的，而发布订阅的模式就很好的解决了这个问题。

## 三个角色

![在这里插入图片描述](http://p4ui.toweydoc.tech:20080/images/stydocs/82958e4c189642cd8fdc9bf73cab75c8.png)

在这个模式中主要有三种角色：

- 订阅者（Subscribe）
- 发布者（Publish）
- 消息调度中心

**消息调度中心**是发布订阅模式和观察者模式的主要不同点，正是因为它的存在，才让发布者和订阅者之间实现了完全的解耦。

对应到 Nodejs 中，可以理解为 Event Loop 里的事件队列。

也正是因为这一点，我们可以认为 EventEmitter 类是基于发布订阅实现的。

## 工作流程

订阅者把自己想订阅的事件监听先注册到消息调度中心，等到这个事件被触发的时候，发布者会把这个事件发布到调度中心，之后由调度中心统一的调度订阅者之前注册的代码。

## 发布订阅要素

- 缓存队列，存放订阅者信息
- 发布者具有增加、删除订阅的能力
- 状态改变时通知队列中所有订阅者执行监听

## 与观察者模式的区别

- 发布订阅模式中存在调度中心，观察者模式没有
- 状态发生改变时，发布订阅模式无需主动通知订阅者，由调度中心决定订阅内容如何执行

## 简单模拟发布订阅模式

```js
class PubSub {
  constructor() {
    this._events = {}
  }

  // 注册
  subscribe(event, callback) {
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._events[event].push(callback)
  }

  // 发布
  publish(event, ...args) {
    const items = this._events[event]
    if (items && items.length) {
      items.forEach(callback => {
        callback(...args)
      })
    }
  }
}

const ps = new PubSub()

ps.subscribe('事件1', function () {
  console.log('事件1执行')
})
ps.subscribe('事件1', function () {
  console.log('事件1执行----2')
})

ps.publish('事件1')
ps.publish('事件1')

```

# EventEmitter 类源码分析

## 准备调试用代码

```js
// EventEmitter-source.js
const EventEmitter = require('events')

const ev = new EventEmitter()

ev.on('事件1', () => {
  console.log('事件1执行')
})

const handler = (...data) => {
  console.log('事件1执行', ...data)
}

ev.on('事件1', handler)

ev.emit('事件1', 1, 2)

ev.off('事件1', handler)

```

[vscode](https://so.csdn.net/so/search?q=vscode&spm=1001.2101.3001.7020) 调试配置文件

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      // 忽略调试的文件
      "skipFiles": [
        // "<node_internals>/**" 是 node 内部模块
        // 本例要分析源码，所以不能忽略，将其注释
        // 注意：不能直接注释 skipFiles，否则 vscode 仍会采用默认值
        //   "<node_internals>/**"
      ],
      // 启动程序后需要打开的文件，修改成正确的地址即可
      "program": "${workspaceFolder}\\EventEmitter-source.js"
    }
  ]
}
```

## EventEmitter 构造函数

```js
function EventEmitter(opts) {
  EventEmitter.init.call(this, opts);
}
```

## EventEmitter.init

```js
EventEmitter.init = function(opts) {

  // 初始化 _events
  if (this._events === undefined ||
      this._events === ObjectGetPrototypeOf(this)._events) {
    // 定义一个没有原型的空对象，减少资源消耗
    this._events = ObjectCreate(null);
    this._eventsCount = 0;
  }

  // 允许注册的监听事件数量上限
  this._maxListeners = this._maxListeners || undefined;


  if (opts && opts.captureRejections) {
    if (typeof opts.captureRejections !== 'boolean') {
      throw new ERR_INVALID_ARG_TYPE('options.captureRejections',
                                     'boolean', opts.captureRejections);
    }
    this[kCapture] = Boolean(opts.captureRejections);
  } else {
    // Assigning the kCapture property directly saves an expensive
    // prototype lookup in a very sensitive hot path.
    this[kCapture] = EventEmitter.prototype[kCapture];
  }
};
```

## on / addListener

`ev.on` 实际上调用的 `addListener`

```js
EventEmitter.prototype.addListener = function addListener(type, listener) {
  // type 事件名称；listener 事件回调
  return _addListener(this, type, listener, false);
};
```

`_addListener`：

```js
// target: EventEmitter 实例对象
// type: 事件名称
// listener：事件回调
// prepend：插入队列的位置（前/后）
function _addListener(target, type, listener, prepend) {
  let m;
  let events;
  let existing;

  // 监测listenr格式是否是函数
  checkListener(listener);

  // 获取 _events
  events = target._events;
  if (events === undefined) {
    events = target._events = ObjectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    // 如果注册了 newListener 事件，注册新事件时会触发 newListener 事件
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    // 获取该事件对象
    existing = events[type];
  }

  // 判断是否订阅过该事件
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    // 添加事件回调
    // 注册事件的首个回调会直接存储到事件对象，所以再次添加时会判断 typeof existing === 'function'
    events[type] = listener;
    // 事件计数
    ++target._eventsCount;
  } else {
    // 添加事件回调
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    // 注册事件数量超出限制时的处理
    if (m > 0 && existing.length > m && !existing.warned) {
      //...
    }
  }

  // 返回实例对象
  return target;
}
```

## emit

```js
// type: 事件名称
// args: 事件回调参数
EventEmitter.prototype.emit = function emit(type, ...args) {
  let doError = (type === 'error');

  // 获取 _events
  const events = this._events;
  if (events !== undefined) {
    // error 事件处理
    if (doError && events[kErrorMonitor] !== undefined)
      this.emit(kErrorMonitor, ...args);
    doError = (doError && events.error === undefined);
  } else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  // error 事件处理
  if (doError) {
    //...
  }

  // 获取事件的全部回调
  const handler = events[type];

  if (handler === undefined)
    return false;

  // 首次添加事件监听时，会直接存储回调，而不是数组，所以要进行判断
  if (typeof handler === 'function') {
    // 调用回调
    const result = ReflectApply(handler, this, args);

    // We check if result is undefined first because that
    // is the most common case so we do not pay any perf
    // penalty
    if (result !== undefined && result !== null) {
      addCatch(this, result, type, args);
    }
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler);
    // 按照注册顺序遍历调用回调
    for (let i = 0; i < len; ++i) {
      const result = ReflectApply(listeners[i], this, args);

      // We check if result is undefined first because that
      // is the most common case so we do not pay any perf
      // penalty.
      // This code is duplicated because extracting it away
      // would make it non-inlineable.
      if (result !== undefined && result !== null) {
        addCatch(this, result, type, args);
      }
    }
  }

  // emit 触发事件会返回 true 而不是 undefined
  return true;
};
```

## off / removeListener

`ev.off` 实际上调用的 `removeListener`

```js
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
```

```js
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
  		// 校验监听事件格式是否是函数
      checkListener(listener);

  		// 获取事件存储对象
      const events = this._events;
      if (events === undefined)
        return this;

      const list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        // 如果该事件只注册过一个监听回调，并且就是当前要删除的
        
        // 更新事件计数并判断
        if (--this._eventsCount === 0)
          // 重置 _events
          this._events = ObjectCreate(null);
        else {
          // 删除该事件
          delete events[type];
          // 触发 removeListener 事件
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        // 如果该事件绑定了多个监听回调
        let position = -1;

        // 获取要删除的回调的位置
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        // 移除监听回调
        if (position === 0)
          list.shift();
        else {
          if (spliceOne === undefined)
            spliceOne = require('internal/util').spliceOne;
          spliceOne(list, position);
        }

        // 如果只有一个监听回调，则直接存储
        if (list.length === 1)
          events[type] = list[0];

        // 触发 removeListener 事件
        if (events.removeListener !== undefined)
          this.emit('removeListener', type, listener);
      }

  		// 返回实例对象
      return this;
    };
```

## 总结

EventEmitter 使用主要是4个部分：

1. new 实例化时主要创建了一个空对象，空对象由 null 创建，没有原型，提高性能
2. on 操作和 addListener 一样都是调用 `_addListener`，内部主要判断事件是否存在，从而决定如何添加事件监听，如果没注册过就直接存储监听回调，如果注册过则将全部回调存放到数组中维护
3. emit 执行事件，内部主要判断事件绑定的回调是一个（函数）还是多个（数组），从而决定如何调用每一个回调
4. removeListener 删除订阅，内部主要判断事件绑定的回调是一个（函数）还是多个（数组），从而决定如何进行删除

# EventEmitter 模拟

简单模拟 EventEmitter 类学习原生原理：

```js
function MyEvent() {
  // 准备一个数据结构用于缓存订阅者信息
  this._events = Object.create(null)
}

MyEvent.prototype.on = function (type, callback) {
  // 判断当前事件是否已经订阅，从而决定如何缓存
  if (this._events[type]) {
    this._events[type].push(callback)
  } else {
    this._events[type] = [callback]
  }
}
MyEvent.prototype.emit = function (type, ...args) {
  if (this._events[type] && this._events[type].length) {
    this._events[type].forEach(callback => {
      callback(...args)
    })
  }
}
MyEvent.prototype.off = function (type, callback) {
  if (this._events[type] && this._events[type].length) {
    this._events[type] = this._events[type].filter(item => item !== callback && item.link !== callback)
  }
}
MyEvent.prototype.once = function (type, callback) {
  let foo = (...args) => {
    callback(...args)
    this.off(type, foo)
  }
  // 关联 foo 和 callback，一遍 off 的时候可以匹配 callback
  foo.link = callback
  this.on(type, foo)
}

const ev = new MyEvent()

ev.on('事件1', () => {
  console.log('事件1执行')
})

const handler = (...data) => {
  console.log('事件1执行', ...data)
}

ev.on('事件1', handler)
ev.emit('事件1', 1, 2)
ev.off('事件1', handler)
ev.emit('事件1', 3, 4)

ev.once('事件2', handler)
ev.emit('事件2', '前')
ev.emit('事件2', '后')

ev.once('事件3', handler)
ev.off('事件3', handler)
ev.emit('事件3', '前')
```