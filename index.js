/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
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
const { _concurrencyMultipleThreads } = require("./src/worker.threads.multiple");
const loadbalancerjs = require("./src/worker.loadbalancer.js");

module.exports._concurrencyThreads = _concurrencyThreads;
module.exports._concurrencyProcesses = _concurrencyProcesses;
module.exports._concurrencyClusters = _concurrencyClusters;
module.exports._concurrencyThreadsAsync = _concurrencyThreadsAsync;
module.exports._concurrencyMultipleThreads = _concurrencyMultipleThreads;

module.exports.concurrencyThreads = _concurrencyThreads;
module.exports.concurrencyProcesses = _concurrencyProcesses;
module.exports.concurrencyClusters = _concurrencyClusters;
module.exports.concurrencyThreadsAsync = _concurrencyThreadsAsync;
module.exports.concurrencyMultipleThreads = _concurrencyMultipleThreads;

module.exports.loadbalancer = {
    loadbalancer: loadbalancerjs.loadbalancer,
    serverutils: loadbalancerjs.serverutils,
    algorithms: loadbalancerjs.algorithms,
    sockets: loadbalancerjs.sockets,
    certificates: loadbalancerjs.certificates,
    default: loadbalancerjs.default
};

module.exports.concurrency = {
    threads: _concurrencyThreads,
    processes: _concurrencyProcesses,
    clusters: _concurrencyClusters,
    threadsAsync: _concurrencyThreadsAsync,
    multipleThreads: _concurrencyMultipleThreads,
}


module.exports.default = {
    _concurrencyThreads,
    _concurrencyProcesses,
    _concurrencyClusters,
    _concurrencyThreadsAsync,
    _concurrencyMultipleThreads,

    concurrencyThreads: _concurrencyThreads,
    concurrencyProcesses: _concurrencyProcesses,
    concurrencyClusters: _concurrencyClusters,
    concurrencyThreadsAsync: _concurrencyThreadsAsync,
    concurrencyMultipleThreads: _concurrencyMultipleThreads,

    concurrency: {
        threads: _concurrencyThreads,
        processes: _concurrencyProcesses,
        clusters: _concurrencyClusters,
        threadsAsync: _concurrencyThreadsAsync,
        multipleThreads: _concurrencyMultipleThreads,
    },
    loadbalancer: {
        ...loadbalancerjs
    }
};
