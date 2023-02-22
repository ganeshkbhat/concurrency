/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const { _concurrencyThreads } = require("./src/worker.threads.js");
const { _concurrencyProcesses } = require("./src/worker.process.js");
const { _concurrencyClusters } = require("./src/worker.cluster.js");
const { _concurrencyThreadsAsync } = require("./src/worker.thread.async.js");


module.exports._concurrencyThreads = _concurrencyThreads;
module.exports._concurrencyProcesses = _concurrencyProcesses;
module.exports._concurrencyClusters = _concurrencyClusters;
module.exports._concurrencyThreadsAsync = _concurrencyThreadsAsync;

module.exports.concurrencyThreads = _concurrencyThreads;
module.exports.concurrencyProcesses = _concurrencyProcesses;
module.exports.concurrencyClusters = _concurrencyClusters;
module.exports.concurrencyThreadsAsync = _concurrencyThreadsAsync;

module.exports.default = {
    _concurrencyThreads,
    _concurrencyProcesses,
    _concurrencyClusters,
    _concurrencyThreadsAsync,

    concurrencyThreads: _concurrencyThreads,
    concurrencyProcesses: _concurrencyProcesses,
    concurrencyClusters: _concurrencyClusters,
    concurrencyThreadsAsync: _concurrencyThreadsAsync
    
};
