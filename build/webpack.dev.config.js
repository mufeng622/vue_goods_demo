const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpack = require('./webpack.base.config');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

module.exports = merge(baseWebpack, {
    mode: 'development',
    devtool: 'souce-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port: 8088,
        hot: true,
        inline: true,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].scss'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
})
