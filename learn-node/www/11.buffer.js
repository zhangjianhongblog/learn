/* 写入缓冲区 write */
// const buf = Buffer.alloc(256);
// const len = buf.write('www.baidu.com');
// console.log(len); // 13

/* 从缓存区读取数据 toString */
// const buf1 = Buffer.alloc(26);
// for (let i = 0; i < 26; i++ ) {
//     buf1[i] = i + 97;
// }
// console.log(buf1.toString('ascii'));  // abcdefghijklmnopqrstuvwxyz
// console.log(buf1.toString('ascii',0,5));  // abcde
// console.log(buf1.toString('utf8',0,5)) // abcde
// console.log(buf1.toString(undefined,0,5)) // 使用utf8 编码，输出：abcde

/* 将Buffer 转换为 JSON对象 toJSON */
// const buf = Buffer.from([01,02,03,04,05]);
// const json = JSON.stringify(buf);
// console.log(json);  // {"type":"Buffer","data":[1,2,3,4,5]}

// const copy = JSON.parse(json,(key, value) => {
    // return value && value.type === "Buffer" ? Buffer.from(value.data) : value;
// });
// console.log(copy); // <Buffer 01 02 03 04 05>

/* 缓冲区合并 Buffer.concat()*/
// const buf1 = Buffer.from('菜鸟教程');
// const buf2 = Buffer.from('哈哈哈');
// const buf3 = Buffer.concat([buf1,buf2]);
// console.log(buf3.toString());

/* 缓存区比较 compare*/
// const buf1 = Buffer.from('ABC');
// const buf2 = Buffer.from("ABCD");
// let result = buf1.compare(buf2);
// console.log(result);
// if (result < 0) {
//     console.log(buf1 + "在" + buf2 + "之前");
// } else if (result === 0){
//     console.log(buf1 + "与" + buf2 + "相同");
// } else {
//     console.log(buf1 + "在" + buf2 + "之后");
// }

/* 拷贝缓存区 copy */
// const buf1 = Buffer.from('abcdefghijkl');
// const buf2 = Buffer.from('RUNOOB');

// buf2.copy(buf1,2) // 将buf2 插入到buf1 指定位置上
// console.log(buf1.toString());

/* 缓存区裁剪 slice */
// const buf1 = Buffer.from('runoob');
// const buf2 = buf1.slice(0,2); // 剪切缓存区
// console.log(buf2.toString());
// console.log(buf1.toString());

/* 缓存区长度 */
const buf1 = Buffer.from('www.runoob.com');
console.log(buf1.length);