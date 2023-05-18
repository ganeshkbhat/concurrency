/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.threads.multiple.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const path = require("path");
let { _concurrencyThreads } = require("../index.js");


_concurrencyThreads(__filename, {
    data: {
        url: "https://www.google.com",
        message: "Testing data"
    },
    childData: "Testing child data",
    handlers: {
        childThreadExecute: () => {
            require("C:\\Users\\GB\\Documents\\projects\\allprojects\\require-urls\\concurrency\\demos\\express-app.js")
        }
    }
}, false, false).then((d) => console.log("Data fetched: ", JSON.stringify(d)))
.catch((e) => { console.log("Error ", JSON.stringify(e));  /* setTimeout(() => { process.exit(e); }, 5000) */ })


// setTimeout(() => {
//     console.log(`demo.threads.js: Closing process ${process.pid}: Timeout 1: 20000 `, __filename);
//     process.exit(0);
// }, 20000);


// setTimeout(() => console.log(`demo.threads.js: Run file PID ${process.pid}: Interval 2: 10000 `, process.pid), 10000);
// setTimeout(() => console.log(`demo.threads.js: Closing process ${process.pid}: Timeout 1: 10000 `, process.exit()), 20000);


// const postData = { foo: 'bar' };
// const options = { headers: { 'Authorization': 'Bearer <TOKEN>' } };
// makePostRequest('https://example.com/api', postData, options)
//     .then((response) => {
//         console.log(`Status code: ${response.statusCode}`);
//         console.log(`Response body: ${response.body}`);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


// const urls = ['https://www.google.com', 'https://www.google.com/search?q=javascript', 'https://www.google.com/search?q=web+workers'];
// fetchMultipleUrls(urls)
//     .then((results) => {
//         console.log(results);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

