const http = require('http');

const server = http.createServer(function (requset,response) {
    // 发送 HTTP 头部
    // HTTP 状态值：200：ok
    // 内容类型：text/plain
    response.writeHead(200,{
        "Content-Type":'text/plain'
    });

    // 发送响应数据"Hello world"
    response.end("Hello world\n");
});

server.listen(8888,function () {
    console.log('Server running at http://127.0.0.1:8888/')
});