
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /**
             * js兼容性处理： babel-loader @babel/core @babel/preset-env
             *  1.基本js兼容性处理 ---> @babel/preset-env
             *      问题：只能转换一些基本语法，如promise无法转换
             *  2.全部js兼容性处理 ---> @babel/polyfill
             *      问题：我只要解决部分兼容性问题，但会将所有兼容性代码全部引入，体积太大了~
             *  3.需要做兼容性处理的就做：按需加载 ---> core-js
             * 
             */
            {   test: /\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/,
                options: {
                    //预设：指示babel做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {   //按需下载
                                useBuiltIns: 'usage',
                                //指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}