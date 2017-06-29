var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');

let isProd = process.env.NODE_ENV === 'production';
const cssDev = [
                    'style-loader?convertToAbsoluteUrls',
                    'css-loader?sourceMap=true',
                    'postcss-loader?sourceMap=true',
                    'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
               ];
const cssProd = ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                                outputStyle: 'expanded',
                                sourceMapContents: false,
                            }
                        },
                    ],
                    publicPath: ''
                });

let cssConfig = isProd ? cssProd : cssDev;
module.exports = {
    entry: './app/index.js',
    // devtool: 'inline-source-map',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.scss$/, 
                use: cssConfig
            },
            {
                test: /\.css$/, 
                use: ['css-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(gif|jpe?g|png|svg)(\?.*)?$/,
                use: [
                    'file-loader?name=images/[hash].[ext]',
                    {
                    loader: 'image-webpack-loader',
                    options: {}
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            hash: true
        }),
        new ExtractTextPlugin({
            filename: 'index.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}
