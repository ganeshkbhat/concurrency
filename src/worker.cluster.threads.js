/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: worker.cluster.threads.js
 * File Description: 
 *
 * [IN PROGRESS]: Raised feature request for Cluster Threads in Node.js
 *   Clustering of threads, basically similar to clustered thread pools with features same as Cluster module.
 *   https://github.com/nodejs/node/issues/48350
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
const fs = require("fs");

