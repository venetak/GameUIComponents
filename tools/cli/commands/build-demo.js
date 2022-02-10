/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const yargs = require('yargs/yargs');
const path = require('path');
const Webpack = require('webpack');
const { NoEmitOnErrorsPlugin } = require('webpack');
const { start } = require('repl');

/**
 * Builds the demo of the component.
*/


function buildDemo(dev = false) {
    const pathToDemo = path.resolve(path.join(process.cwd(), 'demo'));

    Webpack({
        mode: dev ? 'development': 'production',
        entry: path.join(pathToDemo, 'demo.js'),
        devtool: false,
        resolve: {
            symlinks: true,
        },
        output: {
            path: pathToDemo,
            filename: "bundle.js"
        }
    }, (err, stats) => { // Stats Object
        if (err) {
            console.error(err);
        }
        if(stats.hasErrors()) {
            console.error(stats.compilation.getErrors().join('\n'));
        }
    });
}

exports.command = 'build:demo [--dev]';
exports.desc = 'Create a production bundle of the demo.';
exports.builder = {
    '--dev': {
        desc: 'Create a development non minified bundle.',
    }
};
exports.handler = function (argv) {
    buildDemo(argv.dev);
}