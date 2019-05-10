const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        main:'./src/index.js',
        vendor:[
            'lodash'
        ]
    },
    output:{
        filename:'[name].[chunkhash].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"caching"
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendor:{
                    name:'vendor',
                    minChunks:1000
                }
            }
        }
    }
};