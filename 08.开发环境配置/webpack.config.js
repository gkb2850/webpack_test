/**
 * 开发环境配置：能让代码运行起来
 *  运行项目指令：
 *      webpack 会将打包结果输出去
 *      npx webpack-dev-server 只会在内存中编译打包，没有输出
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {   //处理less资源
                test: /\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
            },
            {   //处理css资源
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },
            // {   //处理图片
            //     test: /\.(png|jpg|gif)$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 8 * 1024,
            //         name: '[hash:10].[ext]',
            //         esModule: false,
            //          outputPath: 'imgs'
            //     }
            // },
            {   //处理html中的图片
                test: /\.html$/,
                loader: 'html-loader',
            }
            // {
            //     //处理其他资源
            //     exclude: /\.(html|js|css|less|jpg|png|gif)/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[hash:10].[ext]',
            //         outputPath: 'media'
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        // contentBase: resolve(__dirname, 'build')
        static: {
            directory: join(__dirname, 'src')
        },
        port: 3000,
        compress: true,
        open: true
    }
}