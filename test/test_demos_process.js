// /**
//  * 
//  * Package: concurrency.js
//  * Author: Ganesh B
//  * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
//  * Install: npm i  --save
//  * Github: https://github.com/ganeshkbhat/concurrency
//  * npmjs Link: https://www.npmjs.com/package/concurrency.js
//  * File: test.demos.process.js
//  * File Description: 
//  * 
// */

// /* eslint no-console: 0 */

// 'use strict';


// const expect = require('chai').expect;
// const path = require("path");
// const { _concurrencyProcesses } = require("../index.js");


// describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js .process in main repo directory', function () {

//     it('[Test A] Test for process function demos', function (done) {
//         var responses;
//         let filename = "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js";
//         _concurrencyProcesses(path.join(filename),
//             {
//                 data: {
//                     url: "https://www.google.com",
//                     message: "Testing data"
//                 }
//             }
//         ).then((d) => {
//             console.log("Data fetched", d);
//             expect(d).to.equal(true);
//             responses = d;
//             expect(responses).to.equal(true);
//             done();
//         }).catch((e) => {
//             console.log(e.toString());
//             expect(d).to.equal(true);
//             setTimeout(() => {
//                 process.exit(e);
//             }, 5000)
//         })
//         // expect(Array.isArray(responses.messageData)).to.equal(true);
//         done();
//     });

// });
