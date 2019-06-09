const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const os = require('os');

const config = require('./webpack.dev.config.js');
const options = {
    contentBase: path.resolve(__dirname,'../dist'),
    host: "localhost",
    hot: true,
    open: true,
    compress: true,
    proxy:{} // 代理
}
webpackDevServer.addDevServerEntrypoints(config,options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler,options);

server.listen(9999,'localhost',() => {
    console.log('dev server listening on port 9999')
})

compiler.hooks.done.tap("done",(stats) => {
    var cmd = os.platform() === "win32" ? 'explorer' : 'open';
    require('child_process').exec(`${cmd} "http://localhost:9999"`);
})
