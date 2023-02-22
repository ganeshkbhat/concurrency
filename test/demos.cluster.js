// /**
//  * 
//  * Package: concurrency.js
//  * Author: Ganesh B
//  * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
//  * Install: npm i  --save
//  * Github: https://github.com/ganeshkbhat/concurrency
//  * npmjs Link: https://www.npmjs.com/package/concurrency.js
//  * File: test.demos.cluster.js
//  * File Description: 
//  * 
// */

// /* eslint no-console: 0 */


// 'use strict';

// const path = require("path");
// let { _concurrencyClusters } = require("../index.js");

// async function concurrency() {
//     var responses;
//     async function testPromise() {
//         try {
//             let filename = "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js";
//             responses = await _concurrencyClusters(
//                 path.join(filename),
//                 8,
//                 {
//                     data: {
//                         message: "Testing parent data",
//                         url: "https://www.google.com",
//                     },
//                     childData: "Test data from child"
//                 }
//             );
//             return responses;
//         } catch (e) {
//             return e;
//         }
//     };
//     return await testPromise();
// }

// module.exports.concurrency = concurrency();
