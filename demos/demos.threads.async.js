

const path = require("path");
let { _concurrencyThreadsAsync } = require("../index.js");

let filename = path.join(process.cwd(), "demos\\demos.threads.js");

let threads = _concurrencyThreadsAsync("node " + filename, {
    data: {
        message: "Testing parent data",
        url: "https://www.google.com"
    },
    childData: "Test data from child"
});

console.log(` STDOUT: console.log(threads.stderr); console.log(threads.stdout); `);

console.log("threads.stderr: ", threads.stderr);
console.log("threads.stdout: ", threads.stdout);

setTimeout(() => console.log(`demo.threads.async.js: run file PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
setTimeout(() => console.log(`demo.threads.async.js: Closing process ${process.pid}: Timeout 1: 10000 `, process.exit()), 20000);
