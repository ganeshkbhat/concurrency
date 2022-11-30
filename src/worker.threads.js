/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/
 * File: worker.threads.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require('path');
const fs = require('fs');


/**
 *
 *
 * @param {*} module_name
 * @return {*} 
 */
function _getRequireOrImport(module_name) {
    if (process.versions.node.split('.')[0] > "14") {
        return import(module_name);
    }
    return require(module_name);
}

function _concurrencyThreads(filename, options = {}, greet = true) {

    const { Worker, isMainThread, parentPort } = require('worker_threads');
    var messageData = [], childMessageData = [], result = [];

    if (!options.handlers) {
        options["handlers"] = {};
    }

    if (isMainThread) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(filename);
            if (!!greet) {
                worker.postMessage(`Hello, world! - Server: ${process.pid}`);
            }
            worker.on("connection", (e) => {
                console.log(`Main thread ${process.pid} due to connection event`, e.toString());
                if (!!options.handlers.connectionHandlerFile) {
                    const cbFunction = require(options.handlers.connectionHandlerFile);
                    result.push({ message: cbFunction(e), pid: null, event: null });
                }
            });
            worker.on('message', function (mainData) {
                messageData.push(mainData);
                if (!!options.handlers.messageHandlerFile) {
                    const cbFunction = require(options.handlers.messageHandlerFile);
                    result.push({ message: cbFunction(mainData), pid: null, event: null });
                }
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid}, filename: ${filename}, data: ${mainData}`);
            });

            worker.on('online', () => {
                if (!!options.handlers.onlineHandlerFile) {
                    const cbFunction = require(options.handlers.onlineHandlerFile);
                    result.push({ message: cbFunction(), pid: null, event: null });
                }
                console.log(`ID:${worker.threadId}`)
            });
            worker.on('error', (e) => {
                if (!!options.handlers.errorHandlerFile) {
                    const cbFunction = require(options.handlers.errorHandlerFile);
                    result.push({ message: cbFunction(e), pid: null, event: null });
                }
                reject(e)
            });
            worker.on('messageerror', (e) => {
                if (!!options.handlers.messageerrorHandlerFile) {
                    const cbFunction = require(options.handlers.messageerrorHandlerFile);
                    result.push({ message: cbFunction(e), pid: null, event: null });
                }
                reject(e)
            });

            worker.on("close", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid} threadID:${worker.threadId} : Closing main thread `, e.toString(), messageData);
                worker.unref();
                if (!!options.handlers.closeHandlerFile) {
                    const cbFunction = require(options.handlers.closeHandlerFile);
                    result.push({ message: cbFunction(e), pid: null, event: null });
                }
                resolve({ messageData, result });
            });

            worker.on('exit', (code) => {
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid} threadID:${worker.threadId}, filename: ${filename}, ExitCode: ${code}, messageData`, messageData);
                if (!!options.handlers.exitHandlerFile) {
                    const cbFunction = require(options.handlers.exitHandlerFile);
                    result.push({ message: cbFunction(code), pid: null, event: null });
                }
                if (code !== 0) {
                    reject(new Error(`Worker (PID ${process.pid}) threadID:${worker.threadId} stopped with exit code ${code}`));
                }
            });
        });
    } else {

        if (!options.callback) {

            // options.callback = function (contents) {
            //     console.log("Testing worker");
            //     const { get } = (options.protocol === "https") ? require("https") : require("http");
            //     get(contents.url, (res) => {
            //         let result = '';
            //         res.on('data', (chunk) => result += chunk);
            //         res.on('end', () => {
            //             parentPort.postMessage(result);
            //         });
            //     }).on('error', (err) => parentPort.postMessage(err));
            // }.bind(null, null, options);

            options.callback = function (mainData) {
                // return options.callback(data, parentPort);
                console.log(`demo.threads.js:_concurrencyThreads: Thread: Child Thread PID ${process.pid}, messageData: `, mainData);
                childMessageData.push(mainData);
                if (!!options.handlers.childMessageHandlerFile) {
                    const childCBFunction = require(options.handlers.childMessageHandlerFile);
                    result.push({ message: childCBFunction(mainData), pid: null, event: null });
                }
                if (!!mainData.childClose) {
                    parentPort.postMessage({ childClose: true, pid: process.pid, childMessageData: childMessageData });
                }
            }
        }

        parentPort.on("connection", (e) => {
            console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Child thread due to connection event `, e.toString())
            if (!!options.handlers.childConnectionHandlerFile) {
                const childCBFunction = require(options.handlers.childConnectionHandlerFile);
                result.push({ message: childCBFunction(e), pid: null, event: null });
            }
        });
        parentPort.on("message", options.callback);
        parentPort.on('error', (e) => {
            console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}:Closing child thread due to error`, e.toString());
            if (!!options.handlers.errorHandlerFile) {
                const cbFunction = require(options.handlers.errorHandlerFile);
                result.push({ message: cbFunction(e), pid: null, event: null });
            }
        });
        parentPort.on('messageerror', (e) => {
            console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Closing child thread due to messageerror`, e.toString());
            if (!!options.handlers.messageerrorHandlerFile) {
                const cbFunction = require(options.handlers.messageerrorHandlerFile);
                result.push({ message: cbFunction(e), pid: null, event: null });
            }
        });
        parentPort.on("close", (e) => {
            console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Closing child thread due to close event`, e.toString());
            if (!!options.handlers.closeHandlerFile) {
                const cbFunction = require(options.handlers.closeHandlerFile);
                result.push({ message: cbFunction(e), pid: null, event: null });
            }
        });
        if (!!greet) {
            parentPort.postMessage(`"Hello from child. - Thread: ${process.pid}`);
        }
    }
}

module.exports._concurrencyThreads = _concurrencyThreads
