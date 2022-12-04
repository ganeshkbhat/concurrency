
const path = require("path");
const { _concurrencyClusters } = require("../index.js");


async function cluster() {
    return _concurrencyClusters(
        path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
        // __filename,
        8,
        { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
    )
}


module.exports = cluster;
