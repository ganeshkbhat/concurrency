/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: demo.processes.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const path = require("path");
let { _concurrencyProcesses } = require("../index.js");


_concurrencyProcesses(
    path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js"), {
    data: { message: "Testing data", url: "https://www.google.com" }
}, true).then((d) => { console.log("Data fetched: ", JSON.stringify(d)); })
    .catch((e) => { console.log(e.toString()); setTimeout(() => { process.exit(e); }, 5000) })

setTimeout(() => console.log(`demo.processes.js: Run file PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
setTimeout(() => console.log(`demo.processes.js: Closing process ${process.pid}: Timeout 1: 10000 `, process.exit()), 20000);

