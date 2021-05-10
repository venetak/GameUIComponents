/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const terser = require('rollup-plugin-terser').terser;
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const html = require('rollup-plugin-html');
const styles = require("rollup-plugin-styles");
const buildCssComponents = require('./build-style-component');

const { execSync } = require('child_process');
// The module formats which will be bundled
const FORMATS = [
    'cjs',
    'umd',
];

// The target environments
const ENVIRONMENTS = [
    'prod',
    'dev'
];

/**
 * Get all folder names within the components folder.
 * @returns {Array<string>}
*/
function getComponentDirectories() {
    return fs.readdirSync(path.join(__dirname, '../components'), { withFileTypes: false });
}

/**
 * Creates an object of output options for rollup.
 * @param {string} directory - the component's folder.
 * @param {string} format - the module type to which to bundle.
 * @param {string} moduleName - the name of the bundle.
 * @param {boolean} isProd - if true, the code will be minified.
 * @returns {object} - OutputParams object.
*/
function generateOutputOptions(directory, format = 'umd', moduleName, isProd = false,) {
    const suffix = isProd ? '.production.min' : '.development';

    const outputOptions = {
        format: format,
        dir: path.join(directory, format),
        entryFileNames: `${moduleName}${suffix}.js`,
        globals: {
            'coherent-gameface-components': 'components'
        },
        exports: 'auto'
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
 * @param {string} path - the path to either the library or a component.
*/
async function buildAndPackage(moduleName, inputOptions, formats, environments, libPath) {
    for (let format of formats) {
        for (let environment of environments) {
            await createBundle(inputOptions, generateOutputOptions(
                path.dirname(inputOptions.input),
                format,
                moduleName,
                environment === 'prod' ? true : false
            ));
        }
    }

    // npm pack must run after createBundle has finished, otherwise the rollup
    // bundling will not be ready yet and not everything will be packed.
    execSync('npm pack', { cwd: libPath });
}

/**
 * Calls buildAndPackage for all components and passes all environments
 * and formats as targets. Builds the components library first.
*/
async function buildEverything() {
    buildComponentsLibrary();
    let components = getComponentDirectories();
    const ordered = ['slider', 'scrollable-container', 'dropdown'];

    // get only the elements that are not included in the ordered list
    components = components.filter(el => !ordered.includes(el));
    // add the ['scrollable-container', 'dropdown'] in the order they should be build
    components = [...components, ...ordered];

    for (let component of components) {
        const componentPath = path.join(__dirname, '../components', component);

        if (!fs.existsSync(componentPath)) continue;

        try {
            execSync('npm i', { cwd: componentPath });
        } catch (err) {
            console.error(err)
        }``

        if (!fs.existsSync(path.join(componentPath, 'script.js'))) {
            buildCssComponents(componentPath);
            continue;
        }

        const inputOptions = {
            input: path.join(componentPath, 'script.js'),
            external: ['coherent-gameface-components'],
            plugins: [
                nodeResolve(),
                html(),
                styles({
                    // add this to prevent automatic style injection
                    // this function will be executed instead of the default
                    // inject which adds style tags to the head
                    mode: ["inject", (varname, id) => {}],
                })
            ],
        };

        await buildAndPackage(component, inputOptions, FORMATS, ENVIRONMENTS, componentPath);
    }
}


function buildComponentsLibrary() {
    const libPath = path.join(__dirname, '../lib');

    const inputOptions = {
        input: path.join(libPath, 'components.js')
    };

    buildAndPackage('components', inputOptions, FORMATS, ENVIRONMENTS, libPath);
}

/**
 * Invokes the rollup JS API to create and write a bundle.
 * See https://rollupjs.org/guide/en/#rolluprollup.
*/
function createBundle(inputOptions, outputOptions) {
    // create a bundle
    return rollup.rollup(inputOptions).then(bundle => {
        // and write the bundle to disk
        return bundle.write(outputOptions);
    }).catch(err => console.error(err));
}

function main() {
    const arguments = process.argv.slice(2);

    if(arguments.indexOf('--library') > -1) {
        buildComponentsLibrary();
    } else {
        buildEverything();
    }
}

main();
