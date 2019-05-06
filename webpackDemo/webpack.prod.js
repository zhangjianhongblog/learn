const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UnlifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common,{
    devtool:"source-map",
    plugins:[
        new UnlifyjsWebpackPlugin({
            sourceMap:true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        })
    ]
})