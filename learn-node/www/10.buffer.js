/* 创建Buffer类 */

const buf = Buffer.from('runoob','ascii');
// console.log(buf.toString('hex')); // 72756e6f6f62
// console.log(buf.toString('base64')); //cnVub29i
// console.log(buf.toString('utf8')); // runoob

// 创建一个长度为10、且用0填充的Buffer
const buf1 = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf1);

// 创建一个长度为10、且用0X1填充的Buffer
const buf2 = Buffer.alloc(10,1); // <Buffer 01 01 01 01 01 01 01 01 01 01>
console.log(buf2);

// 创建一个长度为10、且未初始化的Buffer
// 这个方法比调用Buffer.alloc() 更快，
// 单返回的 Buffer 实例可能包含旧数据，
// 因此需要使用fill() 或 write() 重写
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

// 创建一下包含 [01 02 03]的 Buffer
const buf4 = Buffer.from([1,2,3]);
console.log(buf4);

// 创建一个包含 UTF-8 字节 [74 65 73 74] 的 Buffer
const buf5 = Buffer.from('test');
console.log(buf5);
console.log(buf5.toString()); // test

// 创建一个 Latin-1 字节 [] 的 Buffer
const buf6 = Buffer.from('test','latin1');
console.log(buf6);