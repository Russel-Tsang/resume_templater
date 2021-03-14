var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@constants': path.resolve(__dirname, 'src/constants/constants.js'),
            '@util': path.resolve(__dirname, 'src/util/'),
            extensions: 'js'
        }
    }
}