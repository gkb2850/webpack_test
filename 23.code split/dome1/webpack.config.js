const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

    

//定义nodejs环境变量: 决定使用browserslist的哪个环境变量
process.env.NODE_ENV = 'production';


module.exports = {
    //单入口
    entry: './src/js/index.js',
    //多入口： 有一个入口，最终输出就有一个bundle
    entry: {
        main: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        filename: 'js/[name].[chunkhash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production'
}