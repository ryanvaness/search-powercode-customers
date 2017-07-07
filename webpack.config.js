const LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
    entry: [
        `${__dirname}/index.js`
    ],
    output: {
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.s?css$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};