
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            //打包其他资源（除了html/js/css资源以为的资源）
            // {   //排除css/js/html资源
            //     exclude: /\.(css|js|html)$/,
            //     loader: 'file-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    //开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器， 自动刷新浏览器）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为：npx webpack-dev-server
    devServer: {
        //项目构建后的路径
        // contentBase: resolve(__dirname, 'build'),
        static: {
          directory: path.join(__dirname, 'src'),
        },
        //启动gzip压缩
        compress: true,
        port: 3000,
        open: true
    }
}