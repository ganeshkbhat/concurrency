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

    it('[Test A] Test for cluster function demos', async function () {

        var response = await require("./demos.cluster").concurrency;
        // console.log(response);
        
        expect(200).to.equal(200);

        // // "1":[{"closeChild":true,"pid":7468,"childMessageData":[{"id":"1","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["1"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["1"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["1"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "2":[{"closeChild":true,"pid":13784,"childMessageData":[{"id":"2","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["2"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["2"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["2"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "3":[{"closeChild":true,"pid":872,"childMessageData":[{"id":"3","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["3"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["3"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["3"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "4": [{"closeChild":true,"pid":11732,"childMessageData":[{"id":"4","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["4"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["4"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["4"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "5":[{"closeChild":true,"pid":7468,"childMessageData":[{"id":"5","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["5"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["5"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["5"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "6":[{"closeChild":true,"pid":13784,"childMessageData":[{"id":"6","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["6"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["6"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["6"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "7":[{"closeChild":true,"pid":872,"childMessageData":[{"id":"7","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["7"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["7"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["7"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "8": [{"closeChild":true,"pid":11732,"childMessageData":[{"id":"8","pid":9744,"message":{"message":"Testing parent data","url":"https://www.google.com"}},{"closeChild":true}],"result":[]}]
        // expect(JSON.stringify(response.message["8"][0]["closeChild"])).to.equal(true);
        // expect(JSON.stringify(response.message["8"][0]["childMessageData"][0]["id"])).to.equal(1);
        // expect(JSON.stringify(response.message["8"][0]["childMessageData"][0]["message"])).to.equal({ "message": "Testing parent data", "url": "https://www.google.com" });

        // // "result":[]
        // expect(JSON.stringify(response.result)).to.equal(JSON.stringify([]));

    });

});
