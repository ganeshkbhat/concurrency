/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.threads.multiple.process.runner.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
let { _concurrencyMultipleThreads, _concurrencyClusters } = require("../index.js");


_concurrencyMultipleThreads(__filename, 5, {
    data: {
        url: "https://www.google.com",
        message: "Testing data"
    },
    childData: "Testing child data",
    handlers: {
        childThreadExecute: () => {
            console.log("Testing Threads process runner");
        }
    }
}, false, false).then((d) => console.log("Data fetched: ", JSON.stringify(d)))
    .catch((e) => { console.log("Error ", JSON.stringify(e));  /* setTimeout(() => { process.exit(e); }, 5000) */ })

