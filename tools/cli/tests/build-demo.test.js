/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const execSync = require('child_process').execSync;
const path = require('path');
const { folderContainsFiles } = require('./test-helpers/utils');
const rimraf = require('rimraf');


const componentFolder = 'create-component-test-folder';
const componentName = 'test-name';
const componentFolderPath = path.resolve(path.join(process.cwd(), componentFolder));
const componentSourcePath = path.join(componentFolderPath, componentName);

describe('Build demo test', () => {
    afterAll(() => {
        rimraf.sync(componentFolderPath);
    });

    test('Builds a demo bundle from source', () => {
        // create a component
        execSync(`node index.js create ${componentName} ./${componentFolder}`, { encoding: 'utf8' });

        // install the component's dependencies
        execSync(`npm link coherent-gameface-components && npm i`, { cwd: componentSourcePath, stdio: 'inherit', encoding: 'utf8' });
        // the demo uses the UMD module of the component so we need to build the component first
        execSync(`node ../../index.js build`, { cwd: componentSourcePath, stdio: 'inherit', encoding: 'utf8' });
        // build the demo
        execSync(`node ../../index.js build:demo`, { cwd: componentSourcePath, stdio: 'inherit', encoding: 'utf8' });
        // check if the demo folder contains the demo JavaScript bundle
        const hasDemoBundle = folderContainsFiles(path.join(componentSourcePath, 'demo'), ['bundle.js']);
        expect(hasDemoBundle).toBe(true);
    });
});
