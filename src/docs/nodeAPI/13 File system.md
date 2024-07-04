## File system

`File system` 是 Node.js 中的一个核心模块，它提供了一组 API，用于处理文件和目录。通过使用 `File system` 模块，我们可以在 Node.js 中读取、写入、更新和删除本地文件，并且能够创建、移动和复制目录。

以下是一些常用的 `File system` 模块方法：

- `fs.readFile()`：异步地读取文件内容。
- `fs.writeFile()`：异步地写入文件内容。
- `fs.unlink()`：异步地删除文件。
- `fs.mkdir()`：异步地创建目录。
- `fs.rmdir()`：异步地删除目录。

这些方法通常会接受一个路径参数，用于指定要操作的文件或目录的位置。例如，以下代码展示了如何使用 `fs.readFile()` 方法读取一个文件：

```javascript
const fs = require("fs");

fs.readFile("/path/to/file", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

在这个例子中，我们首先引入了 `fs` 模块，然后使用 `fs.readFile()` 方法读取了一个文件。读取文件是一个异步操作，因此我们需要传递一个回调函数，当读取完成时，回调函数将以 `err` 和 `data` 作为参数被调用。如果发生错误，我们会抛出一个异常；否则，我们将输出文件内容到控制台。

除了上述方法之外，`File system` 模块还提供了一些其他方法来处理文件和目录。如果你想深入学习这个模块，可以查看 Node.js 官方文档中关于 `File system` 的详细说明。

### Promise example

在 JavaScript 中，`Promise` 是一个用于处理异步操作的对象。它可以代表一个尚未完成、但将来会完成的操作，并且可以跟踪该操作的状态和结果。通过使用 `Promise`，我们可以编写更优雅和可读性更好的异步代码，从而避免回调地狱等问题。

以下是一个使用 `Promise` 的示例代码：

```javascript
function someAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.random();
      if (result < 0.5) {
        resolve(result);
      } else {
        reject("Something went wrong");
      }
    }, 1000);
  });
}

someAsyncTask()
  .then((result) => {
    console.log(`Result: ${result}`);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先定义了一个 `someAsyncTask` 函数，用于模拟一个异步任务。这个函数返回一个 `Promise` 对象，在其中执行一个定时器，在一秒钟后生成一个随机数，并检查其值。如果随机数小于 0.5，则使用 `resolve` 方法将结果传递给 `Promise`；否则，使用 `reject` 方法将错误信息传递给 `Promise`。

然后，我们调用这个 `someAsyncTask` 函数，并为其返回的 `Promise` 对象添加两个方法：`then` 和 `catch`。当 `Promise` 成功完成时，`then` 方法将被调用，并将结果作为参数传递给其中的回调函数；当 `Promise` 发生错误时，`catch` 方法将被调用，并将错误信息作为参数传递给其中的回调函数。最后，我们在控制台输出结果或错误信息。

通过使用 `Promise`，我们可以更加清晰和直观地处理异步操作。此外，ES6 引入的 `async/await` 语法也可以使异步代码更加易读和简洁。

### Callback example

在 JavaScript 中，回调函数是一种常见的用于处理异步操作的方式。它是一个作为参数传递给其他函数的函数，当异步操作完成时，该函数将被调用，并接收相应的结果或错误信息。

以下是一个使用回调函数的示例代码：

```javascript
function someAsyncTask(callback) {
  setTimeout(() => {
    const result = Math.random();
    if (result < 0.5) {
      callback(null, result);
    } else {
      callback("Something went wrong", null);
    }
  }, 1000);
}

someAsyncTask((error, result) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`Result: ${result}`);
  }
});
```

在这个例子中，我们首先定义了一个 `someAsyncTask` 函数，用于模拟一个异步任务。这个函数接受一个回调函数作为参数，并在其中执行一个定时器，在一秒钟后生成一个随机数，并检查其值。如果随机数小于 0.5，则调用回调函数并将结果传递给其中；否则，调用回调函数并将错误信息传递给其中。

然后，我们调用这个 `someAsyncTask` 函数，并传入一个回调函数作为参数。当异步操作完成时，该回调函数将被调用，并接收相应的结果或错误信息。我们在回调函数中判断是否发生了错误，如果有错误则输出错误信息，否则输出结果。

通过使用回调函数，我们可以处理异步操作，并在操作完成后执行相应的操作，从而实现更加灵活和可扩展的异步编程。不过，随着异步操作变得更加复杂和嵌套，回调地狱等问题也会逐渐显现出来。因此，ES6 引入的 `Promise` 和 `async/await` 语法可以使异步代码更加易读和简洁。

### Synchronous example

在 JavaScript 中，同步代码是一种按照顺序依次执行的代码。当一个操作执行完毕后，才会执行下一个操作。这种代码通常会阻塞线程，直到所有操作都完成为止。

以下是一个使用同步代码的示例代码：

```javascript
const fs = require("fs");

const data = fs.readFileSync("/path/to/file");
console.log(data);
```

在这个例子中，我们首先引入了 `fs` 模块，然后使用 `fs.readFileSync()` 方法读取了一个文件。这是一个同步操作，因此它会阻塞线程，直到文件读取完成为止。当文件读取完成后，读取的数据将存储在变量 `data` 中，并输出到控制台。

虽然同步代码可以使逻辑更加清晰和直观，但是在处理大量和复杂的操作时，它可能会导致程序变得缓慢和不稳定，因为它会阻塞 JavaScript 运行时的整个进程。因此，在 Node.js 中，通常使用异步代码来处理 I/O 和其他耗时操作，以确保应用程序的高性能和可伸缩性。

### Promises API

在 JavaScript 中，`Promise` 是一种用于处理异步操作的对象。它代表一个尚未完成、但将来会完成的操作，并且可以跟踪该操作的状态和结果。通过使用 `Promise`，我们可以编写更优雅和可读性更好的异步代码，从而避免回调地狱等问题。

`Promise` 对象有三种状态：`pending`（未完成）、`fulfilled`（已成功完成）和 `rejected`（已失败）。当一个 `Promise` 对象处于 `pending` 状态时，它表示当前操作还未完成；当处于 `fulfilled` 状态时，它表示当前操作已经成功完成，并且可以使用 `then` 方法来获取其结果；当处于 `rejected` 状态时，它表示当前操作已经失败，并且可以使用 `catch` 方法来处理错误信息。

以下是一些常用的 `Promise` API：

- `Promise.all()`：在所有的 `Promise` 对象都成功完成后，返回所有的结果。
- `Promise.race()`：在所有的 `Promise` 对象中只要有一个成功完成或失败，就返回对应的结果或错误信息。
- `Promise.resolve()`：返回一个以给定值解决的 `Promise` 对象。
- `Promise.reject()`：返回一个以给定原因被拒绝的 `Promise` 对象。

以下是一个使用 `Promise` 的示例代码：

```javascript
function someAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.random();
      if (result < 0.5) {
        resolve(result);
      } else {
        reject("Something went wrong");
      }
    }, 1000);
  });
}

someAsyncTask()
  .then((result) => {
    console.log(`Result: ${result}`);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先定义了一个 `someAsyncTask` 函数，用于模拟一个异步任务。这个函数返回一个 `Promise` 对象，在其中执行一个定时器，在一秒钟后生成一个随机数，并检查其值。如果随机数小于 0.5，则使用 `resolve` 方法将结果传递给 `Promise`；否则，使用 `reject` 方法将错误信息传递给 `Promise`。

然后，我们调用这个 `someAsyncTask` 函数，并为其返回的 `Promise` 对象添加两个方法：`then` 和 `catch`。当 `Promise` 成功完成时，`then` 方法将被调用，并将结果作为参数传递给其中的回调函数；当 `Promise` 发生错误时，`catch` 方法将被调用，并将错误信息作为参数传递给其中的回调函数。最后，我们在控制台输出结果或错误信息。

通过使用 `Promise`，我们可以更加清晰和直观地处理异步操作，避免回调地狱等问题。

#### FileHandle

在 Node.js 中，`FileHandle` 是一种用于表示打开的文件的对象。它提供了一组 API，用于对这个文件进行读写和其他操作。

以下是一些常用的 `FileHandle` API：

- `handle.read()`：从文件中读取数据。
- `handle.write()`：将数据写入文件。
- `handle.close()`：关闭文件句柄。
- `handle.stat()`：获取文件状态信息。
- `handle.truncate()`：截断文件的长度。
- `handle.unlink()`：删除文件。

以下是一个使用 `FileHandle` 的示例代码：

```javascript
const { open } = require("fs").promises;

async function someAsyncTask() {
  const fileHandle = await open("/path/to/file", "r+");
  const buffer = Buffer.alloc(1024);
  await fileHandle.read(buffer, 0, 1024, 0);
  console.log(buffer.toString());
  await fileHandle.close();
}

someAsyncTask()
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，以便使用异步函数来处理 `FileHandle`。然后，我们定义了一个 `someAsyncTask` 函数，用于打开一个文件，并读取其内容。在函数中，我们先使用 `open` 方法打开文件，并传递两个参数：文件路径和文件打开方式。文件打开方式可以是 `r`（只读）、`w`（只写）、`a`（追加）或 `r+`（读写）。然后，我们创建一个 1024 字节的缓冲区，并使用 `read` 方法从文件中读取数据，并将其存储在缓冲区中。最后，我们输出缓冲区中的内容，并使用 `close` 方法关闭 `FileHandle`。

通过使用 `FileHandle`，我们可以更加灵活地处理文件的读写和其他操作。使用 `promises` 对象可以使代码更加简洁和易读。

#### fsPromises.access(path[, mode])

在 Node.js 中，`fsPromises.access()` 是一个用于检查文件或目录是否可访问的方法。它返回一个 Promise 对象，如果文件或目录存在且具有所需的权限，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.access()` 的语法：

```javascript
fsPromises.access(path[, mode]);
```

- `path`：要检查的路径。
- `mode`：一个整数，表示要检查的权限。默认值为 `fs.constants.F_OK`，表示文件或目录是否存在。

以下是一个使用 `fsPromises.access()` 的示例代码：

```javascript
const { access } = require("fs").promises;

async function checkFileOrDirectory(path) {
  try {
    await access(path);
    console.log(`The file or directory "${path}" exists and is accessible.`);
  } catch (error) {
    console.error(
      `The file or directory "${path}" does not exist or is not accessible.`
    );
  }
}

checkFileOrDirectory("/path/to/file")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `access` 方法。然后，我们定义了一个 `checkFileOrDirectory` 函数，用于检查指定的路径是否存在且可访问。在函数中，我们使用 `try...catch` 语句块来捕获 `access` 方法可能抛出的错误。如果没有发生错误，则表示文件或目录存在且可访问；否则，我们将输出相应的错误信息。

最后，我们调用 `checkFileOrDirectory` 函数，并传递要检查的路径作为参数。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.access()` 方法，我们可以更加方便地检查文件或目录是否存在和是否具有所需的权限。与其他 I/O 操作类似，它也将返回一个 Promise 对象，可以使用 `then` 和 `catch` 方法来处理异步操作的结果。

#### fsPromises.appendFile(path, data[, options])

在 Node.js 中，`fsPromises.appendFile()` 是一个用于将数据添加到文件末尾的方法。它返回一个 Promise 对象，如果将数据成功添加到文件中，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.appendFile()` 的语法：

```javascript
fsPromises.appendFile(path, data[, options]);
```

- `path`：要写入的文件路径。
- `data`：要添加到文件中的数据，可以是字符串或 Buffer 对象。
- `options`：一个可选的对象，包含一些附加选项，如编码、标志等。

以下是一个使用 `fsPromises.appendFile()` 的示例代码：

```javascript
const { appendFile } = require("fs").promises;

async function writeDataToFile(path, data) {
  try {
    await appendFile(path, data);
    console.log(
      `The data has been written to the file "${path}" successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

writeDataToFile("/path/to/file", "Hello, World!")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `appendFile` 方法。然后，我们定义了一个 `writeDataToFile` 函数，用于将数据添加到指定的文件末尾。在函数中，我们使用 `try...catch` 语句块来捕获 `appendFile` 方法可能抛出的错误。如果没有发生错误，则表示数据已经成功添加到文件中；否则，我们将输出相应的错误信息。

最后，我们调用 `writeDataToFile` 函数，并传递两个参数：要写入的文件路径和要添加到文件中的数据。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.appendFile()` 方法，我们可以更加方便地将数据添加到文件末尾。与其他 I/O 操作类似，它也将返回一个 Promise 对象，可以使用 `then` 和 `catch` 方法来处理异步操作的结果。

#### fsPromises.chmod(path, mode)

在 Node.js 中，`fsPromises.chmod()` 是一个用于更改文件或目录权限的方法。它返回一个 Promise 对象，如果成功更改权限，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.chmod()` 的语法：

```javascript
fsPromises.chmod(path, mode);
```

- `path`：要更改权限的文件路径。
- `mode`：一个整数，表示新的权限值。

以下是一个使用 `fsPromises.chmod()` 的示例代码：

```javascript
const { chmod } = require("fs").promises;

async function changeFilePermission(path, mode) {
  try {
    await chmod(path, mode);
    console.log(
      `The permissions of the file "${path}" have been changed successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

changeFilePermission("/path/to/file", 0o755)
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `chmod` 方法。然后，我们定义了一个 `changeFilePermission` 函数，用于更改指定文件的权限。在函数中，我们使用 `try...catch` 语句块来捕获 `chmod` 方法可能抛出的错误。如果没有发生错误，则表示文件的权限已经成功更改；否则，我们将输出相应的错误信息。

最后，我们调用 `changeFilePermission` 函数，并传递两个参数：要更改权限的文件路径和新的权限值。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.chmod()` 方法，我们可以更加方便地更改文件或目录的权限。需要注意的是，权限值必须是一个八进制数，例如 `0o755` 表示所有者具有读、写、执行权限，其他用户只具有读和执行权限。

#### fsPromises.chown(path, uid, gid)

在 Node.js 中，`fsPromises.chown()` 是一个用于更改文件或目录的所有者和所属组的方法。它返回一个 Promise 对象，如果成功更改所有者和所属组，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.chown()` 的语法：

```javascript
fsPromises.chown(path, uid, gid);
```

- `path`：要更改所有者和所属组的文件路径。
- `uid`：一个整数，表示新的所有者的用户 ID。
- `gid`：一个整数，表示新的所属组的组 ID。

以下是一个使用 `fsPromises.chown()` 的示例代码：

```javascript
const { chown } = require("fs").promises;

async function changeFileOwnerAndGroup(path, uid, gid) {
  try {
    await chown(path, uid, gid);
    console.log(
      `The owner and group of the file "${path}" have been changed successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

changeFileOwnerAndGroup("/path/to/file", 1000, 1000)
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `chown` 方法。然后，我们定义了一个 `changeFileOwnerAndGroup` 函数，用于更改指定文件的所有者和所属组。在函数中，我们使用 `try...catch` 语句块来捕获 `chown` 方法可能抛出的错误。如果没有发生错误，则表示文件的所有者和所属组已经成功更改；否则，我们将输出相应的错误信息。

最后，我们调用 `changeFileOwnerAndGroup` 函数，并传递三个参数：要更改所有者和所属组的文件路径、新的所有者的用户 ID 和新的所属组的组 ID。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.chown()` 方法，我们可以更加方便地更改文件或目录的所有者和所属组。需要注意的是，新的所有者和所属组必须是有效的用户或组 ID。

#### fsPromises.copyFile(src, dest[, mode])

在 Node.js 中，`fsPromises.copyFile()` 是一个用于将文件从源路径复制到目标路径的方法。它返回一个 Promise 对象，如果成功复制文件，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.copyFile()` 的语法：

```javascript
fsPromises.copyFile(src, dest[, mode]);
```

- `src`：要复制的源文件路径。
- `dest`：要复制到的目标文件路径。
- `mode`：一个可选的整数，表示新文件的权限值。默认值为原文件的权限值。

以下是一个使用 `fsPromises.copyFile()` 的示例代码：

```javascript
const { copyFile } = require("fs").promises;

async function copyFileFromSourceToDestination(src, dest) {
  try {
    await copyFile(src, dest);
    console.log(`The file "${src}" has been copied to "${dest}" successfully.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

copyFileFromSourceToDestination("/path/to/src/file", "/path/to/dest/file")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `copyFile` 方法。然后，我们定义了一个 `copyFileFromSourceToDestination` 函数，用于将指定的源文件复制到目标路径中。在函数中，我们使用 `try...catch` 语句块来捕获 `copyFile` 方法可能抛出的错误。如果没有发生错误，则表示文件已经成功复制；否则，我们将输出相应的错误信息。

最后，我们调用 `copyFileFromSourceToDestination` 函数，并传递两个参数：要复制的源文件路径和要复制到的目标文件路径。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.copyFile()` 方法，我们可以更加方便地从源文件复制内容到目标文件。需要注意的是，如果目标文件已经存在，则会被覆盖，因此请确保您知道自己在做什么。同时，新文件的权限值也可以通过第三个参数进行指定。

#### fsPromises.cp(src, dest[, options])

在 Node.js 中，`fsPromises.cp()` 是一个用于将文件或目录从源路径复制到目标路径的方法。它返回一个 Promise 对象，如果成功复制文件或目录，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.cp()` 的语法：

```javascript
fsPromises.cp(src, dest[, options]);
```

- `src`：要复制的源文件或目录路径。
- `dest`：要复制到的目标文件或目录路径。
- `options`：一个可选的对象，包含一些附加选项，如递归、过滤等。

以下是一个使用 `fsPromises.cp()` 的示例代码：

```javascript
const { cp } = require("fs").promises;

async function copyFilesOrDirectoriesFromSourceToDestination(src, dest) {
  try {
    await cp(src, dest, { recursive: true });
    console.log(
      `The file or directory "${src}" has been copied to "${dest}" successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

copyFilesOrDirectoriesFromSourceToDestination("/path/to/src", "/path/to/dest")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `cp` 方法。然后，我们定义了一个 `copyFilesOrDirectoriesFromSourceToDestination` 函数，用于将指定的源文件或目录复制到目标路径中。在函数中，我们使用 `try...catch` 语句块来捕获 `cp` 方法可能抛出的错误。如果没有发生错误，则表示文件或目录已经成功复制；否则，我们将输出相应的错误信息。

最后，我们调用 `copyFilesOrDirectoriesFromSourceToDestination` 函数，并传递两个参数：要复制的源文件或目录路径和要复制到的目标文件或目录路径。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.cp()` 方法，我们可以更加方便地从源文件或目录复制内容到目标文件或目录。需要注意的是，新文件或目录的访问权限等与原始文件或目录可能不同，所以请确保您知道自己在做什么。同时，也可以通过第三个参数进行指定递归或过滤等操作。

#### fsPromises.lchmod(path, mode)

在 Node.js 中，`fsPromises.lchmod()` 是一个用于更改符号链接的权限的方法。它返回一个 Promise 对象，如果成功更改权限，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.lchmod()` 的语法：

```javascript
fsPromises.lchmod(path, mode);
```

- `path`：要更改权限的符号链接路径。
- `mode`：一个整数，表示新的权限值。

以下是一个使用 `fsPromises.lchmod()` 的示例代码：

```javascript
const { lchmod } = require("fs").promises;

async function changeSymbolicLinkPermission(path, mode) {
  try {
    await lchmod(path, mode);
    console.log(
      `The permissions of the symbolic link "${path}" have been changed successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

changeSymbolicLinkPermission("/path/to/symlink", 0o755)
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `lchmod` 方法。然后，我们定义了一个 `changeSymbolicLinkPermission` 函数，用于更改指定符号链接的权限。在函数中，我们使用 `try...catch` 语句块来捕获 `lchmod` 方法可能抛出的错误。如果没有发生错误，则表示符号链接的权限已经成功更改；否则，我们将输出相应的错误信息。

最后，我们调用 `changeSymbolicLinkPermission` 函数，并传递两个参数：要更改权限的符号链接路径和新的权限值。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.lchmod()` 方法，我们可以更加方便地更改符号链接的权限。需要注意的是，此方法只会更改符号链接文件的权限，而不会更改其所指向的原始文件的权限。

#### fsPromises.lchown(path, uid, gid)

在 Node.js 中，`fsPromises.lchown()` 是一个用于更改符号链接的所有者和所属组的方法。它返回一个 Promise 对象，如果成功更改所有者和所属组，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.lchown()` 的语法：

```javascript
fsPromises.lchown(path, uid, gid);
```

- `path`：要更改所有者和所属组的符号链接路径。
- `uid`：一个整数，表示新的所有者的用户 ID。
- `gid`：一个整数，表示新的所属组的组 ID。

以下是一个使用 `fsPromises.lchown()` 的示例代码：

```javascript
const { lchown } = require("fs").promises;

async function changeSymbolicLinkOwnerAndGroup(path, uid, gid) {
  try {
    await lchown(path, uid, gid);
    console.log(
      `The owner and group of the symbolic link "${path}" have been changed successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

changeSymbolicLinkOwnerAndGroup("/path/to/symlink", 1000, 1000)
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `lchown` 方法。然后，我们定义了一个 `changeSymbolicLinkOwnerAndGroup` 函数，用于更改指定符号链接的所有者和所属组。在函数中，我们使用 `try...catch` 语句块来捕获 `lchown` 方法可能抛出的错误。如果没有发生错误，则表示符号链接的所有者和所属组已经成功更改；否则，我们将输出相应的错误信息。

最后，我们调用 `changeSymbolicLinkOwnerAndGroup` 函数，并传递三个参数：要更改所有者和所属组的符号链接路径、新的所有者的用户 ID 和新的所属组的组 ID。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.lchown()` 方法，我们可以更加方便地更改符号链接的所有者和所属组。需要注意的是，此方法只会更改符号链接文件的所有者和所属组，而不会更改其所指向的原始文件的所有者和所属组。

#### fsPromises.lutimes(path, atime, mtime)

在 Node.js 中，`fsPromises.lutimes()` 是一个用于更改符号链接的访问时间和修改时间的方法。它返回一个 Promise 对象，如果成功更改访问时间和修改时间，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.lutimes()` 的语法：

```javascript
fsPromises.lutimes(path, atime, mtime);
```

- `path`：要更改访问时间和修改时间的符号链接路径。
- `atime`：一个日期对象或表示时间戳的整数，表示新的访问时间。如果为 `null` 或 `undefined`，则将使用当前时间。
- `mtime`：一个日期对象或表示时间戳的整数，表示新的修改时间。如果为 `null` 或 `undefined`，则将使用当前时间。

以下是一个使用 `fsPromises.lutimes()` 的示例代码：

```javascript
const { lutimes } = require("fs").promises;

async function changeSymbolicLinkAccessAndModificationTime(path, atime, mtime) {
  try {
    await lutimes(path, atime, mtime);
    console.log(
      `The access and modification time of the symbolic link "${path}" have been changed successfully.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

changeSymbolicLinkAccessAndModificationTime(
  "/path/to/symlink",
  new Date(),
  new Date()
)
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `lutimes` 方法。然后，我们定义了一个 `changeSymbolicLinkAccessAndModificationTime` 函数，用于更改指定符号链接的访问时间和修改时间。在函数中，我们使用 `try...catch` 语句块来捕获 `lutimes` 方法可能抛出的错误。如果没有发生错误，则表示符号链接的访问时间和修改时间已经成功更改；否则，我们将输出相应的错误信息。

最后，我们调用 `changeSymbolicLinkAccessAndModificationTime` 函数，并传递三个参数：要更改访问时间和修改时间的符号链接路径、新的访问时间和新的修改时间。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.lutimes()` 方法，我们可以更加方便地更改符号链接的访问时间和修改时间。需要注意的是，此方法只会更改符号链接文件的访问时间和修改时间，而不会更改其所指向的原始文件的访问时间和修改时间。

#### fsPromises.link(existingPath, newPath)

在 Node.js 中，`fsPromises.link()`是一个用于创建硬链接的方法。硬链接将现有文件链接到新的路径上，如果修改任一链接，则对其他链接的访问也会发生相应的更改。

以下是`fsPromises.link()`的语法：

```javascript
fsPromises.link(existingPath, newPath);
```

- `existingPath`：现有文件的路径。
- `newPath`：要链接到的新路径。

以下是一个使用`fsPromises.link()`的示例代码：

```javascript
const { link } = require("fs").promises;

async function createHardLink(existingPath, newPath) {
  try {
    await link(existingPath, newPath);
    console.log(`The hard link "${newPath}" has been created successfully.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

createHardLink("/path/to/existing/file", "/path/to/new/link")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了`fs`模块中的`promises`对象，并从中获取`link`方法。然后，我们定义了一个`createHardLink`函数，用于创建指定现有文件的硬链接。在函数中，我们使用`try...catch`语句块来捕获`link`方法可能抛出的错误。如果没有发生错误，则表示硬链接已经成功创建；否则，我们将输出相应的错误信息。

最后，我们调用`createHardLink`函数，并传递两个参数：现有文件的路径和要链接到的新路径。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用`fsPromises.link()`方法，我们可以更加方便地创建硬链接，以便在需要同时访问同一文件的多个位置时使用。需要注意的是，在 Windows 系统中，只有管理员才能创建硬链接。

#### fsPromises.lstat(path[, options])

在 Node.js 中，`fsPromises.lstat()` 是一个用于获取符号链接文件信息的方法。它返回一个 Promise 对象，如果成功获取文件信息，则 Promise 将解析为 fs.Stats 对象，否则将拒绝并抛出错误。

以下是 `fsPromises.lstat()` 的语法：

```javascript
fsPromises.lstat(path[, options]);
```

- `path`：要获取信息的符号链接路径。
- `options`：一个可选的对象，包含以下属性：
  - `bigint`：一个布尔值，指示是否使用 `BigInt` 类型表示整数值，默认为 `false`。
  - `throwIfNoEntry`：一个布尔值，指示是否在没有找到文件时抛出错误，默认为 `true`。

以下是一个使用 `fsPromises.lstat()` 的示例代码：

```javascript
const { lstat } = require("fs").promises;

async function getSymbolicLinkInfo(path) {
  try {
    const stats = await lstat(path);
    console.log(
      `The file "${path}" is a symbolic link, and its size is ${stats.size} bytes.`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

getSymbolicLinkInfo("/path/to/symlink")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `lstat` 方法。然后，我们定义了一个 `getSymbolicLinkInfo` 函数，用于获取指定符号链接的文件信息。在函数中，我们使用 `try...catch` 语句块来捕获 `lstat` 方法可能抛出的错误。如果没有发生错误，则表示文件信息已经成功获取；否则，我们将输出相应的错误信息。

最后，我们调用 `getSymbolicLinkInfo` 函数，并传递一个参数：要获取信息的符号链接路径。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.lstat()` 方法，我们可以更加方便地获取符号链接文件的信息，例如文件大小、创建时间、修改时间等。需要注意的是，此方法只会获取符号链接文件本身的信息，而不会获取其所指向的原始文件的信息。

#### fsPromises.mkdir(path[, options])

在 Node.js 中，`fsPromises.mkdir()` 是一个用于创建目录的方法。它返回一个 Promise 对象，如果成功创建目录，则 Promise 将解析为 `undefined`，否则将拒绝并抛出错误。

以下是 `fsPromises.mkdir()` 的语法：

```javascript
fsPromises.mkdir(path[, options]);
```

- `path`：要创建的目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `recursive`：一个布尔值，指示是否递归创建目录，默认为 `false`。
  - `mode`：一个整数或字符串，表示新目录的权限掩码，默认为 `0o777`。

以下是一个使用 `fsPromises.mkdir()` 的示例代码：

```javascript
const { mkdir } = require("fs").promises;

async function createDirectory(path) {
  try {
    await mkdir(path, { recursive: true });
    console.log(`The directory "${path}" has been created successfully.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

createDirectory("/path/to/new/directory")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `mkdir` 方法。然后，我们定义了一个 `createDirectory` 函数，用于创建指定路径的目录。在函数中，我们使用 `try...catch` 语句块来捕获 `mkdir` 方法可能抛出的错误。如果没有发生错误，则表示目录已经成功创建；否则，我们将输出相应的错误信息。

最后，我们调用 `createDirectory` 函数，并传递一个参数：要创建的目录路径。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.mkdir()` 方法，我们可以更加方便地创建目录。需要注意的是，如果指定的目录路径已经存在，则此方法会抛出错误。如果需要递归地创建多级目录，可以设置 `recursive` 属性为 `true`。另外，可以使用 `mode` 属性来指定新目录的权限掩码。

#### fsPromises.mkdtemp(prefix[, options])

在 Node.js 中，`fsPromises.mkdtemp()` 是一个用于创建临时目录的方法。它返回一个 Promise 对象，如果成功创建临时目录，则 Promise 将解析为新目录的路径字符串，否则将拒绝并抛出错误。

以下是 `fsPromises.mkdtemp()` 的语法：

```javascript
fsPromises.mkdtemp(prefix[, options]);
```

- `prefix`：表示新目录名称前缀的字符串。
- `options`：一个可选的对象，包含以下属性：
  - `encoding`：新目录名称的编码，默认为 `buffer`。
  - `mode`：一个整数或字符串，表示新目录的权限掩码，默认为 `0o700`。
  - `dir`：要在其中创建新目录的父目录，默认为操作系统默认的临时目录。

以下是一个使用 `fsPromises.mkdtemp()` 的示例代码：

```javascript
const { mkdtemp } = require("fs").promises;

async function createTemporaryDirectory(prefix) {
  try {
    const tempDir = await mkdtemp(`${prefix}-`);
    console.log(
      `The temporary directory "${tempDir}" has been created successfully.`
    );
    return tempDir;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

createTemporaryDirectory("myapp")
  .then((tempDir) => {
    console.log(
      `The application can use the temporary directory "${tempDir}".`
    );
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `mkdtemp` 方法。然后，我们定义了一个 `createTemporaryDirectory` 函数，用于创建以指定前缀命名的临时目录。在函数中，我们使用 `try...catch` 语句块来捕获 `mkdtemp` 方法可能抛出的错误。如果没有发生错误，则表示临时目录已经成功创建；否则，我们将输出相应的错误信息。

最后，我们调用 `createTemporaryDirectory` 函数，并传递一个参数：新目录名称的前缀。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。注意，`mkdtemp()` 方法返回的是新目录的路径字符串，可以在应用程序中使用该路径来执行相应的操作。

通过使用 `fsPromises.mkdtemp()` 方法，我们可以更加方便地创建临时目录，以存储需要暂时保存的文件或数据等。需要注意的是，由于临时目录通常只会被使用一次或很少使用，因此应尽可能地避免在临时目录中存储重要的文件或数据。

#### fsPromises.open(path, flags[, mode])

在 Node.js 中，`fsPromises.open()` 是一个用于打开文件或创建一个新文件的方法。它返回一个 Promise 对象，如果成功打开文件，则 Promise 将解析为 fs.promises.FileHandle 对象，否则将拒绝并抛出错误。

以下是 `fsPromises.open()` 的语法：

```javascript
fsPromises.open(path, flags[, mode]);
```

- `path`：要打开或创建的文件路径。
- `flags`：打开文件的方式和标志，可以是以下值之一：
  - `'r'`：以只读模式打开文件。如果文件不存在，则抛出错误。
  - `'r+'`：以读写模式打开文件。如果文件不存在，则抛出错误。
  - `'w'`：以只写模式打开文件。如果文件不存在，则创建一个新文件；如果文件已经存在，则截断文件（即清空文件内容）。
  - `'w+'`：以读写模式打开文件。如果文件不存在，则创建一个新文件；如果文件已经存在，则截断文件。
  - `'a'`：以追加模式打开文件。如果文件不存在，则创建一个新文件；如果文件已经存在，则在文件末尾追加写入。
  - `'a+'`：以读写追加模式打开文件。如果文件不存在，则创建一个新文件；如果文件已经存在，则在文件末尾追加写入。
- `mode`：一个整数或字符串，表示新文件的权限掩码，默认为 `0o666`。

以下是一个使用 `fsPromises.open()` 的示例代码：

```javascript
const { open } = require("fs").promises;

async function openFile(path) {
  try {
    const filehandle = await open(path, "w");
    console.log(
      `The file "${path}" has been opened successfully. The file descriptor is ${filehandle.fd}.`
    );
    return filehandle;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

openFile("/path/to/new/file.txt")
  .then((filehandle) => {
    // 在此处执行相应的文件操作。
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `open` 方法。然后，我们定义了一个 `openFile` 函数，用于打开指定路径的文件。在函数中，我们使用 `try...catch` 语句块来捕获 `open` 方法可能抛出的错误。如果没有发生错误，则表示文件已经成功打开；否则，我们将输出相应的错误信息。

最后，我们调用 `openFile` 函数，并传递一个参数：要打开或创建的文件路径。当操作完成时，我们将返回一个文件描述符对象，并可以在该对象上执行相应的文件操作。

通过使用 `fsPromises.open()` 方法，我们可以更加方便地打开或创建文件，并可以使用不同的标志和模式控制文件的访问和修改方式。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.opendir(path[, options])

在 Node.js 中，`fsPromises.opendir()` 是一个用于打开目录并读取其中的文件和子目录列表的方法。它返回一个 Promise 对象，如果成功打开目录，则 Promise 将解析为 fs.promises.Dir 对象，否则将拒绝并抛出错误。

以下是 `fsPromises.opendir()` 的语法：

```javascript
fsPromises.opendir(path[, options]);
```

- `path`：要打开的目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `bufferSize`：一个整数值，表示内部读取缓冲区的大小，默认为系统默认值。

以下是一个使用 `fsPromises.opendir()` 的示例代码：

```javascript
const { opendir } = require("fs").promises;

async function readDirectory(path) {
  try {
    const dir = await opendir(path);
    console.log(
      `The directory "${path}" has been opened successfully. The directory descriptor is ${dir.fd}.`
    );

    for await (const dirent of dir) {
      console.log(`- ${dirent.name}`);
    }

    dir.close();
    console.log(`The directory "${path}" has been closed successfully.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

readDirectory("/path/to/directory")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `opendir` 方法。然后，我们定义了一个 `readDirectory` 函数，用于打开指定路径的目录并读取其中的文件和子目录列表。在函数中，我们使用 `try...catch` 语句块来捕获 `opendir` 方法可能抛出的错误。如果没有发生错误，则表示目录已经成功打开；否则，我们将输出相应的错误信息。

接下来，我们使用 `for await...of` 循环遍历目录中的每个文件和子目录，以输出它们的名称。需要注意的是，由于该循环是异步执行的，因此我们使用 `await` 关键字等待每个迭代的完成。

最后，我们调用 `dir.close()` 方法，以关闭目录描述符对象，并释放相关的资源。当操作完成时，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.opendir()` 方法，我们可以更加方便地打开并读取目录中的文件和子目录列表。需要注意的是，在进行目录操作后，一定要记得关闭目录描述符对象，以释放相应的资源。

#### fsPromises.readdir(path[, options])

在 Node.js 中，`fsPromises.readdir()` 是一个用于读取指定目录中的文件和子目录列表的方法。它返回一个 Promise 对象，如果成功读取目录，则 Promise 将解析为字符串数组，其中每个元素表示目录中的一个文件或子目录的名称，否则将拒绝并抛出错误。

以下是 `fsPromises.readdir()` 的语法：

```javascript
fsPromises.readdir(path[, options]);
```

- `path`：要读取的目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `encoding`：使用的编码，默认为 `'utf8'`。
  - `withFileTypes`：一个布尔值，表示是否返回 fs.Dirent 对象而不是字符串，默认为 `false`。

以下是一个使用 `fsPromises.readdir()` 的示例代码：

```javascript
const { readdir } = require("fs").promises;

async function readDirectory(path) {
  try {
    const files = await readdir(path);
    console.log(`The directory "${path}" contains ${files.length} files:`);

    for (const file of files) {
      console.log(`- ${file}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

readDirectory("/path/to/directory")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `readdir` 方法。然后，我们定义了一个 `readDirectory` 函数，用于读取指定目录中的文件和子目录列表。在函数中，我们使用 `try...catch` 语句块来捕获 `readdir` 方法可能抛出的错误。如果没有发生错误，则表示目录已经成功读取；否则，我们将输出相应的错误信息。

接下来，我们使用 `for...of` 循环遍历返回的字符串数组，以输出每个文件和子目录的名称。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.readdir()` 方法，我们可以更加方便地读取指定目录中的文件和子目录列表，并使用不同的选项控制返回结果的格式。需要注意的是，在进行目录操作后，一定要记得关闭目录描述符对象，以释放相应的资源。

#### fsPromises.readFile(path[, options])

在 Node.js 中，`fsPromises.readFile()` 是一个用于读取指定文件的方法。它返回一个 Promise 对象，如果成功读取文件，则 Promise 将解析为表示文件内容的字符串或缓冲区对象，否则将拒绝并抛出错误。

以下是 `fsPromises.readFile()` 的语法：

```javascript
fsPromises.readFile(path[, options]);
```

- `path`：要读取的文件路径。
- `options`：一个可选的对象，包含以下属性：
  - `encoding`：使用的编码，默认为 `'utf8'`。
  - `flag`：打开文件时使用的标志，默认为 `'r'`。

以下是一个使用 `fsPromises.readFile()` 的示例代码：

```javascript
const { readFile } = require("fs").promises;

async function readTextFile(path) {
  try {
    const text = await readFile(path, "utf8");
    console.log(
      `The file "${path}" has been read successfully. Its content is:\n\n${text}`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

readTextFile("/path/to/text/file.txt")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `readFile` 方法。然后，我们定义了一个 `readTextFile` 函数，用于读取指定文本文件的内容。在函数中，我们使用 `try...catch` 语句块来捕获 `readFile` 方法可能抛出的错误。如果没有发生错误，则表示文件已经成功读取；否则，我们将输出相应的错误信息。

接下来，我们打印出文件的内容，需要注意的是，由于我们使用了 `'utf8'` 编码，因此返回的是字符串。如果不指定编码，则返回的是一个 Buffer 对象。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.readFile()` 方法，我们可以更加方便地读取指定文件的内容，并使用不同的选项控制返回结果的格式。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.readlink(path[, options])

在 Node.js 中，`fsPromises.readlink()` 方法是一个用于读取符号链接的目标路径的方法。当我们创建一个符号链接时，它实际上是一个文件，其中包含指向另一个文件或目录的路径。而 `readlink` 方法可以帮助我们获取该链接所指向的目标路径。

`fsPromises.readlink()` 返回一个 Promise 对象。如果成功读取符号链接，则 Promise 将解析为字符串，表示符号链接的目标路径，否则将拒绝并抛出错误。

以下是 `fsPromises.readlink()` 的语法：

```javascript
fsPromises.readlink(path[, options]);
```

- `path`：要读取符号链接的路径。
- `options`：一个可选的对象，包含以下属性：
  - `encoding`：使用的编码，默认为 `'utf8'`。

以下是一个使用 `fsPromises.readlink()` 的示例代码：

```javascript
const { readlink } = require("fs").promises;

async function readLinkTarget(path) {
  try {
    const target = await readlink(path);
    console.log(`The symbolic link "${path}" points to "${target}".`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

readLinkTarget("/path/to/symlink")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `readlink` 方法。然后，我们定义了一个 `readLinkTarget` 函数，用于读取指定符号链接的目标路径。在函数中，我们使用 `try...catch` 语句块来捕获 `readlink` 方法可能抛出的错误。如果没有发生错误，则表示符号链接已经成功读取；否则，我们将输出相应的错误信息。

接下来，我们打印出符号链接的目标路径，即 `readlink` 方法返回的字符串。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.readlink()` 方法，我们可以更加方便地读取符号链接的目标路径。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.realpath(path[, options])

在 Node.js 中，`fsPromises.realpath()` 是一个用于获取指定路径的绝对路径的方法。它返回一个 Promise 对象，如果成功获取绝对路径，则 Promise 将解析为字符串，表示指定路径的绝对路径，否则将拒绝并抛出错误。

以下是 `fsPromises.realpath()` 的语法：

```javascript
fsPromises.realpath(path[, options]);
```

- `path`：要获取绝对路径的路径。
- `options`：一个可选的对象，包含以下属性：
  - `encoding`：使用的编码，默认为 `'utf8'`。

以下是一个使用 `fsPromises.realpath()` 的示例代码：

```javascript
const { realpath } = require("fs").promises;

async function getAbsolutePath(path) {
  try {
    const absolutePath = await realpath(path);
    console.log(`The absolute path of "${path}" is "${absolutePath}".`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

getAbsolutePath("/path/to/file")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `realpath` 方法。然后，我们定义了一个 `getAbsolutePath` 函数，用于获取指定路径的绝对路径。在函数中，我们使用 `try...catch` 语句块来捕获 `realpath` 方法可能抛出的错误。如果没有发生错误，则表示绝对路径已经成功获取；否则，我们将输出相应的错误信息。

接下来，我们打印出指定路径的绝对路径，即 `realpath` 方法返回的字符串。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.realpath()` 方法，我们可以更加方便地获取指定路径的绝对路径。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.rename(oldPath, newPath)

在 Node.js 中，`fsPromises.rename()` 方法是一个用于重命名或移动文件或目录的方法。它返回一个 Promise 对象，如果成功重命名或移动，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.rename()` 的语法：

```javascript
fsPromises.rename(oldPath, newPath);
```

- `oldPath`：要重命名或移动的原始路径。
- `newPath`：新路径的名称或路径，可以包括目录路径和文件名。

以下是一个使用 `fsPromises.rename()` 的示例代码：

```javascript
const { rename } = require("fs").promises;

async function renameFile(oldPath, newPath) {
  try {
    await rename(oldPath, newPath);
    console.log(`The file "${oldPath}" has been renamed to "${newPath}".`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

renameFile("/path/to/old/file.txt", "/path/to/new/file.txt")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `rename` 方法。然后，我们定义了一个 `renameFile` 函数，用于重命名指定文件的名称。在函数中，我们使用 `try...catch` 语句块来捕获 `rename` 方法可能抛出的错误。如果没有发生错误，则表示文件已经成功重命名；否则，我们将输出相应的错误信息。

接下来，我们打印出文件的新名称，即第二个参数 `newPath`。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.rename()` 方法，我们可以更加方便地重命名和移动文件和目录。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.rmdir(path[, options])

在 Node.js 中，`fsPromises.rmdir()` 方法是一个用于删除目录的方法。它返回一个 Promise 对象，如果成功删除目录，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.rmdir()` 的语法：

```javascript
fsPromises.rmdir(path[, options]);
```

- `path`：要删除的目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `recursive`：一个布尔值，指示是否递归删除子目录和文件，默认为 `false`。

需要注意的是，如果要删除的目录不为空，则无法直接使用 `fsPromises.rmdir()` 删除该目录。在这种情况下，可以考虑使用 `fs-extra` 模块中的 `remove()` 方法来递归删除目录和文件。

以下是一个使用 `fsPromises.rmdir()` 的示例代码：

```javascript
const { rmdir } = require("fs").promises;

async function deleteDirectory(path) {
  try {
    await rmdir(path);
    console.log(`The directory "${path}" has been deleted.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

deleteDirectory("/path/to/directory")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `rmdir` 方法。然后，我们定义了一个 `deleteDirectory` 函数，用于删除指定目录。在函数中，我们使用 `try...catch` 语句块来捕获 `rmdir` 方法可能抛出的错误。如果没有发生错误，则表示目录已经成功删除；否则，我们将输出相应的错误信息。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.rmdir()` 方法，我们可以直接删除指定目录。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外删除重要的数据。

#### fsPromises.rm(path[, options])

在 Node.js v14 中，`fsPromises.rm()` 方法是一个用于删除文件或目录的方法。它返回一个 Promise 对象，如果成功删除文件或目录，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.rm()` 的语法：

```javascript
fsPromises.rm(path[, options]);
```

- `path`：要删除的文件或目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `force`：一个布尔值，指示是否强制删除文件或目录，默认为 `false`。
  - `recursive`：一个布尔值，指示是否递归删除子目录和文件，默认为 `false`。
  - `maxRetries`：一个数字，表示在删除失败后重试的最大次数，默认为 `0`。
  - `retryDelay`：一个数字，表示重试之间的延迟时间（以毫秒为单位），默认为 `0`。

需要注意的是，如果要删除的目录不为空，则无法直接使用 `fsPromises.rm()` 删除该目录。在这种情况下，可以考虑使用 `fs-extra` 模块中的 `remove()` 方法来递归删除目录和文件。

以下是一个使用 `fsPromises.rm()` 的示例代码：

```javascript
const { rm } = require("fs").promises;

async function deleteFileOrDirectory(path) {
  try {
    await rm(path, { force: true, recursive: true });
    console.log(`The file or directory "${path}" has been deleted.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

deleteFileOrDirectory("/path/to/file/or/directory")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `rm` 方法。然后，我们定义了一个 `deleteFileOrDirectory` 函数，用于删除指定的文件或目录。在函数中，我们使用 `try...catch` 语句块来捕获 `rm` 方法可能抛出的错误。如果没有发生错误，则表示文件或目录已经成功删除；否则，我们将输出相应的错误信息。

接下来，我们配置了 `options` 参数：`force` 属性为 `true` 表示强制删除文件或目录，`recursive` 属性为 `true` 表示递归删除子目录和文件。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.rm()` 方法，我们可以更加方便地删除文件或目录，而且可以使用参数控制删除方式和行为。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外删除重要的数据。

#### fsPromises.stat(path[, options])

在 Node.js 中，`fsPromises.stat()` 方法是一个用于获取文件或目录状态的方法。它返回一个 Promise 对象，如果成功获取到了指定路径的状态，则 Promise 将解析为一个 `fs.Stats` 对象，否则将拒绝并抛出错误。

以下是 `fsPromises.stat()` 的语法：

```javascript
fsPromises.stat(path[, options]);
```

- `path`：要获取状态的文件或目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `bigint`：一个布尔值，指示是否返回大整数类型的文件大小和时间戳，默认为 `false`。

以下是一个使用 `fsPromises.stat()` 的示例代码：

```javascript
const { stat } = require("fs").promises;

async function getFileOrDirectoryStatus(path) {
  try {
    const stats = await stat(path);
    console.log(`The status of "${path}" is:`, stats);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

getFileOrDirectoryStatus("/path/to/file/or/directory")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `stat` 方法。然后，我们定义了一个 `getFileOrDirectoryStatus` 函数，用于获取指定文件或目录的状态。在函数中，我们使用 `try...catch` 语句块来捕获 `stat` 方法可能抛出的错误。如果没有发生错误，则表示状态已经成功获取；否则，我们将输出相应的错误信息。

接下来，我们打印出文件或目录的状态，即 `fs.Stats` 对象。该对象包含有关文件或目录的各种信息，例如文件的大小、访问时间、修改时间、创建时间等等。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.stat()` 方法，我们可以方便地获取文件或目录的状态信息，例如文件的大小以及最近的访问、修改和创建时间等等。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.statfs(path[, options])

在 Node.js 中，`fsPromises.statfs()` 方法是一个用于获取文件系统状态的方法。它返回一个 Promise 对象，如果成功获取到了指定路径的文件系统状态，则 Promise 将解析为一个 `fs.Statfs` 对象，否则将拒绝并抛出错误。

以下是 `fsPromises.statfs()` 的语法：

```javascript
fsPromises.statfs(path[, options]);
```

- `path`：要获取文件系统状态的文件或目录路径。
- `options`：一个可选的对象，包含以下属性：
  - `bigint`：一个布尔值，指示是否返回大整数类型的文件系统信息，默认为 `false`。

以下是一个使用 `fsPromises.statfs()` 的示例代码：

```javascript
const { statfs } = require("fs").promises;

async function getFilesystemStatus(path) {
  try {
    const stats = await statfs(path);
    console.log(`The status of file system "${path}" is:`, stats);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

getFilesystemStatus("/")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `statfs` 方法。然后，我们定义了一个 `getFilesystemStatus` 函数，用于获取指定文件系统的状态。在函数中，我们使用 `try...catch` 语句块来捕获 `statfs` 方法可能抛出的错误。如果没有发生错误，则表示文件系统状态已经成功获取；否则，我们将输出相应的错误信息。

接下来，我们打印出文件系统的状态，即 `fs.Statfs` 对象。该对象包含有关文件系统的各种信息，例如文件系统的总空间、可用空间、块大小等等。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.statfs()` 方法，我们可以方便地获取文件系统的状态信息，例如文件系统的总空间、可用空间、块大小等等。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源。

#### fsPromises.symlink(target, path[, type])

在 Node.js 中，`fsPromises.symlink()` 方法是一个用于创建符号链接的方法。它返回一个 Promise 对象，如果成功创建了符号链接，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.symlink()` 的语法：

```javascript
fsPromises.symlink(target, path[, type]);
```

- `target`：要指向的文件或目录路径。
- `path`：新符号链接的路径。
- `type`：一个可选的字符串，表示符号链接的类型。可以是 `'file'`、`'dir'` 或 `'junction'`。默认值是 `'file'`。

以下是一个使用 `fsPromises.symlink()` 的示例代码：

```javascript
const { symlink } = require("fs").promises;

async function createSymlink(targetPath, symlinkPath) {
  try {
    await symlink(targetPath, symlinkPath);
    console.log(`The symbolic link "${symlinkPath}" has been created.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

createSymlink("/path/to/target", "/path/to/symlink")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `symlink` 方法。然后，我们定义了一个 `createSymlink` 函数，用于创建指定的符号链接。在函数中，我们使用 `try...catch` 语句块来捕获 `symlink` 方法可能抛出的错误。如果没有发生错误，则表示符号链接已经成功创建；否则，我们将输出相应的错误信息。

接下来，我们配置了 `target` 和 `path` 参数，分别表示要指向的文件或目录路径和新符号链接的路径。

最后，我们将输出相应的结果或错误信息以及任务完成的提示。

通过使用 `fsPromises.symlink()` 方法，我们可以方便地创建符号链接，即一种特殊的文件，它包含了对另一个文件或目录的引用。需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外覆盖重要数据。

#### fsPromises.truncate(path[, len])

在 Node.js 中，`fsPromises.truncate()` 方法是一个用于截断文件的方法。它返回一个 Promise 对象，如果成功截断了文件，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.truncate()` 的语法：

```javascript
fsPromises.truncate(path[, len]);
```

- `path`：要截断的文件路径。
- `len`：一个可选的数字，表示要截断的文件长度。默认值为 `0`。

以下是一个使用 `fsPromises.truncate()` 的示例代码：

```javascript
const { truncate } = require("fs").promises;

async function truncateFile(path, length) {
  try {
    await truncate(path, length);
    console.log(`The file "${path}" has been truncated.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

truncateFile("/path/to/file", 1024)
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `truncate` 方法。然后，我们定义了一个 `truncateFile` 函数，用于截断指定的文件。在函数中，我们使用 `try...catch` 语句块来捕获 `truncate` 方法可能抛出的错误。如果没有发生错误，则表示文件已经成功截断；否则，我们将输出相应的错误信息。

接下来，我们配置了 `path` 和 `length` 参数，分别表示要截断的文件路径和新的文件长度。

需要注意的是，截断文件会删除文件末尾超过指定长度的部分，因此可能会丢失一些数据。在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外删除重要数据。

#### fsPromises.unlink(path)

在 Node.js 中，`fsPromises.unlink()` 方法是一个用于删除指定文件的方法。它返回一个 Promise 对象，如果成功删除了文件，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.unlink()` 的语法：

```javascript
fsPromises.unlink(path);
```

- `path`：要删除的文件路径。

以下是一个使用 `fsPromises.unlink()` 的示例代码：

```javascript
const { unlink } = require("fs").promises;

async function deleteFile(path) {
  try {
    await unlink(path);
    console.log(`The file "${path}" has been deleted.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

deleteFile("/path/to/file")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `unlink` 方法。然后，我们定义了一个 `deleteFile` 函数，用于删除指定的文件。在函数中，我们使用 `try...catch` 语句块来捕获 `unlink` 方法可能抛出的错误。如果没有发生错误，则表示文件已经成功删除；否则，我们将输出相应的错误信息。

接下来，我们配置了 `path` 参数，表示要删除的文件路径。

需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外删除重要数据。

#### fsPromises.utimes(path, atime, mtime)

在 Node.js 中，`fsPromises.utimes()` 方法是一个用于更改指定文件的访问时间和修改时间的方法。它返回一个 Promise 对象，如果成功更改了文件的时间戳，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.utimes()` 的语法：

```javascript
fsPromises.utimes(path, atime, mtime);
```

- `path`：要更改时间戳的文件路径。
- `atime`：一个可选的日期对象或数字，表示文件的新访问时间。默认值为当前时间。
- `mtime`：一个可选的日期对象或数字，表示文件的新修改时间。默认值为当前时间。

以下是一个使用 `fsPromises.utimes()` 的示例代码：

```javascript
const { utimes } = require("fs").promises;

async function updateFileTimestamps(path) {
  try {
    await utimes(path, new Date(), new Date());
    console.log(`The timestamps of file "${path}" have been updated.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

updateFileTimestamps("/path/to/file")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `utimes` 方法。然后，我们定义了一个 `updateFileTimestamps` 函数，用于更改指定文件的访问时间和修改时间。在函数中，我们使用 `try...catch` 语句块来捕获 `utimes` 方法可能抛出的错误。如果没有发生错误，则表示文件的时间戳已经成功更改；否则，我们将输出相应的错误信息。

接下来，我们配置了 `path`、`atime` 和 `mtime` 参数，分别表示要更改时间戳的文件路径、新的访问时间和新的修改时间。

需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外更改重要数据的时间戳。

#### fsPromises.watch(filename[, options])

在 Node.js 中，`fsPromises.watch()` 方法是一个用于监视指定文件或目录变化的方法。它返回一个 `fs.FSWatcher` 对象，该对象可用于注册事件处理程序以响应不同类型的文件系统事件。

以下是 `fsPromises.watch()` 的语法：

```javascript
fsPromises.watch(filename[, options]);
```

- `filename`：要监视的文件或目录路径。
- `options`：一个可选的对象，表示监视器的选项。可以包含以下属性：
  - `persistent`：一个可选的布尔值，表示监视器是否应该持久存在。默认值为 `true`。
  - `recursive`：一个可选的布尔值，表示监视器是否应该递归监视子目录。默认值为 `false`。
  - `encoding`：一个可选的字符串，表示监视器使用的字符编码。默认值为 `'utf8'`。

以下是一个使用 `fsPromises.watch()` 的示例代码：

```javascript
const { watch } = require("fs").promises;

const watcher = watch("/path/to/file", { encoding: "utf8" });

watcher.on("change", (eventType, filename) => {
  console.log(`The file "${filename}" has been changed (${eventType}).`);
});

watcher.on("error", (error) => {
  console.error(`Error: ${error}`);
});
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `watch` 方法。然后，我们创建了一个 `watcher` 对象，该对象将监视 `/path/to/file` 文件的变化，并使用 `{ encoding: 'utf8' }` 配置了选项。接下来，我们注册了 `change` 和 `error` 事件处理程序，以响应文件系统事件和错误。如果文件变化，则会输出相应的日志消息；否则，如果出现错误，则会输出相应的错误信息。

需要注意的是，`fsPromises.watch()` 方法的性能可能会受到文件系统事件的频繁触发而影响。另外，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外修改重要数据。

#### fsPromises.writeFile(file, data[, options])

在 Node.js 中，`fsPromises.writeFile()` 方法是一个用于写入数据到指定文件的方法。它返回一个 Promise 对象，如果成功写入了数据，则 Promise 将解析为 undefined，否则将拒绝并抛出错误。

以下是 `fsPromises.writeFile()` 的语法：

```javascript
fsPromises.writeFile(file, data[, options]);
```

- `file`：要写入数据的文件路径。
- `data`：要写入文件的数据，可以是字符串或二进制数据。
- `options`：一个可选的对象，表示写入的选项。可以包含以下属性：
  - `encoding`：一个可选的字符串，表示要使用的字符编码。默认值为 `'utf8'`。
  - `mode`：一个可选的整数，表示要应用于文件的权限。默认值为 `0o666`。
  - `flag`：一个可选的字符串，表示文件打开时要执行的操作。默认值为 `'w'`。可以选择的值包括：
    - `'w'`：覆盖现有文件。
    - `'wx'`：与 `'w'` 类似，但如果文件已经存在，则会失败。
    - `'a'`：追加到现有文件中。
    - `'ax'`：与 `'a'` 类似，但如果文件已经存在，则会失败。

以下是一个使用 `fsPromises.writeFile()` 的示例代码：

```javascript
const { writeFile } = require("fs").promises;

async function writeToFile(path, data) {
  try {
    await writeFile(path, data);
    console.log(`The data has been written to file "${path}".`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

writeToFile("/path/to/file", "Hello, world!")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `writeFile` 方法。然后，我们定义了一个 `writeToFile` 函数，用于向指定文件写入数据。在函数中，我们使用 `try...catch` 语句块来捕获 `writeFile` 方法可能抛出的错误。如果没有发生错误，则表示数据已经成功写入文件；否则，我们将输出相应的错误信息。

接下来，我们配置了 `path` 和 `data` 参数，分别表示要写入数据的文件路径和要写入的数据。

需要注意的是，在进行文件操作后，应该始终记得关闭文件描述符对象，以释放相应的资源，并且需要小心谨慎地使用该方法，确保不会意外覆盖重要数据。

#### fsPromises.constants

在 Node.js 中，`fsPromises.constants` 对象是一个包含文件系统操作常量的对象。使用这个对象，你可以在进行文件系统操作时引用这些常量，以保持代码清晰和易于维护。

以下是 `fsPromises.constants` 支持的常量：

- `fs.F_OK`：用于检查文件是否存在。
- `fs.R_OK`：用于检查文件是否可读取。
- `fs.W_OK`：用于检查文件是否可写入。
- `fs.X_OK`：用于检查文件是否可执行。

这些常量可以与其他文件系统方法一起使用，例如 `fs.access()`、`fs.chmod()` 和 `fs.open()` 等。

以下是一个使用 `fsPromises.constants` 的示例代码：

```javascript
const { constants } = require("fs").promises;

async function checkFilePermission(path) {
  try {
    await constants.access(path, constants.R_OK | constants.W_OK);
    console.log(`The file "${path}" is readable and writable.`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

checkFilePermission("/path/to/file")
  .then(() => {
    console.log("Task completed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```

在这个例子中，我们首先引入了 `fs` 模块中的 `promises` 对象，并从中获取 `constants` 对象。然后，我们定义了一个 `checkFilePermission` 函数，用于检查指定文件的权限。在函数中，我们使用 `try...catch` 语句块来捕获 `access` 方法可能抛出的错误。如果没有发生错误，则表示文件具有所需的访问权限；否则，我们将输出相应的错误信息。

接下来，我们配置了 `path` 参数，表示要检查权限的文件路径。在调用 `access` 方法时，我们将 `R_OK` 和 `W_OK` 常量作为第二个参数传递给它，从而检查文件是否可读取和可写入。

需要注意的是，`fsPromises.constants` 只是一个包含常量的对象，不能直接调用它。如果要在文件系统操作中使用这些常量，请引用它们并将它们作为参数传递给适当的方法。

### Callback API

在 Node.js 中，`Callback API` 指的是一种早期的编程模式，其中文件系统和网络操作通常是异步执行的，并使用回调函数来处理操作完成时的结果或错误。

在 Callback API 中，方法通常会将一个或多个回调函数作为参数接受，以便在操作完成时调用。回调函数通常采用两个参数：第一个参数表示错误对象（如果有错），第二个参数表示操作结果的返回值。

以下是一个使用 Callback API 的示例代码：

```javascript
const fs = require("fs");

fs.readFile("/path/to/file", "utf8", (error, data) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The file contents are:\n${data}`);
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `readFile` 方法读取 `/path/to/file` 文件的内容。在调用 `readFile` 方法时，我们传递了 `'utf8'` 参数作为文件编码格式，并提供了一个回调函数来处理操作完成时的结果或错误。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将输出文件的内容。

需要注意的是，Callback API 可能存在一些问题，例如嵌套回调（也称为“回调地狱”）和难以维护的代码。因此，Node.js 推荐使用 Promise 和 async/await 等更高级的编程模式来进行异步编程。但是，在某些情况下，Callback API 仍然是必需的，特别是在需要向后兼容旧代码或与其他库或框架进行交互时。

#### fs.access(path[, mode], callback)

在 Node.js 中，`fs.access()` 方法是一个用于检查文件或目录的访问权限的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.access()` 的语法：

```javascript
fs.access(path[, mode], callback);
```

- `path`：要检查权限的文件或目录路径。
- `mode`：一个可选的整数，表示要应用于文件的权限。默认值为 `fs.constants.F_OK`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `fd`。如果权限检查失败，则 `error` 参数将包含相应的错误信息；否则，`fd` 参数将为 `undefined`。

以下是一个使用 `fs.access()` 的示例代码：

```javascript
const fs = require("fs");

fs.access("/path/to/file", fs.constants.R_OK | fs.constants.W_OK, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file is readable and writable.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `access` 方法检查 `/path/to/file` 文件的访问权限。在调用 `access` 方法时，我们传递了 `fs.constants.R_OK | fs.constants.W_OK` 常量作为第二个参数，以检查文件是否可读取和可写入。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认文件可读取和可写入。

需要注意的是，`fs.access()` 方法只是检查文件或目录的权限，不打开或关闭它们。如果需要进行文件读取或写入等其他操作，则需要使用其他文件系统方法，例如 `fs.readFile()`、`fs.writeFile()` 等。

#### fs.appendFile(path, data[, options], callback)

在 Node.js 中，`fs.appendFile()` 方法是一个用于将数据追加到指定文件的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.appendFile()` 的语法：

```javascript
fs.appendFile(path, data[, options], callback);
```

- `path`：要追加数据的文件路径。
- `data`：要追加到文件的数据，可以是字符串或二进制数据。
- `options`：一个可选的对象，表示写入的选项。可以包含以下属性：
  - `encoding`：一个可选的字符串，表示要使用的字符编码。默认值为 `'utf8'`。
  - `mode`：一个可选的整数，表示要应用于文件的权限。默认值为 `0o666`。
  - `flag`：一个可选的字符串，表示文件打开时要执行的操作。默认值为 `'a'`。可以选择的值包括：
    - `'w'`：覆盖现有文件。
    - `'wx'`：与 `'w'` 类似，但如果文件已经存在，则会失败。
    - `'a'`：追加到现有文件中。
    - `'ax'`：与 `'a'` 类似，但如果文件已经存在，则会失败。
- `callback`：一个回调函数，接受一个参数：`error`。如果追加数据失败，则 `error` 参数将包含相应的错误信息；否则，将不带参数调用回调函数。

以下是一个使用 `fs.appendFile()` 的示例代码：

```javascript
const fs = require("fs");

fs.appendFile("/path/to/file", "Hello, world!", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The data has been appended to the file.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `appendFile` 方法向 `/path/to/file` 文件中追加数据。在调用 `appendFile` 方法时，我们只提供了必需的参数：文件路径和要追加的数据。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认数据已经成功添加到文件中。

需要注意的是，`fs.appendFile()` 方法仅适用于较小的数据追加操作，并且不能保证原子性（即，在多个进程同时追加数据时，可能会出现一些问题）。如果需要进行更大、更复杂的数据操作，建议使用其他文件系统方法，例如 `fs.createWriteStream()` 等。

#### fs.chmod(path, mode, callback)

在 Node.js 中，`fs.chmod()` 方法是一个用于更改文件或目录权限的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.chmod()` 的语法：

```javascript
fs.chmod(path, mode, callback);
```

- `path`：要更改权限的文件或目录路径。
- `mode`：一个整数，表示要应用于文件的权限。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改权限失败，则 `error` 参数将包含相应的错误信息；否则，将不带参数调用回调函数。

以下是一个使用 `fs.chmod()` 的示例代码：

```javascript
const fs = require("fs");

fs.chmod("/path/to/file", 0o755, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file permission has been changed.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `chmod` 方法更改 `/path/to/file` 文件的权限。在调用 `chmod` 方法时，我们传递了一个八进制数 `0o755` 作为新的文件权限。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认文件权限已成功更改。

需要注意的是，`fs.chmod()` 方法只能更改文件或目录的权限，而不能更改其所有权或其他属性。如果需要进行更大、更复杂的文件系统操作，建议使用其他文件系统方法，例如 `fs.chown()`、`fs.utimes()` 等。

#### fs.chown(path, uid, gid, callback)

在 Node.js 中，`fs.chown()` 方法是一个用于更改文件或目录的所有权的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.chown()` 的语法：

```javascript
fs.chown(path, uid, gid, callback);
```

- `path`：要更改所有权的文件或目录路径。
- `uid`：一个整数，表示新的所有者的用户 ID。
- `gid`：一个整数，表示新的所有者的组 ID。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改所有权失败，则 `error` 参数将包含相应的错误信息；否则，将不带参数调用回调函数。

以下是一个使用 `fs.chown()` 的示例代码：

```javascript
const fs = require("fs");

fs.chown("/path/to/file", 1000, 1000, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file ownership has been changed.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `chown` 方法更改 `/path/to/file` 文件的所有权。在调用 `chown` 方法时，我们传递了新的用户 ID 和组 ID。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认文件所有权已成功更改。

需要注意的是，`fs.chown()` 方法只能更改文件或目录的所有权，而不能更改其权限或其他属性。如果需要进行更大、更复杂的文件系统操作，建议使用其他文件系统方法，例如 `fs.chmod()`、`fs.utimes()` 等。

#### fs.close(fd[, callback])

在 Node.js 中，`fs.close()` 方法是一个用于关闭打开的文件描述符的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.close()` 的语法：

```javascript
fs.close(fd[, callback]);
```

- `fd`：要关闭的文件描述符。
- `callback`：一个回调函数，接受一个参数：`error`。如果关闭文件描述符失败，则 `error` 参数将包含相应的错误信息；否则，将不带参数调用回调函数。

以下是一个使用 `fs.close()` 的示例代码：

```javascript
const fs = require("fs");

fs.open("/path/to/file", "r", (error, fd) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    // Do something with the file...

    fs.close(fd, (error) => {
      if (error) {
        console.error(`Error: ${error}`);
      } else {
        console.log("The file has been closed.");
      }
    });
  }
});
```

在这个例子中，我们首先使用 `fs.open()` 方法打开 `/path/to/file` 文件，并获取了一个文件描述符 `fd`。然后，我们可以进行一些针对文件描述符的操作。在完成操作后，我们可以使用 `fs.close()` 方法关闭文件描述符。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认文件已成功关闭。

需要注意的是，文件描述符是唯一标识打开的文件或其他资源的整数值。因此，它们通常在进行底层文件操作时使用。在高级应用程序中，建议尽可能使用更高级别的文件系统方法，例如 `fs.readFile()`、`fs.writeFile()` 等，以避免直接处理文件描述符。

#### fs.copyFile(src, dest[, mode], callback)

在 Node.js 中，`fs.copyFile()` 方法是一个用于将文件从一个路径复制到另一个路径的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.copyFile()` 的语法：

```javascript
fs.copyFile(src, dest[, mode], callback);
```

- `src`：要复制的源文件路径。
- `dest`：目标文件路径，表示要将文件复制到哪个位置。
- `mode`：一个可选的整数，表示要应用于目标文件的权限。默认值为 `0o666`。
- `callback`：一个回调函数，接受一个参数：`error`。如果复制文件失败，则 `error` 参数将包含相应的错误信息；否则，将不带参数调用回调函数。

以下是一个使用 `fs.copyFile()` 的示例代码：

```javascript
const fs = require("fs");

fs.copyFile("/path/to/source/file", "/path/to/destination/file", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file has been copied.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `copyFile` 方法将 `/path/to/source/file` 文件复制到 `/path/to/destination/file` 文件中。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认文件已成功复制。

需要注意的是，`fs.copyFile()` 方法只能复制文件，而不能复制目录或符号链接。如果需要进行更大、更复杂的文件系统操作，建议使用其他文件系统方法，例如 `fs.createReadStream()` 和 `fs.createWriteStream()` 等。

#### fs.cp(src, dest[, options], callback)

在 Node.js 中，`fs.cp()` 方法是一个用于将文件或目录从一个路径复制到另一个路径的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.cp()` 的语法：

```javascript
fs.cp(src, dest[, options], callback);
```

- `src`：要复制的源文件或目录路径。
- `dest`：目标文件或目录路径，表示要将文件或目录复制到哪个位置。
- `options`：一个可选的对象，表示复制的选项。可以包含以下属性：
  - `recursive`：一个可选的布尔值，表示是否递归地复制整个目录。默认值为 `false`。
  - `force`：一个可选的布尔值，表示是否覆盖现有目标文件或目录。默认值为 `false`。
- `callback`：一个回调函数，接受一个参数：`error`。如果复制文件或目录失败，则 `error` 参数将包含相应的错误信息；否则，将不带参数调用回调函数。

以下是一个使用 `fs.cp()` 的示例代码：

```javascript
const fs = require("fs");

fs.cp(
  "/path/to/source",
  "/path/to/destination",
  { recursive: true },
  (error) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else {
      console.log("The file or directory has been copied.");
    }
  }
);
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `cp` 方法将 `/path/to/source` 文件或目录复制到 `/path/to/destination` 文件或目录中。在传递了可选的 `{ recursive: true }` 选项后，将递归地复制整个目录。在回调函数中，如果出现错误，则会输出相应的错误信息；否则，我们将确认文件或目录已成功复制。

需要注意的是，`fs.cp()` 方法是新添加的实验性功能，可能在未来的 Node.js 版本中发生更改。因此，在使用该方法时，应格外小心并始终查看最新的 Node.js 文档。

#### fs.createReadStream(path[, options])

在 Node.js 中，`fs.createReadStream()` 方法是一个用于创建可读流的方法。它将指定的文件作为输入流，并提供了一些选项来控制如何读取文件内容。

以下是 `fs.createReadStream()` 的语法：

```javascript
fs.createReadStream(path[, options]);
```

- `path`：要读取的文件路径。
- `options`：一个可选的对象，表示读取文件的选项。可以包含以下属性：
  - `flags`：一个字符串，表示打开文件时使用的标志。默认值为 `'r'`。
  - `encoding`：一个字符串，表示要读取的文件的编码方式。默认值为 `null`，表示二进制数据。
  - `start`：一个整数，表示从文件的哪个位置开始读取。默认值为 `0`。
  - `end`：一个整数，表示从文件的哪个位置结束读取。默认值为文件的末尾。
  - `highWaterMark`：一个整数，表示每次读取的最大字节数。默认值为 `64 * 1024`（即 64 KB）。
  - `autoClose`：一个布尔值，表示是否在读取完毕后自动关闭文件描述符。默认值为 `true`。

以下是一个使用 `fs.createReadStream()` 的示例代码：

```javascript
const fs = require("fs");

const readable = fs.createReadStream("/path/to/file.txt", { encoding: "utf8" });

readable.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

readable.on("end", () => {
  console.log("Finished reading data.");
});

readable.on("error", (error) => {
  console.error(`Error: ${error}`);
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `createReadStream` 方法创建了一个可读流。在传递了 `{ encoding: 'utf8' }` 选项后，我们将使用 UTF-8 编码读取文件内容。然后，我们注册了三个回调函数：

- `data` 事件：在每次读取到数据块时触发，并输出读取到的字节数。
- `end` 事件：在文件读取完毕后触发，并输出读取完成的消息。
- `error` 事件：在读取文件过程中出现错误时触发，并输出相应的错误信息。

需要注意的是，`fs.createReadStream()` 方法返回一个可读流对象，该对象可以像其他 Node.js 可读流一样使用。例如，您可以通过 `.pipe()` 方法将可读流连接到其他可写流，或者通过 `.on()` 方法注册其他事件处理函数。

#### fs.createWriteStream(path[, options])

在 Node.js 中，`fs.createWriteStream()` 方法是一个用于创建可写流的方法。它将指定的文件作为输出流，并提供了一些选项来控制如何写入文件内容。

以下是 `fs.createWriteStream()` 的语法：

```javascript
fs.createWriteStream(path[, options]);
```

- `path`：要写入的文件路径。
- `options`：一个可选的对象，表示写入文件的选项。可以包含以下属性：
  - `flags`：一个字符串，表示打开文件时使用的标志。默认值为 `'w'`。
  - `encoding`：一个字符串，表示要写入的文件的编码方式。默认值为 `null`，表示二进制数据。
  - `mode`：一个整数，表示要应用于文件的权限。默认值为 `0o666`。
  - `autoClose`：一个布尔值，表示是否在写入完毕后自动关闭文件描述符。默认值为 `true`。

以下是一个使用 `fs.createWriteStream()` 的示例代码：

```javascript
const fs = require("fs");

const writable = fs.createWriteStream("/path/to/file.txt", {
  encoding: "utf8",
});

writable.write("Hello, world!");
writable.write("\n");
writable.write("How are you today?");

writable.end(() => {
  console.log("Finished writing data.");
});

writable.on("error", (error) => {
  console.error(`Error: ${error}`);
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `createWriteStream` 方法创建了一个可写流。在传递了 `{ encoding: 'utf8' }` 选项后，我们将使用 UTF-8 编码写入文件内容。然后，我们使用 `.write()` 方法向流中写入两行文本，并通过 `.end()` 方法结束写入过程。在回调函数中，我们将确认写入完成的消息。如果出现错误，则会输出相应的错误信息。

需要注意的是，`.write()` 方法返回一个布尔值，表示是否已成功将数据写入流中。您也可以使用 `.on()` 方法注册其他事件处理函数，例如 `drain` 事件（在缓冲区已排空时触发）或 `finish` 事件（在所有数据都已被写入时触发）。

#### fs.exists(path, callback)

在 Node.js 中，`fs.exists()` 方法是一个用于检查指定路径的文件或目录是否存在的方法。它使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.exists()` 的语法：

```javascript
fs.exists(path, callback);
```

- `path`：要检查的文件或目录路径。
- `callback`：一个回调函数，接受一个参数：`exists`。如果文件或目录存在，则 `exists` 参数为 `true`；否则，为 `false`。

以下是一个使用 `fs.exists()` 的示例代码：

```javascript
const fs = require("fs");

fs.exists("/path/to/file.txt", (exists) => {
  if (exists) {
    console.log("The file exists.");
  } else {
    console.log("The file does not exist.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `exists` 方法检查 `/path/to/file.txt` 文件是否存在。如果文件存在，则输出相应的消息；否则，输出另一条消息。

需要注意的是，`fs.exists()` 方法已经被废弃，不建议在新的应用程序中使用。取而代之的是，您可以使用 `fs.access()` 或 `fs.stat()` 方法来检查文件或目录是否存在。例如：

```javascript
const fs = require("fs");

fs.access("/path/to/file.txt", (error) => {
  if (error) {
    console.log("The file does not exist.");
  } else {
    console.log("The file exists.");
  }
});
```

在这个例子中，我们使用 `access` 方法检查 `/path/to/file.txt` 文件是否存在。如果文件不存在，则会触发 `error` 事件，并输出相应的消息；否则，输出另一条消息。

#### fs.fchmod(fd, mode, callback)

在 Node.js 中，`fs.fchmod()` 方法是一个用于更改指定文件的权限模式的方法。它使用文件描述符来表示要更改权限的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.fchmod()` 的语法：

```javascript
fs.fchmod(fd, mode, callback);
```

- `fd`：要更改权限的文件的文件描述符。
- `mode`：一个整数，表示要应用于文件的权限模式。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改权限成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.fchmod()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "r"); // 打开文件并获得文件描述符

fs.fchmod(file, 0o644, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file mode has been changed.");
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们使用 `fs.fchmod()` 方法将文件的权限模式更改为 `0o644`（即 `-rw-r--r--`），并在回调函数中输出相应的消息。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.fchmod()` 方法仅更改由文件描述符指定的文件的权限模式，而不更改文件的所有权或组。如果要更改这些属性，请使用 `fs.chown()` 或 `fs.chmod()` 方法。

#### fs.fchown(fd, uid, gid, callback)

在 Node.js 中，`fs.fchown()` 方法是一个用于更改指定文件的所有权的方法。它使用文件描述符来表示要更改所有权的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.fchown()` 的语法：

```javascript
fs.fchown(fd, uid, gid, callback);
```

- `fd`：要更改所有权的文件的文件描述符。
- `uid`：一个整数，表示要分配给文件的用户 ID。
- `gid`：一个整数，表示要分配给文件的组 ID。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改所有权成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.fchown()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "r"); // 打开文件并获得文件描述符

fs.fchown(file, 1000, 1000, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file ownership has been changed.");
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们使用 `fs.fchown()` 方法将文件的所有权更改为用户 ID 和组 ID 分别为 `1000`，并在回调函数中输出相应的消息。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.fchown()` 方法仅更改由文件描述符指定的文件的所有权，而不更改文件的权限模式或组。如果要更改这些属性，请使用 `fs.chown()` 或 `fs.chmod()` 方法。

#### fs.fdatasync(fd, callback)

在 Node.js 中，`fs.fdatasync()` 方法是一个用于强制将位于文件描述符所指定的文件中的所有已修改数据写入磁盘的方法。它使用文件描述符来表示要刷新的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.fdatasync()` 的语法：

```javascript
fs.fdatasync(fd, callback);
```

- `fd`：要刷新的文件的文件描述符。
- `callback`：一个回调函数，接受一个参数：`error`。如果刷新成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.fdatasync()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "a+"); // 打开文件并获得文件描述符

fs.writeSync(file, "Hello, world!");

fs.fdatasync(file, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file data has been flushed to disk.");
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们使用 `.writeSync()` 方法向文件中写入数据，并使用 `fs.fdatasync()` 方法将所有已修改数据刷新到磁盘上。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，与 `fs.fsync()` 方法相比，`fs.fdatasync()` 方法仅刷新数据部分，而不包括元数据（如文件状态信息）。如果要同时刷新数据和元数据，请使用 `fs.fsync()` 方法。

#### fs.fstat(fd[, options], callback)

在 Node.js 中，`fs.fstat()` 方法是一个用于获取文件的元数据（如文件大小、修改时间等）的方法。它使用文件描述符来表示要获取元数据的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.fstat()` 的语法：

```javascript
fs.fstat(fd[, options], callback);
```

- `fd`：要获取元数据的文件的文件描述符。
- `options`：一个可选的对象，表示获取元数据的选项。可以包含以下属性：
  - `bigint`：一个布尔值，表示是否应将文件大小和偏移量作为 BigInt 类型返回。默认值为 `false`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `stats`。如果获取元数据成功，则 `error` 参数为 `null`，而 `stats` 参数是一个 `fs.Stats` 对象，其中包含了文件的元数据；否则，包含相应的错误信息。

以下是一个使用 `fs.fstat()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "r"); // 打开文件并获得文件描述符

fs.fstat(file, (error, stats) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The file size is ${stats.size} bytes.`);
    console.log(`The file was last modified on ${stats.mtime}.`);
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们使用 `fs.fstat()` 方法获取文件的元数据，并在回调函数中输出文件大小和最后修改时间。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.fstat()` 方法返回的 `fs.Stats` 对象提供了一些有关文件的元数据信息，例如文件大小、权限模式、最后访问时间和最后修改时间等。您可以使用这些信息来操作文件或进行其他相关的任务。

#### fs.fsync(fd, callback)

在 Node.js 中，`fs.fsync()` 方法是一个用于将位于文件描述符所指定的文件中的所有已修改数据和元数据写入磁盘的方法。它使用文件描述符来表示要刷新的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.fsync()` 的语法：

```javascript
fs.fsync(fd, callback);
```

- `fd`：要刷新的文件的文件描述符。
- `callback`：一个回调函数，接受一个参数：`error`。如果刷新成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.fsync()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "a+"); // 打开文件并获得文件描述符

fs.writeSync(file, "Hello, world!");

fs.fsync(file, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file data and metadata have been flushed to disk.");
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们使用 `.writeSync()` 方法向文件中写入数据，并使用 `fs.fsync()` 方法将所有已修改数据和元数据刷新到磁盘上。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，与 `fs.fdatasync()` 方法相比，`fs.fsync()` 方法同时刷新数据和元数据。如果只需要刷新数据，请使用 `fs.fdatasync()` 方法。

#### fs.ftruncate(fd[, len], callback)

在 Node.js 中，`fs.ftruncate()` 方法是一个用于截断指定文件的长度的方法。它使用文件描述符来表示要截断的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.ftruncate()` 的语法：

```javascript
fs.ftruncate(fd[, len], callback);
```

- `fd`：要截断的文件的文件描述符。
- `len`：一个可选的整数，表示要截断的文件的新长度。默认值为 `0`。
- `callback`：一个回调函数，接受一个参数：`error`。如果截断成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.ftruncate()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "r+"); // 打开文件并获得文件描述符

fs.ftruncate(file, 100, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file has been truncated to 100 bytes.");
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们使用 `fs.ftruncate()` 方法将文件截断到长度为 `100`，并在回调函数中输出相应的消息。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.ftruncate()` 方法会将文件截断为指定的长度，并将截断点之后的所有内容删除。如果未提供 `len` 参数，则文件将被截断为长度为 0。

#### fs.futimes(fd, atime, mtime, callback)

在 Node.js 中，`fs.futimes()` 方法是一个用于更改指定文件的访问时间和修改时间的方法。它使用文件描述符来表示要更改时间戳的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.futimes()` 的语法：

```javascript
fs.futimes(fd, atime, mtime, callback);
```

- `fd`：要更改时间戳的文件的文件描述符。
- `atime`：一个表示要分配给文件的新访问时间的整数或日期对象。
- `mtime`：一个表示要分配给文件的新修改时间的整数或日期对象。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改时间戳成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.futimes()` 的示例代码：

```javascript
const fs = require("fs");

const file = fs.openSync("/path/to/file.txt", "r+"); // 打开文件并获得文件描述符

const atime = new Date();
const mtime = new Date();

fs.futimes(file, atime, mtime, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file access and modification times have been updated.");
  }
});

fs.closeSync(file); // 关闭文件
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `.openSync()` 方法打开名为 `/path/to/file.txt` 的文件，并获得文件描述符。然后，我们创建了两个日期对象，分别作为新的访问时间和修改时间，并使用 `fs.futimes()` 方法将它们分配给文件。最后，我们使用 `.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.futimes()` 方法仅更改文件的时间戳属性，而不更改文件的内容、权限或所有权等其他属性。如果要更改这些属性，请使用其他相关的方法（如 `fs.chmod()`、`fs.chown()` 等）。

#### fs.lchmod(path, mode, callback)

在 Node.js 中，`fs.lchmod()` 方法是一个用于更改指定路径处的文件或目录的权限模式的方法。它使用文件路径来表示要更改权限模式的文件或目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.lchmod()` 的语法：

```javascript
fs.lchmod(path, mode, callback);
```

- `path`：要更改权限模式的文件或目录的路径。
- `mode`：一个表示新的权限模式的整数或字符串。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改权限模式成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.lchmod()` 的示例代码：

```javascript
const fs = require("fs");

fs.lchmod("/path/to/file.txt", "755", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file permissions have been updated.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.lchmod()` 方法将 `/path/to/file.txt` 文件的权限模式更改为 `755`。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.lchmod()` 方法仅更改指定路径处的文件或目录的权限模式，而不更改其他属性（如所有权、时间戳等）。如果要更改其他属性，请使用其他相关的方法（如 `fs.chown()`、`fs.utimes()` 等）。此外，值得一提的是，该方法在 Windows 中并不可用，只能在 UNIX 和类 UNIX 系统上使用。在 Windows 上，可以使用 `fs.chmod()` 方法来更改文件或目录的权限模式。

#### fs.lchown(path, uid, gid, callback)

在 Node.js 中，`fs.lchown()` 方法是一个用于更改指定路径处的文件或目录的所有权的方法。它使用文件路径来表示要更改所有权的文件或目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.lchown()` 的语法：

```javascript
fs.lchown(path, uid, gid, callback);
```

- `path`：要更改所有权的文件或目录的路径。
- `uid`：一个表示新的用户 ID 的整数或字符串。如果不需要更改此属性，则将其设置为 `-1` 或省略该参数。
- `gid`：一个表示新的组 ID 的整数或字符串。如果不需要更改此属性，则将其设置为 `-1` 或省略该参数。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改所有权成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.lchown()` 的示例代码：

```javascript
const fs = require("fs");

fs.lchown("/path/to/file.txt", 1000, 1000, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file ownership has been updated.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.lchown()` 方法将 `/path/to/file.txt` 文件的所有权更改为用户 ID 和组 ID 都为 `1000`。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.lchown()` 方法仅更改指定路径处的文件或目录的所有权，而不更改其他属性（如权限模式、时间戳等）。此外，与其他 `l` 类函数一样，该方法会遵循符号链接，即如果指定路径是符号链接，则会更改符号链接所指向的文件或目录，而非符号链接本身的所有权。如果需要更改符号链接本身的所有权，请使用 `fs.chown()` 方法。

#### fs.lutimes(path, atime, mtime, callback)

在 Node.js 中，`fs.lutimes()` 方法是一个用于更改指定路径处的文件或目录的访问时间和修改时间的方法。它使用文件路径来表示要更改时间戳的文件或目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.lutimes()` 的语法：

```javascript
fs.lutimes(path, atime, mtime, callback);
```

- `path`：要更改时间戳的文件或目录的路径。
- `atime`：一个表示要分配给文件的新访问时间的整数或日期对象。
- `mtime`：一个表示要分配给文件的新修改时间的整数或日期对象。
- `callback`：一个回调函数，接受一个参数：`error`。如果更改时间戳成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.lutimes()` 的示例代码：

```javascript
const fs = require("fs");

fs.lutimes("/path/to/file.txt", new Date(), new Date(), (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The file access and modification times have been updated.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.lutimes()` 方法将 `/path/to/file.txt` 文件的访问时间和修改时间都设置为当前时间。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.lutimes()` 方法仅更改指定路径处的文件或目录的时间戳属性，而不更改其他属性（如权限模式、所有权等）。与 `fs.lchown()` 方法类似，该方法也会遵循符号链接。如果需要更改符号链接本身的时间戳，请使用 `fs.utimes()` 方法。

#### fs.link(existingPath, newPath, callback)

在 Node.js 中，`fs.link()` 方法是一个用于创建硬链接的方法。它使用已有的文件路径来表示要创建链接的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.link()` 的语法：

```javascript
fs.link(existingPath, newPath, callback);
```

- `existingPath`：要创建硬链接的现有文件的路径。
- `newPath`：新链接的路径。
- `callback`：一个回调函数，接受一个参数：`error`。如果创建硬链接成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.link()` 的示例代码：

```javascript
const fs = require("fs");

fs.link("/path/to/existing/file.txt", "/path/to/new/link.txt", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The hard link has been created.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.link()` 方法将 `/path/to/existing/file.txt` 文件创建一个新链接 `/path/to/new/link.txt`。最后，我们使用回调函数输出相应的消息。

需要注意的是，硬链接是指两个或多个文件名指向同一个文件内容的情况。因此，通过链接创建的新文件与原始文件共享相同的 inode 和数据块，因此对其中一个文件的更改会影响到其他所有文件。硬链接仅可在同一文件系统上创建（因为不同文件系统可能具有不同的 inode 编号）。

#### fs.lstat(path[, options], callback)

在 Node.js 中，`fs.lstat()` 方法是一个用于获取指定路径下文件或目录的详细信息的方法。与 `fs.stat()` 方法不同，`fs.lstat()` 方法可以处理符号链接，即返回符号链接本身的信息而非指向的文件或目录的信息。

以下是 `fs.lstat()` 的语法：

```javascript
fs.lstat(path[, options], callback);
```

- `path`：要获取详细信息的文件或目录的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `bigint`：如果为 `true`，则将返回的 `ino` 和 `size` 属性转换为 `BigInt` 类型。默认值为 `false`。
  - `throwIfNoEntry`：如果为 `true`，则在找不到指定路径时抛出异常。默认值为 `false`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `stats`。如果获取详细信息成功，则 `error` 参数为 `null`，`stats` 参数包含相应的信息；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.lstat()` 的示例代码：

```javascript
const fs = require("fs");

fs.lstat("/path/to/file.txt", (error, stats) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(stats);
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.lstat()` 方法获取 `/path/to/file.txt` 文件的详细信息。最后，我们使用回调函数输出相应的信息。

需要注意的是，`fs.lstat()` 方法仅获取指定路径下文件或目录的详细信息，而不进行其他操作（如读取或写入）。如果需要读取文件内容，请使用 `fs.readFile()` 或相关方法。

#### fs.mkdir(path[, options], callback)

在 Node.js 中，`fs.mkdir()` 方法是一个用于创建新目录的方法。它使用文件路径来表示要创建的目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.mkdir()` 的语法：

```javascript
fs.mkdir(path[, options], callback);
```

- `path`：要创建的目录的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `recursive`：如果为 `true`，则在创建中间目录（如果不存在）的同时创建最终目录。默认值为 `false`。
  - `mode`：要分配给目录的权限模式。默认值为 `0o777`。
- `callback`：一个回调函数，接受一个参数：`error`。如果创建目录成功，则 `error` 参数为 `null`；否则，包含相应的错误信息。

以下是一个使用 `fs.mkdir()` 的示例代码：

```javascript
const fs = require("fs");

fs.mkdir("/path/to/new/directory", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The new directory has been created.");
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.mkdir()` 方法创建了一个名为 `/path/to/new/directory` 的新目录。最后，我们使用回调函数输出相应的消息。

需要注意的是，在某些情况下，需要在创建中间目录（例如，`/path/to/new`）时同时创建最终目录（即 `directory`）。为此，可以将 `recursive` 属性设置为 `true`，如下所示：

```javascript
fs.mkdir("/path/to/new/directory", { recursive: true }, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The new directory has been created.");
  }
});
```

此外，还可以通过 `mode` 属性指定要分配给目录的权限模式。例如，以下代码将目录权限设置为 `0o755`：

```javascript
fs.mkdir("/path/to/new/directory", { mode: 0o755 }, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("The new directory has been created.");
  }
});
```

#### fs.mkdtemp(prefix[, options], callback)

在 Node.js 中，`fs.mkdtemp()` 方法是一个用于创建临时目录的方法。它使用文件路径前缀来生成唯一的目录名称，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.mkdtemp()` 的语法：

```javascript
fs.mkdtemp(prefix[, options], callback);
```

- `prefix`：用于作为目录名称前缀的字符串。
- `options`：可选参数，一个对象，支持两个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
  - `mode`：要分配给目录的权限模式。默认值为 `0o700`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `directory`。如果创建目录成功，则 `error` 参数为 `null`，`directory` 参数包含新目录的完整路径；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.mkdtemp()` 的示例代码：

```javascript
const fs = require("fs");

fs.mkdtemp("/path/to/prefix-", (error, directory) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The new directory is ${directory}.`);
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.mkdtemp()` 方法通过前缀 `/path/to/prefix-` 创建一个新的临时目录。最后，我们使用回调函数输出相应的消息。

需要注意的是，在某些情况下，需要在创建目录时指定特定的权限模式。为此，可以将 `mode` 属性设置为所需的权限模式，例如：

```javascript
fs.mkdtemp("/path/to/prefix-", { mode: 0o755 }, (error, directory) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The new directory is ${directory}.`);
  }
});
```

此外，还可以通过 `encoding` 属性指定要使用的编码。如果未指定该属性，则默认使用 `'utf8'` 编码。

#### fs.open(path[, flags[, mode]], callback)

在 Node.js 中，`fs.open()` 方法是一个用于打开文件的方法。它使用文件路径来表示要打开的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.open()` 的语法：

```javascript
fs.open(path[, flags[, mode]], callback);
```

- `path`：要打开的文件的路径。
- `flags`：可选参数，一个字符串或数字，用于指定打开文件时的行为。常用的标志包括：
  - `'r'`：以只读模式打开文件。默认值。
  - `'w'`：以写入模式打开文件。如果文件不存在，则创建一个新文件；否则截取文件。
  - `'a'`：以追加模式打开文件。如果文件不存在，则创建一个新文件。
  - `'x'`：以排他模式打开文件。如果文件已经存在，则失败。
  - `'+'`：以读写模式打开文件。
- `mode`：可选参数，一个数字，用于指定文件的权限模式。仅在创建新文件时有效，默认值为 `0o666`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `fd`。如果打开文件成功，则 `error` 参数为 `null`，`fd` 参数包含相应的文件描述符；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.open()` 的示例代码：

```javascript
const fs = require("fs");

fs.open("/path/to/file.txt", "r", (error, fd) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The file is opened with file descriptor ${fd}.`);
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.open()` 方法以只读模式打开 `/path/to/file.txt` 文件。最后，我们使用回调函数输出相应的消息和文件描述符。

需要注意的是，`fs.open()` 方法仅打开文件并返回文件描述符。如果需要读取或写入文件内容，请使用相关方法（如 `fs.read()` 和 `fs.write()`）。另外，如果该文件被其他进程占用，则打开文件会失败，此时将返回相应的错误信息。

#### fs.opendir(path[, options], callback)

在 Node.js 中，`fs.opendir()` 方法是一个用于打开目录的方法。它使用文件路径来表示要打开的目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.opendir()` 的语法：

```javascript
fs.opendir(path[, options], callback);
```

- `path`：要打开的目录的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
  - `bufferSize`：要使用的缓冲区大小（以字节为单位）。默认值为 `32KB`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `directory`。如果打开目录成功，则 `error` 参数为 `null`，`directory` 参数包含相应的目录迭代器；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.opendir()` 的示例代码：

```javascript
const fs = require("fs");

fs.opendir("/path/to/directory", (error, directory) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(
      `The directory is opened with directory iterator ${directory}.`
    );
  }
});
```

在这个例子中，我们首先引入了 `fs` 模块，并使用 `fs.opendir()` 方法打开 `/path/to/directory` 目录。最后，我们使用回调函数输出相应的消息和目录迭代器。

需要注意的是，`fs.opendir()` 方法仅打开目录并返回目录迭代器。如果需要遍历目录内容，请使用 `dirent` 对象的相关方法（如 `dirent.isDirectory()` 和 `dirent.name()`）。此外，还可以通过 `options` 参数指定所需的编码和缓冲区大小。如果未指定该参数，则将使用默认值。

#### fs.read(fd, buffer, offset, length, position, callback)

在 Node.js 中，`fs.read()` 方法是一个用于读取文件内容的方法。它使用文件描述符来表示要读取的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.read()` 的语法：

```javascript
fs.read(fd, buffer, offset, length, position, callback);
```

- `fd`：要读取的文件的文件描述符。
- `buffer`：一个 Buffer 对象，在读取操作完成后将包含文件内容。
- `offset`：要从 Buffer 对象中开始写入数据的偏移量。默认值为 `0`。
- `length`：指定要读取的字节数。默认值为 `buffer.length - offset`。
- `position`：指定从文件中读取的起始位置。默认值为 `null`，表示从当前文件位置开始读取。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesRead` 和 `buffer`。如果读取文件成功，则 `error` 参数为 `null`，`bytesRead` 参数包含实际读取的字节数，`buffer` 参数包含读取的文件内容；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.read()` 的示例代码：

```javascript
const fs = require("fs");

const buffer = Buffer.alloc(1024);

fs.open("/path/to/file.txt", "r", (error, fd) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    fs.read(fd, buffer, 0, buffer.length, null, (error, bytesRead, buffer) => {
      if (error) {
        console.error(`Error: ${error}`);
      } else {
        console.log(`Read ${bytesRead} bytes from the file.`);
        console.log(`File contents: ${buffer.toString()}`);
      }
    });
  }
});
```

在这个例子中，我们首先使用 `Buffer.alloc()` 创建了一个 1024 字节大小的缓冲区。然后，我们使用 `fs.open()` 方法以只读模式打开 `/path/to/file.txt` 文件，并在回调函数中使用 `fs.read()` 方法读取文件内容。最后，我们使用回调函数输出相应的消息和文件内容。

需要注意的是，`fs.read()` 方法仅读取文件内容并将其存储在给定的缓冲区中。如果需要写入文件内容，请使用 `fs.write()` 方法。另外，如果文件已经被其他进程占用，则读取文件操作会失败，此时将返回相应的错误信息。

#### fs.read(fd[, options], callback)

在 Node.js 中，`fs.read()` 方法是一个用于读取文件内容的方法。它使用文件描述符来表示要读取的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.read()` 的语法：

```javascript
fs.read(fd[, options], callback);
```

- `fd`：要读取的文件的文件描述符。
- `options`：可选参数，一个对象，支持四个属性：
  - `buffer`：一个 Buffer 对象，在读取操作完成后将包含文件内容。默认为 `null`。
  - `offset`：要从 Buffer 对象中开始写入数据的偏移量。默认值为 `0`。
  - `length`：指定要读取的字节数。默认值为 `buffer.length - offset`。
  - `position`：指定从文件中读取的起始位置。默认值为 `null`，表示从当前文件位置开始读取。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesRead` 和 `buffer`。如果读取文件成功，则 `error` 参数为 `null`，`bytesRead` 参数包含实际读取的字节数，`buffer` 参数包含读取的文件内容；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.read()` 的示例代码：

```javascript
const fs = require("fs");

fs.open("/path/to/file.txt", "r", (error, fd) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    const buffer = Buffer.alloc(1024);

    fs.read(
      fd,
      { buffer, offset: 0, length: buffer.length, position: null },
      (error, bytesRead, buffer) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else {
          console.log(`Read ${bytesRead} bytes from the file.`);
          console.log(`File contents: ${buffer.toString()}`);
        }
      }
    );
  }
});
```

在这个例子中，我们首先使用 `fs.open()` 方法以只读模式打开 `/path/to/file.txt` 文件，并在回调函数中使用 `fs.read()` 方法读取文件内容。注意，在这里我们通过 `options` 参数指定了缓冲区的大小和偏移量等属性。最后，我们使用回调函数输出相应的消息和文件内容。

需要注意的是，`fs.read()` 方法仅读取文件内容并将其存储在给定的缓冲区中。如果需要写入文件内容，请使用 `fs.write()` 方法。另外，如果文件已经被其他进程占用，则读取文件操作会失败，此时将返回相应的错误信息。

#### fs.read(fd, buffer[, options], callback)

在 Node.js 中，`fs.read()` 方法是一个用于读取文件内容的方法。它使用文件描述符来表示要读取的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.read()` 的语法：

```javascript
fs.read(fd, buffer[, options], callback);
```

- `fd`：要读取的文件的文件描述符。
- `buffer`：一个 Buffer 对象，在读取操作完成后将包含文件内容。
- `options`：可选参数，一个对象，支持三个属性：
  - `offset`：要从 Buffer 对象中开始写入数据的偏移量。默认值为 `0`。
  - `length`：指定要读取的字节数。默认值为 `buffer.length - offset`。
  - `position`：指定从文件中读取的起始位置。默认值为 `null`，表示从当前文件位置开始读取。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesRead` 和 `buffer`。如果读取文件成功，则 `error` 参数为 `null`，`bytesRead` 参数包含实际读取的字节数，`buffer` 参数包含读取的文件内容；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.read()` 的示例代码：

```javascript
const fs = require("fs");

const buffer = Buffer.alloc(1024);

fs.open("/path/to/file.txt", "r", (error, fd) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    fs.read(
      fd,
      buffer,
      { offset: 0, length: buffer.length, position: null },
      (error, bytesRead, buffer) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else {
          console.log(`Read ${bytesRead} bytes from the file.`);
          console.log(`File contents: ${buffer.toString()}`);
        }
      }
    );
  }
});
```

在这个例子中，我们首先使用 `Buffer.alloc()` 创建了一个 1024 字节大小的缓冲区。然后，我们使用 `fs.open()` 方法以只读模式打开 `/path/to/file.txt` 文件，并在回调函数中使用 `fs.read()` 方法读取文件内容。注意，在这里我们通过第二个参数 `buffer` 传递了要存储文件内容的缓冲区，而不是像之前一样使用 `options` 参数指定。最后，我们使用回调函数输出相应的消息和文件内容。

需要注意的是，`fs.read()` 方法仅读取文件内容并将其存储在给定的缓冲区中。如果需要写入文件内容，请使用 `fs.write()` 方法。另外，如果文件已经被其他进程占用，则读取文件操作会失败，此时将返回相应的错误信息。

#### fs.readdir(path[, options], callback)

在 Node.js 中，`fs.readdir()` 方法是一个用于读取目录内容的方法。它使用文件路径来表示要读取的目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.readdir()` 的语法：

```javascript
fs.readdir(path[, options], callback);
```

- `path`：要读取的目录的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
  - `withFileTypes`：是否包含 Dirent 对象。默认值为 `false`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `files`。如果读取目录成功，则 `error` 参数为 `null`，`files` 参数包含目录中的所有文件名；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.readdir()` 的示例代码：

```javascript
const fs = require("fs");

fs.readdir("/path/to/directory", (error, files) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(
      `The directory contains ${files.length} files: ${files.join(", ")}.`
    );
  }
});
```

在这个例子中，我们使用 `fs.readdir()` 方法读取 `/path/to/directory` 目录中的所有文件，并将它们作为一个数组返回。最后，我们使用回调函数输出相应的消息和文件列表。

需要注意的是，默认情况下，`fs.readdir()` 方法返回的是目录中的所有文件名，而不包括子目录。如果要同时列出子目录和文件，请将 `withFileTypes` 设置为 `true`。另外，如果目录不存在或者没有访问权限，则读取目录操作会失败，此时将返回相应的错误信息。

#### fs.readFile(path[, options], callback)

在 Node.js 中，`fs.readFile()` 方法是一个用于读取文件内容的方法。它使用文件路径来表示要读取的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.readFile()` 的语法：

```javascript
fs.readFile(path[, options], callback);
```

- `path`：要读取的文件的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
  - `flag`：打开文件时要使用的标志。默认值为 `'r'`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `data`。如果读取文件成功，则 `error` 参数为 `null`，`data` 参数包含文件内容；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.readFile()` 的示例代码：

```javascript
const fs = require("fs");

fs.readFile("/path/to/file.txt", (error, data) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`File contents: ${data}`);
  }
});
```

在这个例子中，我们使用 `fs.readFile()` 方法读取 `/path/to/file.txt` 文件的内容，并将其作为一个 Buffer 或字符串返回。最后，我们使用回调函数输出相应的消息和文件内容。

需要注意的是，默认情况下，`fs.readFile()` 方法将文件内容以 Buffer 对象的形式返回。如果想要以字符串的形式返回，请将 `encoding` 属性设置为相应的编码（如 `'utf8'`）。另外，如果文件不存在或者没有访问权限，则读取文件操作会失败，此时将返回相应的错误信息。

#### fs.readlink(path[, options], callback)

在 Node.js 中，`fs.readlink()` 方法是一个用于读取符号链接内容的方法。它使用文件路径来表示要读取的符号链接，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.readlink()` 的语法：

```javascript
fs.readlink(path[, options], callback);
```

- `path`：要读取的符号链接的路径。
- `options`：可选参数，一个对象，支持一个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `linkString`。如果读取符号链接成功，则 `error` 参数为 `null`，`linkString` 参数包含符号链接的目标；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.readlink()` 的示例代码：

```javascript
const fs = require("fs");

fs.readlink("/path/to/symlink", (error, linkString) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The symlink points to: ${linkString}`);
  }
});
```

在这个例子中，我们使用 `fs.readlink()` 方法读取 `/path/to/symlink` 符号链接指向的目标，并将其作为一个字符串返回。最后，我们使用回调函数输出相应的消息和符号链接的目标。

需要注意的是，默认情况下，`fs.readlink()` 方法将符号链接目标以字符串的形式返回。如果想要以 Buffer 对象的形式返回，请将 `encoding` 属性设置为 `null`。另外，如果符号链接不存在或者没有访问权限，则读取符号链接操作会失败，此时将返回相应的错误信息。

#### fs.readv(fd, buffers[, position], callback)

在 Node.js 中，`fs.readv()` 方法是一个用于读取文件内容的方法。它使用文件描述符来表示要读取的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.readv()` 的语法：

```javascript
fs.readv(fd, buffers[, position], callback);
```

- `fd`：要读取的文件的文件描述符。
- `buffers`：一个 Buffer 对象数组，在读取操作完成后将包含文件内容。
- `position`：可选参数，指定从文件中读取的起始位置。默认值为 `null`，表示从当前文件位置开始读取。
- `callback`：一个回调函数，接受两个参数：`error` 和 `bytesRead`。如果读取文件成功，则 `error` 参数为 `null`，`bytesRead` 参数包含实际读取的字节数；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.readv()` 的示例代码：

```javascript
const fs = require("fs");

const buffers = [Buffer.alloc(1024), Buffer.alloc(2048), Buffer.alloc(4096)];

fs.open("/path/to/file.txt", "r", (error, fd) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    fs.readv(fd, buffers, null, (error, bytesRead) => {
      if (error) {
        console.error(`Error: ${error}`);
      } else {
        console.log(`Read ${bytesRead} bytes from the file.`);
        console.log(
          `File contents:\n${buffers
            .map((buffer) => buffer.toString())
            .join("\n")}`
        );
      }
    });
  }
});
```

在这个例子中，我们首先使用 `Buffer.alloc()` 创建了三个不同大小的缓冲区。然后，我们使用 `fs.open()` 方法以只读模式打开 `/path/to/file.txt` 文件，并在回调函数中使用 `fs.readv()` 方法读取文件内容。注意，在这里我们通过第二个参数 `buffers` 传递了要存储文件内容的缓冲区数组，而不是像之前一样使用 `buffer` 参数指定。最后，我们使用回调函数输出相应的消息和文件内容。

需要注意的是，`fs.readv()` 方法可以同时读取多个 Buffer 对象，因此它比 `fs.read()` 更加高效。另外，如果文件已经被其他进程占用，则读取文件操作会失败，此时将返回相应的错误信息。

#### fs.realpath(path[, options], callback)

在 Node.js 中，`fs.realpath()` 方法是一个用于获取文件的真实路径的方法。它使用文件路径来表示要获取真实路径的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.realpath()` 的语法：

```javascript
fs.realpath(path[, options], callback);
```

- `path`：要获取真实路径的文件的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
  - `cache`：是否启用缓存。默认值为 `true`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `resolvedPath`。如果获取真实路径成功，则 `error` 参数为 `null`，`resolvedPath` 参数包含文件的真实路径；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.realpath()` 的示例代码：

```javascript
const fs = require("fs");

fs.realpath("/path/to/file.txt", (error, resolvedPath) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The real path of the file is: ${resolvedPath}`);
  }
});
```

在这个例子中，我们使用 `fs.realpath()` 方法获取 `/path/to/file.txt` 文件的真实路径，并将其作为一个字符串返回。最后，我们使用回调函数输出相应的消息和文件的真实路径。

需要注意的是，默认情况下，`fs.realpath()` 方法会启用缓存，以提高性能。如果需要每次都重新获取真实路径，请将 `cache` 属性设置为 `false`。另外，如果文件不存在或者没有访问权限，则获取真实路径操作会失败，此时将返回相应的错误信息。

#### fs.realpath.native(path[, options], callback)

在 Node.js 中，`fs.realpath.native()` 方法与 `fs.realpath()` 的作用相同，都是获取文件的真实路径。不同之处在于，`fs.realpath.native()` 方法返回一个 Buffer 对象，而不是字符串。

以下是 `fs.realpath.native()` 的语法：

```javascript
fs.realpath.native(path[, options], callback);
```

- `path`：要获取真实路径的文件的路径。
- `options`：可选参数，一个对象，支持两个属性：
  - `encoding`：要使用的编码。默认值为 `'utf8'`。
  - `cache`：是否启用缓存。默认值为 `true`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `resolvedPath`。如果获取真实路径成功，则 `error` 参数为 `null`，`resolvedPath` 参数包含文件的真实路径；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.realpath.native()` 的示例代码：

```javascript
const fs = require("fs");

fs.realpath.native("/path/to/file.txt", (error, resolvedPath) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`The real path of the file is: ${resolvedPath.toString()}`);
  }
});
```

在这个例子中，我们使用 `fs.realpath.native()` 方法获取 `/path/to/file.txt` 文件的真实路径，并将其作为一个 Buffer 对象返回。最后，我们使用回调函数输出相应的消息和文件的真实路径。

需要注意的是，默认情况下，`fs.realpath.native()` 方法会启用缓存，以提高性能。如果需要每次都重新获取真实路径，请将 `cache` 属性设置为 `false`。另外，如果文件不存在或者没有访问权限，则获取真实路径操作会失败，此时将返回相应的错误信息。

#### fs.rename(oldPath, newPath, callback)

在 Node.js 中，`fs.rename()` 方法是一个用于重命名文件或移动文件的方法。它使用旧文件路径和新文件路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.rename()` 的语法：

```javascript
fs.rename(oldPath, newPath, callback);
```

- `oldPath`：要重命名或移动的文件的旧路径。
- `newPath`：文件的新路径或新名称。
- `callback`：一个回调函数，接受一个参数：`error`。如果重命名或移动文件成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.rename()` 的示例代码：

```javascript
const fs = require("fs");

fs.rename("/path/to/oldfile.txt", "/path/to/newfile.txt", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("File renamed or moved successfully.");
  }
});
```

在这个例子中，我们使用 `fs.rename()` 方法将 `/path/to/oldfile.txt` 文件重命名为 `/path/to/newfile.txt`。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.rename()` 方法不仅可以用于重命名文件，还可以用于将文件移动到其他目录。此外，如果目标文件已经存在，则会覆盖该文件。最后，如果源文件不存在、目标文件已存在或者没有访问权限，则重命名或移动文件操作会失败，此时将返回相应的错误信息。

#### fs.rmdir(path[, options], callback)

在 Node.js 中，`fs.rmdir()` 方法是一个用于删除空目录的方法。它使用目录路径来表示要进行操作的目录，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.rmdir()` 的语法：

```javascript
fs.rmdir(path[, options], callback);
```

- `path`：要删除的目录的路径。
- `options`：可选参数，一个对象，支持一个属性：
  - `recursive`：是否递归删除目录及其子目录。默认值为 `false`。
- `callback`：一个回调函数，接受一个参数：`error`。如果删除目录成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.rmdir()` 的示例代码：

```javascript
const fs = require("fs");

fs.rmdir("/path/to/dir", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("Directory deleted successfully.");
  }
});
```

在这个例子中，我们使用 `fs.rmdir()` 方法删除 `/path/to/dir` 目录。最后，我们使用回调函数输出相应的消息。

需要注意的是，默认情况下，`fs.rmdir()` 方法只能删除空目录。如果要删除非空目录，请将 `recursive` 属性设置为 `true`。此外，如果目录不存在、不是一个目录或者没有访问权限，则删除目录操作会失败，此时将返回相应的错误信息。

#### fs.rm(path[, options], callback)

在 Node.js 14+ 中，`fs.rm()` 方法是一个用于删除文件或目录的方法。它使用文件或目录的路径来表示要进行操作的对象，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.rm()` 的语法：

```javascript
fs.rm(path[, options], callback);
```

- `path`：要删除的文件或目录的路径。
- `options`：可选参数，一个对象，支持三个属性：
  - `recursive`：是否递归删除目录及其子目录。默认值为 `false`。如果设置为 `true`，则会删除所有文件和子目录（类似于 `rm -rf` 命令）。
  - `force`：是否强制删除文件或目录。默认值为 `false`。如果设置为 `true`，则即使目标文件或目录不存在，也不会报错。
  - `maxRetries`：当试图删除繁忙的目录或文件时，应该重试多少次。默认值为 `10`。
- `callback`：一个回调函数，接受一个参数：`error`。如果删除文件或目录成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.rm()` 的示例代码：

```javascript
const fs = require("fs");

fs.rm("/path/to/file.txt", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("File deleted successfully.");
  }
});
```

在这个例子中，我们使用 `fs.rm()` 方法删除 `/path/to/file.txt` 文件。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.rm()` 方法既可以删除文件，也可以删除目录。如果要删除目录，请将 `recursive` 属性设置为 `true`。此外，如果文件或目录不存在、没有访问权限或者正在被其他进程占用，则删除操作会失败，此时将返回相应的错误信息。

#### fs.stat(path[, options], callback)

在 Node.js 中，`fs.stat()` 方法是一个用于获取文件或目录的详细信息的方法。它使用文件或目录的路径来表示要获取信息的对象，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.stat()` 的语法：

```javascript
fs.stat(path[, options], callback);
```

- `path`：要获取信息的文件或目录的路径。
- `options`：可选参数，一个对象，支持一个属性：
  - `bigint`：是否将数值类型的文件大小转换为 `BigInt` 类型。默认为 `false`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `stats`。如果获取信息成功，则 `error` 参数为 `null`，`stats` 参数包含相应的文件或目录信息；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.stat()` 的示例代码：

```javascript
const fs = require("fs");

fs.stat("/path/to/file.txt", (error, stats) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`File type: ${stats.isFile() ? "file" : "directory"}`);
    console.log(`File size: ${stats.size} bytes`);
    console.log(`Last modified: ${stats.mtime.toLocaleString()}`);
  }
});
```

在这个例子中，我们使用 `fs.stat()` 方法获取 `/path/to/file.txt` 文件的详细信息，并输出一些基本的信息，例如文件类型、大小和最后修改时间等。

需要注意的是，`fs.stat()` 方法既可以用于获取文件信息，也可以用于获取目录信息。此外，如果文件或目录不存在、没有访问权限，则获取信息操作会失败，此时将返回相应的错误信息。

#### fs.statfs(path[, options], callback)

在 Node.js 中，`fs.statfs()` 方法是一个用于获取文件系统的状态信息的方法。它使用文件或目录的路径来表示要获取信息的对象所在的文件系统，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.statfs()` 的语法：

```javascript
fs.statfs(path[, options], callback);
```

- `path`：要获取信息的文件或目录所在的路径。
- `options`：可选参数，一个对象，支持一个属性：
  - `bigint`：是否将数值类型的文件系统信息转换为 `BigInt` 类型。默认为 `false`。
- `callback`：一个回调函数，接受两个参数：`error` 和 `stats`。如果获取信息成功，则 `error` 参数为 `null`，`stats` 参数包含相应的文件系统信息；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.statfs()` 的示例代码：

```javascript
const fs = require("fs");

fs.statfs("/path/to/file.txt", (error, stats) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log(`Total space: ${stats.blocks * stats.blockSize} bytes`);
    console.log(`Free space: ${stats.bfree * stats.blockSize} bytes`);
    console.log(`Available space: ${stats.bavail * stats.blockSize} bytes`);
  }
});
```

在这个例子中，我们使用 `fs.statfs()` 方法获取 `/path/to/file.txt` 文件所在的文件系统的详细信息，并输出一些基本的信息，例如总空间、可用空间和已使用空间等。

需要注意的是，`fs.statfs()` 方法只能用于获取文件系统的状态信息，无法用于获取文件或目录的信息。此外，如果路径不存在、没有访问权限，则获取信息操作会失败，此时将返回相应的错误信息。

#### fs.symlink(target, path[, type], callback)

在 Node.js 中，`fs.symlink()` 方法是一个用于创建符号链接的方法。它使用目标路径和链接路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.symlink()` 的语法：

```javascript
fs.symlink(target, path[, type], callback);
```

- `target`：被链接的文件的路径。
- `path`：链接文件的路径。
- `type`：可选参数，一个字符串，表示链接类型。默认为 `'file'`。
  - `'file'`：表示链接为常规文件。
  - `'dir'`：表示链接为目录。
  - `'junction'`：仅在 Windows 上有效，表示链接为目录联接。
- `callback`：一个回调函数，接受一个参数：`error`。如果创建链接成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.symlink()` 的示例代码：

```javascript
const fs = require("fs");

fs.symlink("/path/to/target", "/path/to/link", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("Symbolic link created successfully.");
  }
});
```

在这个例子中，我们使用 `fs.symlink()` 方法创建一个名为 `/path/to/link` 的符号链接，指向 `/path/to/target` 文件。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.symlink()` 方法只能用于创建符号链接，无法用于创建硬链接。此外，如果目标文件不存在、链接文件已存在、没有访问权限或者系统不支持链接功能，则创建链接操作会失败，此时将返回相应的错误信息。

#### fs.truncate(path[, len], callback)

在 Node.js 中，`fs.truncate()` 方法是一个用于截断文件大小的方法。它使用文件的路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.truncate()` 的语法：

```javascript
fs.truncate(path[, len], callback);
```

- `path`：要截断大小的文件的路径。
- `len`：可选参数，一个整数，表示要截断的文件大小（单位为字节）。如果忽略该参数，则默认将文件大小截断为 `0` 字节。
- `callback`：一个回调函数，接受一个参数：`error`。如果截断文件成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.truncate()` 的示例代码：

```javascript
const fs = require("fs");

fs.truncate("/path/to/file.txt", 1024, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("File truncated successfully.");
  }
});
```

在这个例子中，我们使用 `fs.truncate()` 方法将 `/path/to/file.txt` 文件的大小截断为 `1024` 字节。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.truncate()` 方法只能用于截断文件大小，无法用于截断目录大小。此外，如果文件不存在、没有访问权限，则截断操作会失败，此时将返回相应的错误信息。

#### fs.unlink(path, callback)

在 Node.js 中，`fs.unlink()` 方法是一个用于删除文件的方法。它使用文件的路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.unlink()` 的语法：

```javascript
fs.unlink(path, callback);
```

- `path`：要删除的文件的路径。
- `callback`：一个回调函数，接受一个参数：`error`。如果删除文件成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.unlink()` 的示例代码：

```javascript
const fs = require("fs");

fs.unlink("/path/to/file.txt", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("File deleted successfully.");
  }
});
```

在这个例子中，我们使用 `fs.unlink()` 方法删除 `/path/to/file.txt` 文件。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.unlink()` 方法只能用于删除文件，无法用于删除目录。此外，如果文件不存在、没有访问权限或者正在被其他进程占用，则删除操作会失败，此时将返回相应的错误信息。

#### fs.unwatchFile(filename[, listener])

在 Node.js 中，`fs.unwatchFile()` 方法是一个用于停止监视文件变化的方法。它使用文件的路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.unwatchFile()` 的语法：

```javascript
fs.unwatchFile(filename[, listener]);
```

- `filename`：要停止监视的文件的路径。
- `listener`：可选参数，一个函数，表示要删除的监听器。如果省略该参数，则删除所有监听器。

以下是一个使用 `fs.unwatchFile()` 的示例代码：

```javascript
const fs = require("fs");

// 监视文件变化
fs.watchFile("/path/to/file.txt", () => {
  console.log("File changed.");
});

// 停止监视文件变化
setTimeout(() => {
  fs.unwatchFile("/path/to/file.txt");
  console.log("Watch stopped.");
}, 5000);
```

在这个例子中，我们使用 `fs.watchFile()` 方法监视 `/path/to/file.txt` 文件的变化，并在发生变化时输出相应的消息。然后，我们使用 `fs.unwatchFile()` 方法停止监视文件的变化，并在执行完成时输出相应的消息。

需要注意的是，`fs.unwatchFile()` 方法只能用于停止监视文件的变化，无法用于停止监视目录的变化。此外，如果文件不存在、没有访问权限，则停止操作会失败，此时将返回相应的错误信息。

#### fs.utimes(path, atime, mtime, callback)

在 Node.js 中，`fs.utimes()` 方法是一个用于修改文件时间戳的方法。它使用文件的路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.utimes()` 的语法：

```javascript
fs.utimes(path, atime, mtime, callback);
```

- `path`：要修改时间戳的文件的路径。
- `atime`：一个日期对象或一个整数，表示文件的访问时间。如果指定为一个整数，则该值表示自 Unix 纪元开始的毫秒数。
- `mtime`：一个日期对象或一个整数，表示文件的修改时间。如果指定为一个整数，则该值表示自 Unix 纪元开始的毫秒数。
- `callback`：一个回调函数，接受一个参数：`error`。如果修改文件时间戳成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.utimes()` 的示例代码：

```javascript
const fs = require("fs");

// 获取当前时间戳
const now = new Date();

// 修改文件的访问时间和修改时间
fs.utimes("/path/to/file.txt", now, now, (error) => {
  if (error) {
    console.error(`Error: ${error}`);
  } else {
    console.log("File timestamp updated successfully.");
  }
});
```

在这个例子中，我们使用 `fs.utimes()` 方法将 `/path/to/file.txt` 文件的访问时间和修改时间都设置为当前时间戳。最后，我们使用回调函数输出相应的消息。

需要注意的是，`fs.utimes()` 方法只能用于修改文件时间戳，无法用于修改目录时间戳。此外，如果文件不存在、没有访问权限，则修改操作会失败，此时将返回相应的错误信息。

#### fs.watch(filename[, options][, listener])

在 Node.js 中，`fs.watch()` 方法是一个用于监视文件或目录变化的方法。它使用文件或目录的路径来表示要进行操作的对象，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.watch()` 的语法：

```javascript
fs.watch(filename[, options][, listener]);
```

- `filename`：要监视变化的文件或目录的路径。
- `options`：可选参数，一个对象，支持多个属性：
  - `persistent`：如果设置为 `false`，则在监视过程中，Node.js 进程将终止所有活动，包括监视器。默认为 `true`。
  - `recursive`：如果设置为 `true`，则在监视目录时，也会监视其子目录中的变化。默认为 `false`。
  - `encoding`：指定编码格式。默认为 `'utf8'`。
- `listener`：可选参数，一个函数，表示监视器的回调函数。当监视的文件或目录发生变化时，该函数将被调用。

以下是一个使用 `fs.watch()` 的示例代码：

```javascript
const fs = require("fs");

// 监视文件变化
fs.watch("/path/to/file.txt", (eventType, filename) => {
  console.log(`Event type: ${eventType}`);
  console.log(`Filename: ${filename}`);
});

// 监视目录变化（包括子目录）
fs.watch("/path/to/directory", { recursive: true }, (eventType, filename) => {
  console.log(`Event type: ${eventType}`);
  console.log(`Filename: ${filename}`);
});
```

在这个例子中，我们使用 `fs.watch()` 方法监视 `/path/to/file.txt` 文件和 `/path/to/directory` 目录的变化，并输出相应的消息。由于 `fs.watch()` 方法是异步的，所以我们需要使用回调函数来处理操作完成时的结果或错误。

需要注意的是，`fs.watch()` 方法可能会因为各种原因失败，例如文件不存在、没有访问权限等情况。此外，由于某些平台（如 macOS）实现的限制，`fs.watch()` 方法可能不会正确地监视某些类型的文件或目录。

#### fs.watchFile(filename[, options], listener)

在 Node.js 中，`fs.watchFile()` 方法是一个用于监视文件变化的方法。它使用文件的路径来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.watchFile()` 的语法：

```javascript
fs.watchFile(filename[, options], listener);
```

- `filename`：要监视变化的文件的路径。
- `options`：可选参数，一个对象，支持多个属性：
  - `interval`：指定轮询时间（单位为毫秒）。默认为 `5007`。
  - `persistent`：如果设置为 `false`，则在监视过程中，Node.js 进程将终止所有活动，包括监视器。默认为 `true`。
- `listener`：一个函数，表示监视器的回调函数。当监视的文件发生变化时，该函数将被调用。

以下是一个使用 `fs.watchFile()` 的示例代码：

```javascript
const fs = require("fs");

// 监视文件变化
fs.watchFile("/path/to/file.txt", { interval: 1000 }, (curr, prev) => {
  console.log("The current modification time is: " + curr.mtime);
  console.log("The previous modification time was: " + prev.mtime);
});
```

在这个例子中，我们使用 `fs.watchFile()` 方法监视 `/path/to/file.txt` 文件的变化，并输出相应的消息。由于 `fs.watchFile()` 方法是异步的，所以我们需要使用回调函数来处理操作完成时的结果或错误。

需要注意的是，`fs.watchFile()` 方法可能会因为各种原因失败，例如文件不存在、没有访问权限等情况。此外，由于 `fs.watchFile()` 方法采用的是轮询方式，因此需要注意轮询时间不能过长或过短，否则可能会出现性能问题或误报问题。

#### fs.write(fd, buffer, offset[, length[, position]], callback)

在 Node.js 中，`fs.write()` 方法是一个用于向文件中写入数据的方法。它使用文件描述符（`fd`）来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.write()` 的语法：

```javascript
fs.write(fd, buffer, offset[, length[, position]], callback);
```

- `fd`：要写入数据的文件的文件描述符。
- `buffer`：一个 Buffer 对象或一个字符串，表示要写入的数据。
- `offset`：一个整数，表示从 `buffer` 的哪个位置开始写入数据。
- `length`：一个整数，表示要写入的字节数。如果省略该参数，则默认为从 `offset` 开始到 `buffer` 末尾的所有字节。
- `position`：一个整数，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认为当前文件位置。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesWritten` 和 `buffer`。如果写入数据成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。`bytesWritten` 表示写入的字节数，`buffer` 表示要写入的数据缓冲区。

以下是一个使用 `fs.write()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件获取文件描述符
fs.open("/path/to/file.txt", "w", (error, fd) => {
  if (error) throw error;

  // 创建一个 Buffer 对象
  const buffer = Buffer.from("Hello, world!");

  // 写入数据
  fs.write(
    fd,
    buffer,
    0,
    buffer.length,
    null,
    (error, bytesWritten, buffer) => {
      if (error) throw error;

      console.log(`Bytes written: ${bytesWritten}`);
      console.log(`Content written: ${buffer.toString()}`);

      // 关闭文件
      fs.close(fd, (error) => {
        if (error) throw error;
      });
    }
  );
});
```

在这个例子中，我们使用 `fs.open()` 方法打开 `/path/to/file.txt` 文件并获得其文件描述符，然后创建一个 Buffer 对象，最后使用 `fs.write()` 方法将数据写入文件中。在写入完成后，我们使用回调函数输出相应的消息，并使用 `fs.close()` 方法关闭文件。

需要注意的是，`fs.write()` 方法只能用于向已经打开的文件中写入数据，无法创建新的文件。另外，如果文件不存在、没有访问权限或者磁盘空间不足等情况，写入操作会失败，此时将返回相应的错误信息。

#### fs.write(fd, buffer[, options], callback)

在 Node.js 中，`fs.write()` 方法是一个用于向文件中写入数据的方法。它使用文件描述符（`fd`）来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.write()` 的语法：

```javascript
fs.write(fd, buffer[, options], callback);
```

- `fd`：要写入数据的文件的文件描述符。
- `buffer`：一个 Buffer 对象或一个字符串，表示要写入的数据。
- `options`：可选参数，一个对象，支持多个属性：
  - `offset`：一个整数，表示从 `buffer` 的哪个位置开始写入数据。默认为 `0`。
  - `length`：一个整数，表示要写入的字节数。如果省略该参数，则默认为 `buffer.length - offset`。
  - `position`：一个整数，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认为当前文件位置。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesWritten` 和 `buffer`。如果写入数据成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。`bytesWritten` 表示写入的字节数，`buffer` 表示要写入的数据缓冲区。

以下是一个使用 `fs.write()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件获取文件描述符
fs.open("/path/to/file.txt", "w", (error, fd) => {
  if (error) throw error;

  // 创建一个 Buffer 对象
  const buffer = Buffer.from("Hello, world!");

  // 写入数据
  fs.write(
    fd,
    buffer,
    { offset: 7, length: 5 },
    (error, bytesWritten, buffer) => {
      if (error) throw error;

      console.log(`Bytes written: ${bytesWritten}`);
      console.log(`Content written: ${buffer.toString()}`);

      // 关闭文件
      fs.close(fd, (error) => {
        if (error) throw error;
      });
    }
  );
});
```

在这个例子中，我们使用 `fs.open()` 方法打开 `/path/to/file.txt` 文件并获得其文件描述符，然后创建一个 Buffer 对象，最后使用 `fs.write()` 方法将数据写入文件中。在写入完成后，我们使用回调函数输出相应的消息，并使用 `fs.close()` 方法关闭文件。

需要注意的是，`fs.write()` 方法只能用于向已经打开的文件中写入数据，无法创建新的文件。另外，如果文件不存在、没有访问权限或者磁盘空间不足等情况，写入操作会失败，此时将返回相应的错误信息。

#### fs.write(fd, string[, position[, encoding]], callback)

在 Node.js 中，`fs.write()` 方法是一个用于向文件中写入数据的方法。它使用文件描述符（`fd`）来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.write()` 的语法：

```javascript
fs.write(fd, string[, position[, encoding]], callback);
```

- `fd`：要写入数据的文件的文件描述符。
- `string`：一个字符串，表示要写入的数据。
- `position`：一个整数，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认为当前文件位置。
- `encoding`：一个字符串，表示要写入的数据编码格式。如果省略该参数，则默认为 `'utf8'`。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesWritten` 和 `string`。如果写入数据成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。`bytesWritten` 表示写入的字节数，`string` 表示要写入的字符串。

以下是一个使用 `fs.write()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件获取文件描述符
fs.open("/path/to/file.txt", "w", (error, fd) => {
  if (error) throw error;

  // 写入数据
  fs.write(fd, "Hello, world!", null, "utf8", (error, bytesWritten, string) => {
    if (error) throw error;

    console.log(`Bytes written: ${bytesWritten}`);
    console.log(`Content written: ${string}`);

    // 关闭文件
    fs.close(fd, (error) => {
      if (error) throw error;
    });
  });
});
```

在这个例子中，我们使用 `fs.open()` 方法打开 `/path/to/file.txt` 文件并获得其文件描述符，然后使用 `fs.write()` 方法将数据写入文件中。在写入完成后，我们使用回调函数输出相应的消息，并使用 `fs.close()` 方法关闭文件。

需要注意的是，`fs.write()` 方法只能用于向已经打开的文件中写入数据，无法创建新的文件。另外，如果文件不存在、没有访问权限或者磁盘空间不足等情况，写入操作会失败，此时将返回相应的错误信息。

#### fs.writeFile(file, data[, options], callback)

在 Node.js 中，`fs.writeFile()` 方法是一个用于向文件中写入数据的方法。与 `fs.write()` 方法不同的是，`fs.writeFile()` 方法可以创建新文件并将数据写入其中。

以下是 `fs.writeFile()` 的语法：

```javascript
fs.writeFile(file, data[, options], callback);
```

- `file`：要写入数据的文件路径。
- `data`：一个字符串、Buffer 对象或 Uint8Array 数组，表示要写入的数据。
- `options`：可选参数，一个对象，支持多个属性：
  - `encoding`：一个字符串，表示要写入的数据编码格式。如果省略该参数，则默认为 `'utf8'`。
  - `flag`：一个字符串，表示打开文件时使用的标志。如果省略该参数，则默认为 `'w'`。
- `callback`：一个回调函数，接受一个参数 `error`。如果写入数据成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。

以下是一个使用 `fs.writeFile()` 的示例代码：

```javascript
const fs = require("fs");

// 写入数据到文件
fs.writeFile(
  "/path/to/file.txt",
  "Hello, world!",
  { encoding: "utf8" },
  (error) => {
    if (error) throw error;

    console.log("Data written to file!");
  }
);
```

在这个例子中，我们使用 `fs.writeFile()` 方法将 `"Hello, world!"` 字符串写入 `/path/to/file.txt` 文件中，并在操作完成后输出相应的消息。

需要注意的是，如果指定的文件已经存在，`fs.writeFile()` 方法将覆盖原有的文件内容。如果文件不存在，则会自动创建新文件。另外，如果文件写入过程中发生错误（例如磁盘空间不足等情况），则会返回相应的错误信息。

#### fs.writev(fd, buffers[, position], callback)

在 Node.js 中，`fs.writev()` 方法是一个用于向文件中写入数据的方法。它使用文件描述符（`fd`）来表示要进行操作的文件，并使用回调函数来处理操作完成时的结果或错误。

以下是 `fs.writev()` 的语法：

```javascript
fs.writev(fd, buffers[, position], callback);
```

- `fd`：要写入数据的文件的文件描述符。
- `buffers`：一个数组，每个元素都是一个 Buffer 对象，表示要写入的数据。
- `position`：一个整数，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认为当前文件位置。
- `callback`：一个回调函数，接受三个参数：`error`、`bytesWritten` 和 `buffers`。如果写入数据成功，则 `error` 参数为 `null`；否则，`error` 包含相应的错误信息。`bytesWritten` 表示写入的字节数，`buffers` 表示要写入的数据缓冲区。

以下是一个使用 `fs.writev()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件获取文件描述符
fs.open("/path/to/file.txt", "w", (error, fd) => {
  if (error) throw error;

  // 创建多个 Buffer 对象
  const buffer1 = Buffer.from("Hello, ");
  const buffer2 = Buffer.from("world!");
  const buffers = [buffer1, buffer2];

  // 写入数据
  fs.writev(fd, buffers, null, (error, bytesWritten, buffers) => {
    if (error) throw error;

    console.log(`Bytes written: ${bytesWritten}`);
    console.log(
      `Content written: ${buffers.map((buffer) => buffer.toString()).join("")}`
    );

    // 关闭文件
    fs.close(fd, (error) => {
      if (error) throw error;
    });
  });
});
```

在这个例子中，我们使用 `fs.open()` 方法打开 `/path/to/file.txt` 文件并获得其文件描述符，然后创建多个 Buffer 对象，并将它们放入一个数组中。最后使用 `fs.writev()` 方法将数据写入文件中。在写入完成后，我们使用回调函数输出相应的消息，并使用 `fs.close()` 方法关闭文件。

需要注意的是，`fs.writev()` 方法只能用于向已经打开的文件中写入数据，无法创建新的文件。另外，如果文件不存在、没有访问权限或者磁盘空间不足等情况，写入操作会失败，此时将返回相应的错误信息。

### Synchronous API

在 Node.js 中，Synchronous API（同步 API）指的是一类以同步方式（即阻塞调用）执行的文件系统操作函数。与异步 API 不同，使用 Synchronous API 进行操作时会阻塞当前线程直到操作完成。

以下是一些常见的 Synchronous API：

- `fs.existsSync(path)`：检查指定的文件或目录是否存在。
- `fs.statSync(path)`：获取指定路径的文件或目录的状态信息。
- `fs.readFileSync(path[, options])`：将指定的文件读入 Buffer 或字符串中。
- `fs.writeFileSync(path, data[, options])`：将指定的数据写入文件中。
- `fs.appendFileSync(path, data[, options])`：将指定的数据追加到文件中。
- `fs.mkdirSync(path[, mode])`：创建新目录。
- `fs.readdirSync(path[, options])`：读取指定目录下的所有文件和子目录。

这些函数都有一个 Sync 后缀，例如 `fs.existsSync()` 的 Synchronous 版本为 `fs.existsSyncSync()`。它们的用法与其异步版本类似，区别在于调用方式和返回值类型不同。

需要注意的是，使用 Synchronous API 进行文件系统操作时会阻塞当前线程，因此应该尽量避免在主线程中使用它们。如果需要进行耗时的文件系统操作，推荐使用异步 API 来避免阻塞应用程序的运行。

#### fs.accessSync(path[, mode])

在 Node.js 中，`fs.accessSync()` 方法是一个用于检查文件或目录是否存在以及对该文件或目录的权限进行检查的同步操作方法。它根据给定路径和指定的模式参数（可选）来检查文件或目录。

以下是 `fs.accessSync()` 的语法：

```javascript
fs.accessSync(path[, mode]);
```

- `path`：要检查权限的文件或目录的路径。
- `mode`：可选参数，一个整数或字符串，表示要检查的访问模式。默认为 `fs.constants.F_OK`，即只检查文件或目录是否存在。其他可选值包括：
  - `fs.constants.R_OK`：检查读权限。
  - `fs.constants.W_OK`：检查写权限。
  - `fs.constants.X_OK`：检查执行权限。

以下是一个使用 `fs.accessSync()` 的示例代码：

```javascript
const fs = require("fs");

// 检查文件是否存在
try {
  fs.accessSync("/path/to/file.txt", fs.constants.F_OK);
  console.log("File exists");
} catch (error) {
  console.error("File doesn't exist");
}
```

在这个例子中，我们使用 `fs.accessSync()` 方法检查 `/path/to/file.txt` 文件是否存在。如果文件存在，则输出相应的消息；否则，捕获错误并输出错误信息。

需要注意的是，`fs.accessSync()` 方法是一个同步的操作，会阻塞当前线程直到操作完成。因此，如果要检查多个文件或目录，建议使用异步 API 来避免阻塞应用程序的运行。

#### fs.appendFileSync(path, data[, options])

在 Node.js 中，`fs.appendFileSync()` 方法是一个用于将数据追加到文件中的同步操作方法。它根据给定的路径和数据参数将数据添加到指定的文件中。

以下是 `fs.appendFileSync()` 的语法：

```javascript
fs.appendFileSync(path, data[, options]);
```

- `path`：要写入数据的文件路径。
- `data`：一个字符串、Buffer 对象或 Uint8Array 数组，表示要追加的数据。
- `options`：可选参数，一个对象，支持多个属性：
  - `encoding`：一个字符串，表示要写入的数据编码格式。如果省略该参数，则默认为 `'utf8'`。
  - `mode`：一个整数，表示要设置的文件模式（权限）。默认值为 `0o666`。
  - `flag`：一个字符串，表示打开文件时使用的标志。默认为 `'a'`，即以追加模式打开文件。

以下是一个使用 `fs.appendFileSync()` 的示例代码：

```javascript
const fs = require("fs");

// 将数据追加到文件中
fs.appendFileSync("/path/to/file.txt", "Hello, world!", { encoding: "utf8" });

console.log("Data appended to file!");
```

在这个例子中，我们使用 `fs.appendFileSync()` 方法将 `"Hello, world!"` 字符串追加到 `/path/to/file.txt` 文件中，并在操作完成后输出相应的消息。

需要注意的是，如果指定的文件不存在，则会自动创建新文件。另外，如果文件追加过程中发生错误，例如磁盘空间不足等情况，将返回相应的错误信息。与 `fs.writeFileSync()` 不同，`fs.appendFileSync()` 方法不会覆盖原有的文件内容，而是将数据添加到文件的末尾处。

#### fs.chmodSync(path, mode)

在 Node.js 中，`fs.chmodSync()` 方法是一个用于修改指定文件或目录的权限模式的同步操作方法。它根据给定路径和模式参数来改变文件或目录的权限。

以下是 `fs.chmodSync()` 的语法：

```javascript
fs.chmodSync(path, mode);
```

- `path`：要修改权限的文件或目录的路径。
- `mode`：一个整数或字符串，表示要设置的文件或目录的权限模式。它可以是以下值之一：
  - 一个八进制数，表示要设置的权限位掩码。
  - 一个字符串，表示要设置的权限字符串，例如 `'777'` 或 `'rwxrwxrwx'`。

以下是一个使用 `fs.chmodSync()` 的示例代码：

```javascript
const fs = require("fs");

// 修改文件权限为只读
fs.chmodSync("/path/to/file.txt", "444");

console.log("File permission changed!");
```

在这个例子中，我们使用 `fs.chmodSync()` 方法将 `/path/to/file.txt` 文件的权限设置为只读（`444` 表示只有读权限）。在操作完成后输出相应的消息。

需要注意的是，`fs.chmodSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.chownSync(path, uid, gid)

在 Node.js 中，`fs.chownSync()` 方法是一个用于修改指定文件或目录的所有者和所属组的同步操作方法。它根据给定路径和 uid、gid 参数来改变文件或目录的所有权。

以下是 `fs.chownSync()` 的语法：

```javascript
fs.chownSync(path, uid, gid);
```

- `path`：要修改所有权的文件或目录的路径。
- `uid`：一个整数或字符串，表示要设置的文件或目录的用户 ID。如果该参数为字符串，则它应该是一个用户名。
- `gid`：一个整数或字符串，表示要设置的文件或目录的组 ID。如果该参数为字符串，则它应该是一个组名。

以下是一个使用 `fs.chownSync()` 的示例代码：

```javascript
const fs = require("fs");

// 修改文件所有者为 root 用户，所属组为 root 组
fs.chownSync("/path/to/file.txt", "root", "root");

console.log("File ownership changed!");
```

在这个例子中，我们使用 `fs.chownSync()` 方法将 `/path/to/file.txt` 文件的所有者设置为 `root` 用户，所属组设置为 `root` 组。在操作完成后输出相应的消息。

需要注意的是，`fs.chownSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.closeSync(fd)

在 Node.js 中，`fs.closeSync()` 方法是一个用于关闭文件的同步操作方法。它根据给定的文件描述符（fd）来将一个打开的文件关闭，并释放相应的系统资源。

以下是 `fs.closeSync()` 的语法：

```javascript
fs.closeSync(fd);
```

- `fd`：要关闭的文件的文件描述符。

以下是一个使用 `fs.closeSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并进行一些操作
const fd = fs.openSync("/path/to/file.txt", "w");
fs.writeSync(fd, "Hello, world!");
fs.closeSync(fd);

console.log("File closed!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.writeSync()` 方法向文件写入数据。然后，使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，如果没有显式地关闭文件，那么该文件会一直保持打开状态，直到 Node.js 进程退出或文件描述符被其他进程占用。因此，在进行文件操作时，应该尽可能使用异步 API 并且确保及时关闭文件，以避免出现资源泄漏等问题。

#### fs.copyFileSync(src, dest[, mode])

在 Node.js 中，`fs.copyFileSync()` 方法是一个用于将文件从源路径复制到目标路径的同步操作方法。它根据给定的源路径和目标路径来复制文件，并返回一个 undefined 值表示操作完成。

以下是 `fs.copyFileSync()` 的语法：

```javascript
fs.copyFileSync(src, dest[, mode]);
```

- `src`：要复制的文件的源路径。
- `dest`：复制后文件的目标路径。
- `mode`：可选参数，一个整数或字符串，表示要设置的文件模式（权限）。默认值为 `0o644`。

以下是一个使用 `fs.copyFileSync()` 的示例代码：

```javascript
const fs = require("fs");

// 复制文件
fs.copyFileSync("/path/to/source/file.txt", "/path/to/destination/file.txt");

console.log("File copied!");
```

在这个例子中，我们使用 `fs.copyFileSync()` 方法将 `/path/to/source/file.txt` 文件复制到 `/path/to/destination/file.txt` 文件中。在操作完成后输出相应的消息。

需要注意的是，如果目标路径中已经存在同名文件，则会覆盖该文件。另外，`fs.copyFileSync()` 方法是一个同步操作，会阻塞当前线程直到操作完成，因此不适合用于大型文件的复制操作。对于大型文件的复制，建议使用异步 API 来避免阻塞应用程序的运行。

#### fs.cpSync(src, dest[, options])

在 Node.js 中，`fs.cpSync()` 方法是一个用于将文件或目录从源路径复制到目标路径的同步操作方法。它根据给定的源路径和目标路径来复制文件或目录，并返回一个 undefined 值表示操作完成。

以下是 `fs.cpSync()` 的语法：

```javascript
fs.cpSync(src, dest[, options]);
```

- `src`：要复制的文件或目录的源路径。
- `dest`：复制后的文件或目录的目标路径。
- `options`：可选参数，一个对象，支持多个属性：
  - `recursive`：一个布尔值，表示是否递归地复制整个目录。默认为 `false`。
  - `overwrite`：一个布尔值，表示是否覆盖目标路径中已存在的文件。默认为 `true`。
  - `dereference`：一个布尔值，表示是否在复制符号链接时跟随符号链接终点的实际对象（即“解引用”）。默认为 `false`。

以下是一个使用 `fs.cpSync()` 的示例代码：

```javascript
const fs = require("fs");

// 复制文件
fs.cpSync("/path/to/source/file.txt", "/path/to/destination/file.txt");

// 复制目录（递归）
fs.cpSync("/path/to/source/dir", "/path/to/destination/dir", {
  recursive: true,
});

console.log("File or directory copied!");
```

在这个例子中，我们使用 `fs.cpSync()` 方法将 `/path/to/source/file.txt` 文件复制到 `/path/to/destination/file.txt` 文件中，并将 `/path/to/source/dir` 目录递归地复制到 `/path/to/destination/dir` 目录中。在操作完成后输出相应的消息。

需要注意的是，如果目标路径中已经存在同名文件或目录，则会根据 `overwrite` 参数决定是否覆盖。另外，`fs.cpSync()` 方法是一个同步操作，会阻塞当前线程直到操作完成，因此不适合用于大型文件或目录的复制操作。对于大型文件或目录的复制，建议使用异步 API 来避免阻塞应用程序的运行。

#### fs.existsSync(path)

在 Node.js 中，`fs.existsSync()` 方法是一个用于检查指定路径的文件或目录是否存在的同步操作方法。它根据给定的路径参数来判断文件或目录是否存在，并返回一个布尔值表示其存在与否。

以下是 `fs.existsSync()` 的语法：

```javascript
fs.existsSync(path);
```

- `path`：要检查的文件或目录的路径。

以下是一个使用 `fs.existsSync()` 的示例代码：

```javascript
const fs = require("fs");

// 检查文件是否存在
if (fs.existsSync("/path/to/file.txt")) {
  console.log("File exists!");
} else {
  console.log("File does not exist!");
}

// 检查目录是否存在
if (fs.existsSync("/path/to/dir")) {
  console.log("Directory exists!");
} else {
  console.log("Directory does not exist!");
}
```

在这个例子中，我们使用 `fs.existsSync()` 方法分别检查 `/path/to/file.txt` 文件和 `/path/to/dir` 目录是否存在，并根据结果输出相应的消息。

需要注意的是，`fs.existsSync()` 方法是一个同步操作，会阻塞当前线程直到操作完成，因此不适合用于大规模文件或目录的检查。对于大规模文件或目录的检查，建议使用异步 API 来避免阻塞应用程序的运行。

#### fs.fchmodSync(fd, mode)

在 Node.js 中，`fs.fchmodSync()` 方法是一个用于修改指定文件的权限模式的同步操作方法。它根据给定的文件描述符（fd）和 mode 参数来改变文件的权限。

以下是 `fs.fchmodSync()` 的语法：

```javascript
fs.fchmodSync(fd, mode);
```

- `fd`：要修改权限的文件的文件描述符。
- `mode`：一个整数或字符串，表示要设置的文件的权限模式。它可以是以下值之一：
  - 一个八进制数，表示要设置的权限位掩码。
  - 一个字符串，表示要设置的权限字符串，例如 `'777'` 或 `'rwxrwxrwx'`。

以下是一个使用 `fs.fchmodSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并修改权限为只读
const fd = fs.openSync("/path/to/file.txt", "w");
fs.fchmodSync(fd, "444");
fs.closeSync(fd);

console.log("File permission changed!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.fchmodSync()` 方法将该文件的权限设置为只读（`444` 表示只有读权限）。然后使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，`fs.fchmodSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.fchownSync(fd, uid, gid)

在 Node.js 中，`fs.fchownSync()` 方法是一个用于修改指定文件的所有者和所属组的同步操作方法。它根据给定的文件描述符（fd）和 uid、gid 参数来改变文件的所有权。

以下是 `fs.fchownSync()` 的语法：

```javascript
fs.fchownSync(fd, uid, gid);
```

- `fd`：要修改所有权的文件的文件描述符。
- `uid`：一个整数或字符串，表示要设置的文件的用户 ID。如果该参数为字符串，则它应该是一个用户名。
- `gid`：一个整数或字符串，表示要设置的文件的组 ID。如果该参数为字符串，则它应该是一个组名。

以下是一个使用 `fs.fchownSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并修改所有者为 root 用户，所属组为 root 组
const fd = fs.openSync("/path/to/file.txt", "w");
fs.fchownSync(fd, "root", "root");
fs.closeSync(fd);

console.log("File ownership changed!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.fchownSync()` 方法将该文件的所有者设置为 `root` 用户，所属组设置为 `root` 组。然后使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，`fs.fchownSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.fdatasyncSync(fd)

在 Node.js 中，`fs.fdatasyncSync()` 方法是一个用于将文件描述符（fd）所代表的文件的数据同步到磁盘中的同步操作方法。它会将文件描述符所代表的文件的所有修改同步到磁盘中，以确保数据的持久化存储。

以下是 `fs.fdatasyncSync()` 的语法：

```javascript
fs.fdatasyncSync(fd);
```

- `fd`：要进行数据同步的文件的文件描述符。

以下是一个使用 `fs.fdatasyncSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并进行一些操作
const fd = fs.openSync("/path/to/file.txt", "w");
fs.writeSync(fd, "Hello, world!");

// 将数据同步到磁盘
fs.fdatasyncSync(fd);

fs.closeSync(fd);

console.log("Data synced!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.writeSync()` 方法向文件写入数据。然后使用 `fs.fdatasyncSync()` 方法将数据同步到磁盘中。最后使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，`fs.fdatasyncSync()` 方法会阻塞当前线程直到操作完成。另外，该方法仅同步数据而不同步元数据，因此只能保证数据的持久化存储，而不能保证文件状态的恢复。如果需要同时同步数据和元数据，请使用 `fs.fsyncSync()` 方法。

#### fs.fstatSync(fd[, options])

在 Node.js 中，`fs.fstatSync()` 方法用于获取已打开文件的元数据信息。它根据给定的文件描述符（fd）和 options 参数来获取文件的信息，返回一个包含文件信息的 fs.Stats 对象。

以下是 `fs.fstatSync()` 的语法：

```javascript
fs.fstatSync(fd[, options]);
```

- `fd`：要获取元数据信息的文件的文件描述符。
- `options`：可选参数，一个对象，表示要设置的选项：
  - `bigint`：一个布尔值，表示是否将数值类型的数据以 BigInt 类型返回。默认为 `false`。

以下是一个使用 `fs.fstatSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并获取元数据信息
const fd = fs.openSync("/path/to/file.txt", "r");
const stats = fs.fstatSync(fd);

console.log(`File size: ${stats.size} bytes`);
console.log(`File mode: ${stats.mode}`);
console.log(`File owner: ${stats.uid}`);
console.log(`File group: ${stats.gid}`);

fs.closeSync(fd);
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.fstatSync()` 方法获取该文件的元数据信息。然后输出文件大小、文件模式、所有者和所属组等相关信息。最后使用 `fs.closeSync()` 方法关闭文件。

需要注意的是，`fs.fstatSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.fsyncSync(fd)

在 Node.js 中，`fs.fsyncSync()` 方法用于将文件描述符（fd）所代表的文件的数据和元数据同步到磁盘中，以确保文件状态的恢复。它会将文件描述符所代表的文件的所有修改都持久化存储到磁盘中。

以下是 `fs.fsyncSync()` 的语法：

```javascript
fs.fsyncSync(fd);
```

- `fd`：要进行数据同步的文件的文件描述符。

以下是一个使用 `fs.fsyncSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并进行一些操作
const fd = fs.openSync("/path/to/file.txt", "w");
fs.writeSync(fd, "Hello, world!");

// 将数据和元数据同步到磁盘
fs.fsyncSync(fd);

fs.closeSync(fd);

console.log("Data and metadata synced!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.writeSync()` 方法向文件写入数据。然后使用 `fs.fsyncSync()` 方法将数据和元数据同步到磁盘中以确保文件状态的恢复。最后使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，`fs.fsyncSync()` 方法会阻塞当前线程直到操作完成。另外，该方法会同时同步数据和元数据，因此可以保证文件状态的完全恢复。如果只需要同步数据而不同步元数据，请使用 `fs.fdatasyncSync()` 方法。

#### fs.ftruncateSync(fd[, len])

在 Node.js 中，`fs.ftruncateSync()` 方法用于截断文件大小。它根据给定的文件描述符（fd）和 len 参数来截断文件的大小，将文件剩余部分删除。

以下是 `fs.ftruncateSync()` 的语法：

```javascript
fs.ftruncateSync(fd[, len]);
```

- `fd`：要进行大小截断的文件的文件描述符。
- `len`：可选参数，一个整数，表示要截断的文件大小。如果未指定，则默认为 0，即完全截断文件。

以下是一个使用 `fs.ftruncateSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并进行一些操作
const fd = fs.openSync("/path/to/file.txt", "w");
fs.writeSync(fd, "Hello, world!");

// 截断文件大小为 5
fs.ftruncateSync(fd, 5);

fs.closeSync(fd);

console.log("File truncated!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.writeSync()` 方法向文件写入数据。然后使用 `fs.ftruncateSync()` 方法将文件大小截断为 5，即只保留前 5 个字符。最后使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，`fs.ftruncateSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.futimesSync(fd, atime, mtime)

在 Node.js 中，`fs.futimesSync()` 方法用于修改已打开文件的访问时间（atime）和修改时间（mtime）。它根据给定的文件描述符（fd）和 atime、mtime 参数来改变文件的时间戳信息。

以下是 `fs.futimesSync()` 的语法：

```javascript
fs.futimesSync(fd, atime, mtime);
```

- `fd`：要修改时间戳信息的文件的文件描述符。
- `atime`：一个 Date 对象或表示访问时间的数字（自 1970 年 1 月 1 日以来的毫秒数）。
- `mtime`：一个 Date 对象或表示修改时间的数字（自 1970 年 1 月 1 日以来的毫秒数）。

以下是一个使用 `fs.futimesSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并修改时间戳信息
const fd = fs.openSync("/path/to/file.txt", "r+");
fs.futimesSync(fd, new Date(), new Date());

fs.closeSync(fd);

console.log("File timestamp changed!");
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开 `/path/to/file.txt` 文件，并使用 `fs.futimesSync()` 方法将该文件的时间戳信息设置为当前时间。然后使用 `fs.closeSync()` 方法关闭文件。在操作完成后输出相应的消息。

需要注意的是，`fs.futimesSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。

#### fs.lchmodSync(path, mode)

在 Node.js 中，`fs.lchmodSync()` 方法用于修改符号链接文件的访问权限。它根据给定的路径（path）和 mode 参数来改变符号链接文件的权限。

以下是 `fs.lchmodSync()` 的语法：

```javascript
fs.lchmodSync(path, mode);
```

- `path`：要修改权限的符号链接文件的路径名。
- `mode`：一个表示文件权限的八进制数值。

以下是一个使用 `fs.lchmodSync()` 的示例代码：

```javascript
const fs = require("fs");

// 修改符号链接文件的访问权限
fs.lchmodSync("/path/to/symlink", 0o644);

console.log("Symlink permission changed!");
```

在这个例子中，我们使用 `fs.lchmodSync()` 方法将 `/path/to/symlink` 符号链接文件的访问权限设置为 0o644。在操作完成后输出相应的消息。

需要注意的是，`fs.lchmodSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。此外，该方法只能修改符号链接文件的权限，如果需要修改原始文件的权限，请使用 `fs.chmodSync()` 方法。

#### fs.lchownSync(path, uid, gid)

在 Node.js 中，`fs.lchownSync()` 方法用于修改符号链接文件的所有者和所属组。它根据给定的路径（path）和 uid、gid 参数来改变符号链接文件的所有者和所属组。

以下是 `fs.lchownSync()` 的语法：

```javascript
fs.lchownSync(path, uid, gid);
```

- `path`：要修改所有权的符号链接文件的路径名。
- `uid`：一个整数或字符串，表示要设置的用户 ID 或用户名。
- `gid`：一个整数或字符串，表示要设置的组 ID 或组名。

以下是一个使用 `fs.lchownSync()` 的示例代码：

```javascript
const fs = require("fs");

// 修改符号链接文件的所有者和所属组
fs.lchownSync("/path/to/symlink", "john", "staff");

console.log("Symlink ownership changed!");
```

在这个例子中，我们使用 `fs.lchownSync()` 方法将 `/path/to/symlink` 符号链接文件的所有者设置为 `john`，所属组设置为 `staff`。在操作完成后输出相应的消息。

需要注意的是，`fs.lchownSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。此外，该方法只能修改符号链接文件的所有权，如果需要修改原始文件的所有权，请使用 `fs.chownSync()` 方法。

#### fs.lutimesSync(path, atime, mtime)

在 Node.js 中，`fs.lutimesSync()` 方法用于修改符号链接文件的访问时间（atime）和修改时间（mtime）。它根据给定的路径（path）和 atime、mtime 参数来改变符号链接文件的时间戳信息。

以下是 `fs.lutimesSync()` 的语法：

```javascript
fs.lutimesSync(path, atime, mtime);
```

- `path`：要修改时间戳信息的符号链接文件的路径名。
- `atime`：一个 Date 对象或表示访问时间的数字（自 1970 年 1 月 1 日以来的毫秒数）。
- `mtime`：一个 Date 对象或表示修改时间的数字（自 1970 年 1 月 1 日以来的毫秒数）。

以下是一个使用 `fs.lutimesSync()` 的示例代码：

```javascript
const fs = require("fs");

// 修改符号链接文件的时间戳信息
fs.lutimesSync("/path/to/symlink", new Date(), new Date());

console.log("Symlink timestamp changed!");
```

在这个例子中，我们使用 `fs.lutimesSync()` 方法将 `/path/to/symlink` 符号链接文件的时间戳信息设置为当前时间。在操作完成后输出相应的消息。

需要注意的是，`fs.lutimesSync()` 方法会阻塞当前线程直到操作完成。另外，如果文件不存在或没有访问权限等情况，将返回相应的错误信息。此外，该方法只能修改符号链接文件的时间戳信息，如果需要修改原始文件的时间戳信息，请使用 `fs.utimesSync()` 方法。

#### fs.linkSync(existingPath, newPath)

在 Node.js 中，`fs.linkSync()` 方法用于创建一个硬链接文件，即将一个已存在的文件链接到一个新的路径上，使得两个路径都指向同一实际文件。硬链接可以让一个文件拥有多个名称，而且每个名称都是等价的。

以下是 `fs.linkSync()` 的语法：

```javascript
fs.linkSync(existingPath, newPath);
```

- `existingPath`：要链接的现有文件的路径名。
- `newPath`：链接文件的新路径名。

以下是一个使用 `fs.linkSync()` 的示例代码：

```javascript
const fs = require("fs");

// 创建硬链接文件
fs.linkSync("/path/to/existing/file.txt", "/path/to/new/link");

console.log("Hard link file created!");
```

在这个例子中，我们使用 `fs.linkSync()` 方法将 `/path/to/existing/file.txt` 文件链接到 `/path/to/new/link` 上创建一个硬链接文件。在操作完成后输出相应的消息。

需要注意的是，硬链接只能链接同一个文件系统内的文件，并且必须对该文件具有写权限才能创建硬链接。此外，删除任何一个硬链接都不会影响实际文件或其他硬链接，只有当所有硬链接和实际文件都被删除时，才会真正删除文件。

#### fs.lstatSync(path[, options])

在 Node.js 中，`fs.lstatSync()` 方法用于获取一个路径名所对应的符号链接文件或者文件信息，不会跟随符号链接。

以下是 `fs.lstatSync()` 的语法：

```javascript
fs.lstatSync(path[, options]);
```

- `path`：要查询的路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `bigint`：一个布尔值，表示是否返回 bigint 类型的文件大小和时间戳信息。默认为 false。

以下是一个使用 `fs.lstatSync()` 的示例代码：

```javascript
const fs = require("fs");

// 获取文件信息
const stats = fs.lstatSync("/path/to/file.txt");

console.log(`File is symbolic link: ${stats.isSymbolicLink()}`);
console.log(`File size: ${stats.size}`);
console.log(`File modified time: ${stats.mtime}`);
```

在这个例子中，我们使用 `fs.lstatSync()` 方法获取 `/path/to/file.txt` 文件的信息，并输出该文件是否是符号链接、文件大小和修改时间等信息。

需要注意的是，`fs.lstatSync()` 方法不会跟随符号链接获取对应文件的信息。如果需要跟随符号链接，则可以使用 `fs.statSync()` 方法。另外，在某些情况下，可能需要使用 `fs.readlinkSync()` 方法读取符号链接文件的目标路径，以便进一步操作。

#### fs.mkdirSync(path[, options])

在 Node.js 中，`fs.mkdirSync()` 方法用于创建一个新目录。它根据给定的路径（path）和 options 参数来创建目录。

以下是 `fs.mkdirSync()` 的语法：

```javascript
fs.mkdirSync(path[, options]);
```

- `path`：要创建的目录的路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `recursive`：一个布尔值，表示是否递归创建父目录。默认为 false。
  - `mode`：一个数字或字符串，表示要设置的目录权限。默认为 0o777。

以下是一个使用 `fs.mkdirSync()` 的示例代码：

```javascript
const fs = require("fs");

// 创建目录
fs.mkdirSync("/path/to/new/dir");

console.log("Directory created!");
```

在这个例子中，我们使用 `fs.mkdirSync()` 方法创建了一个新目录 `/path/to/new/dir`。在操作完成后输出相应的消息。

需要注意的是，如果要创建的目录已经存在，则会抛出一个错误。如果需要递归创建父目录，则可以将 `recursive` 参数设置为 true。另外，如果不指定 `mode` 参数，则默认创建的目录权限为 0o777，即所有用户都有读、写和执行权限。

#### fs.mkdtempSync(prefix[, options])

在 Node.js 中，`fs.mkdtempSync()` 方法用于创建一个随机命名的临时目录。它根据给定的前缀（prefix）和 options 参数来创建目录，并返回新目录的路径。

以下是 `fs.mkdtempSync()` 的语法：

```javascript
fs.mkdtempSync(prefix[, options]);
```

- `prefix`：要作为新目录名称前缀的字符串。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示目录名称编码方式。默认为 'buffer'。
  - `mode`：一个数字或字符串，表示要设置的目录权限。默认为 0o700。

以下是一个使用 `fs.mkdtempSync()` 的示例代码：

```javascript
const fs = require("fs");

// 创建临时目录
const tempDir = fs.mkdtempSync("/path/to/temp/dir-");

console.log(`Temp directory created: ${tempDir}`);
```

在这个例子中，我们使用 `fs.mkdtempSync()` 方法以 `/path/to/temp/dir-` 为前缀创建了一个随机命名的临时目录，并输出该目录的路径。

需要注意的是，`fs.mkdtempSync()` 方法会在指定前缀后自动生成一个随机字符串，以保证新目录名称的唯一性。另外，如果不指定 `mode` 参数，则默认创建的目录权限为 0o700，即只有当前用户有读、写和执行权限。

#### fs.opendirSync(path[, options])

在 Node.js 中，`fs.opendirSync()` 方法用于打开一个目录，并返回一个目录遍历器对象，该对象可以用于迭代目录中的文件和子目录。

以下是 `fs.opendirSync()` 的语法：

```javascript
fs.opendirSync(path[, options]);
```

- `path`：要打开的目录路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `bufferSize`：一个数字，表示读取目录内容时每次要读取的字节数。默认为 32KB。

以下是一个使用 `fs.opendirSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开目录并遍历其中的文件和子目录
const dir = fs.opendirSync("/path/to/dir");
let dirent;
while ((dirent = dir.readSync()) !== null) {
  console.log(dirent.name);
}
dir.closeSync();
```

在这个例子中，我们使用 `fs.opendirSync()` 方法打开 `/path/to/dir` 目录，并通过 `readSync()` 方法迭代输出目录中的所有文件和子目录的名称。

需要注意的是，`fs.opendirSync()` 方法返回的目录遍历器对象具有 `readSync()` 和 `closeSync()` 两个方法分别用于读取目录内容和关闭目录遍历器。另外，如果不指定 `bufferSize` 参数，则默认每次读取 32KB 的数据量。

#### fs.openSync(path[, flags[, mode]])

在 Node.js 中，`fs.openSync()` 方法用于打开一个文件并返回对该文件的引用。它根据给定的路径（path）、标志（flags）和权限（mode）参数打开文件。

以下是 `fs.openSync()` 的语法：

```javascript
fs.openSync(path[, flags[, mode]]);
```

- `path`：要打开的文件路径名。
- `flags`：可选参数，表示打开文件的方式。常用的取值包括：
  - `'r'`：以只读方式打开文件。如果文件不存在，则发生错误。
  - `'w'`：以写入方式打开文件。如果文件不存在，则创建一个新文件；如果文件已存在，则截断文件长度为零。
  - `'a'`：以追加方式打开文件。如果文件不存在，则创建一个新文件。
  - `'x'`：以排它方式打开文件。如果文件不存在，则创建一个新文件；如果文件已存在，则发生错误。
- `mode`：可选参数，表示要设置的文件权限。默认为 0o666。

以下是一个使用 `fs.openSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并写入数据
const fd = fs.openSync("/path/to/file.txt", "w");
fs.writeSync(fd, "Hello, world!");
fs.closeSync(fd);

console.log("Data written to file!");
```

在这个例子中，我们使用 `fs.openSync()` 方法以写入方式打开 `/path/to/file.txt` 文件，并使用 `writeSync()` 方法向其写入数据。在操作完成后输出相应的消息。

需要注意的是，`fs.openSync()` 方法返回的是文件描述符（File Descriptor），可以通过该描述符来访问打开的文件。另外，如果不指定 `mode` 参数，则默认创建的文件权限为 0o666，即所有用户都有读、写权限。

#### fs.readdirSync(path[, options])

在 Node.js 中，`fs.readdirSync()` 方法用于读取一个目录中的所有文件和子目录，并返回一个包含其中每个文件名和子目录名的数组。

以下是 `fs.readdirSync()` 的语法：

```javascript
fs.readdirSync(path[, options]);
```

- `path`：要读取的目录路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示文件名编码方式。默认为 'utf8'。
  - `withFileTypes`：一个布尔值，表示是否同时返回文件的类型信息（`Dirent` 对象）。默认为 false。

以下是一个使用 `fs.readdirSync()` 的示例代码：

```javascript
const fs = require("fs");

// 读取目录中的文件和子目录
const files = fs.readdirSync("/path/to/dir");
console.log(files);
```

在这个例子中，我们使用 `fs.readdirSync()` 方法读取 `/path/to/dir` 目录中的所有文件和子目录，并输出它们的名称。

需要注意的是，`fs.readdirSync()` 方法返回的是一个字符串数组，其中包含指定目录中的所有文件名和子目录名。如果需要同时返回文件的类型信息，则可以将 `withFileTypes` 参数设置为 true。另外，如果不指定 `encoding` 参数，则默认使用 utf8 编码方式来解析文件名。

#### fs.readFileSync(path[, options])

在 Node.js 中，`fs.readFileSync()` 方法用于同步读取一个文件的内容。它根据给定的路径（path）和 options 参数来读取文件，并返回文件的内容。

以下是 `fs.readFileSync()` 的语法：

```javascript
fs.readFileSync(path[, options]);
```

- `path`：要读取的文件路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示要使用的编码方式。默认为 null，即返回 Buffer 对象。
  - `flag`：一个字符串，表示要打开文件的方式。默认为 'r'。

以下是一个使用 `fs.readFileSync()` 的示例代码：

```javascript
const fs = require("fs");

// 读取文件内容
const content = fs.readFileSync("/path/to/file.txt", "utf8");
console.log(content);
```

在这个例子中，我们使用 `fs.readFileSync()` 方法读取 `/path/to/file.txt` 文件的内容，并将其输出到控制台上。

需要注意的是，如果不指定 `encoding` 参数，则返回的是一个 Buffer 对象，而非字符串。此外，如果文件不存在或无法访问，则会抛出一个错误。如果需要以异步的方式读取文件，则可以使用 `fs.readFile()` 方法。

#### fs.readlinkSync(path[, options])

在 Node.js 中，`fs.readlinkSync()` 方法用于同步读取一个符号链接（软链接）的目标路径。它根据给定的路径（path）和 options 参数来读取符号链接，并返回目标路径。

以下是 `fs.readlinkSync()` 的语法：

```javascript
fs.readlinkSync(path[, options]);
```

- `path`：要读取的符号链接路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示目标路径编码方式。默认为 'utf8'。

以下是一个使用 `fs.readlinkSync()` 的示例代码：

```javascript
const fs = require("fs");

// 读取符号链接目标路径
const target = fs.readlinkSync("/path/to/link");
console.log(target);
```

在这个例子中，我们使用 `fs.readlinkSync()` 方法读取 `/path/to/link` 符号链接的目标路径，并将其输出到控制台上。

需要注意的是，如果不指定 `encoding` 参数，则返回的是一个 Buffer 对象，而非字符串。此外，如果给定路径不是一个符号链接，则会抛出一个错误。如果需要以异步的方式读取符号链接，则可以使用 `fs.readlink()` 方法。

#### fs.readSync(fd, buffer, offset, length[, position])

在 Node.js 中，`fs.readSync()` 方法用于同步从一个已打开的文件中读取数据。它接收一个文件描述符（fd）以及 buffer、offset、length 和 position 参数，用于指定要读取的数据缓冲区、起始偏移量、读取字节数和读取位置。

以下是 `fs.readSync()` 的语法：

```javascript
fs.readSync(fd, buffer, offset, length[, position]);
```

- `fd`：已打开的文件描述符。
- `buffer`：一个 Buffer 对象或 Uint8Array 数组，用于存储读取的数据。
- `offset`：一个数字，表示写入数据时的起始偏移量。
- `length`：一个数字，表示要读取的字节数。
- `position`：可选参数，一个数字，表示读取数据时的起始位置。如果不指定，则从当前位置开始读取。

以下是一个使用 `fs.readSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并读取数据
const fd = fs.openSync("/path/to/file", "r");
const buffer = Buffer.alloc(1024); // 分配一个 1024 字节的缓冲区
const bytes = fs.readSync(fd, buffer, 0, 1024, 0);
console.log(
  `Read ${bytes} bytes from file: ${buffer.toString("utf8", 0, bytes)}`
);

// 关闭文件描述符
fs.closeSync(fd);
```

在这个例子中，我们使用 `fs.readSync()` 方法从 `/path/to/file` 文件中读取最多 1024 字节的数据，并将其输出到控制台上。

需要注意的是，`fs.readSync()` 方法返回实际读取的字节数，并将读取的数据存储到指定的 buffer 缓冲区中。如果没有足够的数据可供读取，则会返回一个比请求的长度小的字节数。另外，在完成操作后应该使用 `fs.closeSync()` 方法关闭文件描述符。

#### fs.readSync(fd, buffer[, options])

在 Node.js 中，`fs.readSync()` 方法用于同步从一个已打开的文件中读取数据。它接收一个文件描述符（fd）以及 buffer 和 options 参数，用于指定要读取的数据缓冲区和读取选项。

以下是 `fs.readSync()` 的语法：

```javascript
fs.readSync(fd, buffer[, options]);
```

- `fd`：已打开的文件描述符。
- `buffer`：一个 Buffer 对象或 Uint8Array 数组，用于存储读取的数据。
- `options`：可选参数，一个对象。常用的属性包括：
  - `offset`：一个数字，表示写入数据时的起始偏移量。默认为 0。
  - `length`：一个数字，表示要读取的字节数。默认为 buffer.length。
  - `position`：一个数字，表示读取数据时的起始位置。默认为当前文件位置。

以下是一个使用 `fs.readSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并读取数据
const fd = fs.openSync("/path/to/file", "r");
const buffer = Buffer.alloc(1024); // 分配一个 1024 字节的缓冲区
const bytes = fs.readSync(fd, buffer, { offset: 0, length: 1024, position: 0 });
console.log(
  `Read ${bytes} bytes from file: ${buffer.toString("utf8", 0, bytes)}`
);

// 关闭文件描述符
fs.closeSync(fd);
```

在这个例子中，我们使用 `fs.readSync()` 方法从 `/path/to/file` 文件中读取最多 1024 字节的数据，并将其输出到控制台上。

需要注意的是，`fs.readSync()` 方法返回实际读取的字节数，并将读取的数据存储到指定的 buffer 缓冲区中。如果没有足够的数据可供读取，则会返回一个比请求的长度小的字节数。另外，在完成操作后应该使用 `fs.closeSync()` 方法关闭文件描述符。

#### fs.readvSync(fd, buffers[, position])

在 Node.js 中，`fs.readvSync()` 方法用于同步从一个已打开的文件中读取数据到多个缓冲区。它接收一个文件描述符（fd）、buffer 数组和 position 参数，用于指定要读取的数据缓冲区、读取位置。

以下是 `fs.readvSync()` 的语法：

```javascript
fs.readvSync(fd, buffers[, position]);
```

- `fd`：已打开的文件描述符。
- `buffers`：一个 Buffer 对象数组或 Uint8Array 数组，用于存储读取的数据。
- `position`：可选参数，一个数字，表示读取数据时的起始位置。默认为当前文件位置。

以下是一个使用 `fs.readvSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开文件并读取数据
const fd = fs.openSync("/path/to/file", "r");
const buffer1 = Buffer.alloc(1024); // 分配一个 1024 字节的缓冲区
const buffer2 = Buffer.alloc(512); // 分配一个 512 字节的缓冲区
const bytesRead = fs.readvSync(fd, [buffer1, buffer2], 0);

console.log(`Read ${bytesRead} bytes from file: \n`);
console.log(buffer1.toString("utf8", 0, bytesRead));
console.log(buffer2.toString("utf8", 0, bytesRead - buffer1.length));

// 关闭文件描述符
fs.closeSync(fd);
```

在这个例子中，我们使用 `fs.readvSync()` 方法从 `/path/to/file` 文件中读取数据，并将其存储到两个缓冲区中。最后输出两个缓冲区中包含的数据。

需要注意的是，`fs.readvSync()` 方法返回实际读取的字节数，并将读取的数据存储到指定的 buffer 缓冲区中。如果没有足够的数据可供读取，则会返回一个比请求的长度小的字节数。另外，在完成操作后应该使用 `fs.closeSync()` 方法关闭文件描述符。

#### fs.realpathSync(path[, options])

在 Node.js 中，`fs.realpathSync()` 方法用于同步获取一个路径的绝对路径。它接收一个路径名（path）和 options 参数，用于指定要获取的路径和选项。

以下是 `fs.realpathSync()` 的语法：

```javascript
fs.realpathSync(path[, options]);
```

- `path`：要获取绝对路径的路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示要使用的编码方式。默认为 'utf8'。
  - `cache`：一个对象，表示缓存路径解析结果的对象。默认为一个新的空对象。

以下是一个使用 `fs.realpathSync()` 的示例代码：

```javascript
const fs = require("fs");

// 获取路径的绝对路径
const realPath = fs.realpathSync("/path/to/file");
console.log(`Real path: ${realPath}`);
```

在这个例子中，我们使用 `fs.realpathSync()` 方法获取 `/path/to/file` 文件的绝对路径，并将其输出到控制台上。

需要注意的是，`fs.realpathSync()` 方法返回指定路径的绝对路径。如果文件不存在或无法访问，则会抛出一个错误。此外，`fs.realpathSync()` 方法还提供了缓存功能，可以节省多次调用时的时间和计算资源。如果路径解析结果已经存在于缓存中，则直接返回缓存中的值。如果需要以异步的方式获取绝对路径，则可以使用 `fs.realpath()` 方法。

#### fs.realpathSync.native(path[, options])

在 Node.js 中，`fs.realpathSync.native()` 方法用于同步获取一个路径的本机绝对路径。它接收一个路径名（path）和 options 参数，用于指定要获取的路径和选项。

以下是 `fs.realpathSync.native()` 的语法：

```javascript
fs.realpathSync.native(path[, options]);
```

- `path`：要获取本机绝对路径的路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示要使用的编码方式。默认为 'utf8'。
  - `cache`：一个对象，表示缓存路径解析结果的对象。默认为一个新的空对象。

以下是一个使用 `fs.realpathSync.native()` 的示例代码：

```javascript
const fs = require("fs");

// 获取路径的本机绝对路径
const realPath = fs.realpathSync.native("/path/to/file");
console.log(`Real path: ${realPath}`);
```

在这个例子中，我们使用 `fs.realpathSync.native()` 方法获取 `/path/to/file` 文件的本机绝对路径，并将其输出到控制台上。

需要注意的是，`fs.realpathSync.native()` 方法与 `fs.realpathSync()` 方法非常相似，但是它返回的是操作系统原生的路径格式，而不是 Node.js 中的路径格式。在 Windows 操作系统中，本机路径格式使用反斜杠（\）作为路径分隔符，而在 UNIX 和类 UNIX 系统中，则使用正斜杠（/）。如果需要以异步的方式获取本机绝对路径，则可以使用 `fs.realpath.native()` 方法。

#### fs.renameSync(oldPath, newPath)

在 Node.js 中，`fs.renameSync()` 方法用于同步重命名或移动文件。它接收一个旧路径名（oldPath）和一个新路径名（newPath），用于指定要操作的文件路径。

以下是 `fs.renameSync()` 的语法：

```javascript
fs.renameSync(oldPath, newPath);
```

- `oldPath`：要重命名的文件的路径名。
- `newPath`：新的文件路径名或已存在目录下的文件名。

以下是一个使用 `fs.renameSync()` 的示例代码：

```javascript
const fs = require("fs");

// 重命名文件
fs.renameSync("/path/to/oldfile", "/path/to/newfile");
```

在这个例子中，我们使用 `fs.renameSync()` 方法将 `/path/to/oldfile` 文件重命名为 `/path/to/newfile`。

需要注意的是，`fs.renameSync()` 方法可以用来移动文件，如果 `newPath` 是一个已存在目录下的文件名，则会将 `oldPath` 移动到该目录下。如果 `newPath` 所在的目录不存在，则会抛出一个错误。如果重命名或移动文件失败，则会抛出一个错误。另外，在 Windows 操作系统下，`fs.renameSync()` 方法还可以用来重命名或移动目录。

#### fs.rmdirSync(path[, options])

在 Node.js 中，`fs.rmdirSync()` 方法用于同步删除一个空目录。它接收一个路径名（path）和 options 参数，用于指定要删除的目录和选项。

以下是 `fs.rmdirSync()` 的语法：

```javascript
fs.rmdirSync(path[, options]);
```

- `path`：要删除的目录路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `recursive`：一个布尔值，表示是否递归地删除非空目录。默认为 false。

以下是一个使用 `fs.rmdirSync()` 的示例代码：

```javascript
const fs = require("fs");

// 删除空目录
fs.rmdirSync("/path/to/emptydir");
```

在这个例子中，我们使用 `fs.rmdirSync()` 方法删除 `/path/to/emptydir` 空目录。

需要注意的是，`fs.rmdirSync()` 方法只能删除空目录，如果目录不为空，则会抛出一个错误。如果需要递归地删除非空目录，则可以将 `recursive` 选项设置为 true。但是请务必小心，因为递归删除非空目录可能会导致数据丢失或损坏。另外，在完成操作后应该检查返回值是否为 undefined，以确保目录已经被成功删除。

#### fs.rmSync(path[, options])

在 Node.js 14 版本及以上中，`fs.rmSync()` 方法用于同步删除文件或目录。它接收一个路径名（path）和 options 参数，用于指定要删除的文件或目录和选项。

以下是 `fs.rmSync()` 的语法：

```javascript
fs.rmSync(path[, options]);
```

- `path`：要删除的文件或目录路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `recursive`：一个布尔值，表示是否递归地删除非空目录。默认为 false。
  - `force`：一个布尔值，表示是否强制删除只读文件。默认为 false。

以下是一个使用 `fs.rmSync()` 的示例代码：

```javascript
const fs = require("fs");

// 删除文件
fs.rmSync("/path/to/file");

// 删除空目录
fs.rmSync("/path/to/emptydir");

// 递归地删除非空目录
fs.rmSync("/path/to/nonemptydir", { recursive: true });
```

在这个例子中，我们使用 `fs.rmSync()` 方法删除 `/path/to/file` 文件、`/path/to/emptydir` 空目录、以及 `/path/to/nonemptydir` 非空目录（递归删除）。

需要注意的是，`fs.rmSync()` 方法可以用来删除文件或目录。如果需要删除非空目录，则必须将 `recursive` 选项设置为 true。如果需要强制删除只读文件、或者删除权限不足的文件或目录，则可以将 `force` 选项设置为 true。但是请务必小心，因为强制删除文件可能会导致数据丢失或损坏。另外，在完成操作后应该检查返回值是否为 undefined，以确保文件或目录已经被成功删除。

#### fs.statSync(path[, options])

在 Node.js 中，`fs.statSync()` 方法用于同步获取一个文件或目录的状态信息。它接收一个路径名（path）和 options 参数，用于指定要获取状态信息的文件或目录和选项。

以下是 `fs.statSync()` 的语法：

```javascript
fs.statSync(path[, options]);
```

- `path`：要获取状态信息的文件或目录路径名。
- `options`：可选参数，一个对象。常用的属性包括：
  - `bigint`：一个布尔值，表示是否将数值类型的 uid 和 gid 转换为 BigInt 类型。默认为 false。

以下是一个使用 `fs.statSync()` 的示例代码：

```javascript
const fs = require("fs");

// 获取文件或目录的状态信息
const stats = fs.statSync("/path/to/file");
console.log(`File size: ${stats.size} bytes`);
console.log(`Last modified time: ${stats.mtime}`);
```

在这个例子中，我们使用 `fs.statSync()` 方法获取 `/path/to/file` 文件或目录的状态信息，并将文件大小和最后修改时间输出到控制台上。

需要注意的是，`fs.statSync()` 方法返回一个包含文件或目录状态信息的对象。常用的属性包括：

- `dev`：一个数字，表示文件所在设备的 ID。
- `ino`：一个数字，表示文件的 inode 编号。
- `mode`：一个数字，表示文件的权限标志和文件类型。
- `nlink`：一个数字，表示文件的硬链接数量。
- `uid`：一个数字，表示文件所有者的用户 ID。
- `gid`：一个数字，表示文件所有者的组 ID。
- `rdev`：一个数字，表示特殊文件的设备 ID。
- `size`：一个数字，表示文件的大小（以字节为单位）。
- `blksize`：一个数字，表示文件系统的块大小。
- `blocks`：一个数字，表示文件所占用的块数。
- `atimeMs`：一个数字，表示文件的最后访问时间（以毫秒为单位）。
- `mtimeMs`：一个数字，表示文件的最后修改时间（以毫秒为单位）。
- `ctimeMs`：一个数字，表示文件的最后更改时间（以毫秒为单位）。
- `birthtimeMs`：一个数字，表示文件的创建时间（以毫秒为单位）。

如果需要以异步的方式获取文件或目录的状态信息，则可以使用 `fs.stat()` 方法。

#### fs.statfsSync(path[, options])

在 Node.js 中，`fs.statfsSync()` 方法用于同步获取一个文件系统的状态信息。它接收一个路径名（path）和 options 参数，用于指定要获取状态信息的文件系统和选项。

以下是 `fs.statfsSync()` 的语法：

```javascript
fs.statfsSync(path[, options]);
```

- `path`：要获取状态信息的文件系统路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `bigint`：一个布尔值，表示是否将数值类型的 uid 和 gid 转换为 BigInt 类型。默认为 false。

以下是一个使用 `fs.statfsSync()` 的示例代码：

```javascript
const fs = require("fs");

// 获取文件系统的状态信息
const stats = fs.statfsSync("/path/to/filesystem");
console.log(`Total blocks: ${stats.blocks}`);
console.log(`Free blocks: ${stats.free}`);
console.log(`Available blocks: ${stats.available}`);
console.log(`Block size: ${stats.blockSize} bytes`);
```

在这个例子中，我们使用 `fs.statfsSync()` 方法获取 `/path/to/filesystem` 文件系统的状态信息，并将总块数、可用块数、空闲块数以及块大小输出到控制台上。

需要注意的是，`fs.statfsSync()` 方法返回一个包含文件系统状态信息的对象。常用的属性包括：

- `type`：一个字符串，表示文件系统类型。
- `f_bsize`：一个数字，表示底层块大小（以字节为单位）。
- `f_blocks`：一个数字，表示文件系统中的总块数。
- `f_bfree`：一个数字，表示文件系统中的空闲块数。
- `f_bavail`：一个数字，表示文件系统中的可用块数。
- `f_files`：一个数字，表示文件系统中的总文件数。
- `f_ffree`：一个数字，表示文件系统中的空闲文件数。
- `f_favail`：一个数字，表示文件系统中的可用文件数。
- `f_fsid`：一个数字或数组，表示文件系统 ID。
- `f_namemax`：一个数字，表示文件名最大长度（以字节为单位）。

如果需要以异步的方式获取文件系统的状态信息，则可以使用 `fs.statfs()` 方法。

#### fs.symlinkSync(target, path[, type])

在 Node.js 中，`fs.symlinkSync()` 方法用于同步创建一个符号链接。它接收一个目标路径名（target）、一个链接路径名（path）和 type 参数，用于指定要创建的链接和类型。

以下是 `fs.symlinkSync()` 的语法：

```javascript
fs.symlinkSync(target, path[, type]);
```

- `target`：要作为链接目标的文件或目录的路径。
- `path`：要创建的符号链接的路径。
- `type`：可选参数，一个字符串，表示链接类型。默认为 'file'。

以下是一个使用 `fs.symlinkSync()` 的示例代码：

```javascript
const fs = require("fs");

// 创建一个符号链接
fs.symlinkSync("/path/to/target", "/path/to/link");
```

在这个例子中，我们使用 `fs.symlinkSync()` 方法创建了一个符号链接，将 `/path/to/link` 链接到 `/path/to/target`。

需要注意的是，`fs.symlinkSync()` 方法可以用于创建文件和目录的符号链接。如果需要创建硬链接，则应该使用 `fs.linkSync()` 方法。另外，在 Windows 操作系统下，只有管理员才能创建符号链接。如果当前用户没有管理员权限，则需要以管理员身份运行命令行窗口，并使用 `-Force` 选项来强制执行命令。

#### fs.truncateSync(path[, len])

在 Node.js 中，`fs.truncateSync()` 方法用于同步截断一个文件。它接收一个路径名（path）和一个长度参数（len），用于指定要截断的文件和长度。

以下是 `fs.truncateSync()` 的语法：

```javascript
fs.truncateSync(path[, len]);
```

- `path`：要截断的文件路径名。
- `len`：可选参数，一个数字，表示要截断的长度（以字节为单位）。如果省略该参数，则默认为 0。

以下是一个使用 `fs.truncateSync()` 的示例代码：

```javascript
const fs = require("fs");

// 截断一个文件
fs.truncateSync("/path/to/file", 1024);
```

在这个例子中，我们使用 `fs.truncateSync()` 方法将 `/path/to/file` 文件截断为 1024 字节。

需要注意的是，`fs.truncateSync()` 方法会截断指定文件的长度。如果要增加文件的长度，则可以使用 `fs.writeSync()` 方法。另外，在 Windows 操作系统下，不能用 `fs.truncateSync()` 方法修改只读文件的大小。如果需要修改只读文件的大小，则应该先将其属性更改为可写，并在操作完成后恢复其属性。

#### fs.unlinkSync(path)

在 Node.js 中，`fs.unlinkSync()` 方法用于同步删除一个文件。它接收一个路径名（path），用于指定要删除的文件。

以下是 `fs.unlinkSync()` 的语法：

```javascript
fs.unlinkSync(path);
```

- `path`：要删除的文件路径名。

以下是一个使用 `fs.unlinkSync()` 的示例代码：

```javascript
const fs = require("fs");

// 删除一个文件
fs.unlinkSync("/path/to/file");
```

在这个例子中，我们使用 `fs.unlinkSync()` 方法删除 `/path/to/file` 文件。

需要注意的是，`fs.unlinkSync()` 方法会永久性地删除指定的文件。因此，在调用该方法之前应该确保文件不再需要，并且应该小心地使用该方法，避免误删重要文件。如果需要删除一个非空目录，则应该使用 `fs.rmdirSync()` 方法或者 `fs.rmSync()` 方法。

#### fs.utimesSync(path, atime, mtime)

在 Node.js 中，`fs.utimesSync()` 方法用于同步修改一个文件的访问时间和修改时间。它接收一个路径名（path）、一个访问时间参数（atime）和一个修改时间参数（mtime），用于指定要修改的文件和时间。

以下是 `fs.utimesSync()` 的语法：

```javascript
fs.utimesSync(path, atime, mtime);
```

- `path`：要修改访问时间和修改时间的文件路径名。
- `atime`：一个 Date 对象或者数字，表示要设置的访问时间。如果为数字，则表示距离 1970 年 1 月 1 日 UTC 的毫秒数。
- `mtime`：一个 Date 对象或者数字，表示要设置的修改时间。如果为数字，则表示距离 1970 年 1 月 1 日 UTC 的毫秒数。

以下是一个使用 `fs.utimesSync()` 的示例代码：

```javascript
const fs = require("fs");

// 修改一个文件的访问时间和修改时间
fs.utimesSync("/path/to/file", new Date(), new Date());
```

在这个例子中，我们使用 `fs.utimesSync()` 方法将 `/path/to/file` 文件的访问时间和修改时间设置为当前时间。

需要注意的是，`fs.utimesSync()` 方法会修改指定文件的访问时间和修改时间。如果只需要修改其中某一个时间，可以将另外一个参数设置为 null。另外，在 Windows 操作系统下，只有管理员才能修改文件的访问时间和修改时间。如果当前用户没有管理员权限，则需要以管理员身份运行命令行窗口，并使用 `-Force` 选项来强制执行命令。

#### fs.writeFileSync(file, data[, options])

在 Node.js 中，`fs.writeFileSync()` 方法用于同步地向一个文件写入数据。它接收一个文件路径（file）、要写入的数据（data）以及 options 参数，用于指定写入操作的一些选项。

以下是 `fs.writeFileSync()` 的语法：

```javascript
fs.writeFileSync(file, data[, options]);
```

- `file`：要写入数据的文件路径名。
- `data`：要写入的数据。可以是字符串、Buffer 对象或者 Unit8Array 等类型。
- `options`：可选参数，一个对象。常用的属性包括：
  - `encoding`：一个字符串，表示要使用的字符编码。默认为 'utf8'。
  - `mode`：一个数字或字符串，表示要设置的文件模式（权限和粘滞位）。默认为 0o666。
  - `flag`：一个字符串，表示要使用的文件系统标志（如 'w' 表示写入）。默认为 'w'。

以下是一个使用 `fs.writeFileSync()` 的示例代码：

```javascript
const fs = require("fs");

// 向一个文件写入数据
fs.writeFileSync("/path/to/file", "Hello, world!");
```

在这个例子中，我们使用 `fs.writeFileSync()` 方法向 `/path/to/file` 文件写入了一个字符串 `'Hello, world!'`。

需要注意的是，`fs.writeFileSync()` 方法会同步地将数据写入到指定文件中。如果文件已经存在，则会覆盖原有的文件内容。如果需要异步地向一个文件写入数据，则可以使用 `fs.writeFile()` 方法。另外，在 Windows 操作系统下，不能使用 `fs.writeFileSync()` 方法向只读文件写入数据。如果需要修改只读文件，则需要先将其属性更改为可写，并在操作完成后恢复其属性。

#### fs.writeSync(fd, buffer, offset[, length[, position]])

在 Node.js 中，`fs.writeSync()` 方法用于同步地向一个文件描述符写入数据。它接收一个文件描述符（fd）、要写入的缓冲区（buffer）、缓冲区偏移量（offset）以及可选的长度和位置参数。

以下是 `fs.writeSync()` 的语法：

```javascript
fs.writeSync(fd, buffer, offset[, length[, position]])
```

- `fd`：一个整数，表示要写入数据的文件描述符。
- `buffer`：一个 Buffer 对象或者 Unit8Array 等类型，表示要写入的数据。
- `offset`：一个数字，表示从缓冲区的哪个位置开始写入数据。
- `length`：一个数字，表示要写入的字节数。如果省略该参数，则默认为从偏移量开始到缓冲区末尾的所有字节。
- `position`：一个数字，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认从当前文件位置开始写入数据。

以下是一个使用 `fs.writeSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开一个文件并写入数据
const fd = fs.openSync("/path/to/file", "a");
fs.writeSync(fd, Buffer.from("Hello, world!"), 0);
fs.closeSync(fd);
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开一个文件，并获得其文件描述符。然后使用 `fs.writeSync()` 方法将 `'Hello, world!'` 字符串写入到文件中。最后使用 `fs.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.writeSync()` 方法会同步地将数据写入到指定文件中。如果需要异步地向一个文件写入数据，则可以使用 `fs.write()` 方法。另外，在 Windows 操作系统下，不能使用 `fs.writeSync()` 方法向只读文件写入数据。如果需要修改只读文件，则需要先将其属性更改为可写，并在操作完成后恢复其属性。

#### fs.writeSync(fd, buffer[, options])

在 Node.js 中，`fs.writeSync()` 方法用于同步地向一个文件描述符写入数据。它接收一个文件描述符（fd）、要写入的缓冲区（buffer）以及 options 参数，用于指定写入操作的一些选项。

以下是 `fs.writeSync()` 的语法：

```javascript
fs.writeSync(fd, buffer[, options])
```

- `fd`：一个整数，表示要写入数据的文件描述符。
- `buffer`：一个 Buffer 对象或者 Unit8Array 等类型，表示要写入的数据。
- `options`：可选参数，一个对象。常用的属性包括：
  - `offset`：一个数字，表示从缓冲区的哪个位置开始写入数据。默认为 0。
  - `length`：一个数字，表示要写入的字节数。如果省略该参数，则默认为从偏移量开始到缓冲区末尾的所有字节。
  - `position`：一个数字，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认从当前文件位置开始写入数据。

以下是一个使用 `fs.writeSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开一个文件并写入数据
const fd = fs.openSync("/path/to/file", "a");
fs.writeSync(fd, Buffer.from("Hello, world!"));
fs.closeSync(fd);
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开一个文件，并获得其文件描述符。然后使用 `fs.writeSync()` 方法将 `'Hello, world!'` 字符串写入到文件中。最后使用 `fs.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.writeSync()` 方法会同步地将数据写入到指定文件中。如果需要异步地向一个文件写入数据，则可以使用 `fs.write()` 方法。另外，在 Windows 操作系统下，不能使用 `fs.writeSync()` 方法向只读文件写入数据。如果需要修改只读文件，则需要先将其属性更改为可写，并在操作完成后恢复其属性。

#### fs.writeSync(fd, string[, position[, encoding]])

在 Node.js 中，`fs.writeSync()` 方法用于同步地向一个文件描述符写入数据。它接收一个文件描述符（fd）、要写入的字符串（string）以及可选的位置和编码参数。

以下是 `fs.writeSync()` 的语法：

```javascript
fs.writeSync(fd, string[, position[, encoding]])
```

- `fd`：一个整数，表示要写入数据的文件描述符。
- `string`：一个字符串，表示要写入的数据。
- `position`：一个数字，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认从当前文件位置开始写入数据。
- `encoding`：一个字符串，表示要使用的字符编码。默认为 'utf8'。

以下是一个使用 `fs.writeSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开一个文件并写入数据
const fd = fs.openSync("/path/to/file", "a");
fs.writeSync(fd, "Hello, world!");
fs.closeSync(fd);
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开一个文件，并获得其文件描述符。然后使用 `fs.writeSync()` 方法将 `'Hello, world!'` 字符串写入到文件中。最后使用 `fs.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.writeSync()` 方法会同步地将数据写入到指定文件中。如果需要异步地向一个文件写入数据，则可以使用 `fs.write()` 方法。另外，在 Windows 操作系统下，不能使用 `fs.writeSync()` 方法向只读文件写入数据。如果需要修改只读文件，则需要先将其属性更改为可写，并在操作完成后恢复其属性。

#### fs.writevSync(fd, buffers[, position])

在 Node.js 中，`fs.writevSync()` 方法用于同步地向一个文件描述符写入多个缓冲区的数据。它接收一个文件描述符（fd）、要写入的多个缓冲区数组（buffers）以及可选的位置参数。

以下是 `fs.writevSync()` 的语法：

```javascript
fs.writevSync(fd, buffers[, position])
```

- `fd`：一个整数，表示要写入数据的文件描述符。
- `buffers`：一个数组，包含多个 Buffer 对象或者 Unit8Array 等类型，表示要写入的数据。
- `position`：一个数字，表示从文件的哪个位置开始写入数据。如果省略该参数，则默认从当前文件位置开始写入数据。

以下是一个使用 `fs.writevSync()` 的示例代码：

```javascript
const fs = require("fs");

// 打开一个文件并写入数据
const fd = fs.openSync("/path/to/file", "a");
fs.writevSync(fd, [Buffer.from("Hello, "), Buffer.from("world!")]);
fs.closeSync(fd);
```

在这个例子中，我们首先使用 `fs.openSync()` 方法打开一个文件，并获得其文件描述符。然后使用 `fs.writevSync()` 方法将两个缓冲区分别包含 `'Hello, '` 和 `'world!'` 字符串写入到文件中。最后使用 `fs.closeSync()` 方法关闭文件描述符。

需要注意的是，`fs.writevSync()` 方法会同步地将多个缓冲区的数据写入到指定文件中。如果需要异步地向一个文件写入数据，则可以使用 `fs.writev()` 方法。另外，在 Windows 操作系统下，不能使用 `fs.writevSync()` 方法向只读文件写入数据。如果需要修改只读文件，则需要先将其属性更改为可写，并在操作完成后恢复其属性。

### Common Objects

在 Node.js 中，`Common Objects` 是指常用的内置对象，它们可以在任何地方直接使用，而不需要引入模块或者加载文件。以下是一些常见的 `Common Objects`：

- `console`：用于向控制台输出信息的对象。
- `process`：表示当前 Node.js 进程的对象，包含了很多与进程相关的属性和方法。
- `Buffer`：表示二进制数据的对象，用于处理文件、网络流等数据的读写。
- `Timers`：用于执行定时任务的对象，包括 setTimeout()、setInterval()、setImmediate() 等方法。
- `Errors`：用于处理错误的对象，包括 Error、TypeError、RangeError 等类型的错误。
- `Events`：用于实现事件监听和触发的对象，包括 EventEmitter 对象、on() 方法、emit() 方法等。
- `Path`：用于处理文件路径的对象，包括 join()、resolve() 等方法。
- `URL`：用于解析 URL 的对象，包括 parse()、format() 等方法。
- `Query Strings`：用于处理查询字符串的对象，包括 parse()、stringify() 等方法。

这些 `Common Objects` 在 Node.js 中非常重要，开发者们经常会使用它们来完成各种任务。熟练掌握这些对象的使用方法，可以提高开发效率和代码质量。

#### fs.Dir

在 Node.js 中，`fs.Dir` 是一个类，用于表示一个目录的迭代器。它可以用于遍历一个目录中的文件和子目录。

以下是 `fs.Dir` 的语法：

```javascript
const dir = fs.opendirSync(path[, options])
```

- `path`：一个字符串，表示要打开的目录路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `bufferSize`：一个数字，表示每次读取数据的字节数。默认为 32KB。

以下是一个使用 `fs.Dir` 的示例代码：

```javascript
const fs = require("fs");

// 打开一个目录并遍历其中的所有文件和子目录
const dir = fs.opendirSync("/path/to/directory");
for await (const dirent of dir) {
  console.log(dirent.name);
}
dir.closeSync();
```

在这个例子中，我们首先使用 `fs.opendirSync()` 方法打开一个目录，并获得其迭代器对象。然后使用 `for-await-of` 循环遍历该目录中的所有文件和子目录，并输出其名称。最后使用 `dir.closeSync()` 方法关闭迭代器对象。

需要注意的是，在 Node.js 中，`fs.Dir` 迭代器是一个异步迭代器，可以通过 `for-await-of` 循环进行遍历。此外，`fs.Dir` 类也提供了很多方便的方法，如 `read()`、`readSync()`、`rewind()`、`close()` 等，用于控制迭代器的读取行为。

#### fs.Dirent

在 Node.js 中，`fs.Dirent` 是一个类，用于表示一个目录中的文件或子目录。它可以用于获取和操作一个目录中的文件和子目录。

以下是 `fs.Dirent` 的语法：

```javascript
fs.readdir(path[, options], callback)
```

- `path`：一个字符串，表示要读取的目录路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `withFileTypes`：一个布尔值，表示是否返回 fs.Dirent 对象。默认为 false。
  - `encoding`：一个字符串，表示要使用的字符编码。默认为 'utf8'。
- `callback`：一个回调函数，用于处理读取到的文件名或 fs.Dirent 对象。回调函数的第一个参数为可能出现的错误，第二个参数为读取到的文件名或 fs.Dirent 对象的数组。

以下是一个使用 `fs.Dirent` 的示例代码：

```javascript
const fs = require("fs");

// 读取一个目录并输出其中的所有文件名
fs.readdir("/path/to/directory", (err, files) => {
  if (err) throw err;
  console.log(files);
});
```

在这个例子中，我们使用 `fs.readdir()` 方法读取一个目录，并获得其中的所有文件名。然后将文件名输出到控制台上。

需要注意的是，在 Node.js 中，`fs.Dirent` 对象只能通过设置 `withFileTypes` 参数为 true 而生成，否则返回的是一个包含文件名的字符串数组。在使用 `fs.Dirent` 对象时，可以通过其类型（`isDirectory()`、`isFile()` 等）和名称（`name` 属性）来判断和访问文件或子目录。

#### fs.FSWatcher

在 Node.js 中，`fs.FSWatcher` 是一个类，用于监视文件或目录的变化。它可以用于监听文件或目录的创建、修改和删除等事件，并执行相应的操作。

以下是 `fs.FSWatcher` 的语法：

```javascript
const watcher = fs.watch(filename[, options][, listener])
```

- `filename`：一个字符串，表示要监视的文件或目录路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `persistent`：一个布尔值，表示当被监视的文件或目录被重命名或移动时是否继续监视其变化。默认为 true。
  - `recursive`：一个布尔值，表示是否递归监视子目录。默认为 false。
- `listener`：一个回调函数，用于处理监视到的事件。回调函数的第一个参数为监视到的事件类型（'rename' 或 'change'），第二个参数为发生变化的文件名或目录名。

以下是一个使用 `fs.FSWatcher` 的示例代码：

```javascript
const fs = require("fs");

// 监视一个文件的变化并输出变化信息
const watcher = fs.watch("/path/to/file", (eventType, filename) => {
  console.log(`event type: ${eventType}`);
  console.log(`filename: ${filename}`);
});

// 停止监视文件变化
watcher.close();
```

在这个例子中，我们使用 `fs.watch()` 方法监视一个文件的变化，并在控制台上输出变化信息。然后使用 `watcher.close()` 方法停止对文件的监视。

需要注意的是，在 Node.js 中，`fs.FSWatcher` 对象会持续地监听文件或目录的变化，直到显式地停止。因此，在使用该对象时要小心，避免过度监听导致程序性能下降。此外，在 Windows 操作系统下，因为系统限制，不能同时监视超过 8192 个文件或目录。

#### fs.StatWatcher

在 Node.js 中，`fs.StatWatcher` 是一个类，用于监视文件或目录的状态变化。它可以用于监听文件或目录的权限、大小和修改时间等状态的变化，并执行相应的操作。

以下是 `fs.StatWatcher` 的语法：

```javascript
const watcher = fs.watchFile(filename[, options], listener)
```

- `filename`：一个字符串，表示要监视的文件或目录路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `interval`：一个数字，表示检查文件或目录状态变化的间隔时间（以毫秒为单位）。默认为 5007 毫秒。
- `listener`：一个回调函数，用于处理监视到的事件。回调函数有两个参数，第一个参数为当前文件或目录的状态信息（`fs.Stats` 对象），第二个参数为前一个状态信息（`fs.Stats` 对象）。

以下是一个使用 `fs.StatWatcher` 的示例代码：

```javascript
const fs = require("fs");

// 监视一个文件的状态变化并输出变化信息
const watcher = fs.watchFile(
  "/path/to/file",
  { interval: 1000 },
  (curr, prev) => {
    console.log(`current status: ${JSON.stringify(curr)}`);
    console.log(`previous status: ${JSON.stringify(prev)}`);
  }
);

// 停止监视文件状态变化
watcher.close();
```

在这个例子中，我们使用 `fs.watchFile()` 方法监视一个文件的状态变化，并在控制台上输出变化信息。然后使用 `watcher.close()` 方法停止对文件状态的监视。

需要注意的是，在 Node.js 中，`fs.StatWatcher` 对象会持续地监听文件状态的变化，直到显式地停止。因此，在使用该对象时要小心，避免过度监听导致程序性能下降。此外，如果需要同时监视多个文件或目录的状态，建议使用 `fs.watch()` 方法代替 `fs.watchFile()` 方法，因为前者具有更好的性能表现。

#### fs.ReadStream

在 Node.js 中，`fs.ReadStream` 是一个类，用于从文件中读取数据流。它可以用于打开一个文件，并以流的形式读取其中的数据。

以下是 `fs.ReadStream` 的语法：

```javascript
const readStream = fs.createReadStream(path[, options])
```

- `path`：一个字符串，表示要读取的文件路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `flags`：一个字符串，表示文件的打开方式。默认为 'r'。
  - `encoding`：一个字符串，表示要使用的字符编码。默认为 null。
  - `fd`：一个数字，表示已经打开的文件描述符。默认为 null。
  - `mode`：一个数字，表示文件的权限。默认为 0o666。
  - `autoClose`：一个布尔值，表示是否在读取完成后自动关闭文件。默认为 true。
  - `start`：一个数字，表示开始读取的位置（以字节为单位）。默认为 0。
  - `end`：一个数字，表示结束读取的位置（以字节为单位）。默认为文件末尾。
  - `highWaterMark`：一个数字，表示每次读取的最大字节数。默认为 64KB。

以下是一个使用 `fs.ReadStream` 的示例代码：

```javascript
const fs = require("fs");

// 以流的形式读取文件并输出其中的内容
const readStream = fs.createReadStream("/path/to/file", { encoding: "utf8" });
readStream.on("data", (chunk) => {
  console.log(chunk);
});
readStream.on("end", () => {
  console.log("done");
});
```

在这个例子中，我们使用 `fs.createReadStream()` 方法打开一个文件，并以流的形式读取其中的数据。然后使用 `on()` 方法监听 `'data'` 事件和 `'end'` 事件，在 `'data'` 事件中输出读取到的数据块，在 `'end'` 事件中输出读取完成的提示信息。

需要注意的是，在 Node.js 中，`fs.ReadStream` 对象会持续地读取文件数据，直到读取完成或者遇到错误为止。因此，在使用该对象时要小心，避免过度读取导致程序性能下降。此外，也可以通过设置 `highWaterMark` 属性来控制每次读取的最大字节数，以达到更好的性能表现。

#### fs.Stats

在 Node.js 中，`fs.Stats` 是一个类，用于表示文件或目录的状态信息。它可以用于获取和操作一个文件或目录的权限、大小、修改时间等属性。

以下是 `fs.Stats` 的语法：

```javascript
fs.stat(path[, options], callback)
```

- `path`：一个字符串，表示要获取状态信息的文件或目录路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `bigint`：一个布尔值，表示是否将文件大小以 bigint 类型返回。默认为 false。
  - `throwIfNoEntry`：一个布尔值，表示如果文件或目录不存在时是否抛出异常。默认为 true。
- `callback`：一个回调函数，用于处理获取到的状态信息。回调函数的第一个参数为可能出现的错误，第二个参数为状态信息（`fs.Stats` 对象）。

以下是一个使用 `fs.Stats` 的示例代码：

```javascript
const fs = require("fs");

// 获取一个文件的状态信息并输出其中的属性
fs.stat("/path/to/file", (err, stats) => {
  if (err) throw err;
  console.log(`file size: ${stats.size}`);
  console.log(`last modified time: ${stats.mtime}`);
});
```

在这个例子中，我们使用 `fs.stat()` 方法获取一个文件的状态信息，并输出其中的文件大小和最后修改时间等属性。

需要注意的是，在 Node.js 中，`fs.Stats` 对象提供了很多方便的方法，如 `isDirectory()`、`isFile()`、`isSymbolicLink()` 等，用于判断文件或目录的类型。此外，在 Windows 操作系统下，如果一个文件或目录的名称以 '.' 开头，则该文件或目录被视为隐藏文件或目录，其属性会有所不同。

#### fs.StatFs

很抱歉，Node.js 中没有 `fs.StatFs` 这个类。可能您需要查看的是另一个与文件系统相关的类。如果您能提供更多的上下文信息，我可以帮助您更好地理解相关的概念和技术。

#### fs.WriteStream

在 Node.js 中，`fs.WriteStream` 是一个类，用于向文件中写入数据流。它可以用于打开一个文件，并以流的形式向其中写入数据。

以下是 `fs.WriteStream` 的语法：

```javascript
const writeStream = fs.createWriteStream(path[, options])
```

- `path`：一个字符串，表示要写入数据的文件路径。
- `options`：可选参数，一个对象。常用的属性包括：
  - `flags`：一个字符串，表示文件的打开方式。默认为 'w'。
  - `encoding`：一个字符串，表示要使用的字符编码。默认为 'utf8'。
  - `fd`：一个数字，表示已经打开的文件描述符。默认为 null。
  - `mode`：一个数字，表示文件的权限。默认为 0o666。
  - `autoClose`：一个布尔值，表示是否在写入完成后自动关闭文件。默认为 true。
  - `start`：一个数字，表示开始写入的位置（以字节为单位）。默认为文件末尾。
  - `highWaterMark`：一个数字，表示每次写入的最大字节数。默认为 16KB。

以下是一个使用 `fs.WriteStream` 的示例代码：

```javascript
const fs = require("fs");

// 以流的形式向文件中写入数据
const writeStream = fs.createWriteStream("/path/to/file", { encoding: "utf8" });
writeStream.write("hello");
writeStream.write("world");
writeStream.end();
```

在这个例子中，我们使用 `fs.createWriteStream()` 方法打开一个文件，并以流的形式向其中写入数据。然后使用 `write()` 方法向文件中写入数据，最后使用 `end()` 方法结束写入操作。

需要注意的是，在 Node.js 中，`fs.WriteStream` 对象会持续地向文件中写入数据，直到写入完成或者遇到错误为止。因此，在使用该对象时要小心，避免过度写入导致程序性能下降。此外，也可以通过设置 `highWaterMark` 属性来控制每次写入的最大字节数，以达到更好的性能表现。

#### fs.constants

在 Node.js 中，`fs.constants` 是一个对象，用于表示文件系统相关的常量。它包括了诸如文件访问权限、文件打开方式、文件类型等方面的常量。

以下是 `fs.constants` 中一些常用的属性：

- `fs.constants.F_OK`：用于检查文件是否存在的常量。
- `fs.constants.R_OK`：用于检查文件是否可读的常量。
- `fs.constants.W_OK`：用于检查文件是否可写的常量。
- `fs.constants.X_OK`：用于检查文件是否可执行的常量。
- `fs.constants.O_RDONLY`：表示以只读方式打开文件的常量。
- `fs.constants.O_WRONLY`：表示以只写方式打开文件的常量。
- `fs.constants.O_RDWR`：表示以读写方式打开文件的常量。
- `fs.constants.S_IFMT`：表示用于检查文件类型的掩码常量。
- `fs.constants.S_IFREG`：表示普通文件的常量。
- `fs.constants.S_IFDIR`：表示目录文件的常量。
- `fs.constants.S_IFLNK`：表示符号链接文件的常量。
- `fs.constants.S_IRWXU`：表示用户（拥有者）权限的掩码常量。
- `fs.constants.S_IRUSR`：表示用户（拥有者）可读权限的常量。
- `fs.constants.S_IWUSR`：表示用户（拥有者）可写权限的常量。
- `fs.constants.S_IXUSR`：表示用户（拥有者）可执行权限的常量。

以下是一个使用 `fs.constants` 的示例代码：

```javascript
const fs = require("fs");

// 检查文件是否存在并输出权限信息
const fileName = "/path/to/file";
fs.access(fileName, fs.constants.F_OK, (err) => {
  if (err) throw err;
  fs.stat(fileName, (err, stats) => {
    if (err) throw err;
    console.log(`file type: ${stats.mode & fs.constants.S_IFMT}`);
    console.log(
      `owner permissions: ${(stats.mode & fs.constants.S_IRWXU) >> 6}`
    );
    console.log(
      `group permissions: ${(stats.mode & fs.constants.S_IRWXG) >> 3}`
    );
    console.log(`other permissions: ${stats.mode & fs.constants.S_IRWXO}`);
  });
});
```

在这个例子中，我们使用 `fs.access()` 方法检查一个文件是否存在，并使用 `fs.stat()` 方法获取其状态信息。然后使用 `fs.constants` 中的常量来解析文件类型和权限信息，并输出到控制台上。

需要注意的是，在 Node.js 中，`fs.constants` 对象提供了很多有用的常量，可以方便地进行文件系统操作。在实际的开发中，我们可以根据需要自行选择使用哪些常量，来达到更好的效果。

### Notes

在 Node.js 官网文档中的 "Notes" 部分，通常包含了一些关于 API 使用的注意事项和技巧。

这些 "Notes" 可能包括以下内容：

- 版本兼容性提示：某些 API 在不同版本的 Node.js 中可能会有所不同，需要特别注意使用时的版本兼容性。
- 最佳实践建议：一些 API 的使用最佳实践和技巧，可以帮助开发者更好地使用 API 和编写高质量的代码。
- 常见问题解答：一些常见问题的解答，可以帮助开发者更快地排查和解决问题。

以下是一个示例 "Notes"：

**Note**: The `fs.promises` API was added in Node.js 10.0.0. If you are using an earlier version of Node.js, you can still use the traditional callback-based `fs` API.

这个 "Note" 提醒我们，在 Node.js 10.0.0 版本中添加了 `fs.promises` API，如果使用早期版本的 Node.js，则仍然可以使用传统的基于回调的 `fs` API 来操作文件系统。这样的提示可以让开发者根据需求选择使用哪种 API，并给出了版本兼容性的建议。

需要注意的是，在学习 Node.js API 时，要仔细阅读文档中的 "Notes" 部分，它们提供了很多有用的信息，可以帮助我们更好地理解和应用 API。
