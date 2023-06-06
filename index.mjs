/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: index.mjs
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

import {
    _concurrencyThreads,
    _concurrencyProcesses,
    _concurrencyThreadsAsync,
    _concurrencyClusters,
    concurrencyThreads,
    concurrencyProcesses,
    concurrencyClusters,
    concurrencyThreadsAsync,
    concurrencyMultipleThreads,

    loadbalancer, serverutils, algorithms,
    sockets, certificates, default as concurrencyjs
} from "./index.js";

const concurrency = {
    threads: _concurrencyThreads,
    processes: _concurrencyProcesses,
    clusters: _concurrencyClusters,
    threadsAsync: _concurrencyThreadsAsync,
    multipleThreads: _concurrencyMultipleThreads,
};

const loadbalancer = {
    loadbalancer: loadbalancerjs.loadbalancer,
    serverutils: loadbalancerjs.serverutils,
    algorithms: loadbalancerjs.algorithms,
    sockets: loadbalancerjs.sockets,
    certificates: loadbalancerjs.certificates,
    default: loadbalancerjs.default
};

export {
    _concurrencyThreads,
    _concurrencyProcesses,
    _concurrencyClusters,
    _concurrencyThreadsAsync,
    _concurrencyMultipleThreads,

    concurrencyThreads,
    concurrencyProcesses,
    concurrencyClusters,
    concurrencyThreadsAsync,
    concurrencyMultipleThreads,

    concurrency,
    loadbalancer
};
export default concurrencyjs;
