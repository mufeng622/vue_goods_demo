const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        index: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist/', config.version),
        publicPath: '/',
        filename: process.env.NODE_ENV === 'production' ? 'js/[name].[hash:8].js' : 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [require('postcss-cssnext')()]
                }
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ['vue-style-loader', 'style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    outputPath: 'images/',
                    name: '[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|otf|woff|eto|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            chunks: ['index']
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: './static/',
            ignore: ['.*']
        }]),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '..'),
            verbose: true
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, '..', 'src/')
        }
    }
}
