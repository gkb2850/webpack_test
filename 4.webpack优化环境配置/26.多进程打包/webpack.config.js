const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WordboxWebpackPLugin = require('workbox-webpack-plugin')
const EsLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require("path");

/**
 * PWA: 渐进式网络开发应用程序(离线可访问)
 * workbox ---> workbox-webpack-plugin
 *  */      

//定义nodejs环境变量: 决定使用browserslist的哪个环境变量
process.env.NODE_ENV = 'production';

//复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        //还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-preset-env')()
                ]
            }
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[chunkhash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                //一下loader只会匹配一个
                //注意：不能有两个配置处理同一种类型文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    /**
                     * 正常来讲一个文件只能被一个loader处理
                     * 当一个文件要被多个loader处理，一定要指定loader执行先后顺序
                     * 先执行eslint在执行babel
                     */
                    {
                        test: /\.js$/,
                        use: [
                            /**
                             * 开启多进程打包
                             * 进程启动大概为600ms，进程通信也有开销。
                             * 只有工作消耗时间比较长，才需要多进程打包
                             */
                            'thread-loader',
                            {
                                exclude: /node_modules/,
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                useBuiltIns: 'usage',
                                                corejs: {
                                                    version: 3,
                                                    targets: {
                                                        chrome: '60',
                                                        firefix: '60'
                                                    }
                                                }
                                            }
                                        ]
                                    ],
                                    //开启babel缓存
                                    //第二次构建时，会读取之前的缓存
                                    cacheDirectory: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs',
                            esModule: false
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.[chunkhash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new EsLintPlugin({
            extensions: ['js'],
            context: resolve('src'),
            exclude: 'node_modules',
            fix: true
        }),
        new WordboxWebpackPLugin.GenerateSW({
            /**
             * 1.帮助serviceworker快速启动
             * 2.删除旧的serviceworker
             * 
             * 生成一个serviceworker配置文件
             */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}