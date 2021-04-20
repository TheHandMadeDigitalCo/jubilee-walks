module.exports = {
    port: 8000,
    watch: false,
    debug: true,
    nodeResolve: true,
    appIndex: 'index.html',
    rootDir: 'src',
    plugins: [],
    preserveSymlinks: true,
    open: true,
    middlewares: [
        function rewriteIndex(context, next) {
            return next();
        },
    ],
};
