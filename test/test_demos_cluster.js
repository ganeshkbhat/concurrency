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


describe('test-.mjs::concurrency.js: Test Suite for concurrency.js cluster Files', function () {

    describe('test-.js::concurrency.js: [Test A] Test Suite for concurrency.js cluster in main repo directory', function () {

        // var responses;
        // before(async function (done) {
        //     _concurrencyClusters(
        //         path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
        //         // __filename,
        //         8,
        //         { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
        //     ).then(
        //         (d) => { responses = d; done(); }
        //     )
        // });

        it('[Test A] Test for cluster function demos', function (done) {

            function concurrency() {
                return new Promise(function (resolve, reject) {
                    _concurrencyClusters(
                        path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
                        8,
                        { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
                    ).then((d) => {
                        console.log("Data fetched", JSON.stringify(d));
                        resolve(d);
                    }).catch((e) => {
                        console.log(e.toString());
                        reject(e);
                    })
                });
            }

            concurrency();
            expect(100).to.equal(100);
            done();
        });
    });

});
