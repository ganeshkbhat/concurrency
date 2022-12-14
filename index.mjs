/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.mjs
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

import { _concurrencyThreads, _concurrencyProcesses, _concurrencyThreadsAsync } from "./index.js";

export { _concurrencyThreads, _concurrencyProcesses, _concurrencyThreadsAsync };
export default _concurrencyProcesses;

