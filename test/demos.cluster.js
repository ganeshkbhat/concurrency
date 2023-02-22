


'use strict';

const path = require("path");
let { _concurrencyClusters } = require("../index.js");

async function concurrency() {
    var responses;
    async function testPromise() {
        try {
            let filename = "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js";
            responses = await _concurrencyClusters(
                path.join(filename),
                8,
                {
                    data: {
                        message: "Testing parent data",
                        url: "https://www.google.com",
                    },
                    childData: "Test data from child"
                }
            );
            return responses;
        } catch (e) {
            return e;
        }
    };
    return await testPromise();
}

module.exports.concurrency = concurrency();
