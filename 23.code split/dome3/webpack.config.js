const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

    

//定义nodejs环境变量: 决定使用browserslist的哪个环境变量
process.env.NODE_ENV = 'production';


module.exports = {
    //单入口
    entry: './src/js/index.js',
    //多入口
    // entry: {
    //     index: './src/js/index.js',
    //     test: './src/js/test.js'
    // },
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
    /**
     * 可以将node_modules中代码单独打包一个chunk最终输出
     * 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
     */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}