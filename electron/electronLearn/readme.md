##  一、如何在两个网页间共享数据？
> 1、localStorage和sessionStorage
> 2、IndexedDB
> 3、如下：

```javascript
// 在主进程中
global.sharedObject = {
    someProperty: 'default value'
}

// 在第一个页面中
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'

// 在第二个页面中
console.log(require('electron').remote.getGlobal('sharedObject').someProperty);
```

##  主进程和渲染进程发送消息

> 1、同步消息

```javascript
// 主进程
const { ipcMain } = require('electron');
ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong';
})

// 渲染进程
const { ipcRenderer } = require('electron');
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"
```

> 2、异步消息

```javascript
// 主进程
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
})
// 渲染进程
const { ipcRenderer } = require('electron');
ipcRenderer.send('asynchronous-message','ping');
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
})
```
