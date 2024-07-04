## HTTP/2

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。

以下是 HTTP/2 的一些主要特点：

- 二进制传输：HTTP/2 使用二进制格式进行数据传输，相比于 HTTP/1 中的文本格式，可以更快地解析和传输。
- 多路复用：HTTP/2 允许客户端同时发送多个请求到服务器，并允许服务器同时返回多个响应。这样可以避免 HTTP/1 中的队头阻塞问题。
- 首部压缩：HTTP/2 支持对请求和响应的首部信息进行压缩，可以减少传输数据量，提高传输速度。
- 服务器推送：HTTP/2 允许服务器在没有请求的情况下向客户端推送资源。

Node.js 支持 HTTP/2 协议，并提供了 `http2` 模块来实现 HTTP/2 功能。我们可以使用该模块来创建 HTTP/2 服务器和客户端，并进行相关的操作。

需要注意的是，使用 HTTP/2 协议时需要满足一定的条件，例如需要使用 TLS（Transport Layer Security）协议进行加密传输，需要使用域名而不是 IP 地址等。因此，在使用 HTTP/2 协议时需要注意相关的规范和要求。

通过这个介绍，我们可以了解 HTTP/2 协议的一些主要特点和相关概念，在实际应用中，我们可以根据具体的需求来选择合适的网络协议，并进行相应的操作。

### Determining if crypto support is unavailable

在 Node.js 中，我们可以使用 `crypto` 模块来进行加密和解密操作。但是，在某些情况下，由于缺少某些必要的软件包或硬件支持，可能会导致 `crypto` 模块无法正常工作。为了避免这种情况的发生，我们可以采用以下方法判断是否支持加密模块：

```javascript
const crypto = require("crypto");

if (!crypto.getCiphers()) {
  console.log("Crypto support is unavailable.");
} else {
  console.log("Crypto support is available.");
}
```

通过上述示例，我们可以看到如何使用 `crypto.getCiphers()` 方法来判断是否支持加密模块。具体来说，该方法返回一个数组，包含当前环境中可用的加密算法名称。如果该数组为空，则表示当前环境不支持加密模块。

需要注意的是，在使用 `crypto` 模块时，建议先判断是否支持加密模块，以便在发生错误时能够及时处理。同时，我们还可以根据具体的需求来选择合适的加密算法和解密算法，并进行相应的操作。

通过这个介绍，我们可以了解如何判断是否支持加密模块，并了解了在使用 `crypto` 模块时需要注意的一些问题。

### Core API

在 Node.js 中，Core API 是指 Node.js 提供的一系列核心模块和接口，可以帮助开发者快速构建高效稳定的应用程序。这些核心模块包括文件读写、网络通信、加解密等常用功能，并且都是基于 JavaScript 实现的。

以下是一些常用的 Core API：

- `fs` 模块：用于文件读写操作。
- `http` 和 `https` 模块：用于创建 HTTP 和 HTTPS 服务器和客户端。
- `crypto` 模块：用于加解密操作。
- `path` 模块：用于处理文件路径。
- `util` 模块：提供了一些实用工具函数，例如继承、事件监听等。
- `stream` 模块：用于处理流数据。
- `os` 模块：用于获取与操作系统相关的信息。
- `process` 模块：用于获取与进程相关的信息。

通过使用这些 Core API，我们可以快速构建各种类型的应用程序，例如 Web 应用程序、命令行工具等。

需要注意的是，在使用 Core API 时，我们需要了解每个模块的使用方法和相关规范，以便能够更好地利用这些模块来开发应用程序。

通过这个介绍，我们可以了解 Node.js 中的 Core API，并了解了一些常用的核心模块和接口，为后续的学习奠定了基础。

#### Http2Session

在 Node.js 中，`Http2Session` 是一个类，用于创建和管理 HTTP/2 会话。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `Http2Session` 类来创建和管理 HTTP/2 会话，以便进行相关的操作。

以下是一些常用的 `Http2Session` 方法：

- `close([callback])`：关闭当前 HTTP/2 会话。
- `destroy([error], [code], [callback])`：销毁当前 HTTP/2 会话。
- `ref()`：增加当前 HTTP/2 会话的引用计数。
- `unref()`：减少当前 HTTP/2 会话的引用计数。
- `ping([options], [callback])`：向对端发送 Ping 帧并等待响应。

需要注意的是，在使用 `Http2Session` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来创建和管理 HTTP/2 会话，并进行相关操作。

通过这个介绍，我们可以了解 `Http2Session` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### ServerHttp2Session

在 Node.js 中，`ServerHttp2Session` 是一个类，用于创建和管理 HTTP/2 服务器端的会话。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `ServerHttp2Session` 类来创建和管理 HTTP/2 服务器端的会话，以便进行相关的操作。

以下是一些常用的 `ServerHttp2Session` 方法：

- `close([error], [callback])`：关闭当前 HTTP/2 服务器端会话。
- `destroy([error], [code], [callback])`：销毁当前 HTTP/2 服务器端会话。
- `ref()`：增加当前 HTTP/2 服务器端会话的引用计数。
- `unref()`：减少当前 HTTP/2 服务器端会话的引用计数。
- `ping([options], [callback])`：向对端发送 Ping 帧并等待响应。

需要注意的是，在使用 `ServerHttp2Session` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来创建和管理 HTTP/2 服务器端会话，并进行相关操作。

通过这个介绍，我们可以了解 `ServerHttp2Session` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### ClientHttp2Session

在 Node.js 中，`ClientHttp2Session` 是一个类，用于创建和管理 HTTP/2 客户端的会话。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `ClientHttp2Session` 类来创建和管理 HTTP/2 客户端的会话，以便进行相关的操作。

以下是一些常用的 `ClientHttp2Session` 方法：

- `close([callback])`：关闭当前 HTTP/2 客户端会话。
- `destroy([error], [code], [callback])`：销毁当前 HTTP/2 客户端会话。
- `ref()`：增加当前 HTTP/2 客户端会话的引用计数。
- `unref()`：减少当前 HTTP/2 客户端会话的引用计数。
- `ping([options], [callback])`：向对端发送 Ping 帧并等待响应。

需要注意的是，在使用 `ClientHttp2Session` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来创建和管理 HTTP/2 客户端会话，并进行相关操作。

通过这个介绍，我们可以了解 `ClientHttp2Session` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### Http2Stream

在 Node.js 中，`Http2Stream` 是一个类，用于管理 HTTP/2 数据流。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `Http2Stream` 类来管理 HTTP/2 数据流，以便进行相关的操作。

以下是一些常用的 `Http2Stream` 方法：

- `close([callback])`：关闭当前 HTTP/2 数据流。
- `destroy([error], [code], [callback])`：销毁当前 HTTP/2 数据流。
- `ref()`：增加当前 HTTP/2 数据流的引用计数。
- `unref()`：减少当前 HTTP/2 数据流的引用计数。
- `priority(options)`：设置当前 HTTP/2 数据流的优先级。

需要注意的是，在使用 `Http2Stream` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来管理 HTTP/2 数据流，并进行相关操作。

通过这个介绍，我们可以了解 `Http2Stream` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### ClientHttp2Stream

在 Node.js 中，`ClientHttp2Stream` 是一个类，用于管理 HTTP/2 客户端的数据流。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `ClientHttp2Stream` 类来管理 HTTP/2 客户端的数据流，以便进行相关的操作。

以下是一些常用的 `ClientHttp2Stream` 方法：

- `close([callback])`：关闭当前 HTTP/2 客户端数据流。
- `destroy([error], [code], [callback])`：销毁当前 HTTP/2 客户端数据流。
- `ref()`：增加当前 HTTP/2 客户端数据流的引用计数。
- `unref()`：减少当前 HTTP/2 客户端数据流的引用计数。
- `priority(options)`：设置当前 HTTP/2 客户端数据流的优先级。

需要注意的是，在使用 `ClientHttp2Stream` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来管理 HTTP/2 客户端数据流，并进行相关操作。

通过这个介绍，我们可以了解 `ClientHttp2Stream` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### ServerHttp2Stream

在 Node.js 中，`ServerHttp2Stream` 是一个类，用于管理 HTTP/2 服务器端的数据流。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `ServerHttp2Stream` 类来管理 HTTP/2 服务器端的数据流，以便进行相关的操作。

以下是一些常用的 `ServerHttp2Stream` 方法：

- `close([callback])`：关闭当前 HTTP/2 服务器端数据流。
- `destroy([error], [code], [callback])`：销毁当前 HTTP/2 服务器端数据流。
- `ref()`：增加当前 HTTP/2 服务器端数据流的引用计数。
- `unref()`：减少当前 HTTP/2 服务器端数据流的引用计数。
- `priority(options)`：设置当前 HTTP/2 服务器端数据流的优先级。

需要注意的是，在使用 `ServerHttp2Stream` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来管理 HTTP/2 服务器端数据流，并进行相关操作。

通过这个介绍，我们可以了解 `ServerHttp2Stream` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### Http2Server

在 Node.js 中，`Http2Server` 是一个类，用于创建 HTTP/2 服务器实例。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。在使用 HTTP/2 协议时，我们可以使用 `Http2Server` 类来创建 HTTP/2 服务器实例，以便处理客户端的请求。

以下是一些常用的 `Http2Server` 方法：

- `close([callback])`：关闭当前 HTTP/2 服务器。
- `setTimeout(msecs, callback)`：设置当前 HTTP/2 服务器的超时时间。
- `addListener(event, listener)`：为当前 HTTP/2 服务器添加事件监听器。
- `removeListener(event, listener)`：从当前 HTTP/2 服务器中移除指定的事件监听器。

需要注意的是，在使用 `Http2Server` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来创建 HTTP/2 服务器实例，并进行相关操作。

通过这个介绍，我们可以了解 `Http2Server` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### Http2SecureServer

在 Node.js 中，`Http2SecureServer` 是一个类，用于创建基于 HTTPS 的 HTTP/2 服务器实例。

HTTPS 是一种通过 SSL/TLS 加密协议来保护网络通信安全的协议，在使用 HTTP/2 协议时，我们可以使用 `Http2SecureServer` 类来创建基于 HTTPS 的 HTTP/2 服务器实例，以便处理客户端的请求，并保证通信的安全性。

以下是一些常用的 `Http2SecureServer` 方法：

- `close([callback])`：关闭当前 HTTPS/HTTP2 服务器。
- `setTimeout(msecs, callback)`：设置当前 HTTPS/HTTP2 服务器的超时时间。
- `addListener(event, listener)`：为当前 HTTPS/HTTP2 服务器添加事件监听器。
- `removeListener(event, listener)`：从当前 HTTPS/HTTP2 服务器中移除指定的事件监听器。

需要注意的是，在使用 `Http2SecureServer` 类时，我们需要了解每个方法的使用方法和相关规范，以便能够更好地利用这些方法来创建基于 HTTPS 的 HTTP/2 服务器实例，并进行相关操作。

通过这个介绍，我们可以了解 `Http2SecureServer` 类的基本概念和常见操作方法，为后续的学习提供了基础。

#### http2.createServer([options][, onrequesthandler])

在 Node.js 中，`http2.createServer()` 是一个方法，用于创建 HTTP/2 服务器实例。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。使用 `http2.createServer()` 方法可以创建一个基于 HTTP/2 的服务器实例，以便处理客户端的请求。

该方法的参数可以包括以下选项：

- `allowHTTP1`: 布尔值类型，表示是否允许在 HTTP/2 连接中转发非加密的 HTTP/1.1 流量，默认为 false。
- `maxVersion`: 数值类型，表示使用的最大 HTTP 版本，默认为 `http2.constants.HTTP2_VERSION`.
- `cert`: 字符串类型，表示 SSL/TLS 证书文件的路径。
- `key`: 字符串类型，表示 SSL/TLS 私钥文件的路径。
- `pfx`: 字符串类型，表示 SSL/TLS PFX 或 PKCS12 格式的文件路径。
- `passphrase`: 字符串类型，表示 SSL/TLS 密码。
- `secureOptions`: 数值类型，表示 SSL/TLS 协议的安全选项，默认为 `constants.SSL_OP_NO_TLSv1` 和 `constants.SSL_OP_NO_TLSv1_1`。

除了上述选项之外，`http2.createServer()` 方法还可以传递一个可选的回调函数 `onrequesthandler`，用于处理客户端请求。

需要注意的是，在使用 `http2.createServer()` 方法时，我们需要了解每个选项的使用方法和相关规范，以便能够更好地利用这些选项来创建 HTTP/2 服务器实例，并进行相关操作。

通过这个介绍，我们可以了解 `http2.createServer()` 方法的基本概念和常见选项，为后续的学习提供了基础。

#### http2.createSecureServer(options[, onRequestHandler])

在 Node.js 中，`http2.createSecureServer()` 是一个方法，用于创建基于 HTTPS 的 HTTP/2 服务器实例。

HTTPS 是一种通过 SSL/TLS 加密协议来保护网络通信安全的协议。使用 `http2.createSecureServer()` 方法可以创建一个基于 HTTPS 的 HTTP/2 服务器实例，以便处理客户端的请求，并确保通信的安全性。

该方法的参数可以包括以下选项：

- `allowHTTP1`: 布尔值类型，表示是否允许在 HTTP/2 连接中转发非加密的 HTTP/1.1 流量，默认为 false。
- `maxVersion`: 数值类型，表示使用的最大 HTTP 版本，默认为 `http2.constants.HTTP2_VERSION`.
- `cert`: 字符串类型，表示 SSL/TLS 证书文件的路径。
- `key`: 字符串类型，表示 SSL/TLS 私钥文件的路径。
- `pfx`: 字符串类型，表示 SSL/TLS PFX 或 PKCS12 格式的文件路径。
- `passphrase`: 字符串类型，表示 SSL/TLS 密码。
- `secureOptions`: 数值类型，表示 SSL/TLS 协议的安全选项，默认为 `constants.SSL_OP_NO_TLSv1` 和 `constants.SSL_OP_NO_TLSv1_1`。

除了上述选项之外，`http2.createSecureServer()` 方法还可以传递一个可选的回调函数 `onrequesthandler`，用于处理客户端请求。

需要注意的是，在使用 `http2.createSecureServer()` 方法时，我们需要了解每个选项的使用方法和相关规范，以便能够更好地利用这些选项来创建基于 HTTPS 的 HTTP/2 服务器实例，并进行相关操作。

通过这个介绍，我们可以了解 `http2.createSecureServer()` 方法的基本概念和常见选项，为后续的学习提供了基础。

#### http2.connect(authority[, options][, listener])

在 Node.js 中，`http2.connect()` 是一个方法，用于创建 HTTP/2 客户端实例。

使用 `http2.connect()` 方法可以创建一个 HTTP/2 客户端实例，以便连接到远程的服务器，并进行相关操作。

该方法的参数可以包括以下选项：

- `authority`: 字符串类型，表示要连接的服务器的权威名称。
- `options`: 对象类型，表示可选的配置项，具体包括以下内容：
  - `port`: 数值类型，表示要连接的服务器的端口号，默认为 443。
  - `host`: 字符串类型，表示要连接的服务器的主机名。
  - `path`: 字符串类型，表示要连接的服务器的路径，默认为 "/"。
  - `protocol`: 字符串类型，表示要使用的协议，默认为 "https:"。
- `listener`: 回调函数类型，表示客户端监听器，用于监听客户端事件。

需要注意的是，在使用 `http2.connect()` 方法时，我们需要了解每个选项的使用方法和相关规范，以便能够更好地利用这些选项来创建 HTTP/2 客户端实例，并进行相关操作。

通过这个介绍，我们可以了解 `http2.connect()` 方法的基本概念和常见选项，为后续的学习提供了基础。

#### http2.constants

在 Node.js 中，`http2.constants` 是一个对象，包含了 HTTP/2 相关的常量。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。 `http2.constants` 对象提供了一些常量，用于构建 HTTP/2 应用程序和服务器。

以下是常见的 `http2.constants` 常量：

- `HTTP2_HEADER_STATUS`: 表示 HTTP/2 标头中状态码的字段名称。
- `HTTP2_HEADER_PATH`: 表示 HTTP/2 标头中路径的字段名称。
- `HTTP2_HEADER_METHOD`: 表示 HTTP/2 标头中请求方法的字段名称。
- `HTTP2_HEADER_AUTHORITY`: 表示 HTTP/2 标头中授权信息的字段名称。
- `HTTP2_HEADER_CONTENT_TYPE`: 表示 HTTP/2 标头中内容类型的字段名称。
- `HTTP2_METHOD_GET`: 表示 HTTP/2 的 GET 请求方法。
- `HTTP2_METHOD_POST`: 表示 HTTP/2 的 POST 请求方法。
- `HTTP2_METHOD_PUT`: 表示 HTTP/2 的 PUT 请求方法。
- `HTTP2_METHOD_DELETE`: 表示 HTTP/2 的 DELETE 请求方法。
- `HTTP2_METHOD_OPTIONS`: 表示 HTTP/2 的 OPTIONS 请求方法。

需要注意的是，在使用 `http2.constants` 常量时，我们需要了解每个常量的使用方法和相关规范，以便能够更好地利用这些常量来构建 HTTP/2 应用程序和服务器。

通过这个介绍，我们可以了解 `http2.constants` 常量的基本概念和常见选项，为后续的学习提供了基础。

#### http2.getDefaultSettings()

在 Node.js 中，`http2.getDefaultSettings()` 是一个方法，用于获取 HTTP/2 的默认设置。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。使用 `http2.getDefaultSettings()` 方法可以获取 HTTP/2 的默认设置，以便在创建 HTTP/2 服务器或客户端实例时进行参考和调整。

返回的结果是一个对象，包含了 HTTP/2 的默认设置，具体包括以下内容：

- `headerTableSize`: 数值类型，表示首部表大小，默认为 4096。
- `enablePush`: 布尔值类型，表示是否启用服务端推送，默认为 true。
- `initialWindowSize`: 数值类型，表示初始窗口大小，默认为 65535。
- `maxFrameSize`: 数值类型，表示最大帧大小，默认为 16384。
- `maxConcurrentStreams`: 数值类型，表示最大并发流数量，默认为无限制。
- `maxHeaderListSize`: 数值类型，表示最大标头列表大小，默认为无限制。

需要注意的是，在使用 `http2.getDefaultSettings()` 方法时，我们可以根据需要来调整这些默认设置，以便更好地适应实际情况。

通过这个介绍，我们可以了解 `http2.getDefaultSettings()` 方法的基本概念和常见选项，为后续的学习提供了基础。

#### http2.getPackedSettings([settings])

在 Node.js 中，`http2.getPackedSettings()` 是一个方法，用于将 HTTP/2 的设置转换为二进制数据。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。使用 `http2.getPackedSettings()` 方法可以将 HTTP/2 的设置转换为二进制数据，以便在创建 HTTP/2 服务器或客户端实例时进行参考和传输。

该方法的参数是一个对象，包含了 HTTP/2 的设置，具体包括以下内容：

- `headerTableSize`: 数值类型，表示首部表大小，默认为 4096。
- `enablePush`: 布尔值类型，表示是否启用服务端推送，默认为 true。
- `initialWindowSize`: 数值类型，表示初始窗口大小，默认为 65535。
- `maxFrameSize`: 数值类型，表示最大帧大小，默认为 16384。
- `maxConcurrentStreams`: 数值类型，表示最大并发流数量，默认为无限制。
- `maxHeaderListSize`: 数值类型，表示最大标头列表大小，默认为无限制。

返回结果是一个 Buffer 对象，包含了二进制编码后的 HTTP/2 设置值。

需要注意的是，在使用 `http2.getPackedSettings()` 方法时，我们需要先设置好 HTTP/2 的设置，并将其转换为二进制数据格式，以便在创建 HTTP/2 服务器或客户端实例时进行传输和应用。

通过这个介绍，我们可以了解 `http2.getPackedSettings()` 方法的基本概念和常见选项，为后续的学习提供了基础。

#### http2.getUnpackedSettings(buf)

在 Node.js 中，`http2.getUnpackedSettings()` 是一个方法，用于将二进制数据转换为 HTTP/2 的设置。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。使用 `http2.getUnpackedSettings()` 方法可以将二进制数据转换为 HTTP/2 的设置，以便在创建 HTTP/2 服务器或客户端实例时进行参考和应用。

该方法的参数是一个 Buffer 对象，包含了二进制编码后的 HTTP/2 设置值。

返回结果是一个对象，包含了 HTTP/2 的设置，具体包括以下内容：

- `headerTableSize`: 数值类型，表示首部表大小，默认为 4096。
- `enablePush`: 布尔值类型，表示是否启用服务端推送，默认为 true。
- `initialWindowSize`: 数值类型，表示初始窗口大小，默认为 65535。
- `maxFrameSize`: 数值类型，表示最大帧大小，默认为 16384。
- `maxConcurrentStreams`: 数值类型，表示最大并发流数量，默认为无限制。
- `maxHeaderListSize`: 数值类型，表示最大标头列表大小，默认为无限制。

需要注意的是，在使用 `http2.getUnpackedSettings()` 方法时，我们需要先获取到二进制数据格式的 HTTP/2 设置，然后将其转换为可读的设置格式，以便在创建 HTTP/2 服务器或客户端实例时进行参考和应用。

通过这个介绍，我们可以了解 `http2.getUnpackedSettings()` 方法的基本概念和常见选项，为后续的学习提供了基础。

#### http2.sensitiveHeaders

在 Node.js 中，`http2.sensitiveHeaders` 是一个数组，包含了 HTTP/2 中敏感的请求头名称。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。 `http2.sensitiveHeaders` 数组包含了 HTTP/2 中敏感的请求头名称，这些请求头中包含了用户的敏感信息，应当谨慎处理。

以下是常见的敏感请求头名称：

- `cookie`: 包含了用户的 Cookie 信息。
- `authorization`: 包含了用户的授权信息。
- `proxy-authorization`: 包含了用户代理服务器的授权信息。

需要注意的是，在使用 `http2.sensitiveHeaders` 数组时，开发者应当避免将其中的请求头信息泄露出去，以保障用户信息的安全性。

通过这个介绍，我们可以了解 `http2.sensitiveHeaders` 数组的基本概念和常见选项，为后续的学习提供了基础。

#### CONNECT

在 Node.js 中，`CONNECT` 是一个 HTTP 请求方法，用于向服务器建立一个 TCP/IP 隧道。

HTTP 协议是基于传输层协议（TCP/IP）的，在某些情况下，我们需要向服务器建立一个 TCP/IP 隧道来进行数据传输。这时，我们就可以使用 `CONNECT` 方法，该方法是 HTTP 协议中一种特殊的请求方法，与常规的 GET、POST 等请求方法不同，它的主要作用是建立一个 TCP/IP 隧道。

使用 `CONNECT` 方法时，客户端会向服务器发送一个包含指定目标主机和端口号的请求，然后服务器会将其转发到相应的主机和端口，建立隧道连接，以便在客户端和服务器之间进行数据传输。

需要注意的是，在使用 `CONNECT` 方法时，我们需要确保目标主机和端口是合法且安全的，以避免信息泄露和其他风险。

通过这个介绍，我们可以了解 `CONNECT` 请求方法的基本概念和使用场景，为后续的学习提供了基础。

#### CONNECT

在 Node.js 中，`CONNECT` 是一个 HTTP 请求方法，用于向服务器建立一个 TCP/IP 隧道。

HTTP 协议是基于传输层协议（TCP/IP）的，在某些情况下，我们需要向服务器建立一个 TCP/IP 隧道来进行数据传输。这时，我们就可以使用 `CONNECT` 方法，该方法是 HTTP 协议中一种特殊的请求方法，与常规的 GET、POST 等请求方法不同，它的主要作用是建立一个 TCP/IP 隧道。

使用 `CONNECT` 方法时，客户端会向服务器发送一个包含指定目标主机和端口号的请求，然后服务器会将其转发到相应的主机和端口，建立隧道连接，以便在客户端和服务器之间进行数据传输。

需要注意的是，在使用 `CONNECT` 方法时，我们需要确保目标主机和端口是合法且安全的，以避免信息泄露和其他风险。

通过这个介绍，我们可以了解 `CONNECT` 请求方法的基本概念和使用场景，为后续的学习提供了基础。

### Compatibility API

在 Node.js 中，Compatibility API 是指一系列用于实现向后兼容性的接口和功能。

由于 Node.js 的版本更新比较快，新版本中可能会引入一些不兼容的改变，这对于一些老项目或者使用了老的第三方库的项目来说可能会带来一些问题。为了解决这个问题，Node.js 提供了一些 Compatibility API，用于确保新版本的 Node.js 可以与旧版本的代码或第三方库兼容。

具体来说，Compatibility API 包括以下内容：

- `Buffer`: 旧版本中的 Buffer 实现，用于支持旧版本的 API。
- `process.binding()`: 用于将旧版本中的 C++ 模块绑定到新版本的 JavaScript 代码中。
- `require.extensions`: 用于支持旧版本中的模块扩展。
- `Stream`: 旧版本中的流实现，用于支持旧版本的 API。

需要注意的是，在使用 Compatibility API 时，我们应当尽量避免使用过时的特性和功能，并且及时升级代码和第三方库，以保障系统的安全性和稳定性。

通过这个介绍，我们可以了解 Compatibility API 的基本概念和主要作用，为后续的学习提供了基础。

#### http2.Http2ServerRequest

在 Node.js 中，`http2.Http2ServerRequest` 是一个类（Class），用于表示 HTTP/2 服务器接收到的请求。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。当客户端使用 HTTP/2 协议向服务器发送请求时，服务器会创建一个 `Http2ServerRequest` 实例来代表客户端的请求。

`Http2ServerRequest` 类包含了一些常用的属性和方法，例如：

- `method`: 字符串类型，表示客户端请求的 HTTP 方法。
- `url`: 字符串类型，表示客户端请求的 URL 地址。
- `headers`: 对象类型，表示客户端请求的头部信息。
- `socket`: 对象类型，表示客户端连接的底层套接字。

另外，`Http2ServerRequest` 还有一些其他的属性和方法，可以根据具体的场景进行使用。

需要注意的是，在使用 `Http2ServerRequest` 类时，我们应该仔细地处理客户端请求，并及时回复响应，以确保系统的可靠性和安全性。

通过这个介绍，我们可以了解 `Http2ServerRequest` 类的基本概念和常见属性，为后续的学习提供了基础。

#### http2.Http2ServerResponse

在 Node.js 中，`http2.Http2ServerResponse` 是一个类（Class），用于表示 HTTP/2 服务器发送给客户端的响应。

HTTP/2 是一种新的网络协议，它是 HTTP 协议的第二个版本，与 HTTP/1 相比，其性能更加优越，并且支持更多的功能。当服务器响应客户端请求时，会创建一个 `Http2ServerResponse` 实例来代表响应。

`Http2ServerResponse` 类包含了一些常用的属性和方法，例如：

- `statusCode`: 数值类型，表示服务器响应的状态码。
- `statusMessage`: 字符串类型，表示服务器响应的状态信息。
- `headers`: 对象类型，表示服务器响应的头部信息。
- `stream`: 对象类型，表示底层流对象，用于在传输层面与客户端进行数据交互。

另外，`Http2ServerResponse` 还有一些其他的属性和方法，可以根据具体的场景进行使用。

需要注意的是，在使用 `Http2ServerResponse` 类时，我们应该仔细地设置响应信息，并及时向客户端发送响应，以确保系统的可靠性和安全性。

通过这个介绍，我们可以了解 `Http2ServerResponse` 类的基本概念和常见属性，为后续的学习提供了基础。

### Collecting HTTP/2 performance metrics

在 Node.js 中，我们可以使用一些工具和技术来收集 HTTP/2 性能指标，以便更好地优化服务器和客户端的性能。

具体来说，可以采用以下方法来收集 HTTP/2 性能指标：

- 使用 Chrome DevTools：打开 Chrome 浏览器，进入开发者模式（DevTools），选择 Network 选项卡，勾选 Preserve log 选项，然后在地址栏中输入网址，即可查看 HTTP/2 协议下的网络性能指标。
- 使用 node-http2-tracer：这是一个基于 Node.js 的工具，用于分析 HTTP/2 流量信息和性能指标。可以通过 npm 安装该工具并使用其提供的 API 进行调用，以获取 HTTP/2 性能指标。
- 使用 http2spy：这是另一个基于 Node.js 的工具，用于捕获 HTTP/2 流量，并提供了实时数据分析和可视化功能，可以帮助开发者更好地了解 HTTP/2 的性能状况。

需要注意的是，在进行 HTTP/2 性能指标收集时，我们应该关注以下几个方面：

- 连接建立时间：HTTP/2 使用多路复用技术，可以在单个连接上处理多个请求和响应。因此，连接的建立时间对于整个性能指标至关重要。
- 数据传输速度：HTTP/2 支持流和帧的概念，可以更加高效地传输数据。因此，传输速度也是一个重要的性能指标。
- 压缩率和质量：HTTP/2 支持头部压缩和二进制格式，可以在一定程度上减小数据传输的体积和时间。因此，压缩率和质量也是需要关注的性能指标。

通过这个介绍，我们可以了解 HTTP/2 性能指标收集的基本方法和注意事项，为后续的学习提供了基础。

### Note on :authority and host

在 HTTP/2 协议中，有两个特殊的头部字段 `:authority` 和 `host`，它们在某些场景下具有相似的作用，但是又存在一些细微的差别。

具体来说，`:authority` 是一个伪标题（pseudo-header），表示目标服务器的授权信息。在客户端发送请求时，如果使用了 HTTPS 协议，那么 `:authority` 就会包含主机名和端口号，例如 `example.com:443`；如果使用了 HTTP 协议，则仅包含主机名，例如 `example.com`。`host` 字段则表示实际的主机名或者 IP 地址。

需要注意的是，在某些情况下，客户端可能会自动将 `host` 头部设置为与 `:authority` 一样的值，以确保兼容性和正确性。但是，对于某些非标准的 HTTP/2 实现，这种自动处理可能会导致问题。

因此，需要在实际应用中根据具体的情况选择合适的方式来处理 `:authority` 和 `host` 头部，并进行测试和验证，以确保系统的稳定性和正确性。

通过这个介绍，我们可以了解 `:authority` 和 `host` 头部在 HTTP/2 协议中的作用和差异，为后续的学习提供了基础。

## HTTPS

在 Web 应用程序中，HTTPS 是一种常见的安全协议，用于保护客户端与服务器之间的通信安全。

具体来说，在 HTTP 协议基础之上，HTTPS 采用了 SSL/TLS 协议，对通信内容进行加密和认证，从而防止网络攻击者窃听、篡改或伪造数据。为了实现 HTTPS 协议，我们需要向浏览器或客户端提供 SSL/TLS 证书，该证书由受信任的第三方机构颁发，用于验证服务器的身份和建立安全连接。

在 Node.js 中，可以使用 `https` 模块来实现 HTTPS 协议，例如：

```javascript
const https = require("https");

https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello World!\n");
  })
  .listen(443);
```

其中，`options` 参数可以包含一些选项配置，例如 SSL/TLS 证书、私钥等信息。

需要注意的是，在使用 HTTPS 协议时，我们应该合理设置 SSL/TLS 证书和相关配置，以确保通信的安全性和可靠性。

通过这个介绍，我们可以了解 HTTPS 协议的基本概念和 Node.js 中的实现方式，为后续的学习提供了基础。

### Determining if crypto support is unavailable

在 Node.js 中，`crypto` 模块提供了一些加密和解密相关的功能，例如生成随机数、计算哈希值等。但是，在某些情况下，我们可能需要判断当前环境是否支持 `crypto` 模块。

具体来说，可以根据以下方法来判断 `crypto` 模块是否可用：

- 使用 `crypto.getCurves()` 方法：该方法返回一个数组，包含了当前环境中可用的椭圆曲线加密算法。如果返回结果为空，则说明当前环境不支持 `crypto` 模块。
- 使用 `crypto.getCiphers()` 方法：该方法返回一个数组，包含了当前环境中可用的加密算法。如果返回结果为空，则说明当前环境不支持 `crypto` 模块。

另外，也可以通过调用 `require('crypto')` 的方式来判断 `crypto` 模块是否可用。如果出现错误或异常，则说明当前环境不支持 `crypto` 模块。

需要注意的是，在使用 `crypto` 模块时，我们应该遵循安全的编码规范，并及时更新代码和依赖库，以确保系统的安全性和稳定性。

通过这个介绍，我们可以了解如何判断当前环境是否支持 `crypto` 模块，为后续的学习提供了基础。

### Class: https.Agent

在 Node.js 中，`https.Agent` 是一个类（Class），用于管理 HTTPS 客户端请求的连接池和复用。

具体来说，当我们发送多个 HTTPS 请求时，每个请求都需要建立一个新的安全连接（SSL/TLS），这种过程可能会浪费大量的时间和带宽资源。为了解决这个问题，可以使用 `https.Agent` 类来创建一个连接池，将已经建立的安全连接进行复用，从而提高性能和效率。

`https.Agent` 类包含了一些常见的属性和方法，例如：

- `maxSockets`: 数值类型，表示连接池中最大的连接数，默认为 `Infinity`。
- `keepAlive`: 布尔类型，表示是否启用长连接（Keep-Alive）功能，默认为 `true`。
- `createConnection(options, callback)`: 方法，用于创建新的安全连接，并通过回调函数返回结果。
- `getName(options)`: 方法，用于获取传输层加密协议的名称（如 SSLv3、TLSv1.2 等）。

另外，`https.Agent` 还有一些其他的属性和方法，可以根据具体的场景进行使用。

需要注意的是，在使用 `https.Agent` 类时，我们应该合理设置连接池的大小和相关配置，以确保系统的可靠性和性能。

通过这个介绍，我们可以了解 `https.Agent` 类的基本概念和常见属性，为后续的学习提供了基础。

#### new Agent([options])

在 Node.js 中，`https.Agent([options])` 是一个构造函数（Constructor），用于创建一个新的 HTTPS 客户端连接池。

具体来说，我们可以通过以下方式来创建一个 `https.Agent` 实例：

```javascript
const https = require("https");

const agent = new https.Agent({
  maxSockets: 10,
  keepAlive: true,
});
```

其中，`options` 参数包含了一些可选的配置项，例如最大连接数、是否启用长连接等。

需要注意的是，在使用 `https.Agent` 类时，我们应该合理设置连接池的大小和相关配置，以确保系统的可靠性和性能。此外，在发送 HTTPS 请求时，可以将 `agent` 参数设置为 `https.Agent` 类的实例，以实现连接池的复用功能。

通过这个介绍，我们可以了解如何使用 `https.Agent` 构造函数来创建一个 HTTPS 客户端连接池，为后续的学习提供了基础。

### Class: https.Server

在 Node.js 中，`https.Server` 是一个类（Class），用于创建一个基于 HTTPS 协议的服务器实例。

具体来说，可以通过以下方式来创建一个 `https.Server` 实例：

```javascript
const https = require("https");

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(443);
```

其中，`options` 参数包含了一些可选的配置项，例如 SSL/TLS 证书、私钥等信息。

`https.Server` 类包含了一些常见的属性和方法，例如：

- `listen(port[, hostname][, backlog][, callback])`: 方法，用于启动服务器并监听指定的端口号。
- `close([callback])`: 方法，用于关闭服务器，并通过回调函数返回结果。
- `on(event, listener)`: 方法，用于添加事件监听器，例如 `request` 事件、`connection` 事件等。

另外，`https.Server` 还有一些其他的属性和方法，可以根据具体的场景进行使用。

需要注意的是，在使用 `https.Server` 类时，我们应该合理设置 SSL/TLS 证书和相关配置，以确保服务器的安全性和可靠性。

通过这个介绍，我们可以了解 `https.Server` 类的基本概念和常见属性，为后续的学习提供了基础。

#### server.close([callback])

在 Node.js 中，`server.close([callback])` 是一个方法，用于关闭一个正在运行的服务器实例。

具体来说，我们可以通过以下方式来关闭服务器：

```javascript
const https = require("https");

const server = https.createServer(options, (req, res) => {
  // handle request
});

server.listen(443);

// 在一些条件下调用 server.close() 来关闭服务器
server.close(() => {
  console.log("Server is closed.");
});
```

其中，`callback` 参数是一个可选的回调函数，用于在服务器关闭完成后执行一些操作。如果省略了 `callback` 参数，则会默认执行一个空函数。

需要注意的是，在使用 `server.close()` 方法时，我们应该确保所有的连接和请求都已经处理完毕，并且将所有的资源和文件句柄正确地释放，以避免可能的数据损失或资源泄漏。

通过这个介绍，我们可以了解如何使用 `server.close()` 方法来关闭一个正在运行的服务器实例，为后续的学习提供了基础。

#### server.closeAllConnections()

很抱歉，`server.closeAllConnections()` 并不是 Node.js `https.Server` 类的一个方法。

在 `https.Server` 类中，可以使用 `server.close([callback])` 方法来关闭服务器。该方法会停止服务器接收新的连接，并且将已经存在的连接断开。

需要注意的是，在调用 `server.close()` 方法时，我们应该确保所有的连接和请求都已经处理完毕，并且将所有的资源和文件句柄正确地释放，以避免可能的数据损失或资源泄漏。

通过这个介绍，我们可以了解如何使用 `server.close()` 方法来关闭一个正在运行的服务器实例，为后续的学习提供了基础。

#### server.closeIdleConnections()

很抱歉，`server.closeIdleConnections()` 并不是 Node.js `https.Server` 类的一个方法。

在 `https.Server` 类中，并没有提供直接关闭空闲连接的方法。如果需要限制连接的空闲时间或数量，可以通过设置操作系统或负载均衡器等外部组件来实现。

需要注意的是，在进行网络编程时，我们应该合理设计和调整连接池大小、超时设置等参数，以避免因连接过多或过期而导致的性能问题或安全风险。

通过这个介绍，我们可以了解如何优化 HTTPS 服务器的性能和可靠性，为后续的学习提供了基础。

#### server.headersTimeout

在 Node.js 中，`server.headersTimeout` 是 `http.Server` 和 `https.Server` 类的一个属性，用于设置 HTTP 或 HTTPS 服务器在接收到请求头后，等待请求体数据传输的最长时间。

具体来说，当服务器接收到一个 HTTP 或 HTTPS 请求时，它会先读取并解析请求头，然后再根据 HTTP 协议规范读取请求体。如果在指定时间内没有接收到完整的请求体数据，则会自动断开连接，并抛出一个 `socket hang up` 的错误。

例如，我们可以使用以下方式来设置 HTTP 服务器的 `headersTimeout`：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.headersTimeout = 5000; // 设置 headersTimeout 属性为 5 秒

server.listen(3000);
```

需要注意的是，在使用 `headersTimeout` 属性时，我们应该合理设置超时时间，避免因超时导致请求处理不及时或被拒绝。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `headersTimeout` 属性来设置 HTTP 或 HTTPS 服务器的请求头超时时间，为后续的学习提供了基础。

#### server.listen()

在 Node.js 中，`server.listen()` 是 `http.Server` 和 `https.Server` 类的一个方法，用于启动 HTTP 或 HTTPS 服务器，并监听指定的端口号。

具体来说，我们可以通过以下方式来启动一个 HTTP 服务器并监听 3000 端口：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

其中，第一个参数是要监听的端口号，第二个参数是可选的回调函数，用于在服务器启动后执行一些操作。如果省略了第二个参数，则会默认执行一个空函数。

需要注意的是，在使用 `server.listen()` 方法时，我们应该确保网络环境和操作系统设置的允许情况下，才能够成功地监听指定的端口号。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `server.listen()` 方法来启动 HTTP 或 HTTPS 服务器，并监听指定的端口号，为后续的学习提供了基础。

#### server.maxHeadersCount

在 Node.js 中，`server.maxHeadersCount` 是 `http.Server` 和 `https.Server` 类的一个属性，用于设置 HTTP 或 HTTPS 服务器能够接收的最大请求头数量。

具体来说，在 HTTP 或 HTTPS 服务器处理请求时，客户端可能会发送大量的请求头数据，包括 Cookie、User-Agent、Referer 等等。如果服务器无法正确地处理这些请求头数据，则可能导致性能问题或安全风险。

例如，我们可以使用以下方式来设置 HTTP 服务器的 `maxHeadersCount`：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.maxHeadersCount = 10; // 设置 maxHeadersCount 属性为 10

server.listen(3000);
```

需要注意的是，在使用 `maxHeadersCount` 属性时，我们应该合理设置最大请求头数量，避免因过多的请求头数据导致服务器性能下降或被攻击。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `maxHeadersCount` 属性来设置 HTTP 或 HTTPS 服务器的最大请求头数量，为后续的学习提供了基础。

#### server.requestTimeout

在 Node.js 中，`server.requestTimeout` 是 `http.Server` 和 `https.Server` 类的一个属性，用于设置 HTTP 或 HTTPS 服务器在接收到请求后，等待响应数据传输的最长时间。

具体来说，在 HTTP 或 HTTPS 服务器处理请求时，如果因为某些原因导致响应数据无法及时返回客户端，则可能会导致性能问题或安全风险。通过设置 `requestTimeout` 属性，可以控制服务器在处理请求时的响应时间。

例如，我们可以使用以下方式来设置 HTTP 服务器的 `requestTimeout`：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.requestTimeout = 5000; // 设置 requestTimeout 属性为 5 秒

server.listen(3000);
```

需要注意的是，在使用 `requestTimeout` 属性时，我们应该合理设置超时时间，避免因超时导致请求处理不及时或被拒绝。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `requestTimeout` 属性来设置 HTTP 或 HTTPS 服务器的请求响应超时时间，为后续的学习提供了基础。

#### server.setTimeout([msecs][, callback])

在 Node.js 中，`server.setTimeout()` 是 `http.Server` 和 `https.Server` 类的一个方法，用于设置 HTTP 或 HTTPS 服务器的超时时间。

具体来说，当服务器接收到一个连接时，它会根据传输协议规范和操作系统设置进行一些配置，如数据分片、缓冲区大小等。如果在指定时间内没有传输完整个请求或响应数据，则服务器将自动断开连接，并抛出一个 `socket hang up` 的错误。

例如，我们可以使用以下方式来设置 HTTP 服务器的 `setTimeout`：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.setTimeout(5000, (socket) => {
  console.log("Socket is timeout.");
  socket.end();
});

server.listen(3000);
```

其中，第一个参数是要设置的超时时间，单位为毫秒，默认值为两分钟（120000 毫秒）。第二个参数是可选的回调函数，用于在超时后执行一些操作。在回调函数中，我们可以通过 `socket` 参数获取当前的连接对象，并通过 `end()` 方法手动关闭连接。

需要注意的是，在使用 `setTimeout` 方法时，我们应该合理设置超时时间，避免因超时导致请求处理不及时或被拒绝。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `server.setTimeout()` 方法来设置 HTTP 或 HTTPS 服务器的超时时间，为后续的学习提供了基础。

#### server.timeout

在 Node.js 中，`server.timeout` 是 `http.Server` 和 `https.Server` 类的一个属性，用于设置 HTTP 或 HTTPS 服务器的超时时间。

具体来说，当服务器接收到一个连接时，它会根据传输协议规范和操作系统设置进行一些配置，如数据分片、缓冲区大小等。如果在指定时间内没有传输完整个请求或响应数据，则服务器将自动断开连接，并抛出一个 `socket hang up` 的错误。

例如，我们可以使用以下方式来设置 HTTP 服务器的 `timeout`：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.timeout = 5000; // 设置 timeout 属性为 5 秒

server.listen(3000);
```

需要注意的是，在使用 `timeout` 属性时，我们应该合理设置超时时间，避免因超时导致请求处理不及时或被拒绝。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `timeout` 属性来设置 HTTP 或 HTTPS 服务器的超时时间，为后续的学习提供了基础。

#### server.keepAliveTimeout

在 Node.js 中，`server.keepAliveTimeout` 是 `http.Server` 和 `https.Server` 类的一个属性，用于设置 HTTP 或 HTTPS 服务器中 TCP 连接的超时时间。

具体来说，当客户端与服务器建立一个 TCP 连接后，如果在指定时间内没有传输任何数据，则服务器将自动断开连接，并抛出一个 `socket hang up` 的错误。这个超时时间称为 keep-alive 超时时间。

例如，我们可以使用以下方式来设置 HTTP 服务器的 `keepAliveTimeout`：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.keepAliveTimeout = 5000; // 设置 keepAliveTimeout 属性为 5 秒

server.listen(3000);
```

需要注意的是，在使用 `keepAliveTimeout` 属性时，我们应该合理设置超时时间，避免因超时导致连接被频繁断开或被攻击。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `keepAliveTimeout` 属性来设置 HTTP 或 HTTPS 服务器中 TCP 连接的超时时间，为后续的学习提供了基础。

### https.createServer([options][, requestlistener])

在 Node.js 中，`https.createServer()` 是一个函数，用于创建一个 HTTPS 服务器实例。

HTTPS（Hyper Text Transfer Protocol Secure）是基于 HTTP 协议的加密传输协议，能够有效保护数据不被窃听、篡改或伪造。与 HTTP 服务器类似，在使用 `https.createServer()` 函数创建 HTTPS 服务器时，我们需要传入一些参数进行配置。

例如，以下代码展示了如何使用 `https.createServer()` 创建一个简单的 HTTPS 服务器：

```javascript
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(443);
```

其中，第一个参数 `options` 是用于对服务器进行配置的对象，包括 `key` 和 `cert` 两个属性，分别表示 SSL/TLS 加密所使用的私钥和证书。我们可以通过 `fs` 模块来读取本地存储的私钥和证书文件。

第二个参数 `requestlistener` 是可选的回调函数，用于处理请求和响应。在回调函数中，我们可以根据客户端发送的请求数据和状态码，设置响应头信息和响应正文内容，并通过 `res.end()` 方法结束响应。

需要注意的是，在使用 `https.createServer()` 函数时，我们应该合理配置 SSL/TLS 加密参数，以确保服务器能够安全稳定地运行。另外，如果需要限制请求体大小或数量，可以使用 `limit` 属性或中间件等方式来实现。

通过这个介绍，我们可以了解如何使用 `https.createServer()` 函数创建一个 HTTPS 服务器实例，为后续的学习提供了基础。

### https.get(options[, callback])

在 Node.js 中，`https.get()` 是一个函数，用于向指定的 HTTPS 服务器发送 GET 请求，并获取响应数据。

HTTPS（Hyper Text Transfer Protocol Secure）是基于 HTTP 协议的加密传输协议，能够有效保护数据不被窃听、篡改或伪造。与 HTTP 请求类似，在使用 `https.get()` 函数发送 HTTPS 请求时，我们需要传入一些参数进行配置。

例如，以下代码展示了如何使用 `https.get()` 发送一个简单的 HTTPS 请求：

```javascript
const https = require("https");

const options = {
  hostname: "www.example.com",
  port: 443,
  path: "/",
  method: "GET",
};

const req = https.get(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
```

其中，第一个参数 `options` 是用于对请求进行配置的对象，包括 `hostname`、`port`、`path` 和 `method` 等属性。我们可以根据需要设置这些属性来访问不同的 HTTPS 服务器和路径。

第二个参数 `callback` 是可选的回调函数，用于处理响应数据。在回调函数中，我们可以根据响应数据的状态码和正文内容，对响应结果进行自定义处理。

需要注意的是，在使用 `https.get()` 函数时，我们应该合理配置请求参数和处理响应数据，以确保请求能够正确稳定地返回结果。另外，如果需要发送 POST 请求或设置请求头信息等操作，也可以使用其他的 HTTPS 请求方法或模块来实现。

通过这个介绍，我们可以了解如何使用 `https.get()` 函数发送一个 HTTPS 请求并获取响应数据，为后续的学习提供了基础。

### https.get(url[, options][, callback])

在 Node.js 中，`https.get()` 是一个函数，用于向指定的 HTTPS 服务器发送 GET 请求，并获取响应数据。

与 `https.get(options[, callback])` 函数不同的是，`https.get(url[, options][, callback])` 函数可以直接传入 URL 地址，而不需要手动解析、配置请求参数。

例如，以下代码展示了如何使用 `https.get()` 发送一个简单的 HTTPS 请求：

```javascript
const https = require("https");

const url = "https://www.example.com/";

const req = https.get(url, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
```

其中，第一个参数 `url` 是要访问的 HTTPS 网站地址。如果需要设置更多的请求参数，我们可以传入第二个参数 `options` 对象进行配置，或者传入第三个参数 `callback` 回调函数来处理响应数据。

需要注意的是，在使用 `https.get()` 函数时，我们应该合理配置请求参数和处理响应数据，以确保请求能够正确稳定地返回结果。另外，如果需要发送 POST 请求或设置请求头信息等操作，也可以使用其他的 HTTPS 请求方法或模块来实现。

通过这个介绍，我们可以了解如何使用 `https.get()` 函数直接传入 URL 地址发送一个 HTTPS 请求并获取响应数据，为后续的学习提供了基础。

### https.globalAgent

在 Node.js 中，`https.globalAgent` 是一个全局代理对象，用于管理所有的 HTTPS 客户端请求。

具体来说，当我们使用 `https.request()` 或 `https.get()` 等函数发送 HTTPS 请求时，会默认使用 `https.globalAgent` 对象来管理连接池、证书验证等操作。这样可以避免重复创建和销毁连接，提高请求效率和性能。

例如，以下代码展示了如何在全局范围内修改 `https.globalAgent` 对象的默认属性：

```javascript
const https = require("https");

https.globalAgent.options.ca = [fs.readFileSync("ca-cert.pem")];
```

其中，我们可以通过 `options` 属性来配置 `https.globalAgent` 对象的默认参数，包括 SSL/TLS 加密所使用的根证书，是否忽略证书错误等。这样，在发送 HTTPS 请求时，就不需要再单独设置这些参数，可以直接使用全局代理对象进行请求。

需要注意的是，在使用 `https.globalAgent` 对象时，我们应该合理配置默认参数，以确保请求能够正确稳定地返回结果，并考虑安全性问题。另外，如果需要自定义连接池大小、超时时间等其他属性，也可以使用其他的 HTTPS 模块或库来实现。

通过这个介绍，我们可以了解如何使用 `https.globalAgent` 对象来管理所有的 HTTPS 客户端请求，为后续的学习提供了基础。

### https.request(options[, callback])

在 Node.js 中，`https.request()` 是一个函数，用于向指定的 HTTPS 服务器发送请求，并获取响应数据。

HTTPS（Hyper Text Transfer Protocol Secure）是基于 HTTP 协议的加密传输协议，能够有效保护数据不被窃听、篡改或伪造。与 `http.request()` 函数类似，在使用 `https.request()` 函数发送 HTTPS 请求时，我们需要传入一些参数进行配置。

例如，以下代码展示了如何使用 `https.request()` 发送一个简单的 HTTPS 请求：

```javascript
const https = require("https");

const options = {
  hostname: "www.example.com",
  port: 443,
  path: "/",
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
```

其中，第一个参数 `options` 是用于对请求进行配置的对象，包括 `hostname`、`port`、`path` 和 `method` 等属性。我们可以根据需要设置这些属性来访问不同的 HTTPS 服务器和路径。

第二个参数 `callback` 是可选的回调函数，用于处理响应数据。在回调函数中，我们可以根据响应数据的状态码和正文内容，对响应结果进行自定义处理。

需要注意的是，在使用 `https.request()` 函数时，我们应该合理配置请求参数和处理响应数据，以确保请求能够正确稳定地返回结果。另外，如果需要发送 POST 请求或设置请求头信息等操作，也可以使用其他的 HTTPS 请求方法或模块来实现。

通过这个介绍，我们可以了解如何使用 `https.request()` 函数发送一个 HTTPS 请求并获取响应数据，为后续的学习提供了基础。

### https.request(url[, options][, callback])

在 Node.js 中，`https.request()` 是一个函数，用于向指定的 HTTPS 服务器发送请求，并获取响应数据。

与 `https.request(options[, callback])` 函数不同的是，`https.request(url[, options][, callback])` 函数可以直接传入 URL 地址，而不需要手动解析、配置请求参数。

例如，以下代码展示了如何使用 `https.request()` 发送一个简单的 HTTPS 请求：

```javascript
const https = require("https");

const url = "https://www.example.com/";

const req = https.request(url, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
```

其中，第一个参数 `url` 是要访问的 HTTPS 网站地址。如果需要设置更多的请求参数，我们可以传入第二个参数 `options` 对象进行配置，或者传入第三个参数 `callback` 回调函数来处理响应数据。

需要注意的是，在使用 `https.request()` 函数时，我们应该合理配置请求参数和处理响应数据，以确保请求能够正确稳定地返回结果。另外，如果需要发送 POST 请求或设置请求头信息等操作，也可以使用其他的 HTTPS 请求方法或模块来实现。

通过这个介绍，我们可以了解如何使用 `https.request()` 函数直接传入 URL 地址发送一个 HTTPS 请求并获取响应数据，为后续的学习提供了基础。
