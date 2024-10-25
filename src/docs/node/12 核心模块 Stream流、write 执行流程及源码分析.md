# write 执行流程

## 流程梳理

通过文件可写流执行流程的梳理，可以帮助理解背压机制，还能帮助更好的确认 drain 事件的触发时机。

_**drain 事件**：当前缓冲区可以继续执行数据写入的时候就会触发 drain 事件。_

示例代码：

```js
const fs = require('fs')

const ws = fs.createWriteStream('test.txt', {
  highWaterMark: 3 // 水位线，可写流缓冲区上限
})

// 模拟底层数据
const source = [1, 2, 3, 4, 5]
let flag

function info(chunk) {
  console.log(
    `chunk：${chunk};`,
    `--- flag：${flag};`,
    `--- 写入数据长度：${ws._writableState.length};`,
    // getBuffer() 获取缓存数据
    `--- 缓冲区长度：${ws._writableState.getBuffer().length};`
  )
}

function begin() {
  let chunk = null

  while (source.length) {
    // 文本写入的数据只接收字符串或buffer
    chunk = source.shift().toString()
    // 如果 flag 为 false 并不是表示当前数据不被执行写入或缓存
    flag = ws.write(chunk)
    // 打印一些信息查看变化
    info(chunk.toString())

    // 如果缓冲区的缓存达到水位线，应该暂停写入
    if (!flag) {
      return
    }
  }
}

// 当缓冲区排空会触发 drain 事件，可以恢复数据的继续读写
ws.on('drain', () => {
  begin()
})

// 开始读写
begin()

// 打印结果：
// chunk：1; --- flag：true; --- 写入数据长度：1; --- 缓冲区长度：0;
// chunk：2; --- flag：true; --- 写入数据长度：2; --- 缓冲区长度：1;
// chunk：3; --- flag：false; --- 写入数据长度：3; --- 缓冲区长度：2;
// chunk：4; --- flag：true; --- 写入数据长度：1; --- 缓冲区长度：0;
// chunk：5; --- flag：true; --- 写入数据长度：2; --- 缓冲区长度：1;

```

![在这里插入图片描述](http://p6ui.toweydoc.tech:20080/images/stydocs/d4f9a4b8dff34490b603935d90b906f8.png)

write 的执行流程设计三个角色：数据生产者、可写流、文件。

- 示例中数据是立即生产的
- 调用 `writeable.write()` 写入数据。如果是第一次写入，会直接写入到文件，不进行缓存。如果不是第一次，内部会将数据存入缓冲区，然后慢慢提取缓冲区的数据写入到文件中，整个过程就是消费数据的过程。
- 当缓冲区的数据达到设置的上限（默认 16KB，示例中是 3B）后，`write` 方法返回值（示例中以 flag 表示）就返回 `false`，否则返回 `true`。
- 生产速度和消费速度是不一样的，一般情况下生产速度要比消费速度快很多
- flag 并不是用于控制当前的写入操作是否发生（数据仍会写入），它只是为了用于控制上游数据的产量问题，作为判断的依据。
- 当 flag 为 false 后，表示可写流的缓冲区已达上限，可写流仍会缓存数据，等待写入到文件中，可是这样就会占用额外的内存，如果超过内存最大使用量，Node.js 将无条件中止，即便不会中止，高内存使用量也会消耗内存降低性能
- 所以当 flag 为 false 时我们应该告知数据的生产者，当前消费速度已经跟不上生产速度了。这个时候，一般会将可读流的模块修改为暂停模式。
- 当数据生产者暂停之后，消费者会慢慢消化它内部缓冲区的数据，直到可以再次被执行写入操作。
- 当缓冲区可以继续写入数据时，可写流会触发 **drain 事件**通知生产者，生产者就可以恢复数据读取，从而控制内存消耗。

## 源码分析

在上面示例代码的 `write` 方法调用行打上断点，通过 vscode 调试工具运行脚本。

### write

```js
Writable.prototype.write = function(chunk, encoding, cb) {
  // 获取 writable 基础信息对象
  // 	buffer 属性表示缓冲区存储的数据
  //  继承的 getBuffer() 方法用于获取 buffer（官方建议使用方法代替直接访问 buffer 属性）
  // 	length 当前累计要写入的数据长度，作为判断是否超限的依据
  //  highWaterMark 水位线，缓冲区上限，作为判断是否超限的依据
  // 	needDrain 是否需要排水，记录超限状态
  const state = this._writableState;
  var ret = false;
  const isBuf = !state.objectMode && Stream._isUint8Array(chunk);

  // Do not use Object.getPrototypeOf as it is slower since V8 7.3.
  // 非 objectMode 模式，将数据转化成 Buffer
  if (isBuf && !(chunk instanceof Buffer)) {
    chunk = Stream._uint8ArrayToBuffer(chunk);
  }

  // 判断第二个参数是回调还是编码
  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  // 设置编码
  if (isBuf)
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  // 如果没有回调则赋值为一个空的方法
  if (typeof cb !== 'function')
    cb = nop;

  if (state.ending)
    // 在 end 后写入数据抛出错误
    writeAfterEnd(this, cb);
  else if (isBuf || validChunk(this, state, chunk, cb)) {
    // 更新回调次数计数
    state.pendingcb++;
    // 写入或缓存，方法返回是否超限
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  // 返回，ret 基本上相当于 needDrain
  return ret;
};
```

### writeOrBuffer

```js
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  // 判断数据类型，非 objectMode 模式下将数据转化成 Buffer
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      encoding !== 'buffer' &&
      typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
    encoding = 'buffer';
  }
  const len = state.objectMode ? 1 : chunk.length;

  // 更新 length，它记录待写入文件的数据长度
  state.length += len;

  // 判断缓冲区数据是否达到上限（仍有空间）
  // 依据记录的待写入数据长度判断，而不是缓冲区的长度（因为有些场景不会缓存，例如首次写入或强制写入）
  // 注意是 小于 而不是 小于等于
  const ret = state.length < state.highWaterMark;
  // We must ensure that previous needDrain will not be reset to false.
  // 更新 needDrain
  if (!ret)
    state.needDrain = true;

  // writing 表示是否正在写入的标记
  // corked 表示是否强制把内容写入到缓冲区
  if (state.writing || state.corked) {
		// 构建链表结构的缓存
    // 获取最后一次的缓存
    var last = state.lastBufferedRequest;
    // 更新最后一次的缓存为当前数据
    state.lastBufferedRequest = {
      chunk,
      encoding,
      callback: cb,
      next: null
    };
    if (last) {
      // 如果曾经缓存过，则关联本次缓存
      last.next = state.lastBufferedRequest;
    } else {
      // bufferedRequest 记录当前要处理缓存的任务（从缓存中提取并写入到文件，这里就不细讲了）
      // 首次缓存直接存储到 bufferedRequest
      state.bufferedRequest = state.lastBufferedRequest;
    }
    // 更新处理缓存任务的数量
    state.bufferedRequestCount += 1;
  } else {
    // 如果是首次写数据，则直接写入到文件（不缓存）
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  // 返回是否超限
  return ret;
}

```

### doWrite

```js
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  // 属性赋值
  // 每次写入量
  state.writelen = len;
  // 写入回调
  state.writecb = cb;
  // 记录写入状态：正在写入
  state.writing = true;
  // 是否同步操作
  state.sync = true;
  // 当前写入流是否已销毁
  if (state.destroyed)
    // 调用回调抛出错误
    state.onwrite(new ERR_STREAM_DESTROYED('write'));
  else if (writev)
    stream._writev(chunk, state.onwrite);
  else
    // 调用 _write 执行文件写入操作
    // onwrite 是传递给 _write 的回调
    stream._write(chunk, encoding, state.onwrite);
  // 还原 sync 属性
  // _write 中的文件写入是异步的，所以此重置会在文件写入操作回调之前执行
  // 它用于在 onwrite 中区分是否执行了文件写入操作
  state.sync = false;
}
```

### \_write

```js
WriteStream.prototype._write = function(data, encoding, cb) {
  // 如果文件还没打开或打开失败（例如文件不存在）
  // 写入流从创建到打开文件中间有一定时间，这期间如果执行写入操作可能文件还没打开
  if (typeof this.fd !== 'number') {
    // 绑定 open 事件，等待文件打开后再执行一次写入操作
    return this.once('open', function() {
      this._write(data, encoding, cb);
    });
  }

  // 如果写入流已销毁，抛出错误
  if (this.destroyed) return cb(new ERR_STREAM_DESTROYED('write'));

  this[kIsPerformingIO] = true;
  // 调用 fs.write() 方法，执行文件写入操作
  this[kFs].write(this.fd, data, 0, data.length, this.pos, (er, bytes) => {
    // 写入完成回调
    
    this[kIsPerformingIO] = false;
    // Tell ._destroy() that it's safe to close the fd now.
    // 如果写入流已销毁，抛出错误
    if (this.destroyed) {
      cb(er);
      return this.emit(kIoDone, er);
    }

    // 处理报错
    if (er) {
      if (this.autoClose) {
        this.destroy();
      }
      return cb(er);
    }
    // 更新已写入的数据的字节数
    this.bytesWritten += bytes;
    // 调用写入完成回调 onwrite
    cb();
  });

  // 更新下次写入的位置
  // 但 fs.write 写入是异步的，首次写入 pos 为 undefined 并不会更新
  if (this.pos !== undefined)
    this.pos += data.length;
};
```

### onwrite

`onwrite` 在 `fs.write()` 文件写入操作完成后执行的回调，内部主要是写入流的属性进行更新和还原。

```js
function onwrite(stream, er) {
  const state = stream._writableState;
  const sync = state.sync;
  // 用户调用 writable.write() 传入的回调
  const cb = state.writecb;

  if (typeof cb !== 'function')
    throw new ERR_MULTIPLE_CALLBACK();

  // 标记写入状态
  state.writing = false;
  // 重置存储用户自定义写入回调的属性
  state.writecb = null;
  // 更新待写数据计数，减去已写入的数据长度
  state.length -= state.writelen;
  // 重置存储当前写入数据长度的属性
  state.writelen = 0;

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    // 判断写入流是否 end，是否需要 finish
    var finished = needFinish(state) || stream.destroyed;


    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      // false：表示没有执行文件写入操作
      // It is a common case that the callback passed to .write() is always
      // the same. In that case, we do not schedule a new nextTick(), but rather
      // just increase a counter, to improve performance and avoid memory
      // allocations.
      if (state.afterWriteTickInfo !== null &&
          state.afterWriteTickInfo.cb === cb) {
        state.afterWriteTickInfo.count++;
      } else {
        state.afterWriteTickInfo = { count: 1, cb, stream, state };
        process.nextTick(afterWriteTick, state.afterWriteTickInfo);
      }
    } else {
      // true：表示执行了文件写入操作
      // 执行写入完成的收尾工作
      afterWrite(stream, state, 1, cb);
    }
  }
}
```

### afterWrite

```js
function afterWrite(stream, state, count, cb) {
  // 判断是否在排水状态下处理完待写数据（排空流）
  const needDrain = !state.ending && !stream.destroyed && state.length === 0 &&
    state.needDrain;
  if (needDrain) {
    // 重置状态
    state.needDrain = false;
    // 触发 drain 事件通知用户
    stream.emit('drain');
  }

  while (count-- > 0) {
    state.pendingcb--;
    cb();
  }

  finishMaybe(stream, state);
}
```

## 总结

### 相关属性

写入流实例对象中存储了一些属性帮助使用者控制缓存：

- length：待写入文件的数据长度
    - 在 `write()` 方法内部执行写入之前会先更新这个属性
    - 此时数据还未写入文件甚至还没存入缓冲区
    - 它主要**用来作为判断缓冲区是否超限**（实际上是待写数据是否超限）
    - 当文件写入操作完成会更新这个属性，减去已写入数据的长度
- highWaterMark：水位线，缓冲区存储上限
    - 只是作为判断是否超限的依据，并不限制缓冲区的真实存储
- buffer：缓冲区的缓存数据，Node.js 要求使用 `getBuffer()` 方法访问
- needDrain：是否需要排水，当根据 length 和 highWaterMark 判断缓冲区是否超限
    - 基本上是作为 `write()` 方法的返回值，作为用户判断是否需要暂停读取的依据
- bufferedRequest：当前要处理的缓存
    - 链表结构，通过 next 属性关联下一个要处理的缓存
    - Nodejs 会沿着链表依次从缓冲区提取缓存数据写入到文件中
- lastBufferedRequest：最近一次存储的缓存
    - 用于构建链表结构

### 流程

- 可写流每次调用 `write()` 写入数据都会先更新 `length` （增加），当文件写入操作完成后再次更新 `length`（减少）
- 首次写入数据会直接写入到文件中，不会进行缓存
- 首次写入时如果文件还没打开，则会等待 open 事件触发后再执行写入
- 首次之后的写入会先将数据存入缓冲区
- 每次写入都会用更新后的 `length` 和 `highWaterMark` 判断缓存区是否超限（已满或溢出），如果超限则标记 `needDrain`，表示应该进行排水，判断结果作为 `write()` 方法的返回值提醒用户
- 用户可以依据 `write()` 的返回值判断是否需要控制内存消耗，例如暂停读取
- 当写入流将缓冲区中的缓存**全部清空**（排空流），会更新 `needDrain` 并触发 `drain` 方法通知用户，用户可以在这个事件中恢复读取数据。