const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output:{
        filename:'[name].bundle.js',
        chunkFilename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"lazyLoading"
        })
    ],
    // optimization:{
    //     splitChunks:{
    //         cacheGroups:{
    //             commons:{
    //                 name:"commons",
    //                 chunks:"initial",
    //                 minChunks:2
    //             }
    //         }
    //     }
    // }
};