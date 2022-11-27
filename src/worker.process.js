/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: worker.process.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


process.on('message', function (contents) {
    return contents.callback(contents);
}.bind(contents, process));

// setInterval(() => {
//     process.send("Message from parent:");
// }, 1000);
//
// process.on('exit', function (code) {
//     setTimeout(function () {
//         console.log("This will not run");
//     }, 0);
//     console.log('About to exit with code:', code);
// });
//
//
// // Printing to console
// process.stdout.write("Hello World!" + "\n");
//
// // Reading passed parameter
// process.argv.forEach(function(val, index, array) {
//    console.log(index + ': ' + val);
// });
//
// // Getting executable path
// console.log(process.execPath);
//
// // Platform Information
// console.log(process.platform);
//
// // Print the current directory
// console.log('Current directory: ' + process.cwd());
//
// // Print the process version
// console.log('Current version: ' + process.version);
//
// // Print the memory usage
// console.log(process.memoryUsage());
//
