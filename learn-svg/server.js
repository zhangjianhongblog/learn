const http = require('http');
const fs = require('fs');

let server = http.createServer((request, response) => {
    const file_name = './www' + request.url;
    fs.readFile(file_name, (err, data) => {
        if (err) {
            response.write('404');
        } else {
            response.write(data);
        }
        response.end();
    })
});

server.listen(8888, () => {
    console.log('server is running at 8888')
})