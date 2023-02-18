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

    it('[Test A] Test for ', function (done) {
        var responses;
        let threads = _concurrencyThreadsAsync("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\demos\\demos.threads.js", {
            data: {
                message: "Testing parent data",
                url: "https://www.google.com"
            }, childData: "Test data from child"
        });

        /** 
            {
                "message":[
                    {"pid":3764,"message":"\"Hello from child. - Thread: 3764","threadId":1},
                    {"closeChild":true,"pid":3764,
                        "childMessageData":[
                            {"pid":3764,"message":"Hello, world! - Server: 3764"},
                            {"closeChild":true}
                        ],
                        "result":[],
                        "threadId":1
                    }
                ],
                "result":[]
            }
        */

        expect(threads).to.equal({
            "message": [
                { "pid": 3764, "message": "\"Hello from child. - Thread: 3764", "threadId": 1 },
                {
                    "closeChild": true, "pid": 3764, "childMessageData": [
                        { "pid": 3764, "message": "Hello, world! - Server: 3764" },
                        { "closeChild": true }
                    ],
                    "result": [],
                    "threadId": 1
                }], "result": []
        });
        done();
    });
});

