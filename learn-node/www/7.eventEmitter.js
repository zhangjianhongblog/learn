// 引入 event.js 文件
const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('someEvent',function (args1,args2) {
    console.log('第一个',args1,args2);
});
eventEmitter.on('someEvent',function (args1,args2) {
    console.log('第二个',args1,args2);
});
eventEmitter.emit('someEvent','参数一',"参数二");