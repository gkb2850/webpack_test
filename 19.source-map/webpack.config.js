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
    },
    devtool: 'source-map'
}


/**
 * source-map: 一种提供源代码到构建后代码映射技术，（如果构建代码出错了，通过映射可以追踪源代码错误）
 * [inline-|hidden|eval][nosources][cheap-[module-]]source-map
 * 
 * source-map: 外部
 *  错误代码准确信息和源代码的错误信息
 * inline-source-map: 内联
 *  1.只生成一个内联source-map
 *  错误代码准确信息和源代码的错误信息
 * hidden-source-map：外部
 *  错误代码原因，但没有错误位置
 *  不能追踪源代码错误，只能提示到构建后代码的错误位置
 * eval-source-map：内联
 *  每个文件都生成队形的source-map，都在eval
 *  错误代码准确信息和源代码的错误位置
 * 
 * nosources-source-map: 外部
 *  错误代码准确信息，但没有任何源代码信息
 * 
 * cheap-source-map: 外部
 *  错误代码准确信息 和源代码的错误位置
 *  只能准确到行
 * cheap-module-source-map: 外部
 *  错误代码准确信息 和源代码的错误位置
 *  module会将loader的source-map加入
 * 
 * 内联和外部的区别：
 *  1.外部生成了文件，内联没有
 *  2.内联构建速度更快
 * 
 * 
 * 开发环境： 速度快，调试更友好
 *  速度快（eval>inline>cheap....）
 *      eval-cheap-source-map
 *      eval-source-map
 *  调试更友好
 *      source-map
 *      cheap-module-source-map
 *      cheap-source-map
 * 生产环境：源代码要不要隐藏？调试要不要友好
 *  内联会让体积变大，所以在生产环境不用内联
 *  nosource-source-map
 *  inline-source-map
 */