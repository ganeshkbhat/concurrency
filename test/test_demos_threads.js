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


describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js .threads in main repo directory', function () {

  it('[Test A] Test for threads _concurrencyThreads', async function () {
    let responses = await require("./demos.threads").concurrency;
    
    expect(Object.keys(responses).length).to.equal(5);
    expect(responses.message.length).to.equal(1);
    // expect(Object.keys(responses.message[0]).length).to.equal(2);
    expect(Object.keys(responses.message[0]).length).to.equal(5);
  });

});


