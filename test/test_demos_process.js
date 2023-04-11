/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: test.demos.process.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const expect = require('chai').expect;
const path = require("path");
const { _concurrencyProcesses } = require("../index.js");
const { json } = require('stream/consumers');


describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js .process in main repo directory', function () {

    it('[Test A] Test for process function demos', async function () {
        var responses = await require("./demos.process").concurrency;

        //
        // { "message": [
        //     { "closeChild": true, "pid": 14676, 
        //     "childMessageData": [
        //         { "pid": 3828, "message": "Master Process PID:3828: Hello from Master Process" }, 
        //         { "pid": 3828, "message": { "message": "Testing data", "url": "https://www.google.com" } }, 
        //         { "closeChild": true }], 
        //     "result": [] 
        // }],
        // "result": [] 
        // }
        //
        
        expect(!!responses.message).to.equal(true);
        expect(responses.message.length).to.equal(1);
        expect(!!responses.result).to.equal(true);
        expect(responses.message[0].childMessageData.length).to.equal(3);
        expect(!!responses.message[0].result).to.equal(true);
        expect(Object.keys(responses.message[0].childMessageData[0]).length).to.equal(3);
        expect(Object.keys(responses.message[0].childMessageData[1]).length).to.equal(2);
        expect(Object.keys(responses.message[0].childMessageData[2]).length).to.equal(3);
        expect(!!responses.message[0].closeChild).to.equal(true);
    });

});
