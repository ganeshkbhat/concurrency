/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.threads.multiple.expressapp.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
let { _concurrencyMultipleThreads } = require("../index.js");


_concurrencyMultipleThreads(__filename, 2, {
    data: {
        url: "https://www.google.com",
        message: "Testing data"
    },
    childData: "Testing child data",
    handlers: {
        childThreadExecute: () => {
            require("C:\\Users\\GB\\Documents\\projects\\allprojects\\require-urls\\concurrency\\demos\\express-app.js")
        }
    }
}, false, false).then((d) => console.log("Data fetched: ", JSON.stringify(d)))
    .catch((e) => { console.log("Error ", JSON.stringify(e));  /* setTimeout(() => { process.exit(e); }, 5000) */ })

