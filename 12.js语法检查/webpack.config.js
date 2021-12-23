
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
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
             * 语法检查 eslint-loader eslint
             *      注意：只检查自己写的源代码，第三方的库时不用检查的
             *      设置检查规则：
             *          package.json中eslintConfig中设置~
             *              "eslintConfig": {
             *                  extends: "airbnb-base"  
             *              }
             *          airbnb ---> eslint-config-airbnb-base eslint eslint-plugin-import
             */
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         fix: true
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ESLintPlugin({
            extensions: ['js'],
            context: resolve('src'),
            exclude: '/node_modules',
            fix: true
        })
    ],
    mode: 'development'
}