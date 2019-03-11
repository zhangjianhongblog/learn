let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: __dirname + '/app/main.js', // 已多次提及的唯一入口文件
    output: {
        path: __dirname + '/build', // 打包后的文件存放的地方
        filename:"bundle-[hash].js" // 打包后输出文件的文件名 
    },
    devtool:'null', // 注意修改这里,这能大大压缩我们的打包代码
    devServer:{
        contentBase:'./build',// 本地服务器所加载的页面所在的目录
        port:'8888', // 设置默认监听端口，如果忽略，默认为'8080'
        inline:true, // 设置为true,当原文件改变时，会自动刷新页面
        historyApiFallback:true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot:true
    },
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use: {
                    loader:"babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader',
                        options:{
                            modules: true, // 指定启用css modules
                            localIdentName:'[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader:'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template:__dirname + "/app/index.tmpl.html"   // new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('style.css'),
        new CleanWebpackPlugin('build/*.*',{
            root:__dirname,
            verbase:true,
            dry:false
        })
    ]
}