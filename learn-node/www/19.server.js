var http = require('http');
var url = require('url');

function start(route) {
    function onRequset(requset, response) {
        var pathname = url.parse(requset.url).pathname;
        console.log('Request for' + pathname + ' received.');
        
        route(pathname);

        response.writeHead(200,{
            "Content-Type":"text/plain"
        });
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequset).listen(8888);
    console.log('Server has started.');
}

exports.start = start;