import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: 'inline',
    },
    plugins: [
        nodeResolve({
            moduleDirectories: [
                'node_modules',
                'web_modules'
            ]
        }),
        copy({
            targets: [
                {
                    src: 'src/index.html',
                    dest: 'dist',
                },
                {
                    src: 'src/img',
                    dest: 'dist',
                },
                {
                    src: 'src/styles',
                    dest: 'dist',
                },
                {
                    src: 'src/data',
                    dest: 'dist',
                },
            ],
        }),
        terser({
            mangle: false,
            output: {
                comments: false,
            },
        }),
    ],
};
