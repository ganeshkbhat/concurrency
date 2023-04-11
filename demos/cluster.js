
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
