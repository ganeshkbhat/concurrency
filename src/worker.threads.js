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

function _concurrencyThreads(filename = __filename, options = {}, greet = false) {

    const { Worker, isMainThread, parentPort } = require('worker_threads');
    var messageData = [], childMessageData = [], result = [];

    if (!options.handlers) {
        options["handlers"] = {};
    }
    return new Promise((resolve, reject) => {
        if (isMainThread) {
            // return new Promise((resolve, reject) => {
            const worker = new Worker(filename);
            if (!!greet) {
                worker.postMessage({ pid: process.pid, message: `Hello, world! - Server: ${process.pid}` });
            }

            worker.on("connection", (e) => {
                console.log(`Main thread ${process.pid} due to connection event`, e.toString());
                if (!!options.handlers.connection) {
                    const cbFunction = require(options.handlers.connection);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "connection" });
                }
            });

            worker.on("message", function (mainData) {
                messageData.push({ ...mainData, threadId: worker.threadId });
                if (!!options.handlers.message) {
                    const cbFunction = require(options.handlers.message);
                    result.push({ message: cbFunction(mainData), pid: process.pid, event: "message" });
                }
                if (!!mainData.closeChild) {
                    mainData = { ...mainData, threadId: worker.threadId };
                    childMessageData.push(mainData);
                    try {
                        worker.unref();
                    } catch (e) {
                        worker.terminate();
                    }
                    resolve({ messageData, result });
                }
                // console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid}, filename: ${filename}, data: ${mainData}`);
            });

            worker.on("online", () => {
                if (!!options.handlers.online) {
                    const cbFunction = require(options.handlers.online);
                    result.push({ message: cbFunction(), pid: process.pid, event: "online" });
                }
            });

            worker.on("error", (e) => {
                if (!!options.handlers.error) {
                    const cbFunction = require(options.handlers.error);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "error" });
                }
                reject(e)
            });

            worker.on("messageerror", (e) => {
                if (!!options.handlers.messageerror) {
                    const cbFunction = require(options.handlers.messageerror);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "messageerror" });
                }
                reject(e)
            });

            worker.on("close", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid} threadID:${worker.threadId} : Closing main thread `, e.toString(), messageData);
                worker.unref();
                if (!!options.handlers.close) {
                    const cbFunction = require(options.handlers.close);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "close" });
                }
                // resolve({ messageData, result });
            });

            worker.on("exit", (code) => {
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid} threadID:${worker.threadId}, filename: ${filename}, ExitCode: ${code}, messageData`, messageData);
                if (!!options.handlers.exit) {
                    const cbFunction = require(options.handlers.exit);
                    result.push({ message: cbFunction(code), pid: process.pid, event: "exit" });
                }
                if (code !== 0) {
                    reject(new Error(`Worker (PID ${process.pid}) threadID:${worker.threadId} stopped with exit code ${code}`));
                }
                reject(new Error(`Worker (PID ${process.pid}) threadID:${worker.threadId} stopped with exit code ${code}`));
            });
            worker.postMessage({ closeChild: true });
            // });

        } else {

            if (!options.callback) {

                // options.callback = function (contents) {
                //     console.log("Testing worker");
                //     const { get } = (options.protocol === "https") ? require("https") : require("http");
                //     get(contents.url, (res) => {
                //         let result = "";
                //         res.on("data", (chunk) => result += chunk);
                //         res.on("end", () => {
                //             parentPort.postMessage(result);
                //         });
                //     }).on("error", (err) => parentPort.postMessage(err));
                // }.bind(null, null, options);

                options.callback = function (mainData) {
                    // return options.callback(data, parentPort);
                    // console.log(`demo.threads.js:_concurrencyThreads: Thread: Child Thread PID ${process.pid}, messageData: `, mainData);
                    childMessageData.push(mainData);
                    if (!!options.handlers.childMessage) {
                        const childCBFunction = require(options.handlers.childMessage);
                        result.push({ message: childCBFunction(mainData), pid: process.pid, event: "message" });
                    }
                    if (!!mainData.closeChild) {
                        parentPort.postMessage({ closeChild: true, pid: process.pid, childMessageData: childMessageData, result: result });
                    }
                }
            }

            parentPort.on("connection", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Child thread due to connection event `, e.toString())
                if (!!options.handlers.childConnection) {
                    const childCBFunction = require(options.handlers.childConnection);
                    result.push({ message: childCBFunction(e), pid: process.pid, event: "connection" });
                }
            });

            parentPort.on("message", options.callback);

            parentPort.on("error", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}:Closing child thread due to error`, e.toString());
                if (!!options.handlers.childError) {
                    const cbFunction = require(options.handlers.childError);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "error" });
                }
            });

            parentPort.on("messageerror", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Closing child thread due to messageerror`, e.toString());
                if (!!options.handlers.messageerror) {
                    const cbFunction = require(options.handlers.messageerror);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "messageerror" });
                }
            });

            parentPort.on("close", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Closing child thread due to close event`, e.toString());
                if (!!options.handlers.close) {
                    const cbFunction = require(options.handlers.close);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "close" });
                }
            });

            if (!!greet) {
                parentPort.postMessage({ pid: process.pid, message: `"Hello from child. - Thread: ${process.pid}` });
            }
        }
    });

}

module.exports._concurrencyThreads = _concurrencyThreads
