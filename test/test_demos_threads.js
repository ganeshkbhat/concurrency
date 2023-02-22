// /**
//  * 
//  * Package: concurrency.js
//  * Author: Ganesh B
//  * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
//  * Install: npm i  --save
//  * Github: https://github.com/ganeshkbhat/concurrency
//  * npmjs Link: https://www.npmjs.com/package/concurrency.js
//  * File: test.demos.threads.js
//  * File Description: 
//  * 
// */


/* eslint no-console: 0 */

'use strict';


const expect = require('chai').expect;
const path = require("path");
var spawn = require("child_process").spawn;

const { _concurrencyThreads } = require("../index.js");


// describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js .threads in main repo directory', function () {

//     // it('[Test A] Test for threads ', function (done) {
//     //     var responses;
//     //     _concurrencyThreads(__filename, {
//     //         data: {
//     //             message: "Testing data",
//     //             url: "https://www.google.com"
//     //         },
//     //         childData: "Testing child data"
//     //     }).then((d) => {
//     //         console.log(JSON.stringify(d));
//     //         expect(200).to.equal(100);
//     //         responses = d;
//     //         expect(responses).to.equal({
//     //             "message": [
//     //                 { "pid": responses.messages[0].pid, "message": "\"Hello from child. - Thread: " + responses.messages[0].pid + "", "threadId": 1 },
//     //                 {
//     //                     "closeChild": true,
//     //                     "pid": responses.messages[0].pid,
//     //                     "childMessageData": [
//     //                         { "pid": responses.messages[0].pid, "message": "Hello, world! - Server: 11660" },
//     //                         { "closeChild": true }],
//     //                     "result": [],
//     //                     "threadId": 1
//     //                 }
//     //             ],
//     //             "result": []
//     //         });
//     //         done();
//     //     });

//     //     // done();
//     // });


// });


const assert = require('assert');
const concurrency = require('concurrency.js');

// // describe('Concurrency', function() {

// describe('#_concurrencyThreads()', function () {
//   // it('should return a promise that resolves with the message data and result when called with valid arguments', async function() {
//   //   try {
//   //     const result = await concurrency._concurrencyThreads(__filename, {
//   //         data: {
//   //             message: "Testing data",
//   //             url: "https://www.google.com"
//   //         },
//   //         childData: "Testing child data"
//   //     }, false, describe);
//   //       assert.strictEqual(result.message.length, 2);
//   //       assert.strictEqual(result.result.length, 1);
//   //   } catch(e) {
//   //     assert.equal(e, undefined);
//   //   }
//   // });

//   it('should return a promise that resolves with the message data and result when called with valid arguments', async function () {
//     var func = require("./demos.threads").concurrency;
//     try {
//       const result = await func();
//       console.log(result);
//       assert.strictEqual(result.message.length, 2);
//       assert.strictEqual(result.result.length, 1);
//       // done();
//     } catch (e) {
//       assert.equal(e, undefined);
//       // done();
//     }
//   });

//   //   it('should reject with an error when called with an invalid file path', async function() {
//   //     await assert.rejects(async function() {
//   //       await concurrency._concurrencyThreads('./invalid/path/to/worker.js', {
//   //           data: {
//   //               message: "Testing data",
//   //               url: "https://www.google.com"
//   //           },
//   //           childData: "Testing child data"
//   //       }, false);
//   //     }, "Error: Cannot find module 'C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\invalid\\path\\to\\worker.js'");
//   //   });
//   // });

//   //   describe('#_concurrencyProcesses()', function() {
//   //     it('should return a promise that resolves with the message data and result when called with valid arguments', async function() {
//   //       const result = await concurrency._concurrencyProcesses(__filename, {
//   //         data: {
//   //             message: "Testing data",
//   //             url: "https://www.google.com"
//   //         },
//   //         childData: "Testing child data"
//   //     }, false);
//   //       assert.strictEqual(result.message.length, 2);
//   //       assert.strictEqual(result.result.length, 1);
//   //     });

//   //     it('should reject with an error when called with an invalid file path', async function() {
//   //       await assert.rejects(async function() {
//   //         await concurrency._concurrencyProcesses('invalid/path/to/worker.js', {}, false);
//   //       }, /Worker failed to spawn/);
//   //     });
//   //   });

// });

async function test() {
  var func = require("./demos.threads").concurrency;
  const result = await func();
  console.log(result);
  return result;
}

test();
