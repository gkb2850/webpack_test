const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

/**
 * entry: 入口起点
 *  1.string ---> './src/index.js'
 *      打包形成一个chunk. 输出一个bundle文件
 *      此时chunk的名称默认是main
 *  2.array ['./src/index.js', './src/add.js']
 *      多入口
 *      所有文件最终会形成一个chunk，输出出去只有一个bundle文件。
 *      --> 只有在HMR功能中让html热更新生效~
 *  3.object
 *      有几个入口文件就形成几个chunk,输出几个bundle文件
 *      此时chunk的名称就是key
 * 
 *  --> 特殊用法
 *      {
 *          index: ['./src/index.js', './src/add.js'],
 *          count: './src/count.js'
 *      }
 */

module.exports = {
    entry: { index: './src/index.js', 
             add: './src/add.js'
        },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}