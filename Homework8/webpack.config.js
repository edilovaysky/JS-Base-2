module.exports = {
    entry: './myScr',
    output: {
        filename: './buid.js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
};