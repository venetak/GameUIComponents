/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');
const rollup = require('rollup');
const terser = require('rollup-plugin-terser').terser;
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const html = require('rollup-plugin-html');

// The module formats which will be bundled
const FORMATS = [
    'cjs',
    'umd'
];

// The target environments
const ENVIRONMENTS = [
    'prod',
    'dev'
];

/**
 * Creates an object of output options for rollup.
 * @param {string} directory - the component's folder.
 * @param {string} format - the module type to which to bundle.
 * @param {string} moduleName - the name of the bundle.
 * @param {boolean} isProd - if true, the code will be minified.
 * @returns {object} - OutputParams object.
*/
function generateOutputOptions(directory, format = 'umd', moduleName, isProd = false) {
    const suffix = isProd ? '.production.min' : '.development';

    const outputOptions = {
        format: format,
        dir: path.join(directory, format),
        entryFileNames: `${moduleName}${suffix}.js`,
        globals: {
            'coherent-gameface-components': 'components',
        },
        exports: 'auto',
    };

    // When bundling for umd we need to specify a name for
    // the global variable that will be exported.
    if (format === 'umd') outputOptions.name = moduleName;
    // terser is a rollup plugin that minifies the code
    if (isProd) outputOptions.plugins = [terser()];

    return outputOptions;
}

/**
 * Creates bundles for given list of formats and environments.
 * @param {string} moduleName - the root name of the bundle.
 * @param {object} inputOptions - rollup input options.
 * @param {Array<string>} formats - the module types for which to bundle(UMD, CJS).
 * @param {Array<string>} environments - the environments for which to bundle(prod, dev).
*/
function buildForTargets(moduleName, inputOptions, formats, environments) {
    for (const format of formats) {
        for (const environment of environments) {
            createBundle(inputOptions, generateOutputOptions(
                path.dirname(inputOptions.input),
                format,
                moduleName,
                environment === 'prod'
            ));
        }
    }
}

/**
 * Calls buildForTargets for all components and passes all environments
 * and formats as targets. Builds the components library first.
 * @param {boolean} watch
*/
function build(watch) {
    const inputOptions = {
        preserveSymlinks: true,
        input: path.resolve('./script.js'),
        external: ['coherent-gameface-components'],
        plugins: [
            nodeResolve(),
            html()
        ],
    };

    buildForTargets(path.basename(process.cwd()), inputOptions, FORMATS, ENVIRONMENTS);

    if (watch) {
        const watcher = rollup.watch({
            ...inputOptions,
            watch: {
                buildDelay: 800,
            },
        });

        console.log(`coherent-guic-cli is watching for file changes...`);

        watcher.on('change', () => {
            console.log(`Rebuilding...`);
            buildForTargets(path.basename(process.cwd()), inputOptions, FORMATS, ENVIRONMENTS);
            console.log(`Changes saved!`);
        });
        return;
    }
    console.log(`Build finished. \n Created bundle for ${inputOptions.input}`);
}

/**
 * Invokes the rollup JS API to create and write a bundle.
 * See https://rollupjs.org/guide/en/#rolluprollup.
 * @param {rollup.RollupOptions} inputOptions
 * @param {rollup.OutputOptions} outputOptions
 * @returns {Promise<rollup.RollupBuild>}
*/
function createBundle(inputOptions, outputOptions) {
    // create a bundle
    return rollup.rollup(inputOptions).then((bundle) => {
        // and write the bundle to disk
        return bundle.write(outputOptions);
    }).catch(err => console.error(err));
}

exports.command = 'build [--watch]';
exports.desc = 'start the server';
exports.builder = {
    '--watch': {
        desc: 'Watch for changes in the source files and rebuild.',
    },
};
exports.handler = function (argv) {
    build(argv.watch);
};
