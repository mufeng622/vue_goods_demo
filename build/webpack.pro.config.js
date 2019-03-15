const path = require('path');
const webpack = require('webpack');
const baseWebpack = require('./webpack.base.config');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifujs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtracePlugin = require('mini-css-extrace-plugin');

module.exports = merge(baseWebpack, {
    mode: 'production',
    plugins: [
        new MiniCssExtracePlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[name].[hash:8].scss'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin()
        ]
    }
})

