module.exports = {
    port: 8000,
    watch: false,
    debug: true,
    nodeResolve: true,
    appIndex: 'index.html',
    rootDir: 'src',
    plugins: [],
    preserveSymlinks: true,
    moduleDirs: ['node_modules'],
    open: true,
    middlewares: [
        function rewriteIndex(context, next) {
            return next();
        },
    ],
};
