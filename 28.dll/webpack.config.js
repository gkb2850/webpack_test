/**
 * loader: 1.下载 2.使用(配置loader)
 * plugins: 1.下载 2.引入 3.使用
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetWebpackPlugin = require('add-asset-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulid.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        //plugins的配置
        //html-webpack-plugin
        //功能：默认会创建一个空的HTML,引入打包输出的所有资源（js/css）
        //需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            //复制： './src/index.html'文件,并自动引入打包输出的所有资源（js/css）
            template: './src/index.html'
        }),
        //告诉webpack那些库不参与打包，同时使用时的名称也得变~
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        //将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetWebpackPlugin({
            filepaht: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'development'
}