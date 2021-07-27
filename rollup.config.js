import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const toFolder = 'docs';

export default {
    input: 'src/index.js',
    output: {
        file: `${toFolder}/bundle.js`,
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
                    src: 'src/map.html',
                    dest: toFolder,
                },
                {
                    src: 'src/index.html',
                    dest: toFolder,
                },
                {
                    src: 'src/img',
                    dest: toFolder,
                },
                {
                    src: 'src/css',
                    dest: toFolder,
                },
                {
                    src: 'src/data',
                    dest: toFolder,
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
