/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.cluster.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
let { _concurrencyClusters } = require("../index.js");


// console.log(_concurrencyClusters(
//     path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js"),
//     8,
//     { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
// ).then((d) => {
//     console.log("Data fetched", JSON.stringify(d));
// }).catch((e) => {
//     console.log(e.toString());
// }))




// async function concurrency() {
//     let result = await _concurrencyClusters(
//         path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
//         8,
//         { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
//     )
//     console.log(result);
// }

// function concurrency() {
//     _concurrencyClusters(
//         path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
//         8,
//         { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
//     ).then((d) => {
//         console.log("Data fetched", JSON.stringify(d));
//     }).catch((e) => {
//         console.log(e.toString());
//     })
// }

function concurrency() {
    let filename = path.join(process.cwd(), "src\\worker.cluster.js");
    return new Promise(function (resolve, reject) {
        _concurrencyClusters(
            path.join(filename),
            8,
            {
                data: {
                    message: "Testing parent data",
                    url: "https://www.google.com",
                },
                childData: "Test data from child"
            }
        ).then((d) => {
            console.log("Data fetched", JSON.stringify(d));
            resolve(d);
        }).catch((e) => {
            console.log(e.toString());
            reject(e);
        });
    });
}

concurrency();

setTimeout(() => console.log(`demo.cluster.js: Ran cluster file process PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
setTimeout(() => console.log(`demo.cluster.js: Closing cluster file process ${process.pid}: Timeout 1: 10000 `, process.exit()), 20000);
