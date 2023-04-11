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
// let { _concurrencyThreadsAsync } = require("../index.js");


// async function concurrency() {
//     var responses;
//     async function testPromise() {
//         try {
//             responses = await _concurrencyThreadsAsync(__filename, {
//                 data: {
//                     message: "Testing data",
//                     url: "https://www.google.com"
//                 },
//                 childData: "Testing child data"
//             }, true);
//             return responses;
//         } catch (e) {
//             console.log(e);
//             return e;
//         }
//     };
//     return await testPromise();
// }

// module.exports.concurrency = concurrency();

