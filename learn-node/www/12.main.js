/* 流 Stream ：从流中读取数据 */

var fs = require('fs');
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为UTF8
readerStream.setEncoding('UTF8');

// 处理流事件 --> data/err/end
readerStream.on('data',function (chunk) {
    data += chunk;
})

readerStream.on('end',function () {
    console.log(data);
})

readerStream.on('error',function (err) {
    console.log(err.stack);
})

console.log('程序执行完成');