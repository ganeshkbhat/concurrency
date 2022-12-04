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

describe('test-.mjs::concurrency.js: Test Suite for concurrency.js .threads Files', function () {

    describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js .threads in main repo directory', function () {

        var responses
        before(function (done) {
            _concurrencyThreads(__filename, { url: "https://www.google.com", data: "Testing data", childData: "Testing child data" })
                .then((d) => {
                    console.log(JSON.stringify(d));
                    responses = d;
                    done();
                })
            console.log(responses);
        });

        it('[Test A] Test for ', function (done) {
            expect(100).to.equal(100);
            done();
        });

    });

});

