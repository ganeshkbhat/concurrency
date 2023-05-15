/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.threads.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
let { _concurrencyThreads } = require("../index.js");

// _concurrencyThreads(path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.threads.js"), { data: { url: "https://www.google.com", message: "Testing data" } });


_concurrencyThreads(__filename, {
    data: {
        url: "https://www.google.com",
        message: "Testing data"
    },
    childData: "Testing child data"
}, true).then((d) => console.log("Data fetched: ", JSON.stringify(d)))
    .catch((e) => { console.log("Error ", JSON.stringify(e)); setTimeout(() => { process.exit(e); }, 5000) })

// setTimeout(() => {
//     console.log(`demo.threads.js: Closing process ${process.pid}: Timeout 1: 20000 `, __filename);
//     process.exit(0);
// }, 20000);

setTimeout(() => console.log(`demo.threads.js: Run file PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
setTimeout(() => console.log(`demo.threads.js: Closing process ${process.pid}: Timeout 1: 10000 `, process.exit()), 20000);

