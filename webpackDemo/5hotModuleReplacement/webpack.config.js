const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        app:'./src/index.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
        publicPath:"/"
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        hot:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"hot module replacement"
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};