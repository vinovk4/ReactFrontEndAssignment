const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
            { test: /.css$/, loader: "css-loader" },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
           template: './index.html'
        })
     ]
}