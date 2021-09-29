const webpack = require('webpack');
const { resolve, join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        minify: {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                context: 'node_modules/@webcomponents/webcomponentsjs',
                from: '**/*.js',
                to: 'webcomponents'
            }
        ],
    })
];

module.exports = ({mode}) => {
    return {
        mode,
        devtool: mode === 'development' ? 'source-map' : 'none',
        output: {
            path: join(__dirname, 'dest'),
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                        presets: [
                            ['@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                targets: '>1%, not dead, not ie 11'
                            }]
                        ]
                    }
                }
            ]
        },
        plugins
    }
}