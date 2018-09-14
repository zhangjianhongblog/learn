// 引入 event.js 文件
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
event.on('some_event',function () {
    console.log('some_event 事件触发');
});
setTimeout(function () {
    event.emit('some_event');
},1000);