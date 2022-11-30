
const path = require("path");
let { _concurrencyClusters } = require("../index.js");


// console.log(_concurrencyClusters(
//     path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js"),
//     8,
//     { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
// ).then((d) => {
//     console.log("Data fetched", JSON.stringify(d));
// }).catch((e) => {
//     console.log(e.toString());
// }))


_concurrencyClusters(
    path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js"),
    8,
    { url: "https://www.google.com", data: "Testing parent data", childData: "Test data from child" }
).then((d) => {
    console.log("Data fetched", JSON.stringify(d));
}).catch((e) => {
    console.log(e.toString());
})

setTimeout(() => console.log(`demo.cluster.js: run file PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
setTimeout(() => console.log(`demo.cluster.js: Closing process ${process.pid}: Timeout 1: 10000 `, process.exit()), 40000);
