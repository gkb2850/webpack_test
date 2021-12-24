/**
 * HMR: hot module replacement 热模块替换/模块替换
 * 作用：一个模块发生变化，只会重新打包这个模块（而不是打包所有模块）
 *  极大提升构建速度
 * 
 *  样式文件：可以使用HMR功能：因为style-loader内部实现了~
 *  js文件：默认不使用HMR功能 --->需要修改js代码，添加支持HMR功能的代码 
 *      注意：HMR功能对js的处理，只能处理非入口文件的其他文件
 *  html文件：默认不使用HMR功能，同时会导致问题：html文件不能热更新了~(不需要做HMR功能)
 *  解决问题：修改entry入口，将html文件引入
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {   //处理css资源
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },
            {   //处理less资源
                test: /\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
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
            directory: join(__dirname, 'build')
        },
        port: 3000,
        compress: true,
        open: true,
        hot: true
        //开启HMR功能
    }
}