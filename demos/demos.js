/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


let { _concurrencyThreads, _concurrencyProcesses, _concurrencyClusters, _concurrencyThreadsAsync } = require("../index.js");
let { concurrencyThreads, concurrencyProcesses, concurrencyClusters, concurrencyThreadsAsync } = require("../index.js");
let { concurrency, loadbalancer } = require("../index.js");


console.log(_concurrencyThreads, _concurrencyProcesses, _concurrencyClusters, _concurrencyThreadsAsync);
console.log(concurrencyThreads, concurrencyProcesses, concurrencyClusters, concurrencyThreadsAsync);
console.log(concurrency, loadbalancer);

