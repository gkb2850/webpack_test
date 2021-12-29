const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const EsLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require("path");

/**
 * 缓存：
 *      babel缓存
 *          cacheDirectory: true
 *      文件资源缓存
 *      hash：每次webpack构建时会生成一个唯一的hash值。
 *          问题：因为js和css同时使用同一个hash值。
 *               如果重新打包，会导致所有缓存失效。（可我只改动了一个文件）
 *      chunkhash：根据chunk生成的hash值，如果打包来源同一个chunk,那么hash值就一样
 *          问题：js和css的hash值还是一样的
 *                因为css是在js中被引入的，所以同属一个chunk
 *      contenthah: 根据文件内容生成hash值。不同文件hash值一定不一样
 */         

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
        })
    ],
    mode: 'development',
    devtool: 'inline-source-map'
}