


'use strict';

const path = require("path");
let { _concurrencyThreads } = require("../index.js");

// _concurrencyThreads(path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.threads.js"), { data: { url: "https://www.google.com", message: "Testing data" } });

async function concurrency() {
    let c = await _concurrencyThreads(__filename, {
        data: {
            url: "https://www.google.com",
            message: "Testing data"
        },
        childData: "Testing child data"
    }, true)
    return c;
}

module.exports.concurrency = concurrency;