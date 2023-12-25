const path = require('path');
const packageJson = require('../package.json');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist/umd'),
        filename: 'index.js',
        library: 'exampleTypescriptPackage',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    externals: Object.keys(packageJson.peerDependencies),
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts(x*)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'config/tsconfig.umd.json',
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
};
