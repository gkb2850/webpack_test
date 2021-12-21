
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve, join } = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: '/\.css$/',
                use:['style-loader', 'css-loader']
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
        })
    ],
    mode: 'development',

}