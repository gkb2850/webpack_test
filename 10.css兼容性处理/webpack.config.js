
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve, join } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//设置nodejs的环境变量
process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    //创建style标签，将样式放入
                    //'style-loader',
                    //这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /**
                     * CSS兼容性处理： postcss --> postcss-loader postcss-preset-env
                     * 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                     * "browserslist": {
                          "development": [
                            //开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                          ],
                          "production": [
                            //生产环境：默认是生产环境
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                          ]
                        }
                     */
                    //使用loader的默认配置
                    // 'postcss-loader',
                    //修改loader配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                //postcss的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的文件重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: join(__dirname, 'src')
        },
        port: 3000,
        open: true,
        compress: true
    }
}