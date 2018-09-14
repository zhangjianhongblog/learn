const events = require('events');
const eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function () {
    console.log('监听器listener 1 执行了');
}
var listener2 = function () {
    console.log('监听器 listener 2 执行了');
}

// 绑定 connection 事件,处理函数为 listener1
eventEmitter.addListener('connection',listener1);

// 绑定 connection 事件,处理函数为 listener2
eventEmitter.on('connection',listener2);

var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + '个监听器监听连接事件。');

// 处理 connection 事件
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection',listener1);
console.log('listener 1 不再受监听');

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + '个监听器连接事件');
console.log(eventEmitter.listeners('connection'));
console.log('程序执行结束');