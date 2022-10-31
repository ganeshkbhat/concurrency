/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const { parentPort } = require("worker_threads");

parentPort.on("message", function (contents) {
    return contents.callback(contents, parentPort);
}.bind(contents, parentPort));
