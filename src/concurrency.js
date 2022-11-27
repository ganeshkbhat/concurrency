/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: concurrency.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const path = require('path');
const fs = require('fs');


/**
 *
 *
 * @param {*} module_name
 * @return {*} 
 */
 function _getRequireOrImport(module_name) {
    if (process.versions.node.split('.')[0] > "14") {
        return import(module_name);
    }
    return require(module_name);
}

/**
 *
 *
 * @param {*} data
 * @param {*} options
 */
function _concurrencyThreads(filenameOrData, options) {
    const { Worker } = _getRequireOrImport('worker_threads');
    // const worker = new Worker('./worker-threads.js');
    const worker = new Worker(filename);
    if (!data.url) {
        throw new Error("[require-urls] index.js: URL not present in data for fetch.js");
    }

    if (!data.callback) {
        data.callback = function (contents, parentPort) {
            const { get } = (options.protocol === "https") ? require("https") : require("http");
            get(contents.url, (res) => {
                let result = '';
                res.on('data', (chunk) => result += chunk);
                res.on('end', () => {
                    parentPort.postMessage(result);
                });
            }).on('error', (err) => parentPort.postMessage(err));
        }.bind(null, null, null, data, options)
    }

    worker.postMessage({ ...data });
    worker.on('message', function (result) {
        return result;
    });
}

function _concurrencyProcesses(filenameOrData, options) {
    const { fork } = _getRequireOrImport('child_process');
    const child = fork(filenameOrData);

    if (!data.url) {
        // throw new Error("[require-urls] index.js: URL not present in data for fetch.js");
    }

    if (!data.callback) {
        data.callback = function (contents, processFork) {
            const { get } = (options.protocol === "https") ? require("https") : require("http");
            get(contents.url, (res) => {
                let result = '';
                res.on('data', (chunk) => result += chunk);
                res.on('end', () => {
                    processFork.send(result);
                });
            }).on('error', (err) => processFork.send(err));
        }.bind(null, null, null, data, options)
    }

    child.on('message', function (result) {
        return result;
    });
    child.send({ ...data });
}

module.exports._concurrencyThreads = _concurrencyThreads;
module.exports._concurrencyProcesses = _concurrencyProcesses;
