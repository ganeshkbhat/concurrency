


'use strict';

const path = require("path");
let { _concurrencyThreads } = require("../index.js");

// _concurrencyThreads(path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.threads.js"), { data: { url: "https://www.google.com", message: "Testing data" } });

async function concurrency() {
    var responses;
    async function testPromise() {
        try {
            responses = await _concurrencyThreads(__filename, {
                data: {
                    message: "Testing data",
                    url: "https://www.google.com"
                },
                childData: "Testing child data"
            });
            return responses;
        } catch (e) {
            return e;
        }
    };
    return await testPromise();
}

module.exports.concurrency = concurrency();