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


module.exports._concurrencyThreads = _concurrencyThreads;
module.exports._concurrencyProcesses = _concurrencyProcesses;
module.exports._concurrencyClusters = _concurrencyClusters;
