## Performance measurement APIs

Node.js 提供了一组“性能测量”API，用于评估代码的性能和效率。这些 API 包括 `console.time()`、`console.timeEnd()` 和 `console.timeLog()`，可以让我们轻松地对代码的执行时间进行精确计时，并输出到控制台。

- `console.time(label)`：开始一个新的计时器，将当前时间戳存储在关联的标签 `label` 上；
- `console.timeEnd(label)`：停止一个之前由 `console.time()` 开始的计时器，并输出与名称 `label` 关联的持续时间；
- `console.timeLog(label, ...args)`：打印出计时器 `label` 的持续时间以及一些其他信息，类似于 `console.log()`，但是会自动包含计时器的持续时间。

举个例子，如果我们需要对某段代码的执行时间进行计时并输出，可以使用 `console.time()` 和 `console.timeEnd()` 函数：

```javascript
function myFunction() {
  console.time("myFunction");
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}
  console.timeEnd("myFunction");
}

myFunction(); // 输出 'myFunction: 25.524ms'（实际数字可能不同）
```

这里的 `console.time()` 将开始一个名为 `'myFunction'` 的计时器，并将当前时间戳与该标签相关联。当函数执行完成后，我们会使用 `console.timeEnd()` 结束该计时器，并输出计时器持续的时间。在这个例子中，我们使用一个简单的循环来模拟要测试的代码，计时器持续了约 25 毫秒。

需要注意的是，`console.time()` 和 `console.timeEnd()` 必须使用相同的标签名，否则计时器将不起作用。此外，`console.timeLog()` 可以在计时器运行时多次调用，以便打印出在某个时间点上计时器已经持续了多长时间。

通过使用这些性能测量 API，我们可以更加准确地了解代码的性能瓶颈，从而进行必要的优化和改进。

### perf_hooks.performance

`perf_hooks.performance` 是 Node.js 中 `perf_hooks` 模块的一个属性，用于提供高分辨率性能计时器。通俗来说，这个属性提供了一种更加准确、精细的方式来测量代码的性能和执行时间。

使用 `perf_hooks.performance` 需要先导入 `perf_hooks` 模块：

```javascript
const { performance } = require("perf_hooks");
```

然后，我们就可以使用 `performance.now()` 方法来获取当前时间戳（以毫秒为单位），从而实现高分辨率的计时功能：

```javascript
const t1 = performance.now();
// 在这里编写要测试的代码...
for (let i = 0; i < 100000000; i++) {}
const t2 = performance.now();

console.log(`执行时间为 ${t2 - t1} 毫秒`);
```

这里的 `t1` 和 `t2` 分别保存了执行代码的起始时间和结束时间，两者的差值即为代码的执行时间（以毫秒为单位）。

与普通计时器相比，`performace.now()` 提供了更高精度的计时功能，可以帮助我们更好地评估代码的执行效率。

需要注意的是，由于 `performance.now()` 返回的是双精度数字，因此在进行计算时可能会存在一些精度误差。如果需要更准确的性能测量结果，可以考虑使用统计学方法或者外部的性能测试工具。

#### performance.clearMarks([name])

`performance.clearMarks([name])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于清除之前使用 `performance.mark()` 函数创建的性能测量标记。

在使用 `performance.mark()` 函数进行代码性能测量时，我们可以为特定的代码片段设置多个标记，以便更好地评估每个标记之间的执行时间。但是，在进行多次测试时可能会出现一些问题，例如标记名称重复或者遗留的标记对后续测试产生干扰等。因此，我们可以使用 `performance.clearMarks()` 函数来清除之前创建的标记，以便进行下一次测试。

`performance.clearMarks()` 函数可以接受一个可选参数 `name`，表示需要清除的标记名称。如果没有指定该参数，则将清除所有标记。

举个例子，如果我们需要在测试中使用多个标记来评估代码的不同执行阶段，可以按照如下方式设置和清除标记：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  performance.mark("start");
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}
  performance.mark("middle");
  // 继续编写要测试的代码...
  for (let j = 0; j < 10000000; j++) {}
  performance.mark("end");

  const duration1 = performance.measure("start to middle", "start", "middle");
  console.log(`第一段代码执行时间为 ${duration1.duration} 毫秒`);

  const duration2 = performance.measure("middle to end", "middle", "end");
  console.log(`第二段代码执行时间为 ${duration2.duration} 毫秒`);

  performance.clearMarks(); // 清除所有标记
}

myFunction();
```

这里的 `performance.mark()` 将设置三个性能测量标记：`start`、`middle` 和 `end`。然后，我们使用 `performance.measure()` 函数来计算每个片段的执行时间，并输出到控制台。最后，我们使用 `performance.clearMarks()` 函数来清除所有标记，以便进行下一次测试。

需要注意的是，`performance.clearMarks()` 函数只能清除之前使用 `performance.mark()` 创建的标记。如果要删除其他类型的性能测量数据（例如使用 `performance.measure()` 函数创建的性能测量结果），可以使用 `performance.clearMeasures()` 或者 `performance.clearEntries()` 函数。

#### performance.clearMeasures([name])

`performance.clearMeasures([name])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于清除之前使用 `performance.measure()` 函数创建的性能测量结果。

在使用 `performance.measure()` 函数进行代码性能测量时，我们可以为特定的代码片段设置多个性能测量结果，以便更好地评估每个标记之间的执行时间。但是，在进行多次测试时可能会出现一些问题，例如结果名称重复或者遗留的结果对后续测试产生干扰等。因此，我们可以使用 `performance.clearMeasures()` 函数来清除之前创建的结果，以便进行下一次测试。

`performance.clearMeasures()` 函数可以接受一个可选参数 `name`，表示需要清除的结果名称。如果没有指定该参数，则将清除所有结果。

举个例子，如果我们需要在测试中使用多个性能测量结果来评估代码的不同执行阶段，可以按照如下方式设置和清除结果：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  performance.mark("start");
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}
  performance.mark("middle");
  // 继续编写要测试的代码...
  for (let j = 0; j < 10000000; j++) {}
  performance.mark("end");

  performance.measure("start to middle", "start", "middle");
  performance.measure("middle to end", "middle", "end");

  const measures = performance.getEntriesByType("measure");
  console.log(`第一段代码执行时间为 ${measures[0].duration} 毫秒`);
  console.log(`第二段代码执行时间为 ${measures[1].duration} 毫秒`);

  performance.clearMeasures(); // 清除所有结果
}

myFunction();
```

这里的 `performance.measure()` 将设置两个性能测量结果：`start to middle` 和 `middle to end`。然后，我们使用 `performance.getEntriesByType()` 函数来获取所有的性能测量结果，并输出到控制台。最后，我们使用 `performance.clearMeasures()` 函数来清除所有结果，以便进行下一次测试。

需要注意的是，`performance.clearMeasures()` 函数只能清除之前使用 `performance.measure()` 创建的结果。如果要删除其他类型的性能测量数据（例如使用 `performance.mark()` 函数创建的性能测量标记），可以使用 `performance.clearMarks()` 或者 `performance.clearEntries()` 函数。

#### performance.clearResourceTimings([name])

`performance.clearResourceTimings([name])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于清除之前使用 `performance.getEntriesByType('resource')` 函数获取的所有资源计时信息。

在使用 Web 应用程序时，我们经常需要加载各种资源文件（例如 HTML、CSS、JavaScript、图片等），因此我们需要对每个资源的下载和加载时间进行测量和评估。为了实现这个目标，浏览器会自动记录每个资源的性能计时数据，并使用 `performance.getEntriesByType('resource')` 函数将其返回给我们。

但是，在进行多次测试时可能会出现一些问题，例如计时数据重复或者遗留的数据对后续测试产生干扰等。因此，我们可以使用 `performance.clearResourceTimings()` 函数来清除之前获取的所有资源计时信息，以便进行下一次测试。

`performance.clearResourceTimings()` 函数可以接受一个可选参数 `name`，表示需要清除的资源名称。如果没有指定该参数，则将清除所有资源计时信息。

举个例子，如果我们需要在测试中获取所有资源的加载时间，可以按照如下方式获取并清除资源计时信息：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  // 加载要测试的资源...
  const img = new Image();
  img.src = "test.png";

  // 等待资源加载完成...
  img.onload = function () {
    const resources = performance.getEntriesByType("resource");
    for (let i = 0; i < resources.length; i++) {
      console.log(
        `${resources[i].name} 的加载时间为 ${resources[i].duration} 毫秒`
      );
    }

    performance.clearResourceTimings(); // 清除所有资源计时信息
  };
}

myFunction();
```

这里的 `performance.getEntriesByType('resource')` 将获取所有资源的计时信息，并通过循环输出到控制台。最后，我们使用 `performance.clearResourceTimings()` 函数来清除所有资源计时信息，以便进行下一次测试。

需要注意的是，`performance.clearResourceTimings()` 函数只能清除之前使用 `performance.getEntriesByType('resource')` 获取的资源计时信息。如果要删除其他类型的性能测量数据，可以使用 `performance.clearMarks()`、`performance.clearMeasures()` 或者 `performance.clearEntries()` 函数。

#### performance.eventLoopUtilization([utilization1[, utilization2]])

`performance.eventLoopUtilization([utilization1[, utilization2]])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于获取当前事件循环的 CPU 利用率和活跃时间。

事件循环是 Node.js 运行时的核心组件之一，它负责处理异步 I/O、定时器和其他事件。由于事件循环中的代码通常是非阻塞的，因此在单个线程上运行多个事件循环可以有效提高 Node.js 应用程序的并发性能。

`performance.eventLoopUtilization()` 函数提供了一种简单的方式来测量事件循环的利用率和活跃时间，以便更好地评估应用程序的性能和稳定性。

`performance.eventLoopUtilization()` 函数可以接受两个可选参数 `utilization1` 和 `utilization2`，分别表示前后两个时间段的事件循环利用率和活跃时间。如果没有指定这两个参数，则将返回当前时间段的事件循环利用率和活跃时间。

举个例子，如果我们需要在应用程序运行过程中监控事件循环的状态，可以按照如下方式使用 `performance.eventLoopUtilization()` 函数：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  setInterval(() => {
    const utilization = performance.eventLoopUtilization();
    console.log(
      `事件循环利用率为 ${utilization.utilization.toFixed(
        2
      )}，活跃时间为 ${utilization.active.toFixed(2)} 毫秒`
    );
  }, 1000);
}

myFunction();
```

这里的 `setInterval()` 将每秒调用一次 `performance.eventLoopUtilization()` 函数，并将结果输出到控制台。每次调用都会返回当前事件循环的利用率和活跃时间。可以根据这些信息来评估应用程序的性能和稳定性，以及进行故障诊断和优化。

需要注意的是，在某些情况下，`performance.eventLoopUtilization()` 函数可能无法返回准确的结果（例如在 Windows 平台上）。此外，由于事件循环的复杂性和不确定性，事件循环利用率和活跃时间也可能存在一定程度的误差和偏差。因此，在使用 `performance.eventLoopUtilization()` 函数进行性能测量时，需要结合其他工具和方法进行综合评估和分析。

#### performance.getEntries()

`performance.getEntries()` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于获取所有性能测量数据。

在使用 `performance.mark()` 和 `performance.measure()` 函数进行代码性能测量时，我们可以为特定的代码片段设置多个标记和结果，并通过 `performance.getEntries()` 函数获取所有的性能测量数据。返回的数据包含每个标记和结果的名称、起始时间、结束时间和执行时间等信息。

举个例子，如果我们需要在测试中使用多个标记和结果来评估代码的不同执行阶段，可以按照如下方式设置和获取性能测量数据：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  performance.mark("start");
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}
  performance.mark("middle");
  // 继续编写要测试的代码...
  for (let j = 0; j < 10000000; j++) {}
  performance.mark("end");

  const duration1 = performance.measure("start to middle", "start", "middle");
  console.log(`第一段代码执行时间为 ${duration1.duration} 毫秒`);

  const duration2 = performance.measure("middle to end", "middle", "end");
  console.log(`第二段代码执行时间为 ${duration2.duration} 毫秒`);

  const entries = performance.getEntries();
  console.log(entries);
}

myFunction();
```

这里的 `performance.mark()` 将设置三个性能测量标记：`start`、`middle` 和 `end`。然后，我们使用 `performance.measure()` 函数来计算每个片段的执行时间，并输出到控制台。最后，我们使用 `performance.getEntries()` 函数来获取所有的性能测量数据，并输出到控制台。

需要注意的是，`performance.getEntries()` 函数将返回所有类型的性能测量数据，包括标记、结果、资源计时信息和事件循环利用率等。如果只想获取某种类型的性能测量数据，可以使用 `performance.getEntriesByType()` 函数来进行筛选。

#### performance.getEntriesByName(name[, type])

`performance.getEntriesByName(name[, type])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于获取特定名称的性能测量数据。

在使用 `performance.mark()` 和 `performance.measure()` 函数进行代码性能测量时，我们可以为特定的代码片段设置标记和结果，并通过 `performance.getEntriesByName()` 函数获取特定名称的性能测量数据。返回的数据包含每个标记和结果的名称、起始时间、结束时间和执行时间等信息。

举个例子，如果我们需要在测试中使用多个标记和结果来评估代码的不同执行阶段，并获取特定名称的性能测量数据，可以按照如下方式设置和获取性能测量数据：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  performance.mark("start");
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}
  performance.mark("middle");
  // 继续编写要测试的代码...
  for (let j = 0; j < 10000000; j++) {}
  performance.mark("end");

  const duration1 = performance.measure("start to middle", "start", "middle");
  console.log(`第一段代码执行时间为 ${duration1.duration} 毫秒`);

  const duration2 = performance.measure("middle to end", "middle", "end");
  console.log(`第二段代码执行时间为 ${duration2.duration} 毫秒`);

  const entries = performance.getEntriesByName("middle to end", "measure");
  console.log(entries);
}

myFunction();
```

这里的 `performance.mark()` 将设置三个性能测量标记：`start`、`middle` 和 `end`。然后，我们使用 `performance.measure()` 函数来计算每个片段的执行时间，并输出到控制台。最后，我们使用 `performance.getEntriesByName()` 函数来获取名为 `middle to end` 的性能测量结果，并将其输出到控制台。

需要注意的是，`performance.getEntriesByName()` 函数将只返回指定名称和类型的性能测量数据。如果未指定类型参数，则默认返回所有类型的性能测量数据。如果没有找到任何与指定名称匹配的数据，则返回空数组。

#### performance.getEntriesByType(type)

`performance.getEntriesByType(type)` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于获取特定类型的性能测量数据。

在使用 `performance.mark()` 和 `performance.measure()` 函数进行代码性能测量时，我们会得到多种类型的性能测量数据，例如标记、结果、资源计时信息和事件循环利用率等。如果需要只获取某一种类型的性能测量数据，可以使用 `performance.getEntriesByType(type)` 函数来进行筛选。

举个例子，如果我们需要在测试中获取所有资源计时信息，并输出到控制台，可以按照如下方式使用 `performance.getEntriesByType()` 函数：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  // 加载要测试的资源...
  const img = new Image();
  img.src = "test.png";

  // 等待资源加载完成...
  img.onload = function () {
    const resources = performance.getEntriesByType("resource");
    for (let i = 0; i < resources.length; i++) {
      console.log(
        `${resources[i].name} 的加载时间为 ${resources[i].duration} 毫秒`
      );
    }
  };
}

myFunction();
```

这里的 `performance.getEntriesByType('resource')` 将获取所有资源的计时信息，并通过循环输出到控制台。

需要注意的是，`performance.getEntriesByType()` 函数将只返回指定类型的性能测量数据。如果未指定类型参数，则默认返回所有类型的性能测量数据。如果没有找到任何与指定类型匹配的数据，则返回空数组。另外，不同的浏览器可能支持不同类型的性能测量数据。因此，在使用 `performance.getEntriesByType()` 函数进行性能测量时，需要根据实际情况进行选择和适配。

#### performance.mark([name[, options]])

`performance.mark([name[, options]])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于设置标记以测量代码执行时间。

在使用 `performance.measure()` 函数进行代码性能测量时，我们通常需要在特定的代码片段中插入起始和结束标记，并通过 `performance.measure()` 函数来计算执行时间。而 `performance.mark()` 函数就是用于设置这些标记的。

举个例子，如果我们需要在测试中使用多个标记来评估代码的不同执行阶段，并计算它们的执行时间，可以按照如下方式使用 `performance.mark()` 函数：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  performance.mark("start");
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}
  performance.mark("middle");
  // 继续编写要测试的代码...
  for (let j = 0; j < 10000000; j++) {}
  performance.mark("end");
}

myFunction();
```

这里的 `performance.mark()` 将设置三个性能测量标记：`start`、`middle` 和 `end`。这些标记将用于后续的性能测量，并帮助我们更好地了解代码的执行情况。

需要注意的是，`performance.mark()` 函数还接受一个可选参数 `options`，用于指定标记的详细信息，例如时间戳或者命名空间等。如果没有指定选项，则会使用默认值。此外，不同的浏览器可能支持不同类型的选项。因此，在使用 `performance.mark()` 函数进行性能测量时，需要根据实际情况进行选择和适配。

#### performance.markResourceTiming(timingInfo, requestedUrl, initiatorType, global, cacheMode)

`performance.markResourceTiming(timingInfo, requestedUrl, initiatorType, global, cacheMode)` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于设置资源计时信息。

在 Web 应用程序中，资源请求通常是比较耗时的操作，例如图片、脚本、样式表等。为了更好地了解这些资源的加载时间和性能瓶颈，我们可以使用 `performance.markResourceTiming()` 函数来设置资源计时信息。

举个例子，如果我们需要在测试中测量特定资源的加载时间，并输出到控制台，可以按照如下方式使用 `performance.markResourceTiming()` 函数：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  // 加载要测试的资源...
  const img = new Image();
  img.src = "test.png";

  // 等待资源加载完成...
  img.onload = function () {
    const timingInfo = {
      startTime: performance.now(),
      duration: performance.now() - timingInfo.startTime,
      name: requestedUrl,
      entryType: "resource",
      initiatorType: initiatorType,
      nextHopProtocol: global ? "http/2" : "http/1.1",
      workerStart: 0,
      redirectStart: 0,
      redirectEnd: 0,
      fetchStart: timingInfo.startTime,
      domainLookupStart: timingInfo.startTime,
      domainLookupEnd: timingInfo.startTime + Math.random() * 100,
      connectStart: timingInfo.startTime + Math.random() * 200,
      connectEnd: timingInfo.startTime + Math.random() * 300,
      secureConnectionStart: 0,
      requestStart: timingInfo.startTime + Math.random() * 400,
      responseStart: timingInfo.startTime + Math.random() * 500,
      responseEnd: timingInfo.startTime + Math.random() * 600,
      transferSize: 1024,
      encodedBodySize: 10240,
      decodedBodySize: 20480,
      serverTiming: [],
      toJSON() {},
    };

    performance.markResourceTiming(timingInfo);
    console.log(`${requestedUrl} 的加载时间为 ${timingInfo.duration} 毫秒`);
  };
}

myFunction();
```

这里的 `performance.markResourceTiming()` 将设置特定资源的计时信息，并通过输出到控制台。

需要注意的是，`performance.markResourceTiming()` 函数接受多个参数，包括计时信息、请求 URL、请求类型、全局标识符和缓存模式等。其中，计时信息是必需的参数，它包含了资源的各种加载时间和属性信息。此外，不同的浏览器可能支持不同类型的计时信息。因此，在使用 `performance.markResourceTiming()` 函数进行性能测量时，需要根据实际情况进行选择和适配。

#### performance.measure(name[, startMarkOrOptions[, endMark]])

`performance.measure(name[, startMarkOrOptions[, endMark]])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于测量代码执行时间。

在进行性能优化时，我们通常需要测量不同代码片段的执行时间。为了方便测量和比较，可以使用 `performance.mark()` 函数设置起始和结束标记，并通过 `performance.measure()` 函数计算它们之间的执行时间。

举个例子，如果我们需要在测试中测量两个代码片段的执行时间，并输出到控制台，可以按照如下方式使用 `performance.measure()` 函数：

```javascript
const { performance } = require("perf_hooks");

function myFunction() {
  // 在这里编写要测试的代码...
  for (let i = 0; i < 100000000; i++) {}

  performance.measure("代码执行时间", "start", "end");
  const duration = performance.getEntriesByName("代码执行时间")[0].duration;
  console.log(`代码执行时间为 ${duration} 毫秒`);
}

performance.mark("start");
myFunction();
performance.mark("end");
```

这里的 `performance.measure()` 将测量起始标记 `start` 和结束标记 `end` 之间的执行时间，并将其命名为 `代码执行时间`。然后，我们通过 `performance.getEntriesByName()` 函数获取该名称的性能测量结果，并输出到控制台。

需要注意的是，`performance.measure()` 函数还接受可选参数 `options`，用于指定测量模式和精度等。如果未指定选项，则会使用默认值。此外，不同的浏览器可能支持不同类型的选项。因此，在使用 `performance.measure()` 函数进行性能测量时，需要根据实际情况进行选择和适配。

#### performance.nodeTiming

`performance.nodeTiming` 是 Node.js 中 `perf_hooks` 模块提供的一个属性，用于获取当前进程的性能计时信息。

在 Node.js 应用程序中，除了测量代码执行时间外，还可以测量整个进程的启动时间、事件循环等待时间、资源加载时间等。这些性能计时信息都可以通过 `performance.nodeTiming` 属性来获取。

举个例子，如果我们需要在测试中获取当前进程的性能计时信息，并输出到控制台，可以按照如下方式使用 `performance.nodeTiming`：

```javascript
const { performance } = require("perf_hooks");

console.log(`Node.js 运行时间为 ${performance.nodeTiming.bootTime} 毫秒`);
console.log(`事件循环等待时间为 ${performance.nodeTiming.loopWait} 毫秒`);
console.log(`HTTP 请求总数为 ${performance.nodeTiming.httpCount}`);
```

这里的 `performance.nodeTiming` 将返回当前进程的性能计时信息对象，包括进程启动时间、事件循环等待时间、HTTP 请求总数等。然后我们通过访问对象的属性来获取相应的信息，并输出到控制台。

需要注意的是，`performance.nodeTiming` 属性只能在 Node.js 环境中使用，不适用于浏览器环境。此外，在使用 `performance.nodeTiming` 属性获取性能计时信息时，需要了解不同版本的 Node.js 可能会支持不同类型的计时信息，因此需要根据实际情况进行选择和适配。

#### performance.now()

`performance.now()` 是浏览器和 Node.js 中的一个函数，用于获取当前时间戳，通常用于测量代码的执行时间。

在进行性能优化时，我们需要了解不同代码片段的执行时间。为了方便测量和比较，可以使用 `performance.now()` 函数获取当前时间戳，并通过计算两个时间戳之间的差值来计算执行时间。

举个例子，在 Node.js 环境中，如果我们需要测量一段代码的执行时间，并输出到控制台，可以按照如下方式使用 `performance.now()`：

```javascript
const { performance } = require("perf_hooks");

const start = performance.now();

// 在这里编写要测试的代码...
for (let i = 0; i < 100000000; i++) {}

const end = performance.now();
const duration = end - start;
console.log(`代码执行时间为 ${duration} 毫秒`);
```

这里的 `performance.now()` 将获取当前时间戳作为起始时间，然后在代码执行结束后再次调用该函数获取当前时间戳作为结束时间，最后计算两个时间戳的差值并输出到控制台。

需要注意的是，`performance.now()` 函数返回的时间戳精度很高，一般为微秒级别。此外，不同的浏览器和操作系统可能会有不同的精度和准确度。因此，在使用 `performance.now()` 函数测量代码执行时间时，需要进行适量的误差处理和正确性校验。

#### performance.setResourceTimingBufferSize(maxSize)

`performance.setResourceTimingBufferSize(maxSize)` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于设置资源计时信息缓冲区的最大大小。

在 Web 应用程序中，每个资源请求通常都会产生一条计时信息。如果应用程序中的资源请求数量很多，可能会产生大量的计时信息，并将其存储到内存中占用大量空间。为了避免这种情况，可以使用 `performance.setResourceTimingBufferSize()` 函数设置资源计时信息缓冲区的最大大小。

举个例子，如果我们需要在测试中设置资源计时信息缓冲区的最大大小，并输出到控制台，可以按照如下方式使用 `performance.setResourceTimingBufferSize()` 函数：

```javascript
const { performance } = require("perf_hooks");

performance.setResourceTimingBufferSize(500);
console.log(
  `资源计时信息缓冲区的最大大小为 ${
    performance.getEntriesByType("resource").length
  }`
);
```

这里的 `performance.setResourceTimingBufferSize()` 将设置资源计时信息缓冲区的最大大小为 500 条。然后，我们通过 `performance.getEntriesByType()` 函数获取已经缓存的资源计时信息，并输出到控制台。

需要注意的是，`performance.setResourceTimingBufferSize()` 函数只能在 Node.js 环境中使用，不适用于浏览器环境。此外，在设置资源计时信息缓冲区的最大大小时，需要根据实际情况进行选择和适配。如果设置的最大大小过小，则可能无法缓存所有的资源计时信息；如果设置过大，则可能会占用过多的内存空间。因此，在使用 `performance.setResourceTimingBufferSize()` 函数时，需要进行适量的精细调整。

#### performance.timeOrigin

`performance.timeOrigin` 是浏览器和 Node.js 中的一个属性，用于获取文档或进程开始时间的时间戳。

在进行性能优化时，我们需要了解代码执行时间相对于文档或进程开始时间的顺序。为了方便计算和比较，可以使用 `performance.timeOrigin` 属性获取文档或进程开始时间的时间戳，并通过与当前时间戳的差值来计算执行时间。

举个例子，在 Node.js 环境中，如果我们需要计算一段代码的执行时间相对于进程开始时间的偏移量，并输出到控制台，可以按照如下方式使用 `performance.timeOrigin`：

```javascript
const { performance } = require("perf_hooks");

const start = performance.now() - performance.timeOrigin;

// 在这里编写要测试的代码...
for (let i = 0; i < 100000000; i++) {}

const end = performance.now() - performance.timeOrigin;
const duration = end - start;
console.log(`代码执行时间为 ${duration} 毫秒`);
```

这里的 `performance.timeOrigin` 将获取进程开始时间的时间戳作为基准时间，然后在代码执行结束后再次调用 `performance.now()` 函数获取当前时间戳，并减去基准时间得出相对偏移量。最后，我们将两个时间戳的差值作为代码执行时间并输出到控制台。

需要注意的是，`performance.timeOrigin` 属性返回的时间戳精度很高，一般为微秒级别。此外，不同的浏览器和操作系统可能会有不同的精度和准确度。因此，在使用 `performance.timeOrigin` 属性计算执行时间时，需要进行适量的误差处理和正确性校验。

#### performance.timerify(fn[, options])

`performance.timerify(fn[, options])` 是 Node.js 中 `perf_hooks` 模块的一个函数，用于将指定的函数转换为可测量性能的函数。

在进行性能优化时，我们需要了解不同代码片段的执行时间。有些情况下，我们可能需要测量第三方库或框架的函数执行时间。为了方便测量和比较，可以使用 `performance.timerify()` 函数将指定的函数封装成一个新的函数，并对其进行性能测量。

举个例子，如果我们需要测量一个第三方库中的函数执行时间，并输出到控制台，可以按照如下方式使用 `performance.timerify()` 函数：

```javascript
const { performance } = require("perf_hooks");
const fs = require("fs");

const readFile = performance.timerify(fs.readFile);

readFile("test.txt", (err, data) => {
  if (err) throw err;
  console.log(`读取文件所需时间为 ${readFile.duration} 毫秒`);
});
```

这里的 `performance.timerify()` 将封装原始的 `fs.readFile()` 函数，并返回一个新函数 `readFile`。然后，在调用新函数 `readFile()` 时，将自动计算其执行时间并存储在 `duration` 属性中。最后，我们将执行时间输出到控制台。

需要注意的是，`performance.timerify()` 函数返回的新函数与原始函数具有相同的参数和返回值，但会额外计算出函数执行的时间。此外，不同的函数可能需要不同的选项进行适配。因此，在使用 `performance.timerify()` 函数封装函数时，需要进行适量的选项配置和正确性校验。

#### performance.toJSON()

`performance.toJSON()` 是浏览器和 Node.js 中的一个函数，用于将性能计时信息转换为 JSON 格式的对象。

在进行性能优化时，我们需要了解不同代码片段的执行时间。有时候，我们可能需要将测量得到的性能计时信息保存到文件或传输到其他系统中。为了方便序列化和传输，可以使用 `performance.toJSON()` 函数将性能计时信息转换为 JSON 格式的对象。

举个例子，在 Node.js 环境中，如果我们需要将当前进程的性能计时信息转换为 JSON 对象，并输出到控制台，可以按照如下方式使用 `performance.toJSON()`：

```javascript
const { performance } = require("perf_hooks");

// 在这里编写要测试的代码...
for (let i = 0; i < 100000000; i++) {}

console.log(JSON.stringify(performance.toJSON()));
```

这里的 `performance.toJSON()` 将返回当前进程的性能计时信息对象，并通过 `JSON.stringify()` 函数将其转换为 JSON 字符串并输出到控制台。

需要注意的是，`performance.toJSON()` 函数返回的对象包含了大量的性能计时信息，可能会占用较大的内存空间。此外，不同的浏览器和操作系统可能会返回不同类型的性能计时信息。因此，在使用 `performance.toJSON()` 函数转换性能计时信息为 JSON 对象时，需要进行适量的数据处理和正确性校验。

### Class: PerformanceEntry

`PerformanceEntry` 是浏览器和 Node.js 中的一个类，用于表示性能计时信息的条目。

在进行性能优化时，我们需要了解不同代码片段的执行时间和资源使用情况。为了方便获取和处理性能计时信息，可以使用 `PerformanceEntry` 类来表示单个性能计时信息的条目，包括其名称、类型、开始时间、结束时间等属性。

举个例子，在 Node.js 环境中，如果我们需要获取当前进程的所有性能计时信息，并输出到控制台，可以按照如下方式使用 `PerformanceEntry` 类：

```javascript
const { performance } = require("perf_hooks");

// 在这里编写要测试的代码...
for (let i = 0; i < 100000000; i++) {}

const entries = performance.getEntries();
for (const entry of entries) {
  console.log(
    `条目名称：${entry.name}，类型：${entry.entryType}，执行时间：${entry.duration} 毫秒`
  );
}
```

这里的 `performance.getEntries()` 将返回当前进程的所有性能计时信息的条目数组。然后，我们通过 `for...of` 循环遍历每个条目，并输出各个属性值到控制台。

需要注意的是，`PerformanceEntry` 类的属性和方法可能会因不同的浏览器或操作系统而有所不同。在使用 `PerformanceEntry` 类处理性能计时信息时，需要根据具体情况进行适量的数据处理和正确性校验。

#### performanceEntry.detail

`performanceEntry.detail` 是浏览器和 Node.js 中 `PerformanceEntry` 类的一个属性，用于获取性能计时信息的详细信息。

在进行性能优化时，我们需要了解不同代码片段的执行时间和资源使用情况。`PerformanceEntry` 类表示单个性能计时信息的条目，其中包括一些基础属性，如名称、类型、开始时间、结束时间等。此外，`PerformanceEntry` 类还提供了 `detail` 属性，用于获取更详细的性能计时信息。

举个例子，在浏览器环境中，如果我们需要获取第一个性能计时信息的详细信息，并输出到控制台，可以按照如下方式使用 `PerformanceEntry` 类：

```javascript
const entries = performance.getEntries();
if (entries.length > 0) {
  const firstEntry = entries[0];
  console.log(firstEntry.detail);
}
```

这里的 `performance.getEntries()` 将返回当前文档的所有性能计时信息的条目数组。然后，我们通过 `entries[0]` 获取第一个性能计时信息的条目对象，并通过 `firstEntry.detail` 获取其详细信息，最后将其输出到控制台。

需要注意的是，`PerformanceEntry` 类的 `detail` 属性返回的详细信息可能会因不同的浏览器或操作系统而有所不同。在使用 `detail` 属性获取性能计时信息的详细信息时，需要根据具体情况进行适量的数据处理和正确性校验。

#### performanceEntry.duration

`performanceEntry.duration` 是浏览器和 Node.js 中 `PerformanceEntry` 类的一个属性，用于获取性能计时信息的执行时间。

在进行性能优化时，我们需要了解不同代码片段的执行时间。`PerformanceEntry` 类表示单个性能计时信息的条目，其中包括一些基础属性，如名称、类型、开始时间、结束时间等。其中最常用的属性是 `duration`，用于获取性能计时信息的执行时间。

举个例子，在浏览器环境中，如果我们需要获取第一个性能计时信息的执行时间，并输出到控制台，可以按照如下方式使用 `PerformanceEntry` 类：

```javascript
const entries = performance.getEntries();
if (entries.length > 0) {
  const firstEntry = entries[0];
  console.log(`执行时间为 ${firstEntry.duration} 毫秒`);
}
```

这里的 `performance.getEntries()` 将返回当前文档的所有性能计时信息的条目数组。然后，我们通过 `entries[0]` 获取第一个性能计时信息的条目对象，并通过 `firstEntry.duration` 获取其执行时间，最后将其输出到控制台。

需要注意的是，`PerformanceEntry` 类的 `duration` 属性返回的执行时间可能会因不同的浏览器或操作系统而有所不同。在使用 `duration` 属性获取性能计时信息的执行时间时，需要根据具体情况进行适量的数据处理和正确性校验。

#### performanceEntry.entryType

`performanceEntry.entryType` 是浏览器和 Node.js 中 `PerformanceEntry` 类的一个属性，用于表示性能计时信息的类型。

在进行性能优化时，我们需要了解不同代码片段的执行时间和资源使用情况。`PerformanceEntry` 类表示单个性能计时信息的条目，其中包括一些基础属性，如名称、类型、开始时间、结束时间等。其中有一项常用的属性是 `entryType`，用于表示性能计时信息的类型。

举个例子，在浏览器环境中，如果我们需要获取当前文档的所有性能计时信息的类型，并输出到控制台，可以按照如下方式使用 `PerformanceEntry` 类：

```javascript
const entries = performance.getEntries();
for (const entry of entries) {
  console.log(`条目名称：${entry.name}，类型：${entry.entryType}`);
}
```

这里的 `performance.getEntries()` 将返回当前文档的所有性能计时信息的条目数组。然后，我们通过 `for...of` 循环遍历每个条目，并输出其名称和类型属性值到控制台。

需要注意的是，`PerformanceEntry` 类的 `entryType` 属性表示性能计时信息的类型，可能会因不同的浏览器或操作系统而有所不同。在使用 `entryType` 属性处理性能计时信息时，需要根据具体情况进行适量的数据处理和正确性校验。

#### performanceEntry.flags

`performanceEntry.flags` 是浏览器和 Node.js 中 `PerformanceEntry` 类的一个属性，用于表示性能计时信息的标志位。

在进行性能优化时，我们需要了解不同代码片段的执行时间和资源使用情况。`PerformanceEntry` 类表示单个性能计时信息的条目，其中包括一些基础属性，如名称、类型、开始时间、结束时间等。其中有一项常用的属性是 `flags`，用于表示性能计时信息的标志位。

举个例子，在浏览器环境中，如果我们需要获取第一个性能计时信息的标志位，并输出到控制台，可以按照如下方式使用 `PerformanceEntry` 类：

```javascript
const entries = performance.getEntries();
if (entries.length > 0) {
  const firstEntry = entries[0];
  console.log(`标志位为 ${firstEntry.flags}`);
}
```

这里的 `performance.getEntries()` 将返回当前文档的所有性能计时信息的条目数组。然后，我们通过 `entries[0]` 获取第一个性能计时信息的条目对象，并通过 `firstEntry.flags` 获取其标志位，最后将其输出到控制台。

需要注意的是，`PerformanceEntry` 类的 `flags` 属性表示性能计时信息的标志位，可能会因不同的浏览器或操作系统而有所不同。在使用 `flags` 属性处理性能计时信息时，需要根据具体情况进行适量的数据处理和正确性校验。

#### performanceEntry.name

`performanceEntry.name` 是浏览器和 Node.js 中 `PerformanceEntry` 类的一个属性，用于表示性能计时信息的名称。

在进行性能优化时，我们需要了解不同代码片段的执行时间和资源使用情况。`PerformanceEntry` 类表示单个性能计时信息的条目，其中包括一些基础属性，如名称、类型、开始时间、结束时间等。其中有一项常用的属性是 `name`，用于表示性能计时信息的名称。

举个例子，在浏览器环境中，如果我们需要获取当前文档的所有性能计时信息的名称，并输出到控制台，可以按照如下方式使用 `PerformanceEntry` 类：

```javascript
const entries = performance.getEntries();
for (const entry of entries) {
  console.log(`条目名称：${entry.name}，类型：${entry.entryType}`);
}
```

这里的 `performance.getEntries()` 将返回当前文档的所有性能计时信息的条目数组。然后，我们通过 `for...of` 循环遍历每个条目，并输出其名称和类型属性值到控制台。

需要注意的是，`PerformanceEntry` 类的 `name` 属性表示性能计时信息的名称，可能会因不同的浏览器或操作系统而有所不同。在使用 `name` 属性处理性能计时信息时，需要根据具体情况进行适量的数据处理和正确性校验。

#### performanceEntry.kind

在 Node.js 中，performanceEntry.kind 是性能条目的类型。它用于表示性能信息的类别，例如测量的资源类型或计时器类型。

具体来说，performanceEntry.kind 可以有以下几种类型：

1. "mark"：表示一个时间戳标记，用于记录事件在代码执行期间发生的时间。
2. "measure"：表示两个时间戳之间的时间差，通常用于测量代码执行时间或网络请求延迟等。
3. "navigation"：表示页面导航的相关信息，包括重定向时间、DNS 解析时间、TCP 握手时间等。
4. "resource"：表示加载网页所需资源（如图片、CSS、JavaScript 文件等）的相关信息，包括下载时间、传输大小等。
5. "paint"：表示页面可视化部分的时间，即首次渲染和绘制相关信息。
6. "frame"：表示帧率以及与页面渲染相关的其他信息。

通过使用 performanceEntry.kind 属性，您可以获取有关性能数据的更多详细信息，并对其进行分类和分析。例如，可以使用此属性来获取一组特定类型的性能度量，然后将其汇总并进行比较，以找出潜在的瓶颈或优化机会。

#### performanceEntry.startTime

在 Node.js 中，performanceEntry.startTime 是性能条目的开始时间。它指示了执行特定操作的起始时间。 具体来说，startTime 属性表示从性能测量开始到记录当前条目的开始时间所经过的毫秒数（以浮点数形式表示），通常用于测量代码执行时间、网络请求延迟等。

例如，如果您想测试某个函数执行所需的时间，可以在函数的开头调用 performance.now()方法获取当前时间戳，并将其保存为“t0”。然后，在函数结束时再次调用该方法，并将结果与“t0”相减，即可得到函数的执行时间。

```JavaScript
const startTime = performance.now();
// 执行一些操作...
const endTime = performance.now();
const elapsedTime = endTime - startTime;
console.log(`执行时间：${elapsedTime} 毫秒`);
```

startTime 属性还可以与其他性能度量一起使用，例如资源加载时间或帧率统计，以便更全面地了解应用程序的性能状况。

### Class: PerformanceNodeTiming

在 Node.js 中，PerformanceNodeTiming 是一个内置的类，用于提供有关性能测量的信息。该类在 Node.js 中为性能分析器收集数据提供了高精度的时间戳。

它可以通过调用`performance.timing`来访问，该对象包含有关当前网页性能的各种指标，如重定向时间、DNS 解析时间、TCP 连接时间和文档加载完成时间等。

下面是一些 PerformanceNodeTiming 类的属性：

- `navigationStart`: 浏览器检索文档的时间戳
- `dnsLookupTime`: DNS 查询所花费的时间
- `tcpConnectionTime`: 建立 TCP 连接所花费的时间
- `secureConnectionTime`: 安全的传输层协议（TLS）连接花费的时间
- `requestTime`: 服务器处理 HTTP 请求并返回响应所花费的时间
- `responseTime`: 浏览器接收到第一个字节的时间戳
- `domLoadingTime`: 解析文档的时间戳
- `domInteractiveTime`: 文档准备好与用户进行交互的时间戳
- `domContentLoadedTime`: DOM 树完成加载但外部资源仍在加载的时间戳
- `loadTime`: 文档完全加载并所有资源（如图片、CSS、JS 文件）都已显示的时间戳

使用这些属性，您可以分析网站的性能并识别潜在的瓶颈，以改进用户体验。

#### performanceNodeTiming.bootstrapComplete

在 Node.js 中，performanceNodeTiming.bootstrapComplete 是 PerformanceNodeTiming 类的一个布尔类型属性。

当它被设置为 true 时，表示 Node.js 的引导程序已经完成。

引导程序是指 Node.js 启动过程中必须完成的一系列操作，包括加载内置模块、解析命令行参数、创建全局对象等等。bootstrapComplete 属性用于跟踪这些操作是否已经完成，并且通常用于性能分析和调试。

例如，在某些情况下，您可能想要比较不同版本的 Node.js 的启动时间。可以使用`performance.timing`对象来获取开始加载 Node.js 和 Node.js 加载完成之间的时间差，并使用`performanceNodeTiming.bootstrapComplete`属性来判断 Node.js 的启动程序是否已经完成。如果是，则表示 Node.js 已经准备好开始处理请求。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.bootstrapComplete`属性：

```javascript
const { performance } = require("perf_hooks");

// 获取Node.js的启动时间
const start = performance.now();

// 加载其他模块和执行其他操作

// 检查bootstrapComplete属性
if (performanceNodeTiming.bootstrapComplete) {
  const end = performance.now();
  console.log(`Node.js启动时间: ${end - start}毫秒`);
}
```

在上面的代码中，我们首先使用`performance.now()`获取开始加载 Node.js 的时间戳。然后，我们加载其他模块和执行其他操作，最后检查`performanceNodeTiming.bootstrapComplete`属性是否为真。如果是，则表示 Node.js 已经准备好开始处理请求，并且我们可以计算出 Node.js 的启动时间。

#### performanceNodeTiming.environment

在 Node.js 中，performanceNodeTiming.environment 是 PerformanceNodeTiming 类的一个字符串类型属性。

它用于描述 Node.js 的执行环境，例如操作系统、CPU 架构和 Node.js 版本等信息。这些信息通常用于性能分析和调试。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.environment`属性：

```javascript
const { performance } = require("perf_hooks");

// 获取执行环境的信息
const environment = performanceNodeTiming.environment;

console.log(`当前执行环境: ${environment}`);
```

在上面的代码中，我们首先获取了执行环境的信息，然后将其输出到控制台。执行环境信息可能包括操作系统名称、版本号、CPU 架构和 Node.js 版本等。

例如，您可能会看到类似以下的输出：

```
当前执行环境: Windows_NT 10.0.19042 x64 Node.js v16.13.1
```

其中，`Windows_NT 10.0.19042 x64`表示操作系统为 Windows，版本号为 10.0.19042，CPU 架构为 x64；`Node.js v16.13.1`表示 Node.js 的版本为 v16.13.1。这些信息可以帮助您识别问题并进行调试，例如，如果问题只在特定操作系统上出现，您可以根据执行环境信息来判断问题所在。

#### performanceNodeTiming.idleTime

在 Node.js 中，performanceNodeTiming.idleTime 是 PerformanceNodeTiming 类的一个数字类型属性。

它表示 CPU 处于空闲状态的时间量，以毫秒为单位。这个属性通常用于性能分析和调试，以帮助您识别前端和后端代码执行期间的瓶颈。

例如，在某些情况下，您可能会发现 Node.js 应用程序在执行计算密集型任务时表现不佳，占用了大量的 CPU 时间。在这种情况下，您可以使用`performanceNodeTiming.idleTime`来评估 CPU 何时处于空闲状态，并可能通过重新安排代码执行顺序来优化性能。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.idleTime`属性：

```javascript
const { performance } = require("perf_hooks");

// 执行一些计算密集型任务
function fibonacci(num) {
  if (num <= 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

const start = performance.now();

// 计算前40个斐波那契数列
fibonacci(40);

const end = performance.now();

console.log(`计算时间: ${end - start}毫秒`);
console.log(`CPU空闲时间: ${performanceNodeTiming.idleTime}毫秒`);
```

在上面的代码中，我们首先定义了一个计算斐波那契数列的函数。然后，我们使用`performance.now()`获取开始计算的时间戳，计算前 40 个斐波那契数列，再次使用`performance.now()`获取结束计算的时间戳。最后，我们输出计算时间和 CPU 空闲时间到控制台。

如果您在计算斐波那契数列时发现 CPU 占用率很高，那么可以通过检查`performanceNodeTiming.idleTime`属性是否在某些时间段内增加来确认 CPU 是否处于空闲状态。如果是，则可能需要对代码进行优化或重构，以使其更有效地利用 CPU 资源。

#### performanceNodeTiming.loopExit

在 Node.js 中，performanceNodeTiming.loopExit 是 PerformanceNodeTiming 类的一个数字类型属性。

它表示事件循环退出时的时间戳，以毫秒为单位。这个属性通常用于性能分析和调试，以帮助您识别事件循环处理事件的速度是否足够快，并且是否需要进行优化。

事件循环是 Node.js 执行 I/O 密集型任务的关键部分，它通过不断地从事件队列中获取并处理事件来驱动应用程序。`performanceNodeTiming.loopExit`属性记录了事件循环完成所有工作后退出的时间点。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.loopExit`属性：

```javascript
const { performance } = require("perf_hooks");

// 设置一个简单的定时器
setTimeout(() => {
  console.log("定时器已经执行");
}, 1000);

// 等待事件循环结束
setImmediate(() => {
  console.log(`事件循环退出时间: ${performanceNodeTiming.loopExit}毫秒`);
});
```

在上面的代码中，我们首先设置了一个简单的定时器，它将在 1 秒后执行。然后，我们使用`setImmediate()`等待事件循环结束，并输出`performanceNodeTiming.loopExit`属性的值到控制台。

如果您发现事件循环退出时间比预期的要长，那么可能需要检查应用程序的代码是否存在阻塞或死循环等问题，并尝试通过优化代码或使用异步编程技术来改进性能。

#### performanceNodeTiming.loopStart

在 Node.js 中，performanceNodeTiming.loopStart 是 PerformanceNodeTiming 类的一个数字类型属性。

它表示事件循环开始时的时间戳，以毫秒为单位。这个属性通常用于性能分析和调试，以帮助您识别事件循环处理事件的速度是否足够快，并且是否需要进行优化。

事件循环是 Node.js 执行 I/O 密集型任务的关键部分，它通过不断地从事件队列中获取并处理事件来驱动应用程序。`performanceNodeTiming.loopStart`属性记录了事件循环开始处理事件的时间点。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.loopStart`属性：

```javascript
const { performance } = require("perf_hooks");

// 设置一个简单的定时器
setTimeout(() => {
  console.log("定时器已经执行");
}, 1000);

// 等待事件循环开始
setImmediate(() => {
  console.log(`事件循环开始时间: ${performanceNodeTiming.loopStart}毫秒`);
});
```

在上面的代码中，我们首先设置了一个简单的定时器，它将在 1 秒后执行。然后，我们使用`setImmediate()`等待事件循环开始，并输出`performanceNodeTiming.loopStart`属性的值到控制台。

如果您发现事件循环开始时间比预期的要晚，那么可能需要检查应用程序的代码是否存在阻塞或死循环等问题，并尝试通过优化代码或使用异步编程技术来改进性能。

#### performanceNodeTiming.nodeStart

在 Node.js 中，performanceNodeTiming.nodeStart 是 PerformanceNodeTiming 类的一个数字类型属性。

它表示 Node.js 启动时的时间戳，以毫秒为单位。这个属性通常用于性能分析和调试，以帮助您识别 Node.js 应用程序的启动时间，并评估优化性能的效果。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.nodeStart`属性：

```javascript
const { performance } = require("perf_hooks");

// 获取Node.js启动时间
const nodeStart = performanceNodeTiming.nodeStart;

console.log(`Node.js启动时间: ${nodeStart}`);
```

在上面的代码中，我们使用`performanceNodeTiming.nodeStart`属性获取 Node.js 的启动时间，并将其输出到控制台。启动时间可以用来评估您的应用程序是否需要进行优化、重构或基础设施升级等。

例如，如果您发现启动时间较长，则可能需要检查应用程序的依赖项、代码结构、服务器配置等，并尝试通过改进它们来加快启动时间。

#### performanceNodeTiming.v8Start

在 Node.js 中，performanceNodeTiming.v8Start 是 PerformanceNodeTiming 类的一个数字类型属性。

它表示 V8 引擎加载时的时间戳，以毫秒为单位。V8 是 Google 开发的 JavaScript 引擎，用于解释和执行 JavaScript 代码。`performanceNodeTiming.v8Start`属性通常用于性能分析和调试，以帮助您识别 V8 引擎启动时间，并评估优化性能的效果。

以下是一个示例代码，展示了如何使用`performanceNodeTiming.v8Start`属性：

```javascript
const { performance } = require("perf_hooks");

// 获取V8引擎加载时间
const v8Start = performanceNodeTiming.v8Start;

console.log(`V8引擎加载时间: ${v8Start}`);
```

在上面的代码中，我们使用`performanceNodeTiming.v8Start`属性获取 V8 引擎加载的时间戳，并将其输出到控制台。引擎加载时间可以用来评估应用程序的性能，并尝试通过改进依赖项、代码结构等来提高性能。

例如，如果您发现引擎加载时间很长，那么可能需要检查应用程序的依赖项、使用的库或框架等，并尝试通过更新它们或使用更轻量级的替代方案来加快引擎加载时间。

### Class: PerformanceResourceTiming

在 Node.js 中，`PerformanceResourceTiming`是一个内置的 JavaScript 类，它提供了有关网络请求和响应的性能计时信息。

当您使用 HTTP/HTTPS 模块或其他网络相关模块发出请求时，Node.js 会记录该请求的各个阶段的时间戳，并将这些计时信息存储在 `PerformanceResourceTiming` 对象中。通过这些计时信息，您可以分析请求的整个生命周期，包括 DNS 查询、TCP 连接、TLS 握手、请求发送和响应接收等过程。

下面是`PerformanceResourceTiming`类中一些常用的属性和方法：

#### 属性

- `connectStart`：开始建立 TCP 连接的时间戳。
- `secureConnectionStart`：开始 SSL/TLS 握手的时间戳。
- `requestStart`：开始发送请求的时间戳。
- `responseStart`：开始接收响应的时间戳。
- `responseEnd`：完成接收响应的时间戳。

#### 方法

- `toJSON()`：将 `PerformanceResourceTiming` 对象转换为 JSON 格式。

通过查看`PerformanceResourceTiming`对象的属性和方法，您可以获得有关网络请求的详细信息，并对性能进行监测和优化。

#### performanceResourceTiming.workerStart

在 Node.js 中，`performanceResourceTiming.workerStart`是一个`PerformanceResourceTiming`对象的属性，它提供了有关 Web Worker 的性能计时信息。

Web Worker 是一种在后台运行的 JavaScript 线程，它可以执行复杂的计算或长时间运行的任务，而不会阻塞主线程。当您使用 Web Worker 运行脚本时，Node.js 会记录该 Web Worker 的各个阶段的时间戳，并将这些计时信息存储在 `PerformanceResourceTiming` 对象中。

`performanceResourceTiming.workerStart` 属性表示 Web Worker 开始执行的时间戳，即创建并加载 Web Worker 的脚本开始执行的时间。此属性只在 Web Worker 内部可用。

通过检查 `performanceResourceTiming.workerStart` 属性，您可以了解 Web Worker 启动的时间，从而帮助您优化 Web Worker 的性能和效率。

#### performanceResourceTiming.redirectStart

在 Node.js 中，`performanceResourceTiming.redirectStart`是一个`PerformanceResourceTiming`对象的属性，它提供了有关 HTTP 重定向的性能计时信息。

当您使用 HTTP/HTTPS 模块或其他网络相关模块发出请求时，如果服务器返回 HTTP 重定向响应（例如 301、302、307 等），则 Node.js 会记录该请求的各个阶段的时间戳，并将这些计时信息存储在 `PerformanceResourceTiming` 对象中。

`performanceResourceTiming.redirectStart` 属性表示 HTTP 重定向开始的时间戳，即用户发起请求到浏览器接收到重定向响应之间的时间。如果没有发生重定向，则该属性值为 0。

通过检查 `performanceResourceTiming.redirectStart` 属性，您可以了解 HTTP 重定向的时间，从而帮助您识别潜在的性能问题并优化您的 Web 应用程序。

#### performanceResourceTiming.redirectEnd

在 Node.js 中，`performanceResourceTiming.redirectEnd`是一个`PerformanceResourceTiming`对象的属性，它提供了有关 HTTP 重定向的性能计时信息。

当您使用 HTTP/HTTPS 模块或其他网络相关模块发出请求时，如果服务器返回 HTTP 重定向响应（例如 301、302、307 等），则 Node.js 会记录该请求的各个阶段的时间戳，并将这些计时信息存储在 `PerformanceResourceTiming` 对象中。

`performanceResourceTiming.redirectEnd` 属性表示 HTTP 重定向结束的时间戳，即浏览器完成处理重定向响应并将请求发送给新地址的时间。如果没有发生重定向，则该属性值为 0。

通过检查 `performanceResourceTiming.redirectEnd` 属性，您可以了解 HTTP 重定向的时间，从而帮助您识别潜在的性能问题并优化您的 Web 应用程序。

#### performanceResourceTiming.fetchStart

在 Node.js 中，`performanceResourceTiming.fetchStart`是一个`PerformanceResourceTiming`对象的属性，它提供了有关网络请求开始的性能计时信息。

当您使用 HTTP/HTTPS 模块或其他网络相关模块发出请求时，Node.js 会记录该请求的各个阶段的时间戳，并将这些计时信息存储在 `PerformanceResourceTiming` 对象中。

`performanceResourceTiming.fetchStart` 属性表示浏览器准备好使用网络来获取资源的时间戳，即用户在地址栏输入 URL 并按下回车键的时间。如果您在 JavaScript 中使用 fetch API 或 XMLHttpRequest 发出请求，则 `performanceResourceTiming.fetchStart` 属性将是相应请求的开始时间。

通过检查 `performanceResourceTiming.fetchStart` 属性，您可以了解网络请求启动的时间，从而帮助您监测和优化您的 Web 应用程序的性能。

#### performanceResourceTiming.domainLookupStart

`performanceResourceTiming.domainLookupStart`是浏览器性能 API 中的一个属性，它用于衡量浏览器在解析域名时开始的时间。

当你在浏览器地址栏中输入一个网址时，浏览器会首先解析该网址所对应的 IP 地址。这个过程称为 DNS 查找或者域名解析。在这个过程中，浏览器需要向 DNS 服务器发送请求，并等待 DNS 服务器返回响应结果，告诉浏览器该网址对应的 IP 地址是多少。

`performanceResourceTiming.domainLookupStart`属性记录了浏览器开始进行 DNS 查找的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.domainLookupStart`属性来计算 DNS 查找耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
var dnsTime = resourceTiming.domainLookupEnd - resourceTiming.domainLookupStart;
console.log("DNS Lookup Time: " + dnsTime + "ms");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并计算了 DNS 查找耗时。具体地，我们通过`resourceTiming.domainLookupEnd - resourceTiming.domainLookupStart`计算出 DNS 查找的持续时间，并将其输出到控制台。

#### performanceResourceTiming.domainLookupEnd

`performanceResourceTiming.domainLookupEnd`是浏览器性能 API 中的一个属性，它用于衡量浏览器在解析域名时结束的时间。

当你在浏览器地址栏中输入一个网址时，浏览器会首先解析该网址所对应的 IP 地址。这个过程称为 DNS 查找或者域名解析。在这个过程中，浏览器需要向 DNS 服务器发送请求，并等待 DNS 服务器返回响应结果，告诉浏览器该网址对应的 IP 地址是多少。

`performanceResourceTiming.domainLookupEnd`属性记录了浏览器完成 DNS 查找的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.domainLookupEnd`属性来计算 DNS 查找耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
var dnsTime = resourceTiming.domainLookupEnd - resourceTiming.domainLookupStart;
console.log("DNS Lookup Time: " + dnsTime + "ms");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并计算了 DNS 查找耗时。具体地，我们通过`resourceTiming.domainLookupEnd - resourceTiming.domainLookupStart`计算出 DNS 查找的持续时间，并将其输出到控制台。

#### performanceResourceTiming.connectStart

`performanceResourceTiming.connectStart`是浏览器性能 API 中的一个属性，它用于衡量浏览器开始建立连接的时间。

当你在浏览器地址栏中输入一个网址时，浏览器会向该网站的服务器发送 HTTP 请求来获取资源。在这个过程中，浏览器需要与服务器建立 TCP 连接，并进行一些握手和协议交换。

`performanceResourceTiming.connectStart`属性记录了浏览器开始建立连接的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.connectStart`属性来计算建立连接的耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
var connectTime = resourceTiming.connectEnd - resourceTiming.connectStart;
console.log("Connect Time: " + connectTime + "ms");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并计算了建立连接的耗时。具体地，我们通过`resourceTiming.connectEnd - resourceTiming.connectStart`计算出连接建立的持续时间，并将其输出到控制台。

#### performanceResourceTiming.connectEnd

`performanceResourceTiming.connectEnd`是浏览器性能 API 中的一个属性，它用于衡量浏览器完成与服务器建立连接的时间。

当你在浏览器地址栏中输入一个网址时，浏览器会向该网站的服务器发送 HTTP 请求来获取资源。在这个过程中，浏览器需要与服务器建立 TCP 连接，并进行一些握手和协议交换。

`performanceResourceTiming.connectEnd`属性记录了浏览器完成与服务器建立连接的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.connectEnd`属性来计算建立连接的耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
var connectTime = resourceTiming.connectEnd - resourceTiming.connectStart;
console.log("Connect Time: " + connectTime + "ms");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并计算了建立连接的耗时。具体地，我们通过`resourceTiming.connectEnd - resourceTiming.connectStart`计算出连接建立的持续时间，并将其输出到控制台。

#### performanceResourceTiming.secureConnectionStart

`performanceResourceTiming.secureConnectionStart`是浏览器性能 API 中的一个属性，它用于衡量浏览器开始建立安全连接的时间。

当你在浏览器地址栏中输入一个网址时，如果该网站启用了 HTTPS 协议，浏览器会在建立 TCP 连接的基础上，再进行一些加密和验证等步骤，以确保通信过程中的安全性和隐私性。

`performanceResourceTiming.secureConnectionStart`属性记录了浏览器开始建立安全连接的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。如果该网站不使用 HTTPS 协议，则`performanceResourceTiming.secureConnectionStart`的值为 0。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.secureConnectionStart`属性来计算建立安全连接的耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
if (resourceTiming.secureConnectionStart) {
  var secureConnectTime =
    resourceTiming.connectEnd - resourceTiming.secureConnectionStart;
  console.log("Secure Connect Time: " + secureConnectTime + "ms");
} else {
  console.log("This website does not use HTTPS protocol.");
}
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并判断该网站是否使用了 HTTPS 协议。如果使用了 HTTPS 协议，则通过`resourceTiming.connectEnd - resourceTiming.secureConnectionStart`计算出建立安全连接的持续时间，并将其输出到控制台。否则，输出一条提示信息说明该网站不使用 HTTPS 协议。

#### performanceResourceTiming.requestStart

`performanceResourceTiming.requestStart`是浏览器性能 API 中的一个属性，它用于衡量浏览器开始发送 HTTP 请求的时间。

当你在浏览器地址栏中输入一个网址时，浏览器会向该网站的服务器发送 HTTP 请求来获取资源。在这个过程中，浏览器需要进行一些额外的处理，例如解析 HTTP 请求头部、设置请求参数等等。

`performanceResourceTiming.requestStart`属性记录了浏览器开始发送 HTTP 请求的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.requestStart`属性来计算发送 HTTP 请求的耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
var requestTime = resourceTiming.responseStart - resourceTiming.requestStart;
console.log("Request Time: " + requestTime + "ms");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并计算了发送 HTTP 请求的耗时。具体地，我们通过`resourceTiming.responseStart - resourceTiming.requestStart`计算出 HTTP 请求的持续时间，并将其输出到控制台。

#### performanceResourceTiming.responseEnd

`performanceResourceTiming.responseEnd`是浏览器性能 API 中的一个属性，它用于衡量浏览器完成接收 HTTP 响应的时间。

当你在浏览器地址栏中输入一个网址时，浏览器会向该网站的服务器发送 HTTP 请求来获取资源。在这个过程中，服务器需要进行一些处理，例如读取文件、执行脚本、渲染页面等等，并返回 HTTP 响应给浏览器。

`performanceResourceTiming.responseEnd`属性记录了浏览器完成接收 HTTP 响应的时间点，以毫秒为单位。它的值是一个时间戳，表示从页面开始加载到当前时间的时间差。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.responseEnd`属性来计算接收 HTTP 响应的耗时：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
var responseTime = resourceTiming.responseEnd - resourceTiming.responseStart;
console.log("Response Time: " + responseTime + "ms");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并计算了接收 HTTP 响应的耗时。具体地，我们通过`resourceTiming.responseEnd - resourceTiming.responseStart`计算出 HTTP 响应的持续时间，并将其输出到控制台。

#### performanceResourceTiming.transferSize

`performanceResourceTiming.transferSize`是浏览器性能 API 中的一个属性，它用于衡量浏览器从服务器接收到的资源大小。

当你在浏览器地址栏中输入一个网址时，浏览器会向该网站的服务器发送 HTTP 请求来获取资源。在这个过程中，服务器需要将资源文件发送给浏览器，并且每个资源文件都有自己的大小。

`performanceResourceTiming.transferSize`属性记录了浏览器从服务器接收到的资源大小，以字节为单位。具体地，它是指从服务器接收到的整个响应的字节数，包括响应头和响应体。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.transferSize`属性来获取资源大小：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
console.log("Transfer Size: " + resourceTiming.transferSize + "bytes");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并输出了其传输大小。具体地，我们通过`resourceTiming.transferSize`获取资源传输的大小，并将其输出到控制台。

#### performanceResourceTiming.encodedBodySize

`performanceResourceTiming.encodedBodySize`是浏览器性能 API 中的一个属性，它用于衡量从服务器接收到的资源在传输过程中编码后的大小。

当你在浏览器地址栏中输入一个网址时，浏览器会向该网站的服务器发送 HTTP 请求来获取资源。在这个过程中，服务器需要将资源文件发送给浏览器，并且每个资源文件都有自己的大小。

`performanceResourceTiming.encodedBodySize`属性记录了从服务器接收到的资源在传输过程中编码后的大小，以字节为单位。具体地，它是指从服务器接收到的整个响应的编码后的字节数，包括响应头和响应体。

下面是一个示例代码，展示如何在 JavaScript 中使用`performanceResourceTiming.encodedBodySize`属性来获取编码后的资源大小：

```javascript
var resourceTiming = window.performance.getEntriesByType("resource")[0];
console.log("Encoded Body Size: " + resourceTiming.encodedBodySize + "bytes");
```

在这个例子中，我们使用了`window.performance.getEntriesByType('resource')`方法获取第一个资源的性能数据，并输出了其编码后的大小。具体地，我们通过`resourceTiming.encodedBodySize`获取资源编码后的大小，并将其输出到控制台。

#### performanceResourceTiming.decodedBodySize

在理解`performanceResourceTiming.decodedBodySize`之前，需要先了解 PerformanceResourceTiming 接口。

PerformanceResourceTiming 接口提供了有关浏览器加载和解析资源的性能信息。这些性能数据包括请求开始时间、DNS 查询时间、TCP 连接时间、响应接收时间、资源大小等。它是对每个类型为"resource"的资源依次调用 Performance.getEntries()方法返回的所有 PerformanceEntry 对象进行扩展的。

现在回到`performanceResourceTiming.decodedBodySize`，这是一个 PerformanceResourceTiming 属性，它代表了已经解码的资源大小（以字节为单位）。当浏览器接收到资源时，如果它处于压缩状态（如 gzip），则需要先解压缩才能使用，而`decodedBodySize`就是指解压后的资源大小。

举个例子，如果我们在加载一张图片时，可以通过以下代码获取它的解码后大小：

```javascript
const img = new Image();
img.src = "example.jpg";
img.onload = function () {
  const timing = performance.getEntriesByName("example.jpg")[0];
  const decodedSize = timing.decodedBodySize;
  console.log(`The decoded size of example.jpg is ${decodedSize} bytes`);
};
```

需要注意的是，在某些情况下，该属性可能不可用（例如资源没有被完全下载）。但是，在大多数情况下，可以使用该属性来衡量资源的实际大小并进行优化。

#### performanceResourceTiming.toJSON()

`performanceResourceTiming.toJSON()`是一个用于将 PerformanceResourceTiming 对象转换为 JSON 格式的方法。它返回一个包含该对象所有属性和属性值的 JSON 对象。

PerformanceResourceTiming 对象提供了关于浏览器加载和解析资源的性能信息，例如请求开始时间、DNS 查询时间、TCP 连接时间、响应接收时间、资源大小等。`toJSON()`方法可以将这些性能数据以 JSON 格式呈现，方便进行传输和存储。

以下是一个示例代码，展示如何使用`toJSON()`方法：

```javascript
const performanceEntries = performance.getEntriesByType("resource");
const jsonEntries = performanceEntries.map((entry) => entry.toJSON());
console.log(jsonEntries);
```

在上面的代码中，我们首先使用`getEntriesByType()`方法获取所有类型为"resource"的性能条目，并将其存储在一个数组中。然后，我们使用`map()`方法遍历每个性能条目，调用`toJSON()`方法将其转换为 JSON 格式，并将所有结果存储在另一个数组中。最后，我们打印出转换后的 JSON 对象数组。

需要注意的是，由于某些原因（例如安全和隐私），某些属性可能无法序列化为 JSON 格式。在这种情况下，这些属性将被忽略，不会显示在 JSON 对象中。

### Class: perf_hooks.PerformanceObserver

`perf_hooks.PerformanceObserver`是 Node.js 中的一个内置类，它用于观察和监测应用程序的性能指标，以便进行优化和调试。

通过创建一个`PerformanceObserver`实例，您可以监听多种性能事件，例如资源加载时间、函数执行时间、网络延迟等。当这些事件发生时，`PerformanceObserver`会将相关的性能数据捕获并发送给您的回调函数。

以下是一个示例代码，展示如何使用`PerformanceObserver`来监测函数执行时间：

```javascript
const { PerformanceObserver, performance } = require("perf_hooks");

function expensiveFunction() {
  // 需要耗费大量时间的操作
  for (let i = 0; i < 100000000; i++) {}
}

const obs = new PerformanceObserver((list) => {
  console.log(
    `The function took ${
      list.getEntries()[0].duration
    } milliseconds to execute.`
  );
  obs.disconnect();
});

obs.observe({ entryTypes: ["function"] });

performance.mark("start");
expensiveFunction();
performance.mark("end");
performance.measure("function execution time", "start", "end");
```

在上面的代码中，我们首先创建了一个`PerformanceObserver`实例，并将其绑定到一个回调函数上。回调函数会在符合条件的性能事件被触发时被调用，并接收一个包含所有性能数据的`PerformanceObserverEntryList`对象作为参数。在回调函数中，我们可以从`entryList`对象中获取所需的性能指标。

然后，我们调用`observe()`方法，指定需要监测的性能类型为"function"。接着，我们使用`performance.mark()`方法创建两个性能标记，分别代表函数执行的开始和结束时间。最后，我们使用`performance.measure()`方法计算函数执行的时间，并将结果发送给`PerformanceObserver`的回调函数进行处理。

请注意，在上面的示例中，我们只监测了一个函数的执行时间。在实际的应用程序中，您可能需要监测更复杂的性能指标（例如网络延迟、渲染时间等），并使用`PerformanceObserver`来实时获取相关的性能数据。

#### PerformanceObserver.supportedEntryTypes

`PerformanceObserver.supportedEntryTypes`是一个静态属性，它返回一个数组，包含当前环境支持的所有性能条目类型。

`PerformanceObserver`是 Node.js 中的一个内置类，用于观测和监控应用程序的性能指标。有许多不同类型的性能条目可以监测，例如资源加载时间、函数执行时间、网络延迟等等。但是，并非所有类型的性能条目都适用于所有环境。

通过访问`supportedEntryTypes`属性，您可以获取当前环境支持的所有性能条目类型。以下是一个示例代码，展示如何使用该属性：

```javascript
const { PerformanceObserver } = require("perf_hooks");

const supportedTypes = PerformanceObserver.supportedEntryTypes;
console.log(
  `This environment supports the following performance entry types: ${supportedTypes.join(
    ", "
  )}`
);
```

在上面的代码中，我们首先导入了`PerformanceObserver`类。然后，我们使用类名直接访问其静态属性`supportedEntryTypes`，将其赋值给一个变量。最后，我们打印出支持的性能条目类型列表，以逗号分隔。

需要注意的是，不同的环境可能支持的性能条目类型有所不同。在 Web 浏览器中，通常支持"resource"、"mark"、"measure"等类型的性能条目。而在 Node.js 环境中，则可能会支持更多的性能条目类型，例如"gc"（垃圾回收）和"function"（函数执行时间）。因此，在实际使用中，建议先检查当前环境支持哪些性能条目类型，再选择合适的类型来进行监测和优化。

#### new PerformanceObserver(callback)

`new PerformanceObserver(callback)`是一个用于创建`PerformanceObserver`实例的构造函数。它接收一个回调函数作为参数，该回调函数会在符合条件的性能事件被触发时被调用。

`PerformanceObserver`是 Node.js 中的一个内置类，用于观测和监测应用程序的性能指标。您可以使用`PerformanceObserver`来监听多种性能事件，例如资源加载时间、函数执行时间、网络延迟等。当这些事件发生时，`PerformanceObserver`会将相关的性能数据捕获并发送给您的回调函数。

以下是一个示例代码，展示如何使用`new PerformanceObserver(callback)`方法：

```javascript
const { PerformanceObserver, performance } = require("perf_hooks");

function callback(list, observer) {
  console.log(
    `The first resource took ${
      list.getEntries()[0].duration
    } milliseconds to load.`
  );
  observer.disconnect();
}

const obs = new PerformanceObserver(callback);
obs.observe({ entryTypes: ["resource"] });

performance.mark("start");
fetch("https://example.com/resource").then(() => {
  performance.mark("end");
  performance.measure("resource load time", "start", "end");
});
```

在上面的代码中，我们首先定义了一个回调函数`callback()`，它会在符合条件的性能事件被触发时被调用，并打印出资源加载时间。然后，我们创建了一个`PerformanceObserver`实例并将其绑定到回调函数上。接着，我们调用`observe()`方法，并指定需要监测的性能类型为"resource"。最后，我们使用`fetch()`方法异步加载资源，并在加载完成后使用`performance.mark()`和`performance.measure()`方法记录性能数据，并发送给`PerformanceObserver`实例进行处理。

需要注意的是，在上面的示例中，我们只监测了一个资源的加载时间。在实际的应用程序中，您可能需要监测更复杂的性能指标（例如函数执行时间、网络延迟等），并使用`PerformanceObserver`来实时获取相关的性能数据。

#### performanceObserver.disconnect()

`performanceObserver.disconnect()`是一个用于断开`PerformanceObserver`实例与回调函数之间绑定关系的方法。一旦调用了该方法，`PerformanceObserver`实例将不再触发任何回调函数。

`PerformanceObserver`是 Node.js 中的一个内置类，用于观测和监测应用程序的性能指标。有许多不同类型的性能条目可以监测，例如资源加载时间、函数执行时间、网络延迟等等。您可以使用`PerformanceObserver`来监听这些性能事件，并在事件被触发时进行处理。

通常情况下，在创建`PerformanceObserver`实例时，您需要将其绑定到一个回调函数上，以便在符合条件的性能事件被触发时进行处理。但是，在某些情况下，您可能需要在特定时间点断开`PerformanceObserver`实例与回调函数之间的绑定关系，以停止接收性能事件和数据。这时，就可以使用`disconnect()`方法来完成此操作。

以下是一个示例代码，展示如何使用`disconnect()`方法：

```javascript
const { PerformanceObserver, performance } = require("perf_hooks");

function callback(list, observer) {
  console.log(
    `The first resource took ${
      list.getEntries()[0].duration
    } milliseconds to load.`
  );
  observer.disconnect();
}

const obs = new PerformanceObserver(callback);
obs.observe({ entryTypes: ["resource"] });

performance.mark("start");
fetch("https://example.com/resource").then(() => {
  performance.mark("end");
  performance.measure("resource load time", "start", "end");
});
```

在上面的代码中，我们首先创建了一个`PerformanceObserver`实例，并将其绑定到一个回调函数上。然后，我们调用`observe()`方法开始监听"resource"类型的性能事件。接着，我们异步加载了一个资源，并在加载完成后记录性能数据并发送给`PerformanceObserver`实例进行处理。最后，在回调函数中，我们使用`disconnect()`方法断开了`PerformanceObserver`实例和回调函数之间的绑定关系，以停止接收性能事件和数据。

需要注意的是，一旦调用了`disconnect()`方法，`PerformanceObserver`实例就不再触发任何回调函数，因此请谨慎使用该方法。

#### performanceObserver.observe(options)

`performanceObserver.observe(options)`是一个用于向`PerformanceObserver`实例中添加性能事件监听器的方法。它接收一个配置对象作为参数，用于指定需要监测的性能类型。

`PerformanceObserver`是 Node.js 中的一个内置类，用于观测和监测应用程序的性能指标。通常情况下，在创建`PerformanceObserver`实例时，您需要将其绑定到一个回调函数上，以便在符合条件的性能事件被触发时进行处理。而要开始监听性能事件，则需要使用`observe()`方法，并指定需要监测的性能类型。

以下是一个示例代码，展示如何使用`observe()`方法：

```javascript
const { PerformanceObserver, performance } = require("perf_hooks");

function callback(list, observer) {
  console.log(
    `The first resource took ${
      list.getEntries()[0].duration
    } milliseconds to load.`
  );
  observer.disconnect();
}

const obs = new PerformanceObserver(callback);
obs.observe({ entryTypes: ["resource"] });

performance.mark("start");
fetch("https://example.com/resource").then(() => {
  performance.mark("end");
  performance.measure("resource load time", "start", "end");
});
```

在上面的代码中，我们首先创建了一个`PerformanceObserver`实例，并将其绑定到一个回调函数上。然后，我们调用`observe()`方法开始监听"resource"类型的性能事件。接着，我们异步加载了一个资源，并在加载完成后记录性能数据并发送给`PerformanceObserver`实例进行处理。最后，在回调函数中，我们使用`disconnect()`方法断开了`PerformanceObserver`实例和回调函数之间的绑定关系，以停止接收性能事件和数据。

需要注意的是，在调用`observe()`方法之前，请确保已经创建了`PerformanceObserver`实例，并将其绑定到了一个回调函数上。此外，不同类型的性能条目对应着不同的字符串值，例如"resource"、"mark"、"measure"等等。在使用`observe()`方法时，请确保指定了正确的性能类型。

### Class: PerformanceObserverEntryList

`PerformanceObserverEntryList`是一个类，用于表示一组符合条件的性能事件记录。

`PerformanceObserver`是 Node.js 中的一个内置类，用于观测和监测应用程序的性能指标。当发生符合条件的性能事件时，`PerformanceObserver`会将相关的性能数据捕获并发送给回调函数进行处理。在回调函数中，您可以使用`PerformanceObserverEntryList`类来访问这些性能数据。

以下是一个示例代码，展示如何使用`PerformanceObserverEntryList`类：

```javascript
const { PerformanceObserver, performance } = require('perf_hooks');

function callback(list, observer) {
  const entries = list.getEntries();
  console.log(`There are ${entries.length} resource load events.`);
  for (const entry of entries) {
    console.log(`Resource ${entry.name} took ${entry.duration} milliseconds to load.`);
  }
}

const obs = new PerformanceObserver(callback);
obs.observe({ entryTypes: ['resource'] });

performance.mark('start');
fetch('https://example.com/resource1')
  .then(() => performance.mark('end'))
  .then(() => performance.measure('resource1 load time', 'start', 'end'));

performance.mark('start');
fetch('https://example.com/resource2')
  .then(() => performance.mark('end'))
  .then(() => performance.measure('resource2 load time', 'start', 'end')));
```

在上面的代码中，我们首先创建了一个`PerformanceObserver`实例，并将其绑定到一个回调函数上。然后，我们调用`observe()`方法开始监听"resource"类型的性能事件。接着，我们异步加载了两个资源，并在加载完成后记录性能数据并发送给`PerformanceObserver`实例进行处理。最后，在回调函数中，我们使用`getEntries()`方法获取所有符合条件的性能事件记录，并打印出它们的名称和加载时间。

需要注意的是，每个性能事件记录都包含了大量的数据信息，例如记录名称、开始时间、结束时间、持续时间等等。要访问这些数据，请使用`PerformanceEntry`对象，它是`PerformanceObserverEntryList`类的成员之一。

#### performanceObserverEntryList.getEntries()

`performanceObserverEntryList.getEntries()`是一个用于获取符合条件的性能事件记录的方法。它返回一个数组，包含所有满足`PerformanceObserver`实例指定条件的性能事件记录。

`PerformanceObserver`是 Node.js 中的一个内置类，用于观测和监测应用程序的性能指标。当发生符合条件的性能事件时，`PerformanceObserver`会将相关的性能数据捕获并发送给回调函数进行处理。在回调函数中，您可以使用`PerformanceObserverEntryList`类来访问这些性能数据。

以下是一个示例代码，展示如何使用`getEntries()`方法：

```javascript
const { PerformanceObserver, performance } = require('perf_hooks');

function callback(list, observer) {
  const entries = list.getEntries();
  console.log(`There are ${entries.length} resource load events.`);
  for (const entry of entries) {
    console.log(`Resource ${entry.name} took ${entry.duration} milliseconds to load.`);
  }
}

const obs = new PerformanceObserver(callback);
obs.observe({ entryTypes: ['resource'] });

performance.mark('start');
fetch('https://example.com/resource1')
  .then(() => performance.mark('end'))
  .then(() => performance.measure('resource1 load time', 'start', 'end'));

performance.mark('start');
fetch('https://example.com/resource2')
  .then(() => performance.mark('end'))
  .then(() => performance.measure('resource2 load time', 'start', 'end')));
```

在上面的代码中，我们首先创建了一个`PerformanceObserver`实例，并将其绑定到一个回调函数上。然后，我们调用`observe()`方法开始监听"resource"类型的性能事件。接着，我们异步加载了两个资源，并在加载完成后记录性能数据并发送给`PerformanceObserver`实例进行处理。最后，在回调函数中，我们使用`getEntries()`方法获取所有符合条件的性能事件记录，并打印出它们的名称和加载时间。

需要注意的是，每个性能事件记录都包含了大量的数据信息，例如记录名称、开始时间、结束时间、持续时间等等。要访问这些数据，请使用`PerformanceEntry`对象，它是`PerformanceObserverEntryList`类的成员之一。

#### performanceObserverEntryList.getEntriesByName(name[, type])

`performanceObserverEntryList.getEntriesByName(name[, type])` 方法是 `PerformanceObserverEntryList` 对象的一个方法，用于获取指定名称和类型的性能条目列表。

在 Node.js 中，`PerformanceObserverEntryList` 是性能监视器 API 的一部分，它提供了一种收集和查看有关应用程序性能的信息的方法。这些信息可以用于优化应用程序的性能并解决潜在的性能问题。

此方法接受两个参数：

- `name`: 必需参数，表示要检索的性能条目名称。
- `type`: 可选参数，表示要检索的性能条目类型。如果未指定，则默认为 `"measure"` 类型。

该方法返回一个数组，该数组包含与指定名称和类型匹配的所有性能条目。每个性能条目是一个对象，其中包含有关该条目的各种信息，例如开始时间、结束时间、持续时间等。

以下是一个示例代码，使用 `getEntriesByName` 方法获取名为 `"request"` 的性能条目列表：

```javascript
const { performance } = require("perf_hooks");

const obs = new performance.PerformanceObserver((items) => {
  console.log(items.getEntriesByName("request"));
});

obs.observe({ entryTypes: ["measure"] });

performance.mark("start_request");
// Perform request here
performance.mark("end_request");
performance.measure("request", "start_request", "end_request");
```

在上面的示例中，我们首先创建了一个 `PerformanceObserver` 实例，并将其观察到 `"measure"` 类型的性能条目。然后，我们使用 `mark` 方法标记了请求开始和结束时的时间戳，并使用 `measure` 方法测量了请求的性能。最后，在观察器的回调函数中，我们使用 `getEntriesByName` 方法获取名为 `"request"` 的性能条目列表，并将其打印到控制台上。

#### performanceObserverEntryList.getEntriesByType(type)

`performanceObserverEntryList.getEntriesByType(type)` 方法是 `PerformanceObserverEntryList` 对象的一个方法，用于获取指定类型的性能条目列表。

在 Node.js 中，`PerformanceObserverEntryList` 是性能监视器 API 的一部分，它提供了一种收集和查看有关应用程序性能的信息的方法。这些信息可以用于优化应用程序的性能并解决潜在的性能问题。

此方法接受一个参数：

- `type`: 必需参数，表示要检索的性能条目类型。

该方法返回一个数组，该数组包含与指定类型匹配的所有性能条目。每个性能条目是一个对象，其中包含有关该条目的各种信息，例如开始时间、结束时间、持续时间等。

以下是一个示例代码，使用 `getEntriesByType` 方法获取类型为 `"measure"` 的性能条目列表：

```javascript
const { performance } = require("perf_hooks");

const obs = new performance.PerformanceObserver((items) => {
  console.log(items.getEntriesByType("measure"));
});

obs.observe({ entryTypes: ["measure"] });

performance.mark("start_request");
// Perform request here
performance.mark("end_request");
performance.measure("request", "start_request", "end_request");
```

在上面的示例中，我们首先创建了一个 `PerformanceObserver` 实例，并将其观察到 `"measure"` 类型的性能条目。然后，我们使用 `mark` 方法标记了请求开始和结束时的时间戳，并使用 `measure` 方法测量了请求的性能。最后，在观察器的回调函数中，我们使用 `getEntriesByType` 方法获取类型为 `"measure"` 的性能条目列表，并将其打印到控制台上。

### perf_hooks.createHistogram([options])

`perf_hooks.createHistogram([options])` 方法用于创建一个性能直方图对象，该对象可以用于记录和分析一组值的分布情况。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

该方法接受一个可选参数 `options`，用于配置性能直方图对象的属性。其中，`options` 对象包含以下属性：

- `buckets`: 表示要创建的桶的数量，默认为 100。
- `min`: 表示输入值的最小值，默认为 0。
- `max`: 表示输入值的最大值，默认为 1000。
- `bucketSize`: 表示每个桶的大小，默认为 `(max - min) / buckets`。

该方法返回一个 `Histogram` 对象，它具有以下方法：

- `recordValue(value)`: 用于记录新的值。
- `export()`: 将直方图的当前状态导出为一个包含所有桶及其值的对象。
- `reset()`: 将直方图重置为初始状态。

以下是一个示例代码，演示如何使用 `createHistogram` 方法创建性能直方图并记录一些值：

```javascript
const { createHistogram } = require("perf_hooks");

const histogram = createHistogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.export());
```

在上面的示例中，我们首先使用 `createHistogram` 方法创建了一个性能直方图对象。然后，我们使用 `recordValue` 方法记录了三个不同的值。最后，我们使用 `export` 方法将直方图的当前状态导出为一个对象，并将其打印到控制台上。

### perf_hooks.monitorEventLoopDelay([options])

`perf_hooks.monitorEventLoopDelay([options])` 方法用于创建一个事件循环延迟监视器对象，该对象可以用于记录和分析 Node.js 事件循环的延迟情况。

在 Node.js 中，事件循环是应用程序的核心部分，它负责处理事件、执行异步任务等。出现事件循环延迟可能会导致应用程序响应能力降低或出现其它问题。因此，使用 `monitorEventLoopDelay` 方法可以帮助开发者了解事件循环的性能瓶颈，并优化应用程序的性能。

该方法接受一个可选参数 `options`，用于配置事件循环延迟监视器对象的属性。其中，`options` 对象包含以下属性：

- `resolution`: 表示要检查延迟的时间间隔，默认为 10 毫秒。
- `sampleInterval`: 表示每个样本的持续时间，默认为 resolution 的值的一半。
- `threshold`: 表示延迟的最大限制时间，默认为 32 毫秒。

该方法返回一个 `EventLoopDelayMonitor` 对象，它具有以下方法：

- `enable()`: 启用事件循环延迟监视器。
- `disable()`: 禁用事件循环延迟监视器。
- `ref()`: 在事件循环中添加引用计数器。
- `unref()`: 在事件循环中移除引用计数器。
- `reset()`: 将事件循环延迟监视器重置为初始状态。

以下是一个示例代码，演示如何使用 `monitorEventLoopDelay` 方法创建事件循环延迟监视器并启用它：

```javascript
const { monitorEventLoopDelay } = require("perf_hooks");

const monitor = monitorEventLoopDelay({
  resolution: 20,
  sampleInterval: 100,
  threshold: 50,
});

monitor.enable();

// Execute some code here

monitor.disable();
```

在上面的示例中，我们首先使用 `monitorEventLoopDelay` 方法创建了一个事件循环延迟监视器对象，并配置了一些属性。然后，我们使用 `enable` 方法启用了监视器，并在某些代码段中执行了一些操作。最后，我们使用 `disable` 方法禁用了监视器。

### Class: Histogram

`Histogram` 类是性能直方图对象的构造函数，它用于创建一个性能直方图对象，该对象可以用于记录和分析一组值的分布情况。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`Histogram` 类具有以下方法：

- `recordValue(value)`: 用于记录新的值。
- `export()`: 将直方图的当前状态导出为一个包含所有桶及其值的对象。
- `reset()`: 将直方图重置为初始状态。

以下是一个示例代码，演示如何使用 `Histogram` 类创建性能直方图并记录一些值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.export());
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象。然后，我们使用 `recordValue` 方法记录了三个不同的值。最后，我们使用 `export` 方法将直方图的当前状态导出为一个对象，并将其打印到控制台上。

#### histogram.count

`histogram.count` 是 `Histogram` 类的一个属性，表示当前直方图中记录的值的总数。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `count` 属性，可以获取当前直方图中记录的值的总数。以下是一个示例代码，演示如何使用 `Histogram` 类的 `count` 属性获取记录的值的总数：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.count); // 输出 3
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。最后，我们使用 `count` 属性获取记录的值的总数，并将其打印到控制台上。

#### histogram.countBigInt

`histogram.countBigInt` 是 `Histogram` 类的一个属性，表示当前直方图中记录的值的总数（使用 BigInt 类型表示）。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `countBigInt` 属性，可以获取当前直方图中记录的值的总数，该总数使用 BigInt 类型表示。由于 JavaScript 的 Number 类型最大只能表示 2^53 - 1，因此如果需要处理非常大的数字时，可以使用 BigInt 类型。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `countBigInt` 属性获取记录的值的总数：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
  histogram.recordValue(50);
}

console.log(histogram.count); // 输出 9007199254740991
console.log(histogram.countBigInt); // 输出 9007199254740992n
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用循环调用 `recordValue` 方法记录了非常多的值。最后，我们使用 `count` 属性和 `countBigInt` 属性获取记录的值的总数，并将其打印到控制台上。可以看到，由于 JavaScript 的 Number 类型最大只能表示 2^53 - 1，因此 `count` 属性返回的值不正确，而 `countBigInt` 属性则返回了正确的值。

#### histogram.exceeds

`histogram.exceeds(value)` 是 `Histogram` 类的一个方法，用于计算当前直方图中超过给定值的记录数量。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过调用 `exceeds` 方法并传入一个参数，可以计算当前直方图中超过该参数值的记录数量。以下是一个示例代码，演示如何使用 `Histogram` 类的 `exceeds` 方法计算超过给定值的记录数量：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.exceeds(30)); // 输出 2
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `exceeds` 方法并传入 `30` 参数，计算当前直方图中超过 `30` 的记录数量，并将其打印到控制台上。可以看到，由于只有 `50` 和 `75` 两个值超过了 `30`，因此输出结果为 2。

#### histogram.exceedsBigInt

`histogram.exceedsBigInt(value)` 是 `Histogram` 类的一个方法，用于计算当前直方图中超过给定值的记录数量（使用 BigInt 类型表示）。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过调用 `exceedsBigInt` 方法并传入一个参数，可以计算当前直方图中超过该参数值的记录数量，并使用 BigInt 类型表示。如果需要处理非常大的数字时，可以使用 BigInt 类型。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `exceedsBigInt` 方法计算超过给定值的记录数量：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
  histogram.recordValue(50);
}

console.log(histogram.exceeds(30)); // 输出 9007199254740979
console.log(histogram.exceedsBigInt(30)); // 输出 9007199254740980n
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用循环调用 `recordValue` 方法记录了非常多的值。然后，我们使用 `exceeds` 方法和 `exceedsBigInt` 方法分别计算当前直方图中超过 `30` 的记录数量，并将其打印到控制台上。可以看到，由于 JavaScript 的 Number 类型最大只能表示 2^53 - 1，因此 `exceeds` 方法返回的值不正确，而 `exceedsBigInt` 方法则返回了正确的值。

#### histogram.max

`histogram.max` 是 `Histogram` 类的一个属性，表示当前直方图中记录的最大值。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `max` 属性，可以获取当前直方图中记录的最大值。以下是一个示例代码，演示如何使用 `Histogram` 类的 `max` 属性获取记录的最大值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.max); // 输出 75
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `max` 属性获取当前直方图中记录的最大值，并将其打印到控制台上。可以看到，由于 `75` 是当前直方图中的最大值，因此输出结果为 75。

#### histogram.maxBigInt

`histogram.maxBigInt` 是 `Histogram` 类的一个属性，表示当前直方图中记录的最大值（使用 BigInt 类型表示）。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `maxBigInt` 属性，可以获取当前直方图中记录的最大值，该值使用 BigInt 类型表示。如果需要处理非常大的数字时，可以使用 BigInt 类型。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `maxBigInt` 属性获取记录的最大值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: Number.MAX_SAFE_INTEGER,
});

for (let i = 0; i < Number.MAX_SAFE_INTEGER / 2 + 1; i++) {
  histogram.recordValue(i);
}

console.log(histogram.max); // 输出 9007199254740991
console.log(histogram.maxBigInt); // 输出 4503599627370497n
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用循环调用 `recordValue` 方法记录了非常多的值。然后，我们使用 `max` 属性和 `maxBigInt` 属性分别获取当前直方图中记录的最大值，并将其打印到控制台上。可以看到，由于 JavaScript 的 Number 类型最大只能表示 2^53 - 1，因此 `max` 属性返回的值不正确，而 `maxBigInt` 属性则返回了正确的值。

#### histogram.mean

`histogram.mean` 是 `Histogram` 类的一个属性，表示当前直方图中记录的平均值。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `mean` 属性，可以获取当前直方图中记录的平均值。以下是一个示例代码，演示如何使用 `Histogram` 类的 `mean` 属性获取记录的平均值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.mean); // 输出 50
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `mean` 属性获取当前直方图中记录的平均值，并将其打印到控制台上。可以看到，由于 `(25 + 50 + 75) / 3 = 50`，因此输出结果为 50。

#### histogram.min

`histogram.min` 是 `Histogram` 类的一个属性，表示当前直方图中记录的最小值。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `min` 属性，可以获取当前直方图中记录的最小值。以下是一个示例代码，演示如何使用 `Histogram` 类的 `min` 属性获取记录的最小值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.min); // 输出 25
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `min` 属性获取当前直方图中记录的最小值，并将其打印到控制台上。可以看到，由于 `25` 是当前直方图中的最小值，因此输出结果为 25。

#### histogram.minBigInt

`histogram.minBigInt` 是 `Histogram` 类的一个属性，表示当前直方图中记录的最小值（使用 BigInt 类型表示）。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

通过访问 `minBigInt` 属性，可以获取当前直方图中记录的最小值，该值使用 BigInt 类型表示。如果需要处理非常大的数字时，可以使用 BigInt 类型。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `minBigInt` 属性获取记录的最小值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: Number.MAX_SAFE_INTEGER,
});

for (let i = 0; i < Number.MAX_SAFE_INTEGER / 2 + 1; i++) {
  histogram.recordValue(i);
}

console.log(histogram.min); // 输出 0
console.log(histogram.minBigInt); // 输出 0n
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用循环调用 `recordValue` 方法记录了非常多的值。然后，我们使用 `min` 属性和 `minBigInt` 属性分别获取当前直方图中记录的最小值，并将其打印到控制台上。可以看到，由于所有记录的值都大于等于 `0`，因此 `min` 属性和 `minBigInt` 属性都返回了 `0` 或 `0n` 的结果。

#### histogram.percentile(percentile)

`histogram.percentile(percentile)` 是 `Histogram` 类的一个方法，用于计算当前直方图中指定百分位数对应的值。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`percentile` 方法接受一个参数，表示要计算的百分位数。例如，如果传入参数 `50`，则计算当前直方图中所记录的值的中位数。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `percentile` 方法计算当前直方图中的中位数：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.percentile(50)); // 输出 50
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `percentile` 方法计算当前直方图中的中位数，并将其打印到控制台上。可以看到，由于 `(25, 50, 75)` 中位数为 `50`，因此输出结果为 50。

注意，当调用 `percentile` 方法时，需要传入一个合法的百分位数。例如，不合法的百分位数可能会导致程序抛出异常。

#### histogram.percentileBigInt(percentile)

`histogram.percentileBigInt(percentile)` 是 `Histogram` 类的一个方法，用于计算当前直方图中指定百分位数对应的值（使用 BigInt 类型表示）。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`percentileBigInt` 方法接受一个参数，表示要计算的百分位数。例如，如果传入参数 `50`，则计算当前直方图中所记录的值的中位数。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `percentileBigInt` 方法计算当前直方图中的中位数：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: Number.MAX_SAFE_INTEGER,
});

for (let i = 0; i < Number.MAX_SAFE_INTEGER / 2 + 1; i++) {
  histogram.recordValue(i);
}

console.log(histogram.percentile(50)); // 输出 4503599627370496.5
console.log(histogram.percentileBigInt(50)); // 输出 4503599627370497n
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用循环调用 `recordValue` 方法记录了非常多的值。然后，我们使用 `percentile` 方法和 `percentileBigInt` 方法分别计算当前直方图中的中位数，并将结果打印到控制台上。可以看到，由于 JavaScript 的 Number 类型精度有限，因此 `percentile` 方法返回的结果不够精确，而 `percentileBigInt` 方法则返回了更加精确的结果，使用了 BigInt 类型。

#### histogram.percentiles

`histogram.percentiles` 是 `Histogram` 类的一个属性，表示当前直方图中各个百分位数对应的值。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`percentiles` 属性是一个对象，包含了当前直方图中各个百分位数（从 0 到 100）对应的值。例如，`percentiles[50]` 表示当前直方图中记录的值的中位数。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `percentiles` 属性获取当前直方图中各个百分位数对应的值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.percentiles); // 输出 { '0': 25, '50': 50, '100': 75 }
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `percentiles` 属性获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。可以看到，由于 `(25, 50, 75)` 的中位数为 `50`，因此 `percentiles[50]` 属性的值为 `50`，而其他属性的值则对应着其他记录的值。

#### histogram.percentilesBigInt

`histogram.percentilesBigInt` 是 `Histogram` 类的一个属性，表示当前直方图中各个百分位数对应的值（使用 BigInt 类型表示）。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`percentilesBigInt` 属性是一个对象，包含了当前直方图中各个百分位数（从 0 到 100）对应的值，使用 BigInt 类型表示。例如，`percentilesBigInt[50]` 表示当前直方图中记录的值的中位数。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `percentilesBigInt` 属性获取当前直方图中各个百分位数对应的值：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: Number.MAX_SAFE_INTEGER,
});

for (let i = 0; i < Number.MAX_SAFE_INTEGER / 2 + 1; i++) {
  histogram.recordValue(i);
}

console.log(histogram.percentile(50)); // 输出 4503599627370496.5
console.log(histogram.percentileBigInt(50)); // 输出 4503599627370497n
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用循环调用 `recordValue` 方法记录了非常多的值。然后，我们使用 `percentiles` 属性和 `percentilesBigInt` 属性分别获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。可以看到，由于 JavaScript 的 Number 类型精度有限，因此 `percentiles` 属性返回的结果不够精确，而 `percentilesBigInt` 属性则返回了更加精确的结果，使用了 BigInt 类型。

#### histogram.reset()

`histogram.reset()` 是 `Histogram` 类的一个方法，用于清空当前直方图中的所有数据。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`reset` 方法没有参数，调用该方法会清空当前直方图中的所有数据，即重置直方图的状态。调用该方法后，之前记录的所有数据都将被清除。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `reset` 方法清空直方图中的数据：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(25);
histogram.recordValue(50);
histogram.recordValue(75);

console.log(histogram.percentiles); // 输出 { '0': 25, '50': 50, '100': 75 }

histogram.reset();

console.log(histogram.percentiles); // 输出 { '0': 0, '50': 0, '100': 0 }
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `percentiles` 属性获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。接着，我们调用 `reset` 方法清空了直方图中的数据。最后，我们再次使用 `percentiles` 属性获取各个百分位数对应的值，并将其打印到控制台上。可以看到，调用 `reset` 方法后，直方图中的数据被清空，各个百分位数对应的值都变成了 0。

#### histogram.stddev

`histogram.stddev` 是 `Histogram` 类的一个属性，表示当前直方图中所记录数据的标准差。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`stddev` 属性表示当前直方图中所记录数据的标准差。标准差是衡量数据分布的一种指标，它越小表示数据更加集中，越大则表示数据分散程度更高。标准差的计算方式比较复杂，需要先计算数据的平均值，然后计算每个数据点与平均值之间的差值的平方和的平均值的平方根。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `stddev` 属性获取当前直方图中所记录数据的标准差：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(20);
histogram.recordValue(30);
histogram.recordValue(40);
histogram.recordValue(50);

console.log(histogram.stddev); // 输出 11.180339887498949
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了四个不同的值。然后，我们使用 `stddev` 属性获取当前直方图中所记录数据的标准差，并将其打印到控制台上。可以看到，由于输入的数据比较简单，因此标准差的计算结果也比较容易理解。

### Class: IntervalHistogram extends Histogram

`IntervalHistogram` 是 `Histogram` 类的子类，它扩展了 `Histogram` 类的功能，可以按照时间间隔记录数据并生成直方图。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。`Histogram` 类可以将输入的值划分为多个桶，每个桶代表一定范围内的数据，并计算各种有关数据分布的统计信息。而 `IntervalHistogram` 类则扩展了 `Histogram` 类的功能，增加了按照时间间隔（例如 1 秒或 1 分钟）记录数据的功能。使用 `IntervalHistogram` 类可以更加精细地分析应用程序的性能数据。

`IntervalHistogram` 类的创建方式与 `Histogram` 类基本相同，只需要传入 `bucketCount` 和 `minValue` 参数即可。其中，`bucketCount` 表示时间间隔内的桶数，`minValue` 表示桶的最小值。然后，可以使用 `recordValue` 方法来记录数据，`getTotalCount` 方法获取总共记录的数据数量，`reset` 方法清空所有数据。

以下是一个示例代码，演示如何使用 `IntervalHistogram` 类记录数据并生成直方图：

```javascript
const { IntervalHistogram } = require("perf_hooks");

const intervalHistogram = new IntervalHistogram({
  bucketCount: 3,
  minValue: 0,
});

intervalHistogram.recordValue(10);
setTimeout(() => {
  intervalHistogram.recordValue(20);
}, 2000);
setTimeout(() => {
  intervalHistogram.recordValue(30);
}, 4000);

setTimeout(() => {
  console.log(intervalHistogram.percentiles);
}, 6000);
```

在上面的示例中，我们首先使用 `IntervalHistogram` 类创建了一个时间间隔为 1 秒、桶数为 3 的直方图对象。然后，我们使用 `recordValue` 方法记录了三个不同的值，并将它们分别放到了 0 秒、2 秒和 4 秒的桶中。接着，我们等待 6 秒钟，然后使用 `percentiles` 属性获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。可以看到，由于数据被放到了不同的时间间隔中，因此生成的直方图会按照时间轴进行分割，并分别计算各个时间间隔内的数据分布情况。

#### histogram.disable()

`histogram.disable()` 是 `Histogram` 类的一个方法，用于停止记录数据并禁用直方图。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`disable` 方法没有参数，调用该方法会停止当前直方图的数据记录，并禁用直方图。调用该方法后，之前记录的所有数据都将被清除，并且直方图对象将无法再次记录数据。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `disable` 方法停止记录数据并禁用直方图：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(20);
histogram.recordValue(30);
histogram.recordValue(40);

console.log(histogram.percentiles); // 输出 { '0': 20, '50': 30, '100': 40 }

histogram.disable();

histogram.recordValue(50);

console.log(histogram.percentiles); // 输出 { '0': 20, '50': 30, '100': 40 }
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `percentiles` 属性获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。接着，我们调用 `disable` 方法停止记录数据并禁用直方图。最后，我们再次使用 `recordValue` 方法记录一个新的值，并尝试使用 `percentiles` 属性获取各个百分位数对应的值。可以看到，在禁用直方图后尝试记录数据和获取百分位数对应的值都失败了。

#### histogram.enable()

`histogram.enable()` 是 `Histogram` 类的一个方法，用于启用直方图并开始记录数据。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。性能直方图会将输入的值划分为多个桶，每个桶代表一定范围内的数据。然后，可以使用这些桶来计算各种有关数据分布的统计信息，例如平均值、标准差、中位数等。

`enable` 方法没有参数，调用该方法会启用当前直方图，并开始记录数据。在调用该方法之前，直方图对象必须处于禁用状态。

以下是一个示例代码，演示如何使用 `Histogram` 类的 `disable` 和 `enable` 方法停止和重新启用直方图：

```javascript
const { Histogram } = require("perf_hooks");

const histogram = new Histogram({
  buckets: 10,
  max: 100,
});

histogram.recordValue(20);
histogram.recordValue(30);
histogram.recordValue(40);

console.log(histogram.percentiles); // 输出 { '0': 20, '50': 30, '100': 40 }

histogram.disable();

histogram.recordValue(50);

console.log(histogram.percentiles); // 输出 { '0': 20, '50': 30, '100': 40 }

histogram.enable();

histogram.recordValue(60);

console.log(histogram.percentiles); // 输出 { '0': 20, '50': 30, '100': 60 }
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个性能直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `percentiles` 属性获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。接着，我们调用 `disable` 方法停止记录数据并禁用直方图。然后尝试使用 `recordValue` 方法记录一个新的值，但因为直方图已经被禁用而失败。接着，我们调用 `enable` 方法重新启用直方图，并使用 `recordValue` 方法记录一个新的值。最后，我们再次使用 `percentiles` 属性获取各个百分位数对应的值，并将其打印到控制台上。可以看到，在重新启用直方图后，我们成功地记录了一个新的值，并且直方图也成功地更新了相应的百分位数。

#### IntervalHistogram

`IntervalHistogram` 是 `Histogram` 类的一个子类，它可以按照时间间隔记录数据，并生成一个用于表示数据分布情况的直方图对象。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。`Histogram` 类可以将输入的值划分为多个桶，每个桶代表一定范围内的数据，并计算各种有关数据分布的统计信息。而 `IntervalHistogram` 类则扩展了 `Histogram` 类的功能，增加了按照时间间隔（例如 1 秒或 1 分钟）记录数据并生成直方图的功能。使用 `IntervalHistogram` 类可以更加精细地分析应用程序的性能数据。

创建 `IntervalHistogram` 类实例时，需要指定以下两个参数：

- `bucketCount`：代表时间间隔内的桶数。
- `minValue`：代表桶的最小值。

然后，通过调用 `recordValue` 方法来记录数据，并且该方法会将数据存储到最近的时间间隔中。此外，`IntervalHistogram` 类还提供了一些其他方法，比如 `disable`、`enable` 和 `reset` 等方法，用于停止记录数据、恢复记录数据和清除所有已经记录的数据。

以下是一个示例代码，演示如何使用 `IntervalHistogram` 类记录数据并生成直方图：

```javascript
const { IntervalHistogram } = require("perf_hooks");

// 创建一个 bucketCount 为 3、minValue 为 0 的 IntervalHistogram 实例
const intervalHistogram = new IntervalHistogram({
  bucketCount: 3,
  minValue: 0,
});

// 记录数据
intervalHistogram.recordValue(10);
setTimeout(() => {
  intervalHistogram.recordValue(20);
}, 2000);
setTimeout(() => {
  intervalHistogram.recordValue(30);
}, 4000);

// 输出直方图
setTimeout(() => {
  console.log(intervalHistogram.percentiles);
}, 6000);
```

在上面的示例中，我们使用 `IntervalHistogram` 类创建了一个时间间隔为 1 秒、桶数为 3 的直方图对象，并使用 `recordValue` 方法记录了三个不同的值，并将它们分别放到了 0 秒、2 秒和 4 秒的桶中。最后，我们等待 6 秒钟，然后使用 `percentiles` 属性获取当前直方图中各个百分位数对应的值，并将其打印到控制台上。可以看到，由于数据被放到了不同的时间间隔中，因此生成的直方图会按照时间轴进行分割，并分别计算各个时间间隔内的数据分布情况。

### Class: RecordableHistogram extends Histogram

`RecordableHistogram` 是 `Histogram` 类的一个子类，它可以记录直方图中的数据到文件或数据库中。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。`Histogram` 类可以将输入的值划分为多个桶，每个桶代表一定范围内的数据，并计算各种有关数据分布的统计信息。而 `RecordableHistogram` 类则继承了 `Histogram` 类的所有功能，并增加了将直方图中的数据保存到文件或数据库中的功能。

创建 `RecordableHistogram` 类实例时，需要指定以下两个参数：

- `bucketCount`：代表时间间隔内的桶数。
- `minValue`：代表桶的最小值。

然后，通过调用 `recordValue` 方法来记录数据，并且该方法会将数据存储到最近的时间间隔中。此外，`RecordableHistogram` 类还提供了一些其他方法，比如 `disable`、`enable` 和 `reset` 等方法，用于停止记录数据、恢复记录数据和清除所有已经记录的数据，并且还有 `outputPercentiles` 和 `outputSummary` 等方法，用于将直方图中的数据保存到文件或数据库中。

以下是一个示例代码，演示如何使用 `RecordableHistogram` 类记录数据并将直方图中的数据保存到文件中：

```javascript
const { RecordableHistogram } = require("perf_hooks");
const fs = require("fs");

// 创建一个 bucketCount 为 3、minValue 为 0 的 RecordableHistogram 实例
const recordableHistogram = new RecordableHistogram({
  bucketCount: 3,
  minValue: 0,
});

// 记录数据
recordableHistogram.recordValue(10);
recordableHistogram.recordValue(20);
recordableHistogram.recordValue(30);

// 将直方图中的数据保存到文件中
fs.writeFileSync("histogram.txt", recordableHistogram.outputPercentiles());
```

在上面的示例中，我们使用 `RecordableHistogram` 类创建了一个 bucketCount 为 3、minValue 为 0 的直方图对象，并使用 `recordValue` 方法记录了三个不同的值。然后，我们使用 `outputPercentiles` 方法将直方图中的数据保存到文件 `histogram.txt` 中。可以看到，在该文件中，数据已经按照一定格式进行了排序和输出，方便后续对数据进行分析和处理。

#### histogram.add(other)

`histogram.add(other)` 是 `Histogram` 类的一个方法，它可以将另一个直方图对象中的数据添加到当前直方图对象中。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。`Histogram` 类可以将输入的值划分为多个桶，每个桶代表一定范围内的数据，并计算各种有关数据分布的统计信息。而 `histogram.add(other)` 方法则允许将另一个直方图对象中的数据添加到当前直方图对象中，以便更好地分析数据分布情况。

调用 `histogram.add(other)` 方法时，需要指定一个参数 `other`，该参数表示要添加到当前直方图对象中的另一个直方图对象。调用该方法后，另一个直方图对象中的所有数据都会被添加到当前直方图对象中，并更新当前直方图对象的各种统计信息。

以下是一个示例代码，演示如何使用 `histogram.add(other)` 方法将另一个直方图对象中的数据添加到当前直方图对象中：

```javascript
const { Histogram } = require("perf_hooks");

// 创建两个 Histogram 实例
const histogram1 = new Histogram({ buckets: 10, max: 100 });
const histogram2 = new Histogram({ buckets: 10, max: 100 });

// 向第一个直方图对象中添加数据
histogram1.recordValue(20);
histogram1.recordValue(30);

// 向第二个直方图对象中添加数据
histogram2.recordValue(40);
histogram2.recordValue(50);

// 将第二个直方图对象中的数据添加到第一个直方图对象中
histogram1.add(histogram2);

// 输出直方图中各个百分位数对应的值
console.log(histogram1.percentiles); // 输出 { '0': 20, '50': 40, '100': 50 }
```

在上面的示例中，我们首先使用 `Histogram` 类创建了两个直方图对象 `histogram1` 和 `histogram2`。然后，我们向 `histogram1` 对象中添加了两个数据，向 `histogram2` 对象中添加了两个数据。接着，我们使用 `histogram1.add(histogram2)` 方法将 `histogram2` 中的数据添加到 `histogram1` 中，并更新了 `histogram1` 对象的各种统计信息。最后，我们使用 `percentiles` 属性获取更新后的 `histogram1` 直方图对象中各个百分位数对应的值，并将其打印到控制台上。可以看到，在将 `histogram2` 中的数据添加到 `histogram1` 中后，`histogram1` 对象中的数据分布情况相应地也得到了更新。

#### histogram.record(val)

`histogram.record(val)` 是 `Histogram` 类的一个方法，它可以将一个值记录到直方图中。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。`Histogram` 类可以将输入的值划分为多个桶，每个桶代表一定范围内的数据，并计算各种有关数据分布的统计信息。而 `histogram.record(val)` 方法则可以将一个值记录到直方图中，以便更好地分析数据分布情况。

调用 `histogram.record(val)` 方法时，需要指定一个参数 `val`，该参数表示要记录到直方图中的值。调用该方法后，该值会被添加到直方图的适当位置，并更新直方图的各种统计信息。

以下是一个示例代码，演示如何使用 `histogram.record(val)` 方法将一个值记录到直方图中：

```javascript
const { Histogram } = require("perf_hooks");

// 创建一个 Histogram 实例
const histogram = new Histogram({ buckets: 10, max: 100 });

// 向直方图中添加数据
histogram.record(20);
histogram.record(30);

// 输出直方图中各个百分位数对应的值
console.log(histogram.percentiles); // 输出 { '0': 20, '50': 25, '100': 30 }
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个直方图对象 `histogram`。然后，我们向直方图中添加了两个数据，使用 `histogram.record(20)` 方法将值 20 记录到直方图中，使用 `histogram.record(30)` 方法将值 30 记录到直方图中。接着，我们使用 `percentiles` 属性获取更新后的直方图对象中各个百分位数对应的值，并将其打印到控制台上。可以看到，在将这两个数据分别记录到直方图中后，直方图的数据分布情况相应地得到了更新。

#### histogram.recordDelta()

`histogram.recordDelta()` 是 `Histogram` 类的一个方法，它可以记录两次调用之间经过的时间，并将该时间记录到直方图中。

在 Node.js 中，性能直方图是 `PerfHooks` 模块中的一个功能，它可以帮助开发者分析应用程序的性能数据。`Histogram` 类可以将输入的值划分为多个桶，每个桶代表一定范围内的数据，并计算各种有关数据分布的统计信息。而 `histogram.recordDelta()` 方法则可以记录两次调用之间经过的时间，并将该时间记录到直方图中，以便更好地分析数据分布情况。

调用 `histogram.recordDelta()` 方法时，不需要传递任何参数，该方法会自动记录上一次调用和当前调用之间经过的时间，并将该时间记录到直方图中。

以下是一个示例代码，演示如何使用 `histogram.recordDelta()` 方法将两次调用之间经过的时间记录到直方图中：

```javascript
const { Histogram } = require("perf_hooks");

// 创建一个 Histogram 实例
const histogram = new Histogram({ buckets: 10, max: 100 });

// 记录两次调用之间经过的时间并将其记录到直方图中
setTimeout(() => {
  histogram.recordDelta();
}, 1000);

setTimeout(() => {
  histogram.recordDelta();
}, 2000);

// 输出直方图中各个百分位数对应的值
setTimeout(() => {
  console.log(histogram.percentiles); // 输出 { '0': 1003, '50': 1501, '100': 2001 }
}, 3000);
```

在上面的示例中，我们首先使用 `Histogram` 类创建了一个直方图对象 `histogram`。然后，我们分别在 1 秒和 2 秒之后调用了 `histogram.recordDelta()` 方法，该方法会记录上一次调用和当前调用之间经过的时间，并将该时间记录到直方图中。接着，我们等待 3 秒钟，然后使用 `percentiles` 属性获取更新后的直方图对象中各个百分位数对应的值，并将其打印到控制台上。可以看到，在将两次调用之间经过的时间记录到直方图中后，直方图的数据分布情况相应地得到了更新。

### Examples

`Examples` 是 `Node.js` 文档中各种不同功能和 API 的示例集合。

在 `Examples` 中，开发者可以找到许多关于如何使用 `Node.js` 的示例代码和文档。这些示例代码是以可运行的形式呈现的，并且涵盖了多个主题，例如文件系统操作、网络编程、子进程管理、流处理等等。通过这些示例代码，开发者可以更轻松地理解 `Node.js` 各种功能和 API 的用法，并在实际项目中更快速地上手。

以下是一个示例代码，演示如何在 `Examples` 中查找并运行一个简单的 `HTTP` 服务器：

```javascript
const http = require("http");

// 在 Examples 中找到一个简单的 HTTP 服务器示例
// 它监听 localhost:8000 端口并返回 "Hello, World!" 字符串
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!\n");
  })
  .listen(8000);

console.log("Server running at http://localhost:8000/");
```

在上面的示例中，我们首先使用 `require` 函数加载了 `http` 模块，然后使用 `http.createServer()` 方法创建了一个简单的 `HTTP` 服务器。该服务器会监听 `localhost:8000` 端口，并在收到请求时返回 "Hello, World!" 字符串。接着，我们使用 `console.log()` 方法打印了一条消息，表示服务器已经启动。通过这个简单的例子，我们可以看到 `Examples` 提供了非常有用的示例代码，方便我们学习和使用 `Node.js` 的各种功能和 API。

#### net.connect

`net.connect` 是 `Node.js` 中 `net` 模块提供的一个方法，用于创建一个 `TCP` 客户端连接。

在 `Node.js` 中，`net` 模块提供了底层网络通信功能，可以用于创建 `TCP` 或 `UNIX` 域套接字服务器和客户端。通过调用 `net.connect()` 方法，我们可以创建一个 `TCP` 客户端连接，并与指定的服务器建立连接。

以下是一个示例代码，演示如何使用 `net.connect()` 方法创建一个 `TCP` 客户端连接：

```javascript
const net = require("net");

// 创建一个 TCP 客户端连接并连接到指定服务器
const socket = net.connect({ port: 8080, host: "localhost" }, () => {
  console.log("connected to server!");
});

// 监听数据接收事件，打印服务器返回的数据
socket.on("data", (data) => {
  console.log(data.toString());
});

// 监听连接关闭事件，打印连接已关闭信息
socket.on("close", () => {
  console.log("connection closed");
});

// 向服务器发送消息
socket.write("hello from client");
```

在上面的示例中，我们首先使用 `require` 函数加载了 `net` 模块，然后使用 `net.connect()` 方法创建了一个 `TCP` 客户端连接，并连接到指定服务器。接着，我们监听了 `data` 和 `close` 事件，分别在收到服务器返回的数据时打印该数据，以及在连接关闭时打印连接已关闭信息。最后，我们使用 `socket.write()` 方法向服务器发送一条消息。

需要注意的是，在实际使用中，我们通常需要在连接建立之前就监听 `data` 和 `error` 事件，以便及时处理服务器返回的数据和连接错误信息。此外，还需要注意在使用完 `socket` 对象后要及时调用 `socket.destroy()` 方法来关闭连接。

## Permissions

`Permissions` 是指在 `Node.js` 中访问系统资源的权限控制。

在 `Node.js` 中，许多操作都涉及到对系统资源（如文件、网络端口等）的访问。为了保障应用程序和系统的安全，`Node.js` 采取了一系列措施来限制对系统资源的访问权限。这些措施可以分为三个层次：

1. 用户级别的权限控制：`Node.js` 运行时会根据当前用户的身份和权限来限制对系统资源的访问。
2. 操作级别的权限控制：对于某些需要特定权限才能执行的操作，`Node.js` 会进行相应的安全检查，并阻止未授权的操作。
3. 库级别的权限控制：许多 `Node.js` 标准库和第三方库也提供了自己的权限控制机制，例如 `fs` 模块的文件读写权限控制、`http` 模块的网络访问权限控制等。

以下是一个示例代码，演示如何使用 `fs` 模块中的 `createWriteStream()` 方法创建一个可写流并向文件中写入数据：

```javascript
const fs = require("fs");

// 创建一个可写流并向文件中写入数据
const writeStream = fs.createWriteStream("test.txt");
writeStream.write("hello, world!");
writeStream.end();
```

在上面的示例中，我们首先使用 `require` 函数加载了 `fs` 模块，然后使用 `createWriteStream()` 方法创建了一个可写流 `writeStream`。接着，我们使用 `writeStream.write()` 方法将字符串 "hello, world!" 写入到文件中，并使用 `writeStream.end()` 方法结束写入操作。由于 `createWriteStream()` 方法默认会以写入模式打开文件，因此在执行写入操作时，需要确保当前用户具有对该文件的写入权限。

需要注意的是，在实际使用中，我们通常需要在执行文件读写等敏感操作前进行相应的权限检查，以便确保当前用户拥有足够的权限来访问相关系统资源。

### Module-based permissions

`Module-based permissions` 是指在 `Node.js` 中基于模块的权限控制。

在 `Node.js` 中，许多核心模块和第三方模块都提供了自己的权限控制机制。这些模块会根据当前用户的身份和权限来限制对模块中某些功能的访问。例如，`fs` 模块中的文件读写操作就受到文件系统权限控制的限制，只有具有要求的用户权限才能执行相应的操作。此外，许多第三方模块也提供了类似的权限控制机制，以便更好地保障应用程序和系统的安全。

以下是一个示例代码，演示如何在 `express` 框架中使用基于路由的权限控制：

```javascript
const express = require("express");
const app = express();

// 定义一个路由，需要登录后才能访问
app.get("/profile", isLoggedIn, (req, res) => {
  res.send("Welcome to your profile!");
});

// 定义一个路由，需要管理员权限才能访问
app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome to the admin panel!");
});

// 登录验证中间件
function isLoggedIn(req, res, next) {
  // 判断用户是否已登录
  if (req.isAuthenticated()) {
    return next();
  }
  // 如果未登录，则重定向到登录页
  res.redirect("/login");
}

// 管理员权限验证中间件
function isAdmin(req, res, next) {
  // 判断用户是否为管理员
  if (req.user.isAdmin) {
    return next();
  }
  // 如果不是管理员，则返回错误页面
  res.status(403).send("Forbidden");
}
```

在上面的示例中，我们首先使用 `require` 函数加载了 `express` 模块，并创建了一个 `express` 应用程序实例 `app`。然后，我们分别定义了两个路由 `/profile` 和 `/admin`，并为每个路由添加了相应的权限控制中间件。其中，`isLoggedIn()` 中间件用于验证用户是否已登录，`isAdmin()` 中间件用于验证用户是否为管理员。如果用户满足相应的权限要求，则可以继续访问该路由，否则将返回相应的错误信息。

需要注意的是，在实际使用中，我们通常需要结合实际应用场景和业务需求，对模块的权限控制进行适当的调整和修改，以便更好地保障应用程序和系统的安全。
