const path = require('path')
// const resolveCwd = require('resolve-cwd')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        writeToDisk: true,
        hot: true,
        overlay: true,
        open: true
    },
    entry: './app/index',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    externals: [
        nodeExternals()
    ]
}
