const fs = require('fs');

// fs.unlink('./tmp/hello',(err) => {
//     if (err) {
//         console.log(err);
//         return;
//     };
//     console.log('成功删除 /tmp/hello');
// })

// try {
//     fs.unlinkSync('/tmp/hello');
//     console.log('successfully deleted /tmp/hello');
// } catch(e) {
//     console.log(e);
// }

// fs.rename('./tmp/hello','./tmp/world',(err) => {
//     if (err) throw err;
//     console.log('重命名完成');
// });
// fs.stat('./tmp/world',(err,state) =>{
//     if (err) throw err;
//     console.log(`文件属性：${JSON.stringify(state)}`);
// })

// fs.rename('./tmp/hello','./tmp/world',err=>{
//     if (err) throw err;
//     fs.stat('./tmp/world',(err,state) => {
//         if (err) throw err;
//         console.log(`文件属性: ${state.dev}`);
//     })
// })


// fs.open('/waiyan/waiyan.txt','r',(err, fd) => {
//     if (err) throw err;
//     console.log(fd);
//     fs.close(fd,err=>{
//         if (err) throw err;
//     });
// });

// fs.open('os_1.js','r',(err,fd) =>{
//     if (err) throw err;
//     fs.close(fd,err=>{
//         if (err) throw err;
//     })
// })

fs.open(Buffer.from('/waiyan/waiyan.txt'),'r',(err, fd) => {
    if (err) throw err;
    fs.close(fd, err => {
        if (err) throw err;
    });
});