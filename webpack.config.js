const path = require('path');
const hwp = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/client/app.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new hwp({template: path.join(__dirname, '/client/index.html')})
    ]
}