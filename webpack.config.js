const path = require('path');
module.exports = {
    entry: {
        script: './src/script.ts',
        misc: './src/misc.ts',
        pathfinding: './src/pathfinding.ts',
        gameRenderer: './src/gameRenderer.ts',
        types: './src/types/types.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    watch: true
}