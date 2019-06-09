const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin  = require('friendly-errors-webpack-plugin');

module.exports = merge(baseConfig,{
    mode:"development",
    devtool:'inline-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),  // 启用模块热替换（HMR）
        new webpack.NamedModulesPlugin(),  // 当开启 HMR 的时候使用该插件会显示模块的相对路径
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo:{
                messages:[
                    'your application is running success'
                ]
            }
        }), // 错误友好提示。如果代码出错了，控制台会显示错误，排版挺好看的
    ]
});