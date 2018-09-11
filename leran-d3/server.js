const http = require("http");
const fs = require('fs');

let server = http.createServer(function (request, response) {
    let file_name = './www' + request.url;
    fs.readFile(file_name, function (err, data) {
        if (err) {
            response.write('404');
        } else {
            response.write(data);
        }
        response.end();
    });
});

server.listen(8888,function () {
    console.log('http is listening at 8888');
});