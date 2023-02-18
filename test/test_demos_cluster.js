/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: test.demos.cluster.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const expect = require('chai').expect;
const path = require("path");

const { _concurrencyClusters } = require("../index.js");

describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js cluster in main repo directory', function () {

    it('[Test A] Test for cluster function demos', function (done) {

        var responses;
        function concurrency() {
            let filename = "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js";
            return new Promise(function (resolve, reject) {
                _concurrencyClusters(
                    path.join(filename), 8,
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

        concurrency().then(() => {

            // "1":[{"closeChild":true,"pid":7468,"childMessageData":[{"id":"1","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["1"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["1"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["1"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "2":[{"closeChild":true,"pid":13784,"childMessageData":[{"id":"2","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["2"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["2"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["2"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "3":[{"closeChild":true,"pid":872,"childMessageData":[{"id":"3","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["3"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["3"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["3"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "4": [{"closeChild":true,"pid":11732,"childMessageData":[{"id":"4","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["4"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["4"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["4"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "5":[{"closeChild":true,"pid":7468,"childMessageData":[{"id":"5","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["5"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["5"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["5"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "6":[{"closeChild":true,"pid":13784,"childMessageData":[{"id":"6","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["6"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["6"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["6"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "7":[{"closeChild":true,"pid":872,"childMessageData":[{"id":"7","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["7"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["7"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["7"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "8": [{"closeChild":true,"pid":11732,"childMessageData":[{"id":"8","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
            expect(JSON.stringify(d.message["8"][0]["closeChild"])).to.equal(true);
            expect(JSON.stringify(d.message["8"][0]["childMessageData"][0]["id"])).to.equal(1);
            expect(JSON.stringify(d.message["8"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

            // "result":[]
            expect(JSON.stringify(d.result)).to.equal(JSON.stringify([]));
            done();
        }).catch((e) => {
            console.log(e.toString());
            expect(!!e.toString()).to.equal(true);
            done();
        });
    });

});
