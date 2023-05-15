/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: cluster.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
const { _concurrencyClusters } = require("../index.js");


async function cluster() {
    let filename = path.join(process.cwd(), "\\src\\worker.cluster.js");
    return _concurrencyClusters(
        path.join(filename),
        // __filename,
        8,
        {
            data: {
                url: "https://www.google.com",
                message: "Testing parent data"
            },
            childData: "Test data from child"
        }
    )
}

module.exports = cluster;
