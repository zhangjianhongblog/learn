const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'[name].[hash].js',
        path:path.resolve(__dirname,'../dist'),
        publicPath:'/'
    },
    plugins:[
        new CleanWebpackPlugin(), // 清除dist
        new HtmlWebpackPlugin({
            title: '国策门户网站',
            template:'./src/index.ejs',
            filename: './index.html',
        }),
        new VueLoaderPlugin(), // 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
        new MiniCssExtractPlugin({
            filename:'static/css/[name].[hash].css',
            chunkFilename:'static/css/[name].[hase].css'
        }),
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192, // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放，这里的单位是bit
                            name:'static/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'static/font/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use:[
                    {
                        loader:"vue-loader",
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test:/\.(less|css)$/,
                use:[
                    devMode?'style-loader':{
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr:devMode
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.html$/,
                use:[
                    'html-loader'
                ]
            }
        ]
    },
    resolve:{
        extensions:['.js','.vue','.json'],
        alias:{
            '@':path.resolve(__dirname,'../src'),
            '@images':path.resolve(__dirname,'../src/libs/images')
        }
    }
}