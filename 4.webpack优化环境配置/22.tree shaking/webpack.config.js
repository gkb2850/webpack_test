const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const EsLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require("path");

/**
 * tree shaking: 去除无用代码
 *      前提：1.必须使用es6模块化 2.开启production环境
 *      作用：减少代码体积
 *      在package.json中配置
 *          "sideEffects": false 所有代码都没有副作用(都可以进行tree shaking)
 *             问题：可能会把css / @babel/polyfill（副作用）文件干掉
 *                  sideEffects: ["*.css"]
 * */       

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
    mode: 'production',
    devtool: 'source-map'
}