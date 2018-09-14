// function say(word) {
//     console.log(word);
// }

// function execute(someFunction,value) {
//     someFunction(value);
// }

// execute(say,'zhangjainhong');


// function execute(someFunction,value) {
//     someFunction(value);
// }

// execute(function (word) {
//     console.log(word)
// },'你是谁')


var http = require('http');
http.createServer(function (requset, response) {
    response.writeHead(200,{
        "Content-Type":"text/plain"
    });
    response.write("hello World")
    response.end();
}).listen(9999);
