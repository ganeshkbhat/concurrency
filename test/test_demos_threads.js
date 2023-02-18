/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: test.demos.threads.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const expect = require('chai').expect;
const path = require("path");
const { _concurrencyThreads } = require("../index.js");


describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js .threads in main repo directory', function () {

    it('[Test A] Test for threads ', function (done) {
        var responses;
        _concurrencyThreads(__filename, {
            data: {
                message: "Testing data",
                url: "https://www.google.com"
            },
            childData: "Testing child data"
        }).then((d) => {
            console.log(JSON.stringify(d));
            responses = d;
            done();
        });
        expect(responses).to.equal({
            "message": [
                { "pid": 11660, "message": "\"Hello from child. - Thread: 11660", "threadId": 1 },
                {
                    "closeChild": true,
                    "pid": 11660,
                    "childMessageData": [
                        { "pid": 11660, "message": "Hello, world! - Server: 11660" },
                        { "closeChild": true }],
                    "result": [],
                    "threadId": 1
                }
            ],
            "result": []
        });
        done();
    });

});


