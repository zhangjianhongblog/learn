// 引入 events 模块
const events = require('events');
// 创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter();
// 绑定事件及事件的处理程序
eventEmitter.on('eventName',function () {
    console.log('这里是测试nodejs的事件');
});
// 触发事件
eventEmitter.emit('eventName');

