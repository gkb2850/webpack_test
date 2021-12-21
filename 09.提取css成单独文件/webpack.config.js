
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve, join } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    //创建style标签，将样式放入
                    //'style-loader',
                    //这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader']
            },
            {
                test: /\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的文件重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: join(__dirname, 'src')
        },
        port: 3000,
        open: true,
        compress: true
    }
}