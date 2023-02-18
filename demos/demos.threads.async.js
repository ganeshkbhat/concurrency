
const { rejects } = require("assert");
const { resolve } = require("path");
const path = require("path");
let { _concurrencyThreadsAsync } = require("../index.js");

let threads = _concurrencyThreadsAsync("node C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\demos\\demos.threads.js", {
    data: {
        data: "Testing parent data",
        url: "https://www.google.com"
    }, childData: "Test data from child"
});

console.log(`
STDOUT:
console.log(threads.stderr);
console.log(threads.stdout);
`);

console.log(threads.stderr);
console.log(threads.stdout);

// setTimeout(() => console.log(`demo.cluster.js: run file PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
// setTimeout(() => console.log(`demo.cluster.js: Closing process ${process.pid}: Timeout 1: 10000 `, process.exit()), 20000);
