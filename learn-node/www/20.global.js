// __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

// console.log(__filename);

// __dirname 表示当前执行脚本所在的目录。

// console.log(__dirname);

// setTimeout(cb, ms)
// setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
//返回一个代表定时器的句柄值。

// let timer = setTimeout(function () {
    // console.log("Hello World");
// },2000);

// clearTimeout(t)
// clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 参数 t 是通过 setTimeout() 函数创建的定时器。

// clearTimeout(timer);

// setInterval(cb, ms)
// setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。


process.on('exit',function (code){
    // 以下代码永远不会执行
    setTimeout(function () {
        console.log('该代码不会执行')
    },0)

    console.log('退出码为： ' + code);
})
console.log('程序执行结束');