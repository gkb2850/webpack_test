
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
             * 
             */
            {
                loader: 'babel-loader',
                exclude:/node_modules/,
                options: {
                    //预设：指示babel做怎样的兼容性处理
                    presets: ['@babel/preset-env']
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