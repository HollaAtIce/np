/* eslint env: node */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: '../css/[name].css',
    // disable: process.env.NODE_ENV === 'development'
})

module.exports = {
    entry: path.resolve(__dirname, './js/index.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build/js')
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['build'] }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'index.html'
        }), 
        extractSass
    ],
    resolve: {
        alias: {
            // rt: path.resolve(__dirname, 'public')
        }
    },
    module: {
        rules: [
            // preloaders
            {
                enforce: 'pre',
                test: /\.scss/,
                loader: 'import-glob-loader'
            },

            // loaders
            {
                test: /\.js$/,
                exclude: /(node_modules|public\/libs)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['latest', 'react']
                    }

                }]
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: ['css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, './node_modules')]
                            }
                        }
                    ]
                })
            }, {
                test: /\.woff[2]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    }

}
