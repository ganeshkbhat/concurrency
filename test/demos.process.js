


'use strict';

const path = require("path");
let { _concurrencyProcesses } = require("../index.js");

async function concurrency() {
    var responses;
    async function testPromise() {
        try {
            let filename = "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js";
            responses = await _concurrencyProcesses(
                path.join(filename), {
                data: {
                    message: "Testing data",
                    url: "https://www.google.com"
                }
            }, true);
            return responses;
        } catch (e) {
            return e;
        }
    };
    return await testPromise();
}

module.exports.concurrency = concurrency();