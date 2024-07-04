## Inspector

在 Node.js 中，Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。

与浏览器的开发者工具类似，Inspector 可以通过命令行参数或代码 API 的方式启用和使用。例如，在命令行中添加 `--inspect` 参数，即可启用 Inspector 调试模式：

```
node --inspect index.js
```

这样，在代码运行时，就可以通过 Chrome 或其他支持 Chrome DevTools 协议的浏览器访问 `chrome://inspect` 页面，并连接到 Inspector 执行调试和分析操作。

除了命令行参数外，我们也可以在代码中使用 `--inspect-brk` 参数来设置断点，或在代码中添加 `debugger` 语句来暂停程序执行，并通过 Inspector 工具进行调试。

需要注意的是，在使用 Inspector 进行调试时，我们应该合理设置断点和监视器，以避免对程序性能和稳定性产生不良影响，并确保调试结果准确可靠。

通过这个介绍，我们可以了解 Node.js 中内置的 Inspector 工具，为后续的学习提供了基础。

### inspector.close()

在 Node.js 中，`inspector.close()` 是一个函数，用于关闭当前的 Inspector 调试器。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以使用 `inspector.close()` 函数来停止调试器的工作。

例如，以下代码展示了如何使用 `inspector.close()` 函数关闭当前的 Inspector 调试器：

```javascript
const inspector = require("inspector");

// 启用 Inspector 调试器
inspector.open();

// 执行一些代码

// 关闭 Inspector 调试器
inspector.close();
```

需要注意的是，在使用 `inspector.close()` 函数时，我们应该确保当前的 Inspector 调试器已经启用，并且没有在其他地方被关闭或销毁，以避免出现不可预期的异常错误。

通过这个介绍，我们可以了解 Node.js 中 `inspector.close()` 函数的用途和注意事项，为后续的学习提供了基础。

### inspector.console

在 Node.js 中，`inspector.console` 是一个对象，用于在 Inspector 调试器中输出控制台信息。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以使用 `inspector.console` 对象在调试器中输出控制台信息。

例如，以下代码展示了如何使用 `inspector.console` 输出调试信息：

```javascript
const inspector = require("inspector");

// 启用 Inspector 调试器
inspector.open();

// 输出控制台信息
inspector.console.log("Hello, world!");

// 关闭 Inspector 调试器
inspector.close();
```

需要注意的是，在使用 `inspector.console` 输出控制台信息时，我们应该确保当前的 Inspector 调试器已经启用，并且没有在其他地方被关闭或销毁。另外，我们也可以使用 `console` 模块提供的其他方法来输出控制台信息，如 `console.log()`、`console.error()` 等。

通过这个介绍，我们可以了解 Node.js 中 `inspector.console` 对象的用途和注意事项，为后续的学习提供了基础。

### inspector.open([port[, host[, wait]]])

在 Node.js 中，`inspector.open()` 是一个函数，用于启用 Inspector 调试器，开启代码调试、性能分析等功能。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以使用 `inspector.open()` 函数来启用 Inspector 调试器。

例如，以下代码展示了如何使用 `inspector.open()` 函数启用 Inspector 调试器：

```javascript
const inspector = require("inspector");

// 启用 Inspector 调试器
inspector.open();

// 执行一些代码

// 关闭 Inspector 调试器
inspector.close();
```

需要注意的是，在使用 `inspector.open()` 函数时，我们可以传入可选的参数 `port`、`host` 和 `wait`，以配置 Inspector 调试器的监听端口、主机地址和是否等待连接等选项。

另外，我们也可以通过命令行参数的方式启用 Inspector 调试器，如 `--inspect` 和 `--inspect-brk` 参数等。

通过这个介绍，我们可以了解 Node.js 中 `inspector.open()` 函数的用途和注意事项，为后续的学习提供了基础。

### inspector.url()

在 Node.js 中，`inspector.url()` 是一个函数，用于获取当前 Inspector 调试器的 WebSocket URL。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以使用 `inspector.url()` 函数来获取当前 Inspector 调试器的 WebSocket URL。

例如，以下代码展示了如何使用 `inspector.url()` 函数获取当前 Inspector 调试器的 WebSocket URL：

```javascript
const inspector = require("inspector");

// 启用 Inspector 调试器
inspector.open();

// 获取 WebSocket URL
const url = inspector.url();
console.log(url);

// 关闭 Inspector 调试器
inspector.close();
```

需要注意的是，在使用 `inspector.url()` 函数获取 WebSocket URL 时，我们应该确保当前的 Inspector 调试器已经启用，并且没有在其他地方被关闭或销毁。

通过这个介绍，我们可以了解 Node.js 中 `inspector.url()` 函数的用途和注意事项，为后续的学习提供了基础。

### inspector.waitForDebugger()

在 Node.js 中，`inspector.waitForDebugger()` 是一个函数，用于等待 Inspector 调试器连接并启动程序。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，会导致代码执行暂停在程序起始处，直到 Inspector 调试器连接上来。

如果我们需要手动控制程序何时开始执行，可以使用 `inspector.waitForDebugger()` 函数，在程序中等待调试器连接并启动程序。例如，以下代码展示了如何使用 `inspector.waitForDebugger()` 函数等待 Inspector 调试器连接：

```javascript
const inspector = require("inspector");

// 启用 Inspector 调试器（暂停程序执行）
inspector.open(0, "localhost", true);

// 等待调试器连接
inspector.waitForDebugger();

// 继续程序执行
console.log("Hello, world!");

// 关闭 Inspector 调试器
inspector.close();
```

需要注意的是，在使用 `inspector.waitForDebugger()` 函数等待调试器连接时，我们应该确保当前的 Inspector 调试器已经启用，并且没有在其他地方被关闭或销毁。

通过这个介绍，我们可以了解 Node.js 中 `inspector.waitForDebugger()` 函数的用途和注意事项，为后续的学习提供了基础。

### Class: inspector.Session

在 Node.js 中，`inspector.Session` 是一个类，用于创建和管理 Inspector 调试会话。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以使用 `inspector.Session` 类来创建和管理 Inspector 调试会话对象。

例如，以下代码展示了如何使用 `inspector.Session` 创建一个 Inspector 调试会话：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 输出控制台信息
session.post("Runtime.consoleAPICalled", {
  type: "log",
  args: [{ value: "Hello, world!" }],
});

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `inspector.Session` 类创建和管理 Inspector 调试会话时，我们应该合理设置会话对象的配置、事件监听器和消息处理函数，以确保调试结果准确可靠，并且不影响程序性能和稳定性。

通过这个介绍，我们可以了解 Node.js 中 `inspector.Session` 类的用途和注意事项，为后续的学习提供了基础。

#### new inspector.Session()

在 Node.js 中，`new inspector.Session()` 是一个语法，用于创建一个 `inspector.Session` 类的实例对象。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们需要使用 `inspector.Session` 类来创建和管理 Inspector 调试会话对象时，就可以使用 `new inspector.Session()` 语法来创建一个新的 `inspector.Session` 实例。

例如，以下代码展示了如何使用 `new inspector.Session()` 创建一个 `inspector.Session` 实例：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 输出控制台信息
session.post("Runtime.consoleAPICalled", {
  type: "log",
  args: [{ value: "Hello, world!" }],
});

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `new inspector.Session()` 创建 `inspector.Session` 实例时，我们应该合理设置会话对象的配置、事件监听器和消息处理函数，以确保调试结果准确可靠，并且不影响程序性能和稳定性。

通过这个介绍，我们可以了解 Node.js 中 `new inspector.Session()` 的用途和注意事项，为后续的学习提供了基础。

#### 'inspectorNotification'

在 Node.js 中，`'inspectorNotification'` 是一个事件名称，用于监听 Inspector 调试器发送的通知消息。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以通过 `'inspectorNotification'` 事件来监听 Inspector 调试器发送的通知消息。

例如，以下代码展示了如何使用 `'inspectorNotification'` 事件监听 Inspector 调试器发送的通知消息：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 监听 Inspector 通知
session.on("inspectorNotification", (message) => {
  console.log("Received notification:", message);
});

// 发送一条通知
session.post("Inspector.notify", { message: "Hello, world!" });

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `'inspectorNotification'` 事件监听 Inspector 调试器发送的通知消息时，我们应该根据消息类型和内容，合理处理通知事件，以达到调试目的，并确保程序性能和稳定性。

通过这个介绍，我们可以了解 Node.js 中 `'inspectorNotification'` 事件的用途和注意事项，为后续的学习提供了基础。

#### \<inspector-protocol-method>

在 Node.js 中，`<inspector-protocol-method>` 是一个术语，用于表示 Inspector 调试器中的协议方法。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。在 Inspector 调试模式下，我们可以通过 WebSocket 协议与 Inspector 进行通信，并使用一系列的协议方法来发送消息和接收响应。

而 `<inspector-protocol-method>` 就是这些协议方法的名称，例如 `Runtime.evaluate`、`Debugger.enable`、`Profiler.enable` 等等。

以下是一段示例代码，展示了如何使用协议方法 `Runtime.evaluate` 来在运行时执行代码并返回结果：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 发送 Runtime.evaluate 请求
session.post(
  "Runtime.evaluate",
  {
    expression: "1 + 2",
    returnByValue: true,
  },
  (error, result) => {
    if (error) {
      console.error("Evaluate error:", error);
    } else {
      console.log("Evaluate result:", result.result.value);
    }
  }
);

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `<inspector-protocol-method>` 协议方法时，我们应该遵循协议规范，合理设置请求参数和选项，以及正确处理响应和错误信息，以达到调试目的，并确保程序性能和稳定性。

通过这个介绍，我们可以了解 Node.js 中 `<inspector-protocol-method>` 的概念和用途，为后续的学习提供了基础。

#### session.connect()

在 Node.js 中，`session.connect()` 是一个函数，用于启动 Inspector 会话与调试器建立连接。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以通过 `session.connect()` 函数来启动 Inspector 会话并建立连接。

例如，以下代码展示了如何使用 `session.connect()` 函数启动 Inspector 会话：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `session.connect()` 函数启动 Inspector 会话时，我们应该确保程序已经处于暂停状态，并且没有在其他地方被关闭或销毁。

通过这个介绍，我们可以了解 Node.js 中 `session.connect()` 函数的用途和注意事项，为后续的学习提供了基础。

#### session.connectToMainThread()

在 Node.js 中，`session.connectToMainThread()` 是一个函数，用于将当前的 Inspector 会话连接到主线程上。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以通过 `session.connectToMainThread()` 函数将当前的 Inspector 会话连接到主线程上，并开始检测调试事件。

例如，以下代码展示了如何使用 `session.connectToMainThread()` 函数将 Inspector 会话连接到主线程上：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 将会话连接到主线程上
session.connectToMainThread();

// 监听脚本解析事件
session.on("Debugger.scriptParsed", (event) => {
  console.log(`Script parsed: ${event.url}`);
});

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `session.connectToMainThread()` 函数将 Inspector 会话连接到主线程上时，我们应该合理设置会话选项和事件监听器，以确保调试结果准确可靠，并且不影响程序性能和稳定性。

通过这个介绍，我们可以了解 Node.js 中 `session.connectToMainThread()` 函数的用途和注意事项，为后续的学习提供了基础。

#### session.disconnect()

在 Node.js 中，`session.disconnect()` 是一个函数，用于关闭当前的 Inspector 会话和连接。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以通过 `session.disconnect()` 函数来关闭当前的 Inspector 会话和连接。

例如，以下代码展示了如何使用 `session.disconnect()` 函数关闭 Inspector 会话：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `session.disconnect()` 函数关闭 Inspector 会话时，我们应该确保程序已经完成调试操作，并且没有在其他地方被关闭或销毁。

通过这个介绍，我们可以了解 Node.js 中 `session.disconnect()` 函数的用途和注意事项，为后续的学习提供了基础。

#### session.post(method[, params][, callback])

在 Node.js 中，`session.post()` 是一个函数，用于向 Inspector 调试器发送请求消息，并接收响应消息。

Inspector 是一个内置的调试器工具，可以帮助开发者在代码运行过程中进行调试、性能分析等操作。当我们使用 `--inspect` 或 `--inspect-brk` 命令行参数或代码 API 启用 Inspector 调试模式后，就可以通过 `session.post()` 函数来向 Inspector 调试器发送请求消息，并接收响应消息。

例如，以下代码展示了如何使用 `session.post()` 函数向 Inspector 调试器发送一个请求消息，并处理响应消息：

```javascript
const inspector = require("inspector");

// 创建 Inspector 会话
const session = new inspector.Session();

// 启用 Inspector 调试器
session.connect();

// 发送 Runtime.evaluate 请求
session.post(
  "Runtime.evaluate",
  {
    expression: "1 + 2",
    returnByValue: true,
  },
  (error, result) => {
    if (error) {
      console.error("Evaluate error:", error);
    } else {
      console.log("Evaluate result:", result.result.value);
    }
  }
);

// 关闭 Inspector 调试器
session.disconnect();
```

需要注意的是，在使用 `session.post()` 函数向 Inspector 调试器发送请求消息时，我们应该确保消息类型和内容符合协议规范，同时设置正确的回调函数处理响应消息和错误信息。

通过这个介绍，我们可以了解 Node.js 中 `session.post()` 函数的用途和注意事项，为后续的学习提供了基础。

## Internationalization support

在 Node.js 中，`Internationalization support` 是一个功能，用于提供多语言支持和本地化能力。

随着互联网的普及和全球化的趋势，开发者需要考虑到用户可能来自不同的地区，使用不同的语言和文化习惯。为了更好地满足用户需求，Node.js 提供了一套国际化支持功能，包括：

- `Intl` 对象：提供各种国际化相关的方法和属性，例如处理日期、时间、数字等。
- `os.locale()` 方法：获取当前系统的本地化信息。
- `process.env.LANG` 环境变量：设置程序运行时的默认本地化信息。
- `--experimental-intl-segmenter` 命令行参数：启用实验性的分词器功能，用于处理复杂的语言文本。

以下是一段示例代码，展示了如何使用 `Intl` 对象中的 `DateTimeFormat` 方法来格式化日期时间：

```javascript
const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);

console.log(formatter.format(date));
// Output: "Thursday, March 10, 2022"
```

需要注意的是，在使用 Node.js 的国际化支持功能时，我们应该根据具体需求选择合适的方法和选项，以确保程序正常运行，并且能够提供准确可靠的本地化服务。

通过这个介绍，我们可以了解 Node.js 中 `Internationalization support` 功能的概念和用途，为后续的学习提供了基础。

### Options for building Node.js

在 Node.js 中，`Options for building Node.js` 是指构建 Node.js 时可以选择的一些选项和参数。

编译 Node.js 可以使用多种不同的方式，例如使用源码自行构建、下载预编译二进制文件等。无论采用何种方式，都可以通过设置不同的选项和参数来定制化构建过程，以满足不同的需求和环境。

以下是一些常见的构建选项和参数：

- `--debug`：启用调试模式，包括断言检查、性能分析等。
- `--without-npm`：不包含 npm 包管理器。
- `--shared`：构建共享库。
- `--openssl-no-asm`：禁用 OpenSSL 的汇编优化功能。
- `--dest-cpu`：指定目标 CPU 类型，例如 x86、x64 等。
- `--dest-os`：指定目标操作系统类型，例如 linux、darwin 等。

例如，以下代码演示了如何使用 `configure` 命令行工具设置构建选项和参数，并执行构建操作：

```bash
./configure --without-npm --shared --dest-cpu=x64 --dest-os=linux
make
sudo make install
```

需要注意的是，在使用 Node.js 构建选项和参数时，我们应该根据具体需求选择合适的选项和参数，同时遵循官方文档中的建议和说明，以确保构建结果稳定可靠，并且符合预期。

通过这个介绍，我们可以了解 Node.js 中构建选项和参数的概念和用途，为后续的学习提供了基础。

#### none

在 Node.js 官网文档中，`none` 通常用于表示某个选项或参数未设置或无效。

例如，在介绍 Node.js 中的编译选项时，可能会出现 `none` 作为默认值或无效值。又比如，在介绍函数参数时，可能会使用 `none` 表示某个参数未被传递或不需要设置。

需要注意的是，`none` 并不是 Node.js 内置的关键字或函数，而是一种惯用的表达方式。在实际编程中，我们应该根据具体情况选择合适的取值和处理方式，并避免将 `none` 作为变量名或函数名等标识符使用。

通过这个介绍，我们可以了解在 Node.js 官方文档中，`none` 通常代表某个选项或参数未设置或无效，但它本身并不是 Node.js 内置的功能或关键字。

#### system-icu

在 Node.js 中，`system-icu` 是指使用操作系统提供的 ICU 库来进行本地化和国际化处理。

ICU（International Components for Unicode）是一个开源的、跨平台的、用于处理 Unicode 字符串和文本的库。Node.js 提供了一套国际化支持功能，其中就包括可以使用系统级别的 ICU 库来进行本地化和国际化处理。

具体来说，当我们使用 `--with-intl=system-icu` 命令行参数或其他方式启用系统级别的 ICU 支持后，Node.js 在进行本地化和国际化处理时，会直接调用操作系统中已经安装的 ICU 库，而不是使用内置的 ICU 库。

使用系统级别的 ICU 库有一些优点，例如：

- 可以充分利用系统资源和性能。
- 可以避免重复安装和管理 ICU 库。
- 可以确保 Node.js 和操作系统之间的本地化信息一致性。

需要注意的是，使用系统级别的 ICU 库可能会受到操作系统版本、配置和权限等因素的影响。在实际使用中，我们应该根据具体情况选择适合自己的 ICU 配置，并遵循官方文档中的建议和说明。

通过这个介绍，我们可以了解 Node.js 中 `system-icu` 的概念和用途，它是一种使用操作系统提供的 ICU 库进行本地化和国际化处理的方式。

#### small-icu

在 Node.js 中，`small-icu` 是指使用轻量级的 ICU 库来进行本地化和国际化处理。

ICU（International Components for Unicode）是一个开源的、跨平台的、用于处理 Unicode 字符串和文本的库。Node.js 提供了一套国际化支持功能，其中就包括可以使用轻量级的 ICU 库来进行本地化和国际化处理。

具体来说，当我们使用 `--with-intl=small-icu` 命令行参数或其他方式启用轻量级的 ICU 支持后，Node.js 在进行本地化和国际化处理时，会使用内置的 ICU 库，这个库相对于完整版的 ICU 来说，更加小巧、精简，并且只包含一些核心功能。

使用轻量级的 ICU 库有一些优点，例如：

- 占用更少的磁盘空间和内存资源。
- 可以快速构建和部署 Node.js 程序，并减少依赖项。
- 可以提高程序的运行效率和响应速度。

需要注意的是，相对于完整版的 ICU 库，轻量级的 ICU 库可能会缺少一些不常用的、特定语言或区域的本地化信息。在实际使用中，我们应该根据具体情况选择适合自己的 ICU 配置，并遵循官方文档中的建议和说明。

通过这个介绍，我们可以了解 Node.js 中 `small-icu` 的概念和用途，它是一种使用轻量级的 ICU 库进行本地化和国际化处理的方式。

#### full-icu

在 Node.js 中，`full-icu` 是指使用完整版的 ICU 库来进行本地化和国际化处理。

ICU（International Components for Unicode）是一个开源的、跨平台的、用于处理 Unicode 字符串和文本的库。Node.js 提供了一套国际化支持功能，其中就包括可以使用完整版的 ICU 库来进行本地化和国际化处理。

具体来说，当我们使用 `--with-intl=full-icu` 命令行参数或其他方式启用完整版的 ICU 支持后，Node.js 在进行本地化和国际化处理时，会使用内置的完整版 ICU 库，这个库包含了所有语言和区域的本地化信息和功能。

使用完整版的 ICU 库有一些优点，例如：

- 可以提供最全面、最准确的本地化信息和功能。
- 可以满足各种不同语言和区域的需求。
- 可以充分利用现代计算机的硬件资源和性能。

需要注意的是，相对于轻量级的 ICU 库，完整版的 ICU 库可能会占用更多的磁盘空间和内存资源。在实际使用中，我们应该根据具体情况选择适合自己的 ICU 配置，并遵循官方文档中的建议和说明。

通过这个介绍，我们可以了解 Node.js 中 `full-icu` 的概念和用途，它是一种使用完整版的 ICU 库进行本地化和国际化处理的方式。

### Detecting internationalization support

在 Node.js 中，`Detecting internationalization support` 是指检测当前环境（即操作系统和 Node.js 版本）是否支持国际化功能。

由于 Node.js 的国际化功能依赖于 ICU 库和操作系统的本地化设置等因素，因此在某些情况下可能会出现国际化功能不可用的情况。为了避免这种情况，我们可以使用一些工具和技术来检测当前环境是否支持国际化功能。

以下是一些常见的检测方法：

- `Intl.DateTimeFormat`：尝试创建一个日期格式化对象，如果创建成功，则说明支持国际化功能。

```javascript
const isIntlSupported =
  typeof Intl === "object" &&
  Intl.DateTimeFormat([], { timeZone: "UTC" }).format() === "1/1/2022";
```

- `process.env.LANG`：检查系统环境变量 `LANG` 是否设置，如果设置，则说明至少支持部分国际化功能。

```javascript
const isIntlSupported = Boolean(process.env.LANG);
```

- `os.setLocale()`：尝试设置本地化信息并检查是否成功，如果成功，则说明支持国际化功能。

```javascript
const os = require("os");
let isIntlSupported = true;

try {
  os.setLocale("en-US");
} catch (e) {
  isIntlSupported = false;
}
```

需要注意的是，以上方法不一定适用于所有操作系统和 Node.js 版本，我们应该根据具体情况选择合适的检测方法，并且遵循官方文档中的建议和说明。

通过这个介绍，我们可以了解 Node.js 中如何检测国际化功能是否可用，为后续的学习提供了基础。


## Net

在 Node.js 中，`Net` 是一个核心模块，用于创建基于 TCP 或 IPC 的网络应用程序。

通过 `Net` 模块，我们可以创建服务器和客户端，并进行数据的传输和处理等操作。其中，TCP 和 IPC 是两种常用的传输协议，具有高效、可靠和安全等特点，被广泛应用于各种网络通信场景中。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  // 新的连接建立时触发
  console.log("Client connected.");

  socket.on("data", (data) => {
    // 接收到客户端发送的数据时触发
    console.log(`Received ${data.length} bytes of data.`);
    console.log(`Data: ${data}`);
  });

  socket.on("end", () => {
    // 连接关闭时触发
    console.log("Client disconnected.");
  });
});

server.listen(8080, () => {
  console.log("Server started.");
});
```

上面的示例中，我们使用 `net.createServer()` 方法创建了一个 TCP 服务器，并监听了 `8080` 端口。当客户端连接到服务器时，会触发 `connection` 事件，并执行回调函数，同时我们打印出一条日志提示连接已建立。当客户端向服务器发送数据时，会触发 `data` 事件，并执行回调函数，我们打印出接收到的数据长度和内容。最后，当客户端关闭连接时，会触发 `end` 事件，并执行回调函数，同时我们打印出一条日志提示连接已关闭。

需要注意的是，在使用 `Net` 模块时，需要了解相应的 API 和事件，并且需要考虑到网络通信的特点和限制。同时，在编写应用程序时，也需要遵循相应的规范和约定，并根据实际情况进行相应的调整和修改。

通过这个介绍，我们可以了解到 `Net` 模块在 Node.js 中的作用和用法，为后续的学习提供了基础。

### IPC support

在 Node.js 中，`IPC` 是指进程间通信，是一种常用的进程间通信方式。

通过 `IPC`，我们可以在同一台机器上的不同进程之间进行通信和数据交换。这种通信方式具有高效、可靠、安全等特点，并被广泛应用于各种分布式系统和网络应用中。

Node.js 提供了支持 IPC 的 API 接口，可以通过 `child_process` 模块的 `fork()` 方法创建子进程，并使用 `process.send()` 和 `process.on()` 方法来进行进程间通信。其中，`process.send()` 用于向父进程发送消息，而 `process.on('message', callback)` 则用于接收父进程发送的消息。

以下是一个示例：

```javascript
// parent.js
const { fork } = require("child_process");
const child = fork("./child.js");

child.on("message", (msg) => {
  console.log(`Received message from child: ${msg}`);
});

child.send("Hello from parent.");

// child.js
process.on("message", (msg) => {
  console.log(`Received message from parent: ${msg}`);
  process.send("Hello from child.");
});
```

上面的示例中，我们先在 `parent.js` 中创建了一个子进程，并监听了 `message` 事件。当子进程向父进程发送消息时，会触发 `message` 事件，并执行回调函数，我们打印出接收到的消息内容。接着，我们向子进程发送一条消息，并打印出一条日志提示已发送。在子进程的代码中，我们监听了 `message` 事件，并使用 `process.send()` 向父进程发送了一条消息。

需要注意的是，在使用 `IPC` 进行进程间通信时，需要考虑到进程之间的关系和通信的方式，并且需要遵循相应的规范和约定。同时，在编写程序时，也需要考虑到并发和资源竞争等问题，并根据实际情况进行相应的调整和修改。

通过这个介绍，我们可以了解到 `IPC` 在 Node.js 中的作用和用法，为后续的学习提供了基础。

### Class: net.BlockList

在 Node.js 中，`net.BlockList` 是一个类，用于表示 IP 地址的阻止列表，可以用于限制对服务器的访问。

通过 `net.BlockList` 类，我们可以创建一个 IP 地址的阻止列表，并使用 `block()` 和 `unblock()` 方法向列表中添加或删除 IP 地址。同时，我们还可以使用 `check()` 方法来检查指定的 IP 地址是否被阻止。

以下是一个示例：

```javascript
const net = require("net");

const blocklist = new net.BlockList(["127.0.0.1"]);

const server = net.createServer((socket) => {
  // 新的连接建立时触发
  if (blocklist.check(socket.remoteAddress)) {
    console.log(`Blocked connection from ${socket.remoteAddress}.`);
    socket.destroy();
    return;
  }

  console.log(`Client connected from ${socket.remoteAddress}.`);

  socket.on("data", (data) => {
    // 接收到客户端发送的数据时触发
    console.log(`Received ${data.length} bytes of data.`);
    console.log(`Data: ${data}`);
  });

  socket.on("end", () => {
    // 连接关闭时触发
    console.log(`Client disconnected from ${socket.remoteAddress}.`);
  });
});

server.listen(8080, () => {
  console.log("Server started.");
});
```

上面的示例中，我们创建了一个 IP 地址为 `127.0.0.1` 的阻止列表，并使用 `check()` 方法检查连接到服务器的客户端的 IP 地址是否在阻止列表中。如果是，则打印一条日志提示已阻止连接，并销毁当前的套接字；否则，打印一条日志提示连接已建立，并监听后续事件。

需要注意的是，在使用 `net.BlockList` 类时，需要了解相应的 API 和方法，并根据实际情况进行相应的调整和修改。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `net.BlockList` 类在 Node.js 中的作用和用法，为后续的学习提供了基础。

#### blockList.addAddress(address[, type])

在 Node.js 中，`blockList.addAddress()` 是 `net.BlockList` 类的一个方法，用于向 IP 地址阻止列表中添加新的 IP 地址。

通过 `blockList.addAddress()` 方法，我们可以向阻止列表中添加新的 IP 地址，其中 `address` 参数表示要添加的 IP 地址，`type` 参数表示 IP 地址的类型，可以是 `'ipv4'` 或 `'ipv6'`，默认为 `'ipv4'`。

以下是一个示例：

```javascript
const net = require("net");

const blocklist = new net.BlockList(["127.0.0.1"]);

blocklist.addAddress("192.168.0.1");
blocklist.addAddress("fe80::1", "ipv6");

console.log(blocklist.list);
```

上面的示例中，我们创建了一个 IP 地址为 `'127.0.0.1'` 的阻止列表，并使用 `addAddress()` 方法向列表中分别添加了两个 IP 地址。接着，我们打印出了当前阻止列表中的所有 IP 地址。

需要注意的是，在使用 `blockList.addAddress()` 方法时，需要指定要添加的 IP 地址和相应的类型，并且需要遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `blockList.addAddress()` 方法在 `net.BlockList` 类中的作用和用法，为后续的学习提供了基础。

#### blockList.addRange(start, end[, type])

在 Node.js 中，`blockList.addRange()` 是 `net.BlockList` 类的一个方法，用于向 IP 地址阻止列表中添加 IP 地址范围。

通过 `blockList.addRange()` 方法，我们可以向阻止列表中添加 IP 地址范围，其中 `start` 和 `end` 参数表示要添加的 IP 地址范围的起始地址和结束地址，`type` 参数表示 IP 地址的类型，可以是 `'ipv4'` 或 `'ipv6'`，默认为 `'ipv4'`。

以下是一个示例：

```javascript
const net = require("net");

const blocklist = new net.BlockList(["127.0.0.1"]);

blocklist.addRange("192.168.0.1", "192.168.0.10");
blocklist.addRange("fe80::1", "fe80::10", "ipv6");

console.log(blocklist.list);
```

上面的示例中，我们创建了一个 IP 地址为 `'127.0.0.1'` 的阻止列表，并使用 `addRange()` 方法向列表中分别添加了两个 IP 地址范围。接着，我们打印出了当前阻止列表中的所有 IP 地址。

需要注意的是，在使用 `blockList.addRange()` 方法时，需要指定要添加的 IP 地址范围和相应的类型，并且需要遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `blockList.addRange()` 方法在 `net.BlockList` 类中的作用和用法，为后续的学习提供了基础。

#### blockList.addSubnet(net, prefix[, type])

在 Node.js 中，`blockList.addSubnet()` 是 `net.BlockList` 类的一个方法，用于向 IP 地址阻止列表中添加子网。

通过 `blockList.addSubnet()` 方法，我们可以向阻止列表中添加 IP 子网，其中 `net` 和 `prefix` 参数表示要添加的 IP 子网的地址和前缀长度，`type` 参数表示 IP 地址的类型，可以是 `'ipv4'` 或 `'ipv6'`，默认为 `'ipv4'`。

以下是一个示例：

```javascript
const net = require("net");

const blocklist = new net.BlockList(["127.0.0.1"]);

blocklist.addSubnet("192.168.0.0", 24);
blocklist.addSubnet("fe80::", 64, "ipv6");

console.log(blocklist.list);
```

上面的示例中，我们创建了一个 IP 地址为 `'127.0.0.1'` 的阻止列表，并使用 `addSubnet()` 方法向列表中分别添加了两个 IP 子网。接着，我们打印出了当前阻止列表中的所有 IP 地址。

需要注意的是，在使用 `blockList.addSubnet()` 方法时，需要指定要添加的 IP 子网的地址和前缀长度以及相应的类型，并且需要遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `blockList.addSubnet()` 方法在 `net.BlockList` 类中的作用和用法，为后续的学习提供了基础。

#### blockList.check(address[, type])

在 Node.js 中，`blockList.check()` 是 `net.BlockList` 类的一个方法，用于检查指定的 IP 地址是否被阻止。

通过 `blockList.check()` 方法，我们可以检查指定的 IP 地址是否被添加到了阻止列表中，其中 `address` 参数表示要检查的 IP 地址，`type` 参数表示 IP 地址的类型，可以是 `'ipv4'` 或 `'ipv6'`，默认为 `'ipv4'`。

以下是一个示例：

```javascript
const net = require("net");

const blocklist = new net.BlockList(["127.0.0.1"]);

console.log(blocklist.check("192.168.0.1")); // false

blocklist.addAddress("192.168.0.1");

console.log(blocklist.check("192.168.0.1")); // true
```

上面的示例中，我们创建了一个 IP 地址为 `'127.0.0.1'` 的阻止列表，并使用 `check()` 方法检查了一个未添加到列表中的 IP 地址和一个已添加到列表中的 IP 地址。接着，我们打印出了检查结果。

需要注意的是，在使用 `blockList.check()` 方法时，需要指定要检查的 IP 地址和相应的类型，并且需要遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `blockList.check()` 方法在 `net.BlockList` 类中的作用和用法，为后续的学习提供了基础。

#### blockList.rules

在 Node.js 中，`blockList.rules` 是 `net.BlockList` 类的一个属性，用于获取 IP 地址阻止列表中的所有规则。

通过 `blockList.rules` 属性，我们可以获取当前阻止列表中的所有规则，每个规则都是一个对象，包含 `type`、`address` 和 `prefix` 三个属性，分别表示 IP 地址类型、IP 地址和子网前缀长度。

以下是一个示例：

```javascript
const net = require("net");

const blocklist = new net.BlockList(["127.0.0.1"]);

blocklist.addAddress("192.168.0.1");
blocklist.addSubnet("fe80::", 64);

console.log(blocklist.rules);
```

上面的示例中，我们创建了一个 IP 地址为 `'127.0.0.1'` 的阻止列表，并使用 `addAddress()` 和 `addSubnet()` 方法向列表中添加了两个 IP 地址和一个 IP 子网。接着，我们打印出了当前阻止列表中的所有规则。

需要注意的是，在使用 `blockList.rules` 属性时，可以获取当前阻止列表中的所有规则，并根据实际情况进行相应的调整和修改。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `blockList.rules` 属性在 `net.BlockList` 类中的作用和用法，为后续的学习提供了基础。

### Class: net.SocketAddress

在 Node.js 中，`net.SocketAddress` 是一个类，用于表示 IP 地址和端口号的组合。

通过 `net.SocketAddress` 类，我们可以创建一个包含 IP 地址和端口号的对象，并对其进行相应的操作和处理。该对象包含两个属性：`address` 和 `port`，分别表示 IP 地址和端口号。

以下是一个示例：

```javascript
const net = require("net");

const address = new net.SocketAddress("127.0.0.1", 80);

console.log(address.address); // '127.0.0.1'
console.log(address.port); // 80
```

上面的示例中，我们创建了一个包含 IP 地址为 `'127.0.0.1'` 和端口号为 `80` 的 `net.SocketAddress` 对象，并使用 `address` 和 `port` 属性获取了其中的 IP 地址和端口号。接着，我们打印出了获取的结果。

需要注意的是，在使用 `net.SocketAddress` 类时，需要遵循相应的规范和约定，并且根据实际情况进行相应的调整和修改。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `net.SocketAddress` 类在 Node.js 中的作用和用法，为后续的学习提供了基础。

#### new net.SocketAddress([options])

在 Node.js 中，`net.SocketAddress` 类有一个构造函数 `new net.SocketAddress([options])` 可以用于创建一个包含 IP 地址和端口号的对象。

通过 `net.SocketAddress` 构造函数，我们可以传入一个参数 `options`，该参数是一个对象，用于指定 IP 地址和端口号。如果不传入 `options` 参数，则会使用默认的值 `'0.0.0.0'` 和 `0`。

以下是一个示例：

```javascript
const net = require("net");

const address1 = new net.SocketAddress(); // 使用默认值
console.log(address1.address); // '0.0.0.0'
console.log(address1.port); // 0

const address2 = new net.SocketAddress({ address: "127.0.0.1", port: 80 }); // 指定IP地址和端口号
console.log(address2.address); // '127.0.0.1'
console.log(address2.port); // 80
```

上面的示例中，我们分别创建了两个 `net.SocketAddress` 对象，其中一个使用了默认的 IP 地址和端口号，另一个则指定了 IP 地址为 `'127.0.0.1'`，端口号为 `80`。接着，我们打印出了每个对象中的 IP 地址和端口号。

需要注意的是，在使用 `net.SocketAddress` 构造函数时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `net.SocketAddress` 的构造函数和相关用法，在后续的学习中将有所帮助。

#### socketaddress.address

在 Node.js 中，`socketaddress.address` 是 `net.SocketAddress` 类的一个属性，用于获取 IP 地址。

通过 `socketaddress.address` 属性，我们可以获取一个 `net.SocketAddress` 对象中的 IP 地址。

以下是一个示例：

```javascript
const net = require("net");

const address = new net.SocketAddress("127.0.0.1", 80);

console.log(address.address); // '127.0.0.1'
```

上面的示例中，我们创建了一个包含 IP 地址为 `'127.0.0.1'` 和端口号为 `80` 的 `net.SocketAddress` 对象，并使用 `address` 属性获取了其中的 IP 地址。接着，我们打印出了获取的结果。

需要注意的是，在使用 `socketaddress.address` 属性时，需要先创建一个 `net.SocketAddress` 对象，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `socketaddress.address` 属性在 `net.SocketAddress` 类中的作用和用法，为后续的学习提供了基础。

#### socketaddress.family

在 Node.js 中，`socketaddress.family` 是 `net.SocketAddress` 类的一个属性，用于获取 IP 地址的类型。

通过 `socketaddress.family` 属性，我们可以获取一个 `net.SocketAddress` 对象中的 IP 地址的类型，可以是 `'IPv4'` 或 `'IPv6'`。

以下是一个示例：

```javascript
const net = require("net");

const address1 = new net.SocketAddress("127.0.0.1", 80);
console.log(address1.family); // 'IPv4'

const address2 = new net.SocketAddress("fe80::", 80);
console.log(address2.family); // 'IPv6'
```

上面的示例中，我们分别创建了两个包含不同类型 IP 地址的 `net.SocketAddress` 对象，并使用 `family` 属性获取了其中 IP 地址的类型。接着，我们打印出了获取的结果。

需要注意的是，在使用 `socketaddress.family` 属性时，需要先创建一个 `net.SocketAddress` 对象，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `socketaddress.family` 属性在 `net.SocketAddress` 类中的作用和用法，为后续的学习提供了基础。

#### socketaddress.flowlabel

在 Node.js 中，`socketaddress.flowlabel` 是 `net.SocketAddress` 类的一个属性，用于获取 IPv6 地址的流标识。

通过 `socketaddress.flowlabel` 属性，我们可以获取一个 `net.SocketAddress` 对象中的 IPv6 地址的流标识。如果该对象不是 IPv6 地址，则该属性为 `undefined`。

以下是一个示例：

```javascript
const net = require("net");

const address1 = new net.SocketAddress("127.0.0.1", 80);
console.log(address1.flowlabel); // undefined

const address2 = new net.SocketAddress("fe80::1%eth0", 80);
console.log(address2.flowlabel); // undefined

const address3 = new net.SocketAddress("fe80::1%eth0/flowid=42", 80);
console.log(address3.flowlabel); // 42
```

上面的示例中，我们分别创建了三个 `net.SocketAddress` 对象，其中前两个是 IPv4 地址和带有 IPv6 地址但没有流标识的 IPv6 地址，第三个是带有流标识的 IPv6 地址。接着，我们使用 `flowlabel` 属性获取了其中 IPv6 地址的流标识。对于前两个对象，因为它们不是 IPv6 地址，所以该属性返回值为 `undefined`；对于第三个对象，因为它是带有流标识的 IPv6 地址，所以该属性返回值为 `42`。

需要注意的是，在使用 `socketaddress.flowlabel` 属性时，需要先创建一个 `net.SocketAddress` 对象，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `socketaddress.flowlabel` 属性在 `net.SocketAddress` 类中的作用和用法，为后续的学习提供了基础。

#### socketaddress.port

在 Node.js 中，`socketaddress.port` 是 `net.SocketAddress` 类的一个属性，用于获取端口号。

通过 `socketaddress.port` 属性，我们可以获取一个 `net.SocketAddress` 对象中的端口号。

以下是一个示例：

```javascript
const net = require("net");

const address = new net.SocketAddress("127.0.0.1", 80);

console.log(address.port); // 80
```

上面的示例中，我们创建了一个包含 IP 地址为 `'127.0.0.1'` 和端口号为 `80` 的 `net.SocketAddress` 对象，并使用 `port` 属性获取了其中的端口号。接着，我们打印出了获取的结果。

需要注意的是，在使用 `socketaddress.port` 属性时，需要先创建一个 `net.SocketAddress` 对象，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `socketaddress.port` 属性在 `net.SocketAddress` 类中的作用和用法，为后续的学习提供了基础。

### Class: net.Server

在 Node.js 中，`net.Server` 是一个类，用于创建 TCP 或本地服务器。

通过 `net.Server` 类，我们可以创建一个 TCP 或本地服务器，并对其进行相应的操作和处理。该类包含多个方法和事件，可以帮助我们完成各种网络编程任务。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("client connected");

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.write("hello\r\n");
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});
```

上面的示例中，我们创建了一个 TCP 服务器，并使用 `createServer` 方法创建了一个服务器实例。在服务器实例中，我们使用回调函数来处理连接事件和收到的数据，当客户端连接时，服务器会打印出 `'client connected'`；当客户端发送数据时，服务器会打印出接收到的数据；当客户端断开连接时，服务器会打印出 `'client disconnected'`。另外，在连接建立后，服务器还向客户端发送了一条消息 `'hello\r\n'`。最后，我们使用 `listen` 方法将服务器绑定到端口 `8080` 上，并在控制台输出监听成功的消息。

需要注意的是，在使用 `net.Server` 类时，需要根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `net.Server` 类在 Node.js 中的作用和用法，为后续的学习提供了基础。

#### new net.Server([options][, connectionlistener])

在 Node.js 中，`new net.Server([options][, connectionlistener])` 是 `net.Server` 类的构造函数，用于创建 TCP 或本地服务器。

通过 `net.Server` 的构造函数，我们可以创建一个 TCP 或本地服务器，并指定相应的选项和连接事件处理函数。该函数包含两个可选参数，分别是 `options` 和 `connectionlistener`。

`options` 参数是一个对象，用于指定服务器的选项。该对象中可以包含以下属性：

- `allowHalfOpen`: 一个布尔值，表示在对等方关闭其写入流之前，是否允许此端口继续读取数据，默认为 `false`。
- `pauseOnConnect`: 一个布尔值，表示每次连接后是否将套接字传递给监听器，同时暂停数据流， 默认为 `false`。

`connectionlistener` 参数是一个回调函数，用于处理客户端连接事件。该函数可以有一个参数，表示连接的 `socket` 对象。在 `socket` 对象中，我们可以使用多个方法和事件来处理客户端连接和发送的数据。

以下是一个示例：

```javascript
const net = require("net");

const server = new net.Server((socket) => {
  // 处理连接事件
  console.log("client connected");

  // 处理收到的数据
  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
  });

  // 处理断开连接事件
  socket.on("end", () => {
    console.log("client disconnected");
  });

  // 向客户端发送消息
  socket.write("hello\r\n");
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});
```

上面的示例中，我们使用 `new net.Server` 构造函数创建了一个 TCP 服务器，并使用回调函数来处理连接事件和收到的数据。在连接建立时，服务器会打印出 `'client connected'`；当客户端发送数据时，服务器会打印出接收到的数据；当客户端断开连接时，服务器会打印出 `'client disconnected'`。另外，在连接建立后，服务器还向客户端发送了一条消息 `'hello\r\n'`。最后，我们使用 `listen` 方法将服务器绑定到端口 `8080` 上，并在控制台输出监听成功的消息。

需要注意的是，在使用 `net.Server` 构造函数时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `new net.Server` 构造函数在 `net.Server` 类中的作用和用法，为后续的学习提供了基础。

#### 'close'

在 Node.js 中，`'close'` 是 `net.Server` 类的一个事件，在服务器关闭时触发。

当服务器调用 `server.close()` 方法进行关闭时，会触发 `'close'` 事件，并执行相应的回调函数。该事件可以用于监听服务器关闭事件，进行必要的清理工作。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("client connected");

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.write("hello\r\n");
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});

server.on("close", () => {
  console.log("server closed");
});
```

上面的示例中，我们创建了一个 TCP 服务器，并使用 `listen` 方法将其绑定到端口 `8080` 上。在服务器关闭时，会触发 `'close'` 事件，并输出 `'server closed'`。另外，在连接建立后，服务器还向客户端发送了一条消息 `'hello\r\n'`。

需要注意的是，在使用 `'close'` 事件时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `'close'` 事件在 `net.Server` 类中的作用和用法，为后续的学习提供了基础。

#### 'connection'

在 Node.js 中，`'connection'` 是 `net.Server` 类的一个事件，在有新连接建立时触发。

当客户端连接到服务器时，会触发 `'connection'` 事件，并执行相应的回调函数。该事件可以用于处理与客户端的通信和数据交换。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("client connected");

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.write("hello\r\n");
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});

server.on("connection", (socket) => {
  console.log("new connection established");
});
```

上面的示例中，我们创建了一个 TCP 服务器，并使用 `listen` 方法将其绑定到端口 `8080` 上。在客户端连接到服务器时，会触发 `'connection'` 事件，并输出 `'new connection established'`。另外，在连接建立后，服务器还向客户端发送了一条消息 `'hello\r\n'`。

需要注意的是，在使用 `'connection'` 事件时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `'connection'` 事件在 `net.Server` 类中的作用和用法，为后续的学习提供了基础。

#### 'error'

在 Node.js 中，`'error'` 是 `net.Server` 类的一个事件，在服务器发生错误时触发。

当服务器发生错误时，会触发 `'error'` 事件，并执行相应的回调函数。该事件可以用于监听服务器错误事件，并进行相应的处理和排查。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("client connected");

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.write("hello\r\n");
});

server.on("error", (err) => {
  console.error(`server error: ${err.message}`);
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});
```

上面的示例中，我们创建了一个 TCP 服务器，并使用 `listen` 方法将其绑定到端口 `8080` 上。在服务器发生错误时，会触发 `'error'` 事件，并输出错误信息。另外，在连接建立后，服务器还向客户端发送了一条消息 `'hello\r\n'`。

需要注意的是，在使用 `'error'` 事件时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `'error'` 事件在 `net.Server` 类中的作用和用法，为后续的学习提供了基础。

#### 'listening'

在 Node.js 中，`'listening'` 是 `net.Server` 类的一个事件，在服务器开始监听时触发。

当服务器调用 `server.listen()` 方法开始监听端口时，会触发 `'listening'` 事件，并执行相应的回调函数。该事件可以用于监听服务器监听事件，并进行必要的处理和操作。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("client connected");

  socket.on("data", (data) => {
    console.log(`received data: ${data}`);
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.write("hello\r\n");
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});

server.on("listening", () => {
  console.log("server started listening");
});
```

上面的示例中，我们创建了一个 TCP 服务器，并使用 `listen` 方法将其绑定到端口 `8080` 上。在服务器开始监听时，会触发 `'listening'` 事件，并输出 `'server started listening'`。另外，在连接建立后，服务器还向客户端发送了一条消息 `'hello\r\n'`。

需要注意的是，在使用 `'listening'` 事件时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `'listening'` 事件在 `net.Server` 类中的作用和用法，为后续的学习提供了基础。

#### 'drop'

在 Node.js 中，`'drop'` 是 `http.IncomingMessage` 类的一个事件，在 HTTP 请求被丢弃时触发。

当客户端发送 HTTP 请求时，服务器会根据一些规则进行对请求的处理和分析，如果请求无效或不符合要求，则会将其丢弃并触发 `'drop'` 事件。

以下是一个示例：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  // 监听 'drop' 事件
  req.on("drop", (err) => {
    console.error(`request dropped: ${err.message}`);
  });

  res.end("hello world");
});

server.listen(8080, () => {
  console.log("server listening on port 8080");
});
```

上面的示例中，我们创建了一个 HTTP 服务器，并使用 `listen` 方法将其绑定到端口 `8080` 上。在监听 HTTP 请求时，我们可以使用 `req.on('drop', callback)` 方法来监听 `'drop'` 事件，并输出错误信息。另外，在请求处理完毕后，服务器还向客户端发送了一条消息 `'hello world'`。

需要注意的是，在使用 `'drop'` 事件时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `'drop'` 事件在 `http.IncomingMessage` 类中的作用和用法，为后续的学习提供了基础。

#### server.address()

在 Node.js 中，`server.address()` 是 `net.Server` 类的一个方法，用于获取服务器绑定的地址和端口信息。

当服务器调用 `server.listen()` 方法绑定到指定的地址和端口后，可以使用 `server.address()` 方法来获取实际绑定的地址和端口信息，并进行相应的处理和操作。

以下是一个示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("client connected");
});

server.listen(8080, "127.0.0.1", () => {
  const address = server.address();
  console.log(`server listening on ${address.address}:${address.port}`);
});
```

上面的示例中，我们创建了一个 TCP 服务器，并使用 `listen` 方法将其绑定到本机地址 `127.0.0.1` 和端口 `8080` 上。在服务器开始监听后，我们调用 `server.address()` 方法获取实际绑定的地址和端口信息，并输出该信息。

需要注意的是，在使用 `server.address()` 方法时，可以根据实际情况进行相应的调整和修改，并遵循相应的规范和约定。同时，在编写程序时，也需要考虑到安全和性能等因素，并采取相应的措施进行防范和优化。

通过这个介绍，我们可以了解到 `server.address()` 方法在 `net.Server` 类中的作用和用法，为后续的学习提供了基础。

#### server.close([callback])

`server.close([callback])`是 Node.js 中的一个方法，用于关闭一个正在运行的服务器。当你调用该方法时，服务器将停止监听新的连接请求，并等待所有当前活动的连接处理完成后关闭。

该方法接受一个可选的回调函数作为参数，该回调函数在服务器完全关闭后执行。

下面是一个简单的示例，演示如何使用`server.close()`方法关闭一个 HTTP 服务器：

```javascript
const http = require("http");

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// 监听 8000 端口
server.listen(8000, () => {
  console.log("Server listening on port 8000...");
});

// 关闭服务器
server.close(() => {
  console.log("Server closed.");
});
```

在上述代码中，我们首先创建了一个 HTTP 服务器并将其绑定到 8000 端口。然后，我们调用`server.close()`方法来关闭服务器，并在服务器关闭后打印一条消息。

需要注意的是，如果服务器正在处理活动的连接，则该方法不会立即关闭服务器，而是等待所有连接都处理完毕后再关闭。如果您需要强制立即关闭服务器并且不关心是否有活动的连接正在处理，请考虑使用`server.destroy()`方法。

#### server.getConnections(callback)

`server.getConnections(callback)`是 Node.js 中的一个方法，用于获取当前活动连接的数量。

该方法接受一个回调函数作为参数，当获取连接数完成时，该回调函数将被调用并传递两个参数：第一个参数是错误对象（如果有的话），第二个参数是当前活动连接的数量。

下面是一个简单的示例，演示如何使用`server.getConnections()`方法获取当前活动连接的数量：

```javascript
const http = require("http");

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// 监听 8000 端口
server.listen(8000, () => {
  console.log("Server listening on port 8000...");
});

// 获取当前活动连接的数量
server.getConnections((err, count) => {
  if (err) {
    console.error("Error getting connections:", err);
  } else {
    console.log(`Active connections: ${count}`);
  }
});
```

在上述代码中，我们首先创建了一个 HTTP 服务器并将其绑定到 8000 端口。然后，我们调用`server.getConnections()`方法来获取当前活动连接的数量，并在获取完成后打印该数量。

需要注意的是，由于`server.getConnections()`方法是异步的，因此必须使用回调函数来处理获取连接数的结果。

#### server.listen()

`server.listen()`是 Node.js 中的一个方法，用于启动一个服务器并开始监听传入的连接请求。该方法接受多个参数，包括要监听的端口、主机名以及一个可选的回调函数。

以下是使用`server.listen()`方法创建 HTTP 服务器的示例代码：

```javascript
const http = require("http");

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// 监听 8000 端口
server.listen(8000, () => {
  console.log("Server listening on port 8000...");
});
```

在上述代码中，我们首先使用`http.createServer()`方法创建了一个 HTTP 服务器，并将其绑定到一个回调函数，该回调函数在每次收到请求时都会被调用。然后，我们调用`server.listen()`方法来启动服务器并开始监听传入的连接请求。在这个例子中，我们指定服务器监听端口 8000，并提供一个回调函数，该函数在服务器启动后被调用。

需要注意的是，如果不指定要监听的主机名，则默认情况下服务器将监听所有可用的网络接口。

#### server.listening

`server.listening`是 Node.js 中的一个属性，用于检查服务器是否正在监听传入的连接请求。

当调用`server.listen()`方法启动一个服务器并开始监听传入请求时，`server.listening`属性将被设置为 true。如果服务器没有启动或已经停止，则该属性的值为 false。

以下是一个简单的示例，演示如何使用`server.listening`属性检查服务器是否正在监听传入的连接请求：

```javascript
const http = require("http");

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// 监听 8000 端口
server.listen(8000, () => {
  console.log("Server listening on port 8000...");
});

// 检查服务器是否正在监听
if (server.listening) {
  console.log("Server is listening...");
} else {
  console.log("Server is not listening...");
}
```

在上述代码中，我们首先创建了一个 HTTP 服务器，并使用`server.listen()`方法将其绑定到 8000 端口。然后，我们检查`server.listening`属性的值，以确定服务器是否正在监听传入的连接请求。

需要注意的是，由于`server.listen()`方法是异步的，因此在调用该方法后立即检查`server.listening`属性的值可能会得到不准确的结果。最好在提供的回调函数中检查该属性的值，以确保服务器已经成功启动并正在监听传入的连接请求。

#### server.maxConnections

`server.maxConnections`是 Node.js 中的一个属性，用于设置服务器所允许的最大连接数。当连接数达到该限制时，服务器将拒绝新的连接请求。

以下是一个简单的示例，演示如何使用`server.maxConnections`属性设置服务器的最大连接数：

```javascript
const http = require("http");

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// 设置最大连接数为 10
server.maxConnections = 10;

// 监听 8000 端口
server.listen(8000, () => {
  console.log("Server listening on port 8000...");
});
```

在上述代码中，我们首先创建了一个 HTTP 服务器，并使用`server.maxConnections`属性将其最大连接数设置为 10。然后，我们使用`server.listen()`方法启动服务器并开始监听传入的连接请求。

需要注意的是，如果没有设置`server.maxConnections`属性，则服务器默认允许无限制连接。此外，由于不同的操作系统和网络配置可能会限制服务器连接的最大数量，因此设置较高的`server.maxConnections`值并不能保证所有连接都能够被处理。

#### server.ref()

`server.ref()`是 Node.js 中的一个方法，用于恢复服务器接受连接请求的处理。当调用`server.unref()`方法后，服务器将停止接受连接请求的处理。如果调用`server.ref()`方法，则可以重新启用服务器的处理。

以下是一个简单的示例，演示如何使用`server.ref()`方法重新启用服务器的连接请求处理：

```javascript
const http = require("http");

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// 监听 8000 端口
server.listen(8000, () => {
  console.log("Server listening on port 8000...");
});

// 停止接受连接请求的处理
server.unref();

// 重新启用连接请求的处理
setTimeout(() => {
  server.ref();
}, 5000);
```

在上述代码中，我们首先创建了一个 HTTP 服务器，并使用`server.listen()`方法将其绑定到 8000 端口。然后，我们调用`server.unref()`方法停止服务器接受连接请求的处理。最后，我们使用`setTimeout()`函数和`server.ref()`方法在 5 秒后重新启用连接请求的处理。

需要注意的是，使用`server.unref()`方法或`server.ref()`方法可能会影响服务器的事件循环行为。如果不理解这些方法的工作原理，请务必仔细阅读相关文档，并进行测试和验证。

#### server.unref()

在 Node.js 中， `server.unref()` 是一个用于取消一个服务器对象对事件循环的阻塞的方法。当调用 `server.listen()` 方法时，服务器对象会自动将它自己添加到事件循环中，以等待客户端请求。

通常情况下，当 Node.js 进程中还有其他活动的任务或事件时，服务器对象会一直保持运行状态，直到所有这些任务和事件都完成后才会退出 Node.js 进程。但是，在某些情况下，你可能希望服务器对象不会阻塞 Node.js 进程的退出，而是允许 Node.js 进程在没有服务器对象的情况下正常退出。这就是 `server.unref()` 方法的作用。

调用 `server.unref()` 方法将允许服务器对象与事件循环分离，从而使得 Node.js 进程在没有服务器对象的情况下也能够正常退出。这个方法是非常有用的，特别是在编写测试代码或者编写短期服务的时候。

以下是一个简单的示例，展示了如何使用 `server.unref()` 方法：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World\n");
});

server.listen(3000);

// Allow the process to exit without waiting for existing connections.
server.unref();
```

在上面的示例中，我们创建了一个简单的 HTTP 服务器，并将其绑定到端口 3000 上。然后，我们调用 `server.unref()` 方法，使服务器对象与事件循环分离，从而允许 Node.js 进程在没有服务器对象的情况下正常退出。

### Class: net.Socket

在 Node.js 中， `net.Socket` 是一个内置的类，它提供了一种创建客户端和服务器之间网络连接的方式。使用 `net.Socket` 类，你可以通过 TCP 或 UNIX 套接字与服务器建立连接，并在连接上发送和接收数据。

当你使用 `net.createServer()` 方法创建一个服务器时，每个新的客户端连接都会触发一个 `connection` 事件。在这个事件中，Node.js 会自动创建一个 `net.Socket` 对象，代表该客户端连接。你可以使用这个 `net.Socket` 对象来与客户端进行通信。

以下是一个简单的示例，展示了如何使用 `net.Socket` 类来创建一个 TCP 客户端：

```javascript
const net = require("net");

// Create a new TCP client.
const client = new net.Socket();

// Connect to the server.
client.connect(3000, "localhost", () => {
  console.log("Connected to server!");

  // Send data to the server.
  client.write("Hello, server!");
});

// Receive data from the server.
client.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

// Handle errors.
client.on("error", (err) => {
  console.error(`Error occurred: ${err.message}`);
});

// Handle close event.
client.on("close", () => {
  console.log("Connection closed.");
});
```

在上面的示例中，我们首先创建了一个新的 `net.Socket` 对象，然后调用它的 `connect()` 方法来连接服务器。一旦连接建立成功，我们就可以使用 `write()` 方法向服务器发送数据。当从服务器接收到数据时，`data` 事件将被触发，我们可以通过监听这个事件来处理收到的数据。如果发生任何错误，`error` 事件将被触发。最后，当连接关闭时，`close` 事件将被触发。

除了 TCP 客户端外，`net.Socket` 还可以用于创建 TCP 服务器和 UNIX 套接字客户端/服务器。你可以查看 Node.js 官方文档以获得更详细的信息。

#### new net.Socket([options])

`new net.Socket([options])` 是 Node.js 提供的用于在网络上进行 socket 连接的构造函数。当你需要在 Node.js 代码中实现客户端或服务器端的 socket 连接时，可以使用该构造函数创建一个新的 socket 实例。

首先，让我们来解释一下什么是 socket。Socket（套接字）是计算机网络中的一个概念，它是应用层与传输层之间的接口，用于实现进程之间的通信。在网络编程中，socket 被称为“套接字”，是一种特殊的文件描述符，它支持 TCP 或 UDP 协议等传输层协议，可以实现两台计算机之间的通信。

`new net.Socket()` 的参数 options 是一个可选对象，其中包含了一些属性，可以用于配置 socket 实例的行为。下面是部分常见的 options：

- `allowHalfOpen`：布尔值，指定是否允许半打开状态，默认为 false。
- `fd`：整数类型，指定已经存在的文件描述符，建立 socket 连接后将会对其进行包装。
- `readable` / `writable`：布尔值，设置 socket 是否可读/写，默认都为 true。
- `timeout`：整数类型，指定 socket 连接超时时间。

例如，以下代码展示了如何创建一个新的 socket 实例，并使用其连接到目标主机和端口：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("close", () => {
  console.log("Connection closed.");
});
```

在这个例子中，我们使用 `new net.Socket()` 创建了一个新的 socket 实例，然后调用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。当连接成功建立后，我们通过监听 `socket.on('data')` 事件来接收从服务器发送过来的数据，并在 `socket.on('close')` 事件中处理连接关闭的情况。

#### 'close'

`'close'` 是 Node.js 中用于监听 socket 连接关闭事件的一个字符串类型的事件名称。

当使用 `socket.end()` 或者 `socket.destroy()` 方法手动关闭连接时，或者在连接过程中出现错误导致连接被意外关闭时，Node.js 会触发 `'close'` 事件，以通知应用程序连接已经关闭。

你可以通过在 socket 实例上监听 `'close'` 事件来处理连接关闭的情况。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected.");

  socket.on("end", () => {
    console.log("Client disconnected.");
  });

  socket.on("close", () => {
    console.log("Connection closed.");
  });

  // ...
});

server.listen(3000, () => {
  console.log("Server started.");
});
```

在这个例子中，我们创建了一个 TCP 服务器，并在每次有客户端连接到服务器时（即触发 `'connection'` 事件时），都会为其创建一个新的 socket 实例。然后，我们分别监听了 `socket.on('end')` 和 `socket.on('close')` 事件，以处理客户端断开连接和连接关闭的情况。

需要注意的是，在默认情况下，当一个连接被关闭时，Node.js 并不会立即释放连接相关的资源，而是将其标记为“半打开”状态，等待另一端的确认。如果你想在关闭连接时立即释放所有相关资源，可以使用 `socket.destroy()` 方法，该方法会强制关闭连接并立即释放所有相关资源。

#### 'connect'

`'connect'` 是 Node.js 中用于监听 socket 连接成功事件的一个字符串类型的事件名称。

当你使用 `socket.connect()` 方法连接到远程主机并成功建立连接时，Node.js 会触发 `'connect'` 事件，以通知应用程序连接已经建立成功。

你可以通过在 socket 实例上监听 `'connect'` 事件来处理连接成功的情况。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

socket.on("connect", () => {
  console.log("Connection established.");
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。当连接成功建立后，Node.js 会触发 `'connect'` 事件，我们通过监听该事件并打印日志，以表明连接已经建立成功。

需要注意的是，与连接关闭事件不同，当连接成功建立后，Node.js 并没有默认提供一种方式来保持连接状态。如果你需要在长时间连接中保持连接状态，可以考虑实现心跳机制或使用其他可靠的通信协议来保证连接的可靠性。

#### 'data'

`'data'` 是 Node.js 中用于监听 socket 接收数据事件的一个字符串类型的事件名称。

当你使用 `socket.write()` 方法向远程主机发送数据时，或者从远程主机接收到数据时，Node.js 会触发 `'data'` 事件，以通知应用程序有新的数据到达。

你可以通过在 socket 实例上监听 `'data'` 事件来处理接收到的数据。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们通过监听 `'data'` 事件并打印日志，以在每次接收到数据时输出该数据。

需要注意的是，当从远程主机接收到数据时，Node.js 并不会保证将所有数据一次性全部传递给应用程序，可能会分多次传输。因此，你需要在 `'data'` 事件中手动处理接收到的数据并确保完整性。

#### 'drain'

`'drain'` 是 Node.js 中用于监听 socket 缓冲区空闲事件的一个字符串类型的事件名称。

当你使用 `socket.write()` 方法向远程主机发送数据时，Node.js 会将数据添加到内部写缓冲区中，并立即返回。如果写缓冲区已满，则 `socket.write()` 方法将返回 false，以指示应用程序停止写入数据，直到缓冲区可用为止。

在缓冲区中的数据被成功发送到远程主机并且缓冲区变为空闲状态时，Node.js 会触发 `'drain'` 事件，以通知应用程序可以继续写入数据。

你可以通过在 socket 实例上监听 `'drain'` 事件来实现流控制。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

let isWriting = false;

function writeData() {
  if (!isWriting) {
    isWriting = true;
    const buffer = Buffer.from("Hello, world!");
    const success = socket.write(buffer);
    if (success) {
      console.log("Data written:", buffer.toString());
      isWriting = false;
    } else {
      console.log("Buffer full, waiting for drain event.");
    }
  }
}

socket.on("drain", () => {
  console.log("Buffer is empty, continue writing data.");
  writeData();
});

writeData();
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们定义了一个 `writeData` 函数，在函数中尝试将一段数据写入 socket 连接中。如果写缓冲区已满，则等待 `'drain'` 事件发生后再继续写入数据。

最后，我们通过监听 `'drain'` 事件来处理缓冲区空闲的情况，并在该事件发生时调用 `writeData` 函数以继续写入数据。

需要注意的是，虽然 `'drain'` 事件通常用于流控制，但它并不保证所有数据都已经被成功传输到远程主机。因此，你需要在 `'error'` 和 `'close'` 等事件中处理可能存在的错误和异常情况。

#### 'end'

`'end'` 是 Node.js 中用于监听 socket 连接结束事件的一个字符串类型的事件名称。

当你使用 `socket.end()` 方法主动关闭连接，或者在连接过程中出现错误导致连接被意外关闭时，Node.js 会触发 `'end'` 事件，以通知应用程序连接已经结束。

你可以通过在 socket 实例上监听 `'end'` 事件来处理连接结束的情况。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

socket.on("end", () => {
  console.log("Connection ended.");
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们通过监听 `'end'` 事件并打印日志，以在连接结束时输出该消息。

需要注意的是，与连接关闭事件不同，当连接结束时，Node.js 并不会保留连接相关的资源，而是立即释放所有相关资源。因此，如果你想在连接断开后重新连接到远程主机，你需要重新创建一个新的 socket 实例来建立新的连接。

#### 'error'

`'error'` 是 Node.js 中用于监听 socket 连接错误事件的一个字符串类型的事件名称。

当在连接过程中发生错误，或者在数据传输过程中出现异常时，Node.js 会触发 `'error'` 事件，以通知应用程序发生了错误。

你可以通过在 socket 实例上监听 `'error'` 事件来处理连接错误的情况。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

socket.on("error", (err) => {
  console.error("Error occurred:", err.message);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们通过监听 `'error'` 事件并打印日志，以在发生错误时输出该错误信息。

需要注意的是，与其他事件不同，'error' 事件的监听器必须被注册，否则 Node.js 默认会将该事件抛出到全局，导致进程崩溃。因此，建议在使用 socket 时始终注册 `'error'` 事件的监听器，并在事件回调函数中进行错误处理和恢复操作。

#### 'lookup'

`'lookup'` 是 Node.js 中用于监听 DNS 查询完成事件的一个字符串类型的事件名称。

当你使用 `net.connect()` 或 `net.Socket.connect()` 方法连接到远程主机时，Node.js 会尝试将主机名解析为 IP 地址。在 DNS 查询过程中，Node.js 会触发 `'lookup'` 事件，以通知应用程序查询已经完成。

你可以通过在 socket 实例上监听 `'lookup'` 事件来处理 DNS 查询完成的情况。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const HOSTNAME = "www.google.com";
const PORT = 80;

socket.connect(PORT, HOSTNAME, () => {
  console.log("Connected to server!");
});

socket.on("lookup", (err, address, family) => {
  if (err) {
    console.error("DNS lookup failed:", err.message);
  } else {
    console.log(
      `Resolved hostname ${HOSTNAME} to address ${address} (${family}).`
    );
  }
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到远程主机 www.google.com 的端口 80。然后，我们通过监听 `'lookup'` 事件并打印日志，以在 DNS 查询完成时输出该消息。

需要注意的是，当进行 DNS 查询时可能会出现错误或超时，因此你需要在 `'error'` 事件和 `'timeout'` 事件中处理可能存在的异常情况。

#### 'ready'

抱歉，Node.js 中没有名为 `'ready'` 的标准事件。可能是您误解了官方文档中提到的某个概念或术语，请再次核对您的学习材料。如果有任何疑问，欢迎您提出更具体的问题，我会尽力回答。

#### 'timeout'

`'timeout'` 是 Node.js 中用于监听 socket 连接超时事件的一个字符串类型的事件名称。

当你使用 `socket.setTimeout()` 方法设置连接超时时间并在指定时间内未能建立连接，或者在数据传输过程中一段时间内没有新数据到达时，Node.js 会触发 `'timeout'` 事件，以通知应用程序连接已经超时。

你可以通过在 socket 实例上监听 `'timeout'` 事件来处理连接超时的情况。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.setTimeout(10000); // 设置连接超时时间为 10 秒

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");
});

socket.on("timeout", () => {
  console.error("Connection timeout.");
  socket.destroy(); // 手动销毁 socket 实例
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们使用 `socket.setTimeout()` 方法设置连接超时时间为 10 秒，并通过监听 `'timeout'` 事件来处理连接超时的情况。

需要注意的是，当连接超时时，Node.js 并不会自动销毁 socket 实例，而是保留该实例以供进一步处理。因此，你需要在超时事件中手动调用 `socket.destroy()` 方法来销毁 socket 实例并释放资源。

#### socket.address()

`socket.address()` 是 Node.js 中用于获取 socket 地址信息的方法。

当你创建一个新的 socket 实例并使用 `socket.bind()` 绑定一个本地端口后，Node.js 会自动分配一个可用的 IP 地址和端口号，并使用该地址和端口来监听传入的连接请求。此时，你可以使用 `socket.address()` 方法获取当前 socket 的地址信息。

`socket.address()` 方法返回一个对象，包含以下属性：

- `address`：表示 socket 的 IP 地址字符串。
- `family`：表示 socket 地址类型的字符串（'IPv4' 或 'IPv6'）。
- `port`：表示 socket 的端口号整数值。

例如，以下是一个简单的示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log(
    `Client connected from ${socket.address().address}:${socket.address().port}`
  );
});

server.listen(3000, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
```

在这个例子中，我们创建了一个新的 TCP 服务器并使用 `server.listen()` 方法将其绑定到本地主机和端口为 3000。然后，我们使用 `server.address().port` 获取服务器的实际监听端口，并使用 `socket.address()` 获取客户端连接的地址信息。

需要注意的是，如果调用 `socket.address()` 方法之前还未调用 `socket.bind()` 方法或 `socket.connect()` 方法，可能会导致返回 undefined 或不完整的地址信息对象。

#### socket.bufferSize

`socket.bufferSize` 是 Node.js 中用于获取 socket 缓冲区大小的属性。

在网络传输过程中，socket 会将数据存储在缓冲区中，以便在任何时候快速读写。`socket.bufferSize` 属性返回当前 socket 缓冲区中等待发送但尚未发送的字节数。

你可以使用 `socket.write(data)` 方法向 socket 写入数据，并通过监听 `'drain'` 事件来检测何时可以继续写入更多数据。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log("Connected to server!");

  const data = "Hello, world!";
  const bufferSize = socket.bufferSize;

  // 检查写入数据前的缓冲区大小
  console.log(`Buffer size before write: ${bufferSize}`);

  // 向 socket 写入数据
  const success = socket.write(data);

  if (success) {
    console.log(`Wrote ${data.length} bytes of data to socket.`);
  }

  // 监听 drain 事件以检查是否可以继续写入数据
  socket.on("drain", () => {
    console.log(`Socket's buffer is now empty.`);
  });
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们使用 `socket.bufferSize` 属性获取当前 socket 缓冲区的大小，并使用 `socket.write()` 方法向 socket 写入数据。如果写操作成功，则输出已写入的字节数，并监听 `'drain'` 事件以在缓冲区变为空时输出消息。

需要注意的是，由于网络不稳定或其他因素，写入数据可能无法立即完成，导致数据积压在缓冲区中。因此，在写入大量数据时，建议始终监听 `'drain'` 事件以确保数据能够顺利发送。

#### socket.bytesRead

`socket.bytesRead` 是 Node.js 中用于获取 socket 已接收字节数的属性。

在网络传输过程中，socket 会接收并存储从远程主机发送过来的数据。`socket.bytesRead` 属性返回当前 socket 已接收但尚未处理的字节数。

你可以使用 `socket.on('data', callback)` 方法监听 `'data'` 事件以在 socket 接收到新数据时进行处理。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log(
    `Client connected from ${socket.remoteAddress}:${socket.remotePort}`
  );

  // 监听 'data' 事件以在接收到新数据时对其进行处理
  socket.on("data", (data) => {
    console.log(
      `Received ${data.length} bytes of data from client:`,
      data.toString()
    );

    const bytesRead = socket.bytesRead;

    // 输出已接收的字节数
    console.log(`Total bytes received from client: ${bytesRead}`);
  });
});

server.listen(3000, () => {
  console.log(`Server is listening on port ${server.address().port}`);
});
```

在这个例子中，我们创建了一个新的 TCP 服务器并使用 `server.listen()` 方法将其绑定到本地主机和端口为 3000。然后，在每个客户端连接上，我们使用 `socket.on('data', callback)` 方法监听 `'data'` 事件以在接收到新数据时对其进行处理，并使用 `socket.bytesRead` 属性获取当前 socket 已接收的字节数并将其输出。

需要注意的是，由于网络不稳定或其他因素，可能会出现数据丢失、重复、延迟等问题，因此请务必在实际应用中采取适当的错误处理和容错措施以确保数据安全传输。

#### socket.bytesWritten

`socket.bytesWritten` 是 Node.js 中用于获取 socket 已发送字节数的属性。

在网络传输过程中，socket 会将数据发送给远程主机，并存储已发送但尚未确认的字节数。`socket.bytesWritten` 属性返回当前 socket 已发送但尚未得到确认的字节数。

你可以使用 `socket.write(data)` 方法向 socket 写入数据，并通过监听 `'drain'` 事件来检测何时可以继续写入更多数据。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const HOST = "localhost";
const PORT = 3000;

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  const data = "Hello, world!";
  const bytesWritten = socket.write(data);

  // 输出已写入的字节数
  console.log(`Wrote ${bytesWritten} bytes of data to server.`);

  // 监听 'drain' 事件以检查是否可以继续写入数据
  socket.on("drain", () => {
    console.log(`Socket's buffer is now empty.`);
  });
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们使用 `socket.write()` 方法向 socket 写入数据，并使用 `socket.bytesWritten` 属性获取已写入的字节数并输出。如果写入操作成功，则输出已写入的字节数，并监听 `'drain'` 事件以在缓冲区变为空时输出消息。

需要注意的是，由于网络不稳定或其他因素，写入数据可能无法立即完成，导致数据积压在缓冲区中。因此，在写入大量数据时，建议始终监听 `'drain'` 事件以确保数据能够顺利发送，并使用 `socket.bytesWritten` 属性跟踪已写入的字节数。

#### socket.connect()

`socket.connect()` 是 Node.js 中用于创建 TCP 或 UNIX 套接字连接的方法。

当你想要建立一个网络连接时，你需要创建一个新的 socket 实例并使用 `socket.connect()` 方法将其连接到指定的主机和端口。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。连接成功后，会触发回调函数并输出 "Connected to server at localhost:3000"。

需要注意的是，由于网络连接可能需要一些时间来建立，因此建议始终在回调函数中进行后续操作，以确保连接已经建立。另外，如果连接失败，则会自动触发 `'error'` 事件。你可以在 socket 实例上监听 `'error'` 事件来处理连接错误。

#### socket.connecting

`socket.connecting` 是 Node.js 中用于获取 socket 当前是否正在建立连接的布尔值属性。

当使用 `socket.connect()` 方法发起一个连接请求时，该方法会立即返回并在后台异步地进行连接操作。在连接成功或失败之前，`socket.connecting` 属性将一直保持为 true。如果连接成功或失败，则 `socket.connecting` 将变为 false。

你可以在监听 `'connect'` 事件和 `'error'` 事件时使用 `socket.connecting` 属性来检测当前连接状态。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);
});

// 每隔一秒钟检查一次连接状态
setInterval(() => {
  if (socket.connecting) {
    console.log("Still connecting...");
  } else {
    console.log("Connected!");
  }
}, 1000);

// 监听 'connect' 事件以在连接成功时输出消息
socket.on("connect", () => {
  console.log("Connection established!");
});

// 监听 'error' 事件以在连接失败时输出错误信息
socket.on("error", (err) => {
  console.error(`Error occurred: ${err.message}`);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们使用 `setInterval()` 定时器每隔一秒钟检查一次连接状态，并根据 `socket.connecting` 属性输出不同的消息。同时，我们也监听了 `'connect'` 事件和 `'error'` 事件以处理连接成功和失败的情况。

需要注意的是，由于网络连接可能需要一些时间来建立，因此在建立连接期间，socket 可能无法进行其他操作。如果需要在连接成功后立即发送数据，请确保在 `'connect'` 事件回调函数中执行相应操作。

#### socket.destroy([error])

`socket.destroy([error])` 是 Node.js 中用于立即销毁 socket 连接并释放其资源的方法。它可以在任何时候调用，包括连接建立之前、期间和之后。

使用 `socket.destroy()` 方法会立即终止当前 socket 连接，并触发 `'close'` 事件。如果提供了可选的 `error` 参数，则会将其作为错误原因传递给 `'close'` 事件回调函数。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  // 10 秒钟后销毁 socket 连接
  setTimeout(() => {
    console.log("Destroying socket...");
    socket.destroy();
  }, 10000);
});

// 监听 'close' 事件以输出关闭消息
socket.on("close", (hadError) => {
  if (hadError) {
    console.error("Socket closed due to an error.");
  } else {
    console.log("Socket closed successfully.");
  }
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们使用 `setTimeout()` 定时器在 10 秒钟后调用 `socket.destroy()` 方法销毁 socket 连接。同时，我们也监听了 `'close'` 事件以处理 socket 关闭的情况。

需要注意的是，一旦调用了 `socket.destroy()` 方法，该 socket 实例就不能再用于发送或接收数据。如果你想关闭连接而不是立即销毁它，请使用 `socket.end()` 或 `socket.write()` 方法向远程主机发送结束标记。

#### socket.destroyed

`socket.destroyed` 是 Node.js 中用于获取 socket 当前是否已销毁的布尔值属性。

当使用 `socket.destroy()` 方法销毁一个 socket 连接后，`socket.destroyed` 属性将变为 true。此时，该 socket 实例不再可用于发送或接收数据，并且不能再通过它进行连接、绑定等操作。

你可以在监听 `'close'` 事件和其他需要检测连接状态的场景中使用 `socket.destroyed` 属性来检测当前连接是否已经被销毁。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  // 10 秒钟后销毁 socket 连接
  setTimeout(() => {
    console.log("Destroying socket...");
    socket.destroy();
  }, 10000);
});

// 监听 'close' 事件以输出关闭消息
socket.on("close", (hadError) => {
  if (socket.destroyed) {
    console.log("Socket has been destroyed.");
  } else if (hadError) {
    console.error("Socket closed due to an error.");
  } else {
    console.log("Socket closed successfully.");
  }
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们使用 `setTimeout()` 定时器在 10 秒钟后调用 `socket.destroy()` 方法销毁 socket 连接。同时，我们也监听了 `'close'` 事件以处理 socket 关闭的情况，并在其中使用 `socket.destroyed` 属性检测 socket 是否已经被销毁。

需要注意的是，在 socket 连接成功或失败之前，`socket.destroyed` 属性始终为 false。因此，在检测连接状态时请确保在 `'close'` 事件回调函数中执行相关操作。

#### socket.destroySoon()

`socket.destroySoon()` 是 Node.js 中用于半关闭 socket 连接的方法。它会向远程主机发送一个结束标记（FIN），表示本地主机已经不再需要写入更多数据。

使用 `socket.destroySoon()` 方法会使得 socket 连接进入半关闭状态，此时只能接收来自远程主机的数据，而不能再向其发送数据。当所有待发送的数据都已经被缓存并成功传输后，连接将自动关闭，并触发 `'close'` 事件。

你可以在需要尽快关闭 socket 连接的场景中使用 `socket.destroySoon()` 方法。例如，在发送完所有数据后，你可以调用该方法以尽快关闭连接。以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  const data = "Hello, world!";

  // 向 socket 写入数据
  socket.write(data);

  // 发送结束标记并关闭连接
  socket.destroySoon();
});

// 监听 'close' 事件以输出关闭消息
socket.on("close", (hadError) => {
  if (hadError) {
    console.error("Socket closed due to an error.");
  } else {
    console.log("Socket closed successfully.");
  }
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们向 socket 写入数据，并使用 `socket.destroySoon()` 方法发送结束标记并关闭连接。同时，我们也监听了 `'close'` 事件以处理 socket 关闭的情况。

需要注意的是，一旦调用了 `socket.destroySoon()` 方法，该 socket 实例就不能再用于写入数据，但仍然可以接收来自远程主机的数据。如果你想立即关闭连接（包括读取和写入操作），请使用 `socket.destroy()` 方法。

#### socket.end([data[, encoding]][, callback])

`socket.end([data[, encoding]][, callback])` 是 Node.js 中用于结束 socket 连接并刷新缓冲区的方法。它会向远程主机发送一个结束标记（FIN），告知其本地主机已经不再需要发送更多数据。

使用 `socket.end()` 方法会使得 socket 连接进入半关闭状态，此时只能接收来自远程主机的数据，而不能再向其发送数据。如果提供了可选的 `data` 参数，则会将其写入 socket 缓冲区。当所有待发送的数据都已经被缓存并成功传输后，连接将自动关闭，并触发 `'finish'` 事件。

你可以在需要结束 socket 连接的场景中使用 `socket.end()` 方法。例如，在发送完所有数据后，你可以调用该方法以正常关闭连接。以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

const PORT = 3000;
const HOST = "localhost";

socket.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  const data = "Hello, world!";

  // 向 socket 写入数据
  socket.write(data);

  // 结束连接并输出消息
  socket.end(() => {
    console.log("Connection closed successfully.");
  });
});

// 监听 'finish' 事件以输出完成消息
socket.on("finish", () => {
  console.log("All data has been sent and connection is fully closed.");
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。然后，我们向 socket 写入数据，并使用 `socket.end()` 方法结束连接并输出相应的消息。同时，我们也监听了 `'finish'` 事件以处理连接关闭的情况。

需要注意的是，一旦调用了 `socket.end()` 方法，该 socket 实例就不能再用于写入数据，但仍然可以接收来自远程主机的数据。如果你只想关闭连接而不发送结束标记，请使用 `socket.destroy()` 或 `socket.destroySoon()` 方法。

#### socket.localAddress

`socket.localAddress` 是 Node.js 中用于获取 socket 绑定的本地 IP 地址的属性。

当创建一个新的 socket 实例时，该实例默认会自动绑定到某个可用的本地 IP 地址和端口。你可以使用 `socket.address()` 方法获取实际绑定的地址和端口信息，其中包括本地 IP 地址和端口号。

如果只想获取 socket 绑定的本地 IP 地址，可以通过访问 `socket.localAddress` 属性来实现。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("connect", () => {
  console.log(
    `Socket connected to ${socket.remoteAddress}:${socket.remotePort}`
  );
  console.log(`Local address is ${socket.localAddress}:${socket.localPort}`);
});

socket.connect(3000, "localhost");
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'connect'` 事件回调函数中，我们分别输出了远程主机和本地主机的地址和端口信息，并使用 `socket.localAddress` 属性获取了本地 IP 地址。

需要注意的是，`socket.localAddress` 属性仅在调用 `socket.bind()` 或者使用 `socket.connect()` 连接成功之后才会被设置。如果连接尚未建立或已经销毁，它将返回 undefined。

#### socket.localPort

`socket.localPort` 是 Node.js 中用于获取 socket 绑定的本地端口号的属性。

当创建一个新的 socket 实例时，该实例默认会自动绑定到某个可用的本地 IP 地址和端口。你可以使用 `socket.address()` 方法获取实际绑定的地址和端口信息，其中包括本地 IP 地址和端口号。

如果只想获取 socket 绑定的本地端口号，可以通过访问 `socket.localPort` 属性来实现。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("connect", () => {
  console.log(
    `Socket connected to ${socket.remoteAddress}:${socket.remotePort}`
  );
  console.log(`Local address is ${socket.localAddress}:${socket.localPort}`);
});

socket.connect(3000, "localhost");
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'connect'` 事件回调函数中，我们分别输出了远程主机和本地主机的地址和端口信息，并使用 `socket.localPort` 属性获取了本地端口号。

需要注意的是，`socket.localPort` 属性仅在调用 `socket.bind()` 或者使用 `socket.connect()` 连接成功之后才会被设置。如果连接尚未建立或已经销毁，它将返回 undefined。

#### socket.localFamily

`socket.localFamily` 是 Node.js 中用于获取 socket 绑定的本地地址族（IP 版本）的属性。

在计算机网络中，IP 地址分为 IPv4 和 IPv6 两个版本，分别使用不同的地址格式和协议。当创建一个新的 socket 实例时，该实例会自动绑定到某个可用的本地 IP 地址和端口，并采用与其对应的地址族。

如果想要获取 socket 绑定的本地地址族，可以通过访问 `socket.localFamily` 属性来实现。例如，以下是一个简单的示例：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("connect", () => {
  console.log(
    `Socket connected to ${socket.remoteAddress}:${socket.remotePort}`
  );
  console.log(`Local address family is ${socket.localFamily}`);
});

socket.connect(3000, "localhost");
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'connect'` 事件回调函数中，我们输出了远程主机的地址和端口信息，并使用 `socket.localFamily` 属性获取了本地地址族。

需要注意的是，`socket.localFamily` 属性返回的值可能是 `'IPv4'` 或 `'IPv6'`。如果连接尚未建立或已经销毁，它将返回 undefined。

#### socket.pause()

`socket.pause()` 是 Node.js 中用于暂停读取数据的方法。当调用该方法后，socket 实例将不再触发 `'data'` 事件，直到调用 `socket.resume()` 方法恢复读取操作。

通常情况下，当你从 socket 实例中读取数据时，Node.js 会自动创建一个内部缓冲区并将数据存储在其中，然后触发 `'data'` 事件以通知应用程序有新的数据可用。如果你想暂停读取数据（例如在进行某些耗时操作时），则可以使用 `socket.pause()` 方法。

以下是一个简单的示例，演示了如何使用 `socket.pause()` 和 `socket.resume()` 方法：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.connect(3000, "localhost", () => {
  console.log("Connected to server.");

  // 暂停读取操作
  socket.pause();

  setTimeout(() => {
    // 恢复读取操作
    socket.resume();
  }, 5000);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'data'` 事件回调函数中，我们输出了接收到的数据。然后，我们使用 `socket.pause()` 方法暂停读取操作，并在 5 秒钟后使用 `socket.resume()` 方法恢复读取操作。

需要注意的是，一旦调用了 `socket.pause()` 方法，socket 实例将停止读取数据，但仍然可以发送数据。如果你想完全关闭 socket 连接，请使用 `socket.end()`、`socket.destroy()` 或 `socket.destroySoon()` 方法。

#### socket.pending

`socket.pending` 是 Node.js 中用于获取 socket 缓冲区中等待被读取的字节数的属性。

当从 socket 实例中读取数据时，Node.js 会自动创建一个内部缓冲区并将数据存储在其中。如果应用程序没有及时地处理这些数据，它们就会在缓冲区中等待被读取。此时，可以使用 `socket.pending` 属性查看当前缓冲区中等待被读取的字节数。

以下是一个简单的示例，演示了如何使用 `socket.pending` 属性：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.connect(3000, "localhost", () => {
  console.log("Connected to server.");

  setTimeout(() => {
    const pendingBytes = socket.pending;

    console.log(`There are ${pendingBytes} bytes pending in the buffer.`);
  }, 5000);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'data'` 事件回调函数中，我们输出了接收到的数据。然后，我们使用 `socket.pending` 属性获取了当前缓冲区中等待被读取的字节数，并在 5 秒钟后输出了这个值。

需要注意的是，`socket.pending` 属性仅在已经连接的 socket 实例中才有意义。如果连接尚未建立或已经销毁，它将返回 undefined。并且，由于 `socket.pending` 属性只能反映当前缓冲区中等待被读取的字节数，它并不能告诉你整个输入流中有多少字节可供读取。如果要确定可用的数据量，还需要考虑其他因素（例如网络延迟、对端发送数据的速度等）。

#### socket.ref()

`socket.ref()` 是 Node.js 中用于恢复 socket 实例计数器的方法。当创建一个新的 socket 实例时，Node.js 会自动启动一个资源管理器来跟踪该实例的使用情况。如果该实例仍有其他活动的事件监听器或定时器，Node.js 就会继续运行资源管理器，以确保该实例不会被过早地销毁。

然而，如果没有其他活动的事件监听器或定时器，socket 实例就可能被过早地销毁。为避免这种情况，可以使用 `socket.ref()` 方法恢复实例的计数器，以确保它不会被提前销毁。

以下是一个简单的示例，演示了如何使用 `socket.ref()` 方法：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Socket connected.");

  // 暂停读取操作
  socket.pause();

  setTimeout(() => {
    // 恢复读取操作
    socket.resume();
  }, 5000);
});

server.listen(3000, "localhost", () => {
  console.log("Server listening on port 3000.");
});

setTimeout(() => {
  // 获取当前连接数
  const connections = server.getConnections();

  console.log(`There are currently ${connections} connections.`);

  // 暂停接受连接操作
  server.close();

  setTimeout(() => {
    // 恢复接受连接操作
    server.listen(3000, "localhost");
  }, 5000);
}, 10000);
```

在这个例子中，我们创建了一个新的 TCP 服务器，并使用 `server.listen()` 方法将其绑定到本地主机和端口号 3000。在 `'connection'` 事件回调函数中，我们输出了收到的 socket 连接信息，并使用 `socket.pause()` 方法暂停了数据读取操作。然后，我们在 5 秒钟后使用 `socket.resume()` 方法恢复读取操作。

在 10 秒钟后，我们使用 `server.getConnections()` 方法获取当前连接数，并在控制台中输出该值。接着，我们使用 `server.close()` 方法暂停接受新连接的操作，并在 5 秒钟后使用 `server.listen()` 方法恢复接受连接的操作。

需要注意的是，`socket.ref()` 方法只有在 socket 实例上没有其他活动的事件监听器或定时器时才有效。否则，socket 实例的计数器将不会被恢复，因为还有其他活动的监听器或定时器在使用该实例。

#### socket.remoteAddress

`socket.remoteAddress` 是 Node.js 中用于获取 socket 远程主机的 IP 地址的属性。当你使用 socket 实例建立一个 TCP 连接时，该连接包含两个端点：本地主机和远程主机。

在这种情况下，socket 实例会自动绑定到本地 IP 地址和端口号，并连接到远程主机的 IP 地址和端口号。如果你想获得远程主机的 IP 地址，可以通过访问 `socket.remoteAddress` 属性来实现。

以下是一个简单的示例，演示了如何使用 `socket.remoteAddress` 属性：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("connect", () => {
  console.log(
    `Socket connected to ${socket.remoteAddress}:${socket.remotePort}`
  );
});

socket.connect(3000, "localhost");
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'connect'` 事件回调函数中，我们输出了远程主机的地址和端口信息，并使用 `socket.remoteAddress` 属性获取了远程主机的 IP 地址。

需要注意的是，`socket.remoteAddress` 属性仅在已经连接的 socket 实例中才有意义。如果连接尚未建立或已经销毁，它将返回 undefined。另外，如果 socket 实例与远程主机之间的连接是通过一个代理服务器建立的，则可能需要进一步处理才能正确地获取远程主机的 IP 地址。

#### socket.remoteFamily

`socket.remoteFamily` 是 Node.js 中用于获取 socket 远程主机的地址族（IP 版本）的属性。

在计算机网络中，IP 地址分为 IPv4 和 IPv6 两个版本，分别使用不同的地址格式和协议。当创建一个新的 socket 实例时，该实例会自动绑定到某个可用的本地 IP 地址和端口，并连接到远程主机的 IP 地址和端口。此时，可以通过访问 `socket.remoteFamily` 属性来获取远程主机的地址族。

以下是一个简单的示例，演示了如何使用 `socket.remoteFamily` 属性：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("connect", () => {
  console.log(
    `Socket connected to ${socket.remoteAddress}:${socket.remotePort}`
  );
  console.log(`Remote address family is ${socket.remoteFamily}`);
});

socket.connect(3000, "localhost");
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'connect'` 事件回调函数中，我们输出了远程主机的地址和端口信息，并使用 `socket.remoteFamily` 属性获取了远程主机的地址族。

需要注意的是，`socket.remoteFamily` 属性返回的值可能是 `'IPv4'` 或 `'IPv6'`，取决于远程主机的 IP 版本。如果连接尚未建立或已经销毁，它将返回 undefined。另外，如果 socket 实例与远程主机之间的连接是通过一个代理服务器建立的，则可能需要进一步处理才能正确地获取远程主机的地址族。

#### socket.remotePort

`socket.remotePort` 是 Node.js 中用于获取 socket 远程主机的端口号的属性。当你使用 socket 实例建立一个 TCP 连接时，该连接包含两个端点：本地主机和远程主机。

在这种情况下，socket 实例会自动绑定到本地 IP 地址和端口号，并连接到远程主机的 IP 地址和端口号。如果你想获得远程主机的端口号，可以通过访问 `socket.remotePort` 属性来实现。

以下是一个简单的示例，演示了如何使用 `socket.remotePort` 属性：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("connect", () => {
  console.log(
    `Socket connected to ${socket.remoteAddress}:${socket.remotePort}`
  );
});

socket.connect(3000, "localhost");
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.connect()` 方法连接到本地主机和端口为 3000 的服务器。在 `'connect'` 事件回调函数中，我们输出了远程主机的地址和端口信息，并使用 `socket.remotePort` 属性获取了远程主机的端口号。

需要注意的是，`socket.remotePort` 属性仅在已经连接的 socket 实例中才有意义。如果连接尚未建立或已经销毁，它将返回 undefined。另外，如果 socket 实例与远程主机之间的连接是通过一个代理服务器建立的，则可能需要进一步处理才能正确地获取远程主机的端口号。

#### socket.resetAndDestroy()

抱歉，Node.js 中并不存在 `socket.resetAndDestroy()` 方法。请检查您的文档是否有误或提供更多上下文信息以便我能够理解您的问题并给予更准确的回答。

#### socket.resume()

`socket.resume()` 是 Node.js 中用于恢复 socket 实例的数据读取的方法。当使用 socket 实例从另一个端点（远程主机）接收数据时，Node.js 会自动创建一个内部缓冲区并将数据存储在其中。如果应用程序没有及时地处理这些数据，它们就会在缓冲区中等待被读取。

此时，可以使用 `socket.resume()` 方法来恢复数据读取，以便应用程序可以继续处理接收到的数据。该方法会告诉 Node.js 可以开始向该 socket 实例的缓冲区中读入数据了。

以下是一个简单的示例，演示了如何使用 `socket.resume()` 方法：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Socket connected.");

  // 暂停读取操作
  socket.pause();

  setTimeout(() => {
    // 恢复读取操作
    socket.resume();
  }, 5000);

  socket.on("data", (data) => {
    console.log(`Received data: ${data}`);
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server listening on port 3000.");
});
```

在这个例子中，我们创建了一个新的 TCP 服务器，并使用 `server.listen()` 方法将其绑定到本地主机和端口号 3000。在 `'connection'` 事件回调函数中，我们输出了收到的 socket 连接信息，并使用 `socket.pause()` 方法暂停了数据读取操作。然后，在 5 秒钟后我们使用 `socket.resume()` 方法恢复数据读取操作。

同时，我们还为 socket 实例注册了 `'data'` 事件监听器，以便在接收到数据时输出它们的内容。

需要注意的是，`socket.resume()` 方法只能在已经连接的 socket 实例中恢复数据读取操作。如果连接尚未建立或已经销毁，它将不起作用。另外，调用 `socket.resume()` 方法并不保证立即有可用的数据可供读取，这取决于网络延迟、对端发送数据的速度等因素。

#### socket.setEncoding([encoding])

`socket.setEncoding([encoding])` 是 Node.js 中用于设置 socket 实例的编码方式的方法。当使用 socket 实例从另一个端点（远程主机）接收数据时，Node.js 会将这些数据存储在内部缓冲区中，并默认将其视为 Buffer 类型。

如果应用程序希望以文本形式处理这些数据，可以使用 `socket.setEncoding()` 方法将编码方式设置为 `'utf8'` 或其他支持的文本编码格式。

以下是一个简单的示例，演示了如何使用 `socket.setEncoding()` 方法：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Socket connected.");

  socket.setEncoding("utf8");

  socket.on("data", (data) => {
    console.log(`Received data: ${data}`);
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server listening on port 3000.");
});
```

在这个例子中，我们创建了一个新的 TCP 服务器，并使用 `server.listen()` 方法将其绑定到本地主机和端口号 3000。在 `'connection'` 事件回调函数中，我们输出了收到的 socket 连接信息，并使用 `socket.setEncoding('utf8')` 方法将编码方式设置为 `'utf8'`。然后，我们为 socket 实例注册了 `'data'` 事件监听器，以便在接收到数据时输出它们的内容。

需要注意的是，`socket.setEncoding()` 方法只对接收到的数据进行解码，不会对发送到远程主机的数据进行编码。如果需要对发送的数据进行编码，请使用 `Buffer.from()` 等方法将数据转换为 Buffer 类型。另外，如果省略 `encoding` 参数，则默认使用 `'utf8'` 编码方式。

#### socket.setKeepAlive([enable][, initialdelay])

`socket.setKeepAlive([enable][, initialDelay])` 是 Node.js 中用于设置 socket 实例的 keep-alive 选项的方法。TCP keep-alive 是一种机制，它使得一个连接在长时间没有通信的情况下保持存活状态，并且能够检测到连接是否已经断开。

当使用 `socket.setKeepAlive()` 方法启用 keep-alive 选项时，Node.js 会自动发送心跳包（keep-alive 消息）到远程主机，以确保连接处于活动状态。如果在指定时间内没有收到心跳包的响应，则认为连接已经断开，并触发 `'error'` 或 `'close'` 事件。

以下是一个简单的示例，演示了如何使用 `socket.setKeepAlive()` 方法：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.setKeepAlive(true, 5000);

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});

socket.connect(3000, "localhost", () => {
  console.log("Socket connected.");

  setTimeout(() => {
    // 发送一个大数据包来模拟长时间没有通信的状态
    socket.write(Buffer.alloc(1024 * 1024, "a"));
  }, 10000);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.setKeepAlive(true, 5000)` 方法启用了 keep-alive 选项，并设置了心跳间隔时间为 5 秒。同时，我们为 socket 实例注册了 `'error'` 和 `'close'` 事件监听器，以便在出现错误或连接关闭时输出相应的信息。

然后，我们使用 `socket.connect()` 方法将该 socket 实例连接到本地主机和端口号为 3000 的服务器。在连接成功后，我们通过 `setTimeout()` 函数模拟长时间没有通信的状态，并发送一个大数据包来触发 keep-alive 机制。

需要注意的是，`socket.setKeepAlive()` 方法只对已经建立的连接进行设置，无法影响之前或之后建立的连接。另外，`initialDelay` 参数表示启用 keep-alive 选项后第一次发送心跳包的延迟时间，默认为 2 小时。

#### socket.setNoDelay([noDelay])

`socket.setNoDelay([noDelay])` 是 Node.js 中用于设置 socket 实例的 Nagle 算法选项的方法。Nagle 算法是一种流量控制算法，它将小尺寸的数据包合并成一个大的数据包再发送，从而减少网络流量和延迟，提高网络效率。但是，在某些情况下，这种算法可能会对实时性要求较高的应用程序产生负面影响。

如果需要立即将数据发送给远程主机而不进行缓存或等待，可以使用 `socket.setNoDelay(true)` 方法关闭 Nagle 算法。这意味着每次调用 `socket.write()` 方法都会立即发送一个 TCP 数据包，而不管该数据包的大小。

以下是一个简单的示例，演示了如何使用 `socket.setNoDelay()` 方法：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.setNoDelay(true);

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});

socket.connect(3000, "localhost", () => {
  console.log("Socket connected.");

  setInterval(() => {
    // 每隔 1 秒发送一个数据包
    socket.write(Buffer.alloc(1024, "a"));
  }, 1000);
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.setNoDelay(true)` 方法关闭了 Nagle 算法。同时，我们为 socket 实例注册了 `'error'` 和 `'close'` 事件监听器，以便在出现错误或连接关闭时输出相应的信息。

然后，我们使用 `socket.connect()` 方法将该 socket 实例连接到本地主机和端口号为 3000 的服务器。在连接成功后，我们使用 `setInterval()` 函数每隔 1 秒钟发送一个数据包。

需要注意的是，`socket.setNoDelay()` 方法只能影响当前 socket 实例上的数据发送行为，无法影响其他 socket 实例或之前/之后建立的连接。另外，默认情况下，Nagle 算法是开启的，即 `socket.setNoDelay(false)`，如果想要关闭此算法，需要显式地将参数设置为 `true`。

#### socket.setTimeout(timeout[, callback])

`socket.setTimeout(timeout[, callback])` 是 Node.js 中用于设置 socket 实例的超时时间的方法。当使用 socket 实例进行数据传输时，如果在指定的超时时间内没有收到远程主机的响应，则会认为连接已经超时，并触发相应的事件回调函数。

可以通过 `socket.setTimeout()` 方法设置超时时间，并在超时或其他错误发生时执行回调函数来处理异常情况。

以下是一个简单的示例，演示了如何使用 `socket.setTimeout()` 方法：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Socket connected.");

  socket.setTimeout(5000, () => {
    console.error("Socket timeout.");
    socket.destroy();
  });

  socket.on("data", (data) => {
    console.log(`Received data: ${data}`);

    // 发送响应数据
    socket.write(`Server response to ${data}`);
  });

  socket.on("error", (err) => {
    console.error(`Socket error: ${err.message}`);
  });

  socket.on("close", () => {
    console.log("Socket closed.");
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server listening on port 3000.");
});
```

在这个例子中，我们创建了一个新的 TCP 服务器，并使用 `server.listen()` 方法将其绑定到本地主机和端口号 3000。在 `'connection'` 事件回调函数中，我们输出了收到的 socket 连接信息，并使用 `socket.setTimeout(5000)` 方法设置了超时时间为 5 秒钟。同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

其中，超时事件回调函数中我们使用 `socket.destroy()` 方法销毁当前 socket 实例，以避免进一步的数据传输操作。需要注意的是，`socket.setTimeout()` 方法只能影响当前 socket 实例上的超时行为，无法影响其他 socket 实例或之前/之后建立的连接。另外，如果省略 `callback` 参数，则默认为清除当前 socket 实例上的超时计时器。

#### socket.timeout

`socket.timeout` 是 Node.js 中用于访问 socket 实例的超时时间的属性。当使用 socket 实例进行数据传输时，如果在指定的超时时间内没有收到远程主机的响应，则会认为连接已经超时，并触发相应的事件回调函数。

可以通过 `socket.timeout` 属性读取当前 socket 实例的超时时间，并根据需要进行相应的处理。

以下是一个简单的示例，演示了如何使用 `socket.timeout` 属性：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.setTimeout(5000);

console.log(`Socket timeout: ${socket.timeout}`);

socket.on("timeout", () => {
  console.error("Socket timeout.");
  socket.destroy();
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});

socket.connect(3000, "localhost", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.alloc(1024, "a"));
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.setTimeout(5000)` 方法设置了超时时间为 5 秒钟。然后，我们输出了当前 socket 实例的超时时间，并为其注册了 `'timeout'`、`'error'` 和 `'close'` 事件监听器，以便在超时、出现错误或连接关闭时输出相应的信息。

其中，超时事件回调函数中我们使用 `socket.destroy()` 方法销毁当前 socket 实例，以避免进一步的数据传输操作。需要注意的是，`socket.timeout` 属性只能读取和修改当前 socket 实例上的超时时间，无法影响其他 socket 实例或之前/之后建立的连接。另外，如果需要修改超时时间，请使用 `socket.setTimeout()` 方法。

#### socket.unref()

`socket.unref()` 是 Node.js 中用于解除 socket 实例对事件循环的阻塞的方法。在应用程序中，如果有一个或多个 socket 实例处于活动状态，则会阻止应用程序自动退出。为了避免这种情况发生，可以使用 `socket.unref()` 方法使得当前 socket 实例不再被视为事件循环的一部分。

当调用 `socket.unref()` 方法后，即使当前 socket 实例仍然处于活动状态，事件循环也不会再等待其完成。这意味着，在没有其他活动的事件时，应用程序可以自动退出。

以下是一个简单的示例，演示了如何使用 `socket.unref()` 方法：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Socket connected.");

  // 停止事件循环的计时器
  setTimeout(() => {
    console.log("Timer expired.");
    socket.destroy();
  }, 5000).unref();

  socket.on("data", (data) => {
    console.log(`Received data: ${data}`);

    // 发送响应数据
    socket.write(`Server response to ${data}`);
  });

  socket.on("error", (err) => {
    console.error(`Socket error: ${err.message}`);
  });

  socket.on("close", () => {
    console.log("Socket closed.");
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server listening on port 3000.");
});
```

在这个例子中，我们创建了一个新的 TCP 服务器，并使用 `server.listen()` 方法将其绑定到本地主机和端口号 3000。在 `'connection'` 事件回调函数中，我们输出了收到的 socket 连接信息，并使用 `setTimeout().unref()` 方法设置了一个停止事件循环的计时器，以避免长时间等待。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。在这个例子中，我们并没有显式调用 `socket.unref()` 方法来解除对事件循环的阻塞，因为这里的 socket 实例只有在超时后才会被销毁。

需要注意的是，`socket.unref()` 方法只能解除当前 socket 实例对事件循环的阻塞，无法影响其他 socket 实例或之前/之后建立的连接。另外，一旦调用了 `socket.unref()` 方法，就不能再重新阻塞该 socket 实例对事件循环了。

#### socket.write(data[, encoding][, callback])

`socket.write(data[, encoding][, callback])` 是 Node.js 中用于向 socket 实例写入数据的方法。当应用程序与远程主机通信时，可以使用 `socket.write()` 方法将数据发送到远程主机。

该方法接受三个可选参数：

- `data`：要发送的数据，可以是字符串、Buffer 或 Uint8Array 类型。
- `encoding`：如果 `data` 参数是字符串类型，则指定字符编码，默认为 `'utf8'`。
- `callback`：在数据被成功发送到远程主机后，执行的回调函数。

以下是一个简单的示例，演示了如何使用 `socket.write()` 方法：

```javascript
const net = require("net");

const socket = new net.Socket();

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});

socket.connect(3000, "localhost", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.alloc(1024, "a"), (err) => {
    if (err) {
      console.error(`Write error: ${err.message}`);
    } else {
      console.log("Write success.");
    }
  });
});
```

在这个例子中，我们创建了一个新的 socket 实例，并为其注册了 `'error'` 和 `'close'` 事件监听器，以便在出现错误或连接关闭时输出相应的信息。然后，我们使用 `socket.connect()` 方法将该 socket 实例连接到本地主机和端口号为 3000 的服务器。

在连接成功后，我们使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包，并在数据发送成功后输出 `'Write success.'`。同时，我们还通过回调函数捕获可能的错误信息，在发生错误时输出 `'Write error.'`。

需要注意的是，`socket.write()` 方法只负责将数据发送到远程主机，无法保证数据被成功接收。如果需要确认数据是否已经传输成功，可以在回调函数中执行相应的处理。

#### socket.readyState

`socket.readyState` 是 Node.js 中用于访问 socket 实例当前状态的属性。在应用程序中，可以使用 `socket.readyState` 属性检查当前 socket 实例是否处于不同的状态，以便进行相应的处理。

在 Node.js 中，socket 实例有四个可能的状态：

- `'opening'`：socket 正在尝试建立连接。
- `'open'`：socket 已经成功建立连接，并且可以发送和接收数据。
- `'closing'`：socket 正在关闭连接。
- `'closed'`：socket 已经关闭连接。

以下是一个简单的示例，演示了如何使用 `socket.readyState` 属性：

```javascript
const net = require("net");

const socket = new net.Socket();

console.log(`Socket readyState: ${socket.readyState}`);

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log(`Socket closed. Socket readyState: ${socket.readyState}`);
});

socket.connect(3000, "localhost", () => {
  console.log(`Socket connected. Socket readyState: ${socket.readyState}`);

  // 发送数据包
  socket.write(Buffer.alloc(1024, "a"));

  // 关闭连接
  socket.end();
});
```

在这个例子中，我们创建了一个新的 socket 实例，并使用 `socket.readyState` 属性输出了其当前状态。在 `'error'` 和 `'close'` 事件回调函数中，我们同样也输出了当前 socket 实例的状态。

然后，我们使用 `socket.connect()` 方法将该 socket 实例连接到本地主机和端口号为 3000 的服务器。在连接成功后，我们使用 `socket.write()` 方法向远程主机发送一个长度为 1024 字节、内容为 `'a'` 的数据包，并通过 `socket.end()` 方法关闭连接。

需要注意的是，`socket.readyState` 属性只能读取当前 socket 实例的状态，无法影响或修改其状态。如果需要修改 socket 实例的状态，请使用相应的方法或事件。

### net.connect()

`net.connect()` 是 Node.js 中用于创建一个新的 TCP 客户端连接的方法。当应用程序需要与远程主机进行通信时，可以使用 `net.connect()` 方法创建一个新的 TCP 连接，并将其绑定到指定的主机和端口号。

该方法接受三个必选参数：

- `options`：一个包含主机名、端口号等信息的配置对象，也可以是一个字符串。
- `connectionListener(socket)`：在连接成功后执行的回调函数，其中 `socket` 参数表示已连接的 socket 实例。
- `connectListener()`：在连接失败时执行的回调函数。

以下是一个简单的示例，演示了如何使用 `net.connect()` 方法：

```javascript
const net = require("net");

const socket = net.connect({
  host: "localhost",
  port: 3000,
});

socket.on("connect", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.alloc(1024, "a"));
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.connect()` 方法创建一个新的 TCP 连接，并将其绑定到本地主机和端口号为 3000 的服务器。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.connect()` 方法只负责创建一个新的 TCP 连接，并返回对应的 socket 实例。如果需要向远程主机发送数据或接收数据，必须使用相应的方法或事件。

#### net.connect(options[, connectListener])

`net.connect(options[, connectListener])` 是 Node.js 中用于创建一个新的 TCP 客户端连接的方法。当应用程序需要与远程主机进行通信时，可以使用 `net.connect()` 方法创建一个新的 TCP 连接，并将其绑定到指定的主机和端口号。

该方法接受两个参数：

- `options`：一个包含主机名、端口号等信息的配置对象，也可以是一个字符串。
- `connectListener()`：在连接失败时执行的回调函数。

以下是一个简单的示例，演示了如何使用 `net.connect()` 方法：

```javascript
const net = require("net");

const socket = net.connect({
  host: "localhost",
  port: 3000,
});

socket.on("connect", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.alloc(1024, "a"));
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.connect()` 方法创建一个新的 TCP 连接，并将其绑定到本地主机和端口号为 3000 的服务器。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.connect()` 方法只负责创建一个新的 TCP 连接，并返回对应的 socket 实例。如果需要向远程主机发送数据或接收数据，必须使用相应的方法或事件。

#### net.connect(path[, connectListener])

`net.connect(path[, connectListener])` 是 Node.js 中用于创建一个基于文件的本地套接字连接的方法。在应用程序需要通过本地套接字与其他进程或服务进行通信时，可以使用 `net.connect()` 方法创建一个新的本地套接字连接。

该方法接受两个参数：

- `path`：一个包含本地套接字路径的字符串。
- `connectListener()`：在连接失败时执行的回调函数。

以下是一个简单的示例，演示了如何使用 `net.connect()` 方法创建一个基于文件的本地套接字连接：

```javascript
const net = require("net");

const socket = net.connect("/tmp/echo.sock");

socket.on("connect", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.from("Hello, world!"));
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.connect()` 方法创建一个基于文件的本地套接字连接，并将其绑定到 `/tmp/echo.sock` 文件路径。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个内容为 `'Hello, world!'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.connect()` 方法只负责创建一个新的本地套接字连接，并返回对应的 socket 实例。如果需要向其他进程或服务发送数据或接收数据，必须使用相应的方法或事件。

#### net.connect(port[, host][, connectlistener])

`net.connect(port[, host][, connectlistener])` 是 Node.js 中用于创建一个新的 TCP 客户端连接的方法。当应用程序需要与远程主机进行通信时，可以使用 `net.connect()` 方法创建一个新的 TCP 连接，并将其绑定到指定的主机和端口号。

该方法接受三个可选参数：

- `port`：一个整数，表示要连接的服务器监听的端口号。
- `host`：一个字符串，表示要连接的服务器的 IP 地址或域名，默认为 `'localhost'`。
- `connectListener()`：在连接失败时执行的回调函数。

以下是一个简单的示例，演示了如何使用 `net.connect()` 方法：

```javascript
const net = require("net");

const socket = net.connect({
  port: 3000,
  host: "localhost",
});

socket.on("connect", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.alloc(1024, "a"));
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.connect()` 方法创建一个新的 TCP 连接，并将其绑定到本地主机和端口号为 3000 的服务器。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.connect()` 方法只负责创建一个新的 TCP 连接，并返回对应的 socket 实例。如果需要向远程主机发送数据或接收数据，必须使用相应的方法或事件。

### net.createConnection()

`net.createConnection()` 是 Node.js 中用于创建一个新的 TCP 客户端连接的方法。与 `net.connect()` 方法类似，当应用程序需要与远程主机进行通信时，可以使用 `net.createConnection()` 方法创建一个新的 TCP 连接，并将其绑定到指定的主机和端口号。

该方法接受两个参数：

- `options`：一个包含主机名、端口号等信息的配置对象，也可以是一个字符串。
- `connectionListener(socket)`：在连接成功后执行的回调函数，其中 `socket` 参数表示已连接的 socket 实例。

以下是一个简单的示例，演示了如何使用 `net.createConnection()` 方法：

```javascript
const net = require("net");

const socket = net.createConnection(
  {
    host: "localhost",
    port: 3000,
  },
  () => {
    console.log("Socket connected.");

    // 发送数据包
    socket.write(Buffer.alloc(1024, "a"));
  }
);

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.createConnection()` 方法创建一个新的 TCP 连接，并将其绑定到本地主机和端口号为 3000 的服务器。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.createConnection()` 方法只负责创建一个新的 TCP 连接，并返回对应的 socket 实例。如果需要向远程主机发送数据或接收数据，必须使用相应的方法或事件。

#### net.createConnection(options[, connectListener])

`net.createConnection(options[, connectListener])` 是 Node.js 中用于创建一个新的 TCP 客户端连接的方法。与 `net.connect()` 方法类似，当应用程序需要与远程主机进行通信时，可以使用 `net.createConnection()` 方法创建一个新的 TCP 连接，并将其绑定到指定的主机和端口号。

该方法接受两个参数：

- `options`：一个包含主机名、端口号等信息的配置对象，也可以是一个字符串。
- `connectListener(socket)`：在连接成功后执行的回调函数，其中 `socket` 参数表示已连接的 socket 实例。

以下是一个简单的示例，演示了如何使用 `net.createConnection()` 方法：

```javascript
const net = require("net");

const socket = net.createConnection(
  {
    host: "localhost",
    port: 3000,
  },
  () => {
    console.log("Socket connected.");

    // 发送数据包
    socket.write(Buffer.alloc(1024, "a"));
  }
);

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.createConnection()` 方法创建一个新的 TCP 连接，并将其绑定到本地主机和端口号为 3000 的服务器。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.createConnection()` 方法只负责创建一个新的 TCP 连接，并返回对应的 socket 实例。如果需要向远程主机发送数据或接收数据，必须使用相应的方法或事件。

#### net.createConnection(path[, connectListener])

`net.createConnection(path[, connectListener])` 是 Node.js 中用于创建一个基于文件的本地套接字连接的方法。在应用程序需要通过本地套接字与其他进程或服务进行通信时，可以使用 `net.createConnection()` 方法创建一个新的本地套接字连接。

该方法接受两个参数：

- `path`：一个包含本地套接字路径的字符串。
- `connectListener(socket)`：在连接成功后执行的回调函数，其中 `socket` 参数表示已连接的 socket 实例。

以下是一个简单的示例，演示了如何使用 `net.createConnection()` 方法创建一个基于文件的本地套接字连接：

```javascript
const net = require("net");

const socket = net.createConnection("/tmp/echo.sock", () => {
  console.log("Socket connected.");

  // 发送数据包
  socket.write(Buffer.from("Hello, world!"));
});

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.createConnection()` 方法创建一个基于文件的本地套接字连接，并将其绑定到 `/tmp/echo.sock` 文件路径。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个内容为 `'Hello, world!'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.createConnection()` 方法只负责创建一个新的本地套接字连接，并返回对应的 socket 实例。如果需要向其他进程或服务发送数据或接收数据，必须使用相应的方法或事件。

#### net.createConnection(port[, host][, connectlistener])

`net.createConnection(port[, host][, connectlistener])` 是 Node.js 中用于创建一个新的 TCP 客户端连接的方法。当应用程序需要与远程主机进行通信时，可以使用 `net.createConnection()` 方法创建一个新的 TCP 连接，并将其绑定到指定的主机和端口号。

该方法接受三个可选参数：

- `port`：一个整数，表示要连接的服务器监听的端口号。
- `host`：一个字符串，表示要连接的服务器的 IP 地址或域名，默认为 `'localhost'`。
- `connectListener(socket)`：在连接成功后执行的回调函数，其中 `socket` 参数表示已连接的 socket 实例。

以下是一个简单的示例，演示了如何使用 `net.createConnection()` 方法：

```javascript
const net = require("net");

const socket = net.createConnection(
  {
    port: 3000,
    host: "localhost",
  },
  () => {
    console.log("Socket connected.");

    // 发送数据包
    socket.write(Buffer.alloc(1024, "a"));
  }
);

socket.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

socket.on("error", (err) => {
  console.error(`Socket error: ${err.message}`);
});

socket.on("close", () => {
  console.log("Socket closed.");
});
```

在这个例子中，我们使用 `net.createConnection()` 方法创建一个新的 TCP 连接，并将其绑定到本地主机和端口号为 3000 的服务器。在连接成功后，我们输出 `'Socket connected.'` 并使用 `socket.write()` 方法发送一个长度为 1024 字节、内容为 `'a'` 的数据包。

同时，我们还为 socket 实例注册了 `'data'`、`'error'` 和 `'close'` 事件监听器，以便在接收到数据、出现错误或连接关闭时输出相应的信息。

需要注意的是，`net.createConnection()` 方法只负责创建一个新的 TCP 连接，并返回对应的 socket 实例。如果需要向远程主机发送数据或接收数据，必须使用相应的方法或事件。

### net.createServer([options][, connectionlistener])

`net.createServer([options][, connectionlistener])` 是 Node.js 中用于创建一个 TCP 服务器的方法。当应用程序需要监听指定端口并处理来自客户端的请求时，可以使用 `net.createServer()` 方法创建一个新的 TCP 服务器。

该方法接受两个可选参数：

- `options`：一个包含服务器配置信息的对象。
- `connectionListener(connection)`：在每次有新的客户端连接时执行的回调函数，其中 `connection` 参数表示与客户端建立的 socket 连接实例。

以下是一个简单的示例，演示了如何使用 `net.createServer()` 方法：

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  // 接收数据
  socket.on("data", (data) => {
    console.log(`Received data: ${data}`);

    // 发送数据
    socket.write(`ECHO: ${data}`);
  });

  // 客户端断开连接
  socket.on("close", () => {
    console.log("Client disconnected.");
  });
});

server.listen(3000, () => {
  console.log("Server started and listening on port 3000.");
});
```

在这个例子中，我们使用 `net.createServer()` 方法创建一个 TCP 服务器，并将其绑定到本地主机和端口号为 3000。在每次有新的客户端连接时，我们输出 `Client connected: <remoteAddress>:<remotePort>` 并为 socket 实例注册 `'data'` 和 `'close'` 事件监听器，以便在接收到数据或客户端断开连接时输出相应的信息。

同时，我们在 `'data'` 事件监听器中向客户端发送一个带有 `'ECHO:'` 前缀的消息，表示对客户端请求进行回显。

需要注意的是，`net.createServer()` 方法只负责创建一个 TCP 服务器，并返回对应的 server 实例。如果需要处理客户端请求或向客户端发送数据，必须使用相应的方法或事件。

### net.isIP(input)

`net.isIP(input)` 是 Node.js 中用于判断给定字符串是否为 IP 地址的方法。当应用程序需要对用户输入进行验证或者处理某些操作时，可以使用 `net.isIP()` 方法检查指定字符串是否为合法的 IP 地址。

该方法接受一个参数：

- `input`：要检查的字符串。

以下是一个简单的示例，演示了如何使用 `net.isIP()` 方法：

```javascript
const net = require("net");

console.log(net.isIP("192.168.1.1")); // true
console.log(net.isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334")); // true
console.log(net.isIP("127.0.0.1")); // true
console.log(net.isIP("localhost")); // false
```

在这个例子中，我们向 `net.isIP()` 方法分别传入四个字符串作为参数，并输出其返回结果。前三个字符串分别是 IPv4 地址、IPv6 地址和 IPv4 的本地回环地址，都是合法的 IP 地址，因此返回值为 `true`。而最后一个字符串是 `'localhost'`，不是合法的 IP 地址，因此返回值为 `false`。

需要注意的是，`net.isIP()` 方法只能检查给定字符串是否为合法的 IP 地址，不能检查 IP 地址是否可达或有效。如果需要进一步验证 IP 地址的有效性，可以使用其他工具或库。

### net.isIPv4(input)

`net.isIPv4(input)` 是 Node.js 中用于判断给定字符串是否为 IPv4 地址的方法。当应用程序需要对用户输入进行验证或者处理某些操作时，可以使用 `net.isIPv4()` 方法检查指定字符串是否为合法的 IPv4 地址。

该方法接受一个参数：

- `input`：要检查的字符串。

以下是一个简单的示例，演示了如何使用 `net.isIPv4()` 方法：

```javascript
const net = require("net");

console.log(net.isIPv4("192.168.1.1")); // true
console.log(net.isIPv4("2001:0db8:85a3:0000:0000:8a2e:0370:7334")); // false
```

在这个例子中，我们向 `net.isIPv4()` 方法分别传入两个字符串作为参数，并输出其返回结果。第一个字符串是 IPv4 地址，是合法的 IPv4 地址，因此返回值为 `true`。而第二个字符串是 IPv6 地址，不是合法的 IPv4 地址，因此返回值为 `false`。

需要注意的是，`net.isIPv4()` 方法只能检查给定字符串是否为合法的 IPv4 地址，不能检查 IPv4 地址是否可达或有效。如果需要进一步验证 IPv4 地址的有效性，可以使用其他工具或库。

### net.isIPv6(input)

`net.isIPv6(input)` 是 Node.js 中用于判断给定字符串是否为 IPv6 地址的方法。当应用程序需要对用户输入进行验证或者处理某些操作时，可以使用 `net.isIPv6()` 方法检查指定字符串是否为合法的 IPv6 地址。

该方法接受一个参数：

- `input`：要检查的字符串。

以下是一个简单的示例，演示了如何使用 `net.isIPv6()` 方法：

```javascript
const net = require("net");

console.log(net.isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")); // true
console.log(net.isIPv6("192.168.1.1")); // false
```

在这个例子中，我们向 `net.isIPv6()` 方法分别传入两个字符串作为参数，并输出其返回结果。第一个字符串是 IPv6 地址，是合法的 IPv6 地址，因此返回值为 `true`。而第二个字符串是 IPv4 地址，不是合法的 IPv6 地址，因此返回值为 `false`。

需要注意的是，`net.isIPv6()` 方法只能检查给定字符串是否为合法的 IPv6 地址，不能检查 IPv6 地址是否可达或有效。如果需要进一步验证 IPv6 地址的有效性，可以使用其他工具或库。

