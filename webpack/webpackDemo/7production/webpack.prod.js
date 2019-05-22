const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


module.exports = merge(common,{
    devtool:'source-map',
    plugins:[
        new UglifyJsWebpackPlugin({
            sourceMap:true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        })
    ]
})