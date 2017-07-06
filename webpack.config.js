var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.php',
    filename: 'index.php',
    inject: 'body'
});
var LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new LiveReloadPlugin()
    ]
};