const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩js代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseConfig,{
    mode:'production',
    optimization:{
        // 分离 chunks (分离不常变化的文件如 node_modules 下引用的库)
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                vendor:{
                    name:"vendor",
                    test:/[\\/]node_modules[\\/]/,
                    priority:10,
                    chunks:"initial"
                }
            }
        }
    },
    plugins:[
        // 压缩JS
        new UglifyJsPlugin({
            uglifyOptions:{
                compress:{
                    drop_debugger: true, // 去除debugger
                    drop_console: true // 去除console.log
                }
            },
            cache:true, // 开启缓存
            parallel:true, //平行压缩
            sourceMap:false  // set to true if you want JS source maps
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin() // 多次构建代码的时候，如何做处理好缓存
    ]
})