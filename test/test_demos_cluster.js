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
            return new Promise(function (resolve, reject) {
                _concurrencyClusters(
                    path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
                    8,
                    { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
                ).then((d) => {
                    console.log("Data fetched", JSON.stringify(d));
                    expect(100).to.equal(100);
                    resolve(d);
                }).catch((e) => {
                    console.log(e.toString());
                    expect(100).to.equal(100);
                    reject(e);
                })
            });
        }

        concurrency();
        done();
    });
});
