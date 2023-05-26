/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: worker.threads.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require('path');
const fs = require('fs');

function _concurrencyThreads(filename = __filename, options = {}, greet = false, close = true) {
    const { Worker, isMainThread, parentPort } = require('worker_threads');

    var messageData = [], childMessageData = [], result = [];
    if (!options.handlers) { options["handlers"] = {}; }

    return new Promise((resolve, reject) => {
        if (isMainThread) {
            // return new Promise((resolve, reject) => {
            
            const worker = new Worker(filename);
            if (!!greet) {
                worker.postMessage({ pid: process.pid, threadId: worker.threadId, message: `Hello, world! - Server: ${process.pid}`, event: "greet" });
            }

            worker.on("connection", (e) => {
                // console.log(`Main thread ${process.pid} due to connection event`, e.toString());
                if (!!options?.handlers?.connection) {
                    const connectionCBFunction = (typeof options?.handlers?.connection === "function") ? options?.handlers?.connection : require(options?.handlers?.connection);
                    result.push({ message: connectionCBFunction(e), pid: process.pid, threadId: worker.threadId, event: "connection" });
                } else {
                    result.push({ message: e, pid: process.pid, event: "connection" });
                }
            });

            worker.on("message", function (mainData) {
                messageData.push({ ...mainData, pid: process.pid, threadId: worker.threadId, event: "message" });
                if (!!options?.handlers?.message) {
                    const messageCBFunction = (typeof options?.handlers?.message === "function") ? options?.handlers?.message : require(options?.handlers?.message);
                    result.push({ message: messageCBFunction(mainData), pid: process.pid, threadId: worker.threadId, event: "message" });
                } else {
                    result.push({ message: mainData, pid: process.pid, threadId: worker.threadId, event: "message" });
                }

                if (!!mainData?.closeChild) {
                    mainData = { ...mainData, pid: process.pid, threadId: worker.threadId, event: "message" };
                    childMessageData.push(mainData);
                    try {
                        worker.unref();
                    } catch (e) {
                        worker.terminate();
                    }
                    resolve({ pid: process.pid, threadId: worker.threadId, message: messageData, result: result, event: "message" });
                }
                // console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid}, filename: ${filename}, data: ${mainData}`);
            });

            worker.on("online", () => {
                if (!!options?.handlers?.online) {
                    const onlineCBFunction = (typeof options?.handlers?.online === "function") ? options?.handlers?.online : require(options?.handlers?.online);
                    result.push({ message: onlineCBFunction(), pid: process.pid, threadId: worker.threadId, event: "online" });
                } else {
                    result.push({ message: "", pid: process.pid, threadId: worker.threadId, event: "online" });
                }
            });

            worker.on("error", (e) => {
                if (!!options?.handlers?.error) {
                    const errorCBFunction = (typeof options?.handlers?.error === "function") ? options?.handlers?.error : require(options?.handlers?.error);
                    result.push({ message: errorCBFunction(e), pid: process.pid, threadId: worker.threadId, event: "error" });
                } else {
                    result.push({ message: e, pid: process.pid, threadId: worker.threadId, event: "error" });
                }
                reject({ message: e, result: result, pid: process.pid, threadId: worker.threadId, event: "error" });
            });

            worker.on("messageerror", (e) => {
                if (!!options?.handlers?.messageerror) {
                    const messageerrorCBFunction = (typeof options?.handlers?.messageerror === "function") ? options?.handlers?.messageerror : require(options?.handlers?.messageerror);
                    result.push({ message: messageerrorCBFunction(e), pid: process.pid, threadId: worker.threadId, event: "messageerror" });
                } else {
                    result.push({ message: e, pid: process.pid, threadId: worker.threadId, event: "messageerror" });
                }
                // reject({ message: e, result: result, pid: process.pid, threadId: worker.threadId, event: "messageerror" });
            });

            worker.on("close", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid} threadID:${worker.threadId} : Closing main thread `, e.toString(), messageData);
                worker.unref();
                if (!!options?.handlers?.close) {
                    const closeCBFunction = (typeof options?.handlers?.close === "function") ? options?.handlers?.close : require(options?.handlers?.close);
                    result.push({ message: closeCBFunction(e), pid: process.pid, threadId: worker.threadId, event: "close" });
                } else {
                    result.push({ message: e, pid: process.pid, threadId: worker.threadId, event: "close" });
                }
                reject({ e, result, pid: process.pid, threadId: worker.threadId, event: "close" });
            });

            worker.on("exit", (code) => {
                console.log(`demo.threads.js:_concurrencyThreads: Main Thread PID ${process.pid} threadID:${worker.threadId}, filename: ${filename}, ExitCode: ${code}, messageData`, messageData);
                if (!!options?.handlers?.exit) {
                    const exitCBFunction = (typeof options?.handlers?.exit === "function") ? options?.handlers?.exit : require(options?.handlers?.exit);
                    result.push({ message: exitCBFunction(code), pid: process.pid, threadId: worker.threadId, event: "exit" });
                } else {
                    result.push({ message: { code }, pid: process.pid, threadId: worker.threadId, event: "exit" });
                }
                if (code !== 0) {
                    // reject({ message: "", pid: process.pid, threadId: worker.threadId, event: "exit" });
                    reject(new Error(`Worker (PID ${process.pid}) threadID:${worker.threadId} stopped with exit code ${code}`))
                }
                // reject(new Error(`Worker (PID ${process.pid}) threadID:${worker.threadId} stopped with exit code ${code}`));
            });

            if (!!close) {
                worker.postMessage({ closeChild: true });
            }

            // });

        } else {
            if (!options["handlers"]?.childMessage) {

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

                options.handlers["childMessage"] = function (mainData) {
                    // return options.callback(data, parentPort);
                    // console.log(`demo.threads.js:_concurrencyThreads: Thread: Child Thread PID ${process.pid}, messageData: `, mainData);
                    childMessageData.push(mainData);
                    if (!!process?.env?.handlers?.childMessage) {
                        const childMessageCBFunction = (typeof options?.handlers?.childMessage === "function") ? process?.env?.handlers?.childMessage : require(options?.handlers?.childMessage);
                        result.push({ message: childMessageCBFunction(mainData), pid: process.pid, event: "childMessage" });
                    } else {
                        result.push({ message: mainData, pid: process.pid, event: "childMessage" });
                    }
                    if (!!mainData?.closeChild) {
                        parentPort.postMessage({ closeChild: true, pid: process.pid, childMessageData: childMessageData, result: result, event: "childMessage" });
                    }
                }

            }

            parentPort.on("connection", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Child thread due to connection event `, e.toString())
                if (!!options?.handlers?.childConnection) {
                    const childConnectionCBFunction = (typeof options?.handlers?.childConnection === "function") ? process?.env?.handlers?.childConnection : require(options?.handlers?.childConnection);
                    result.push({ message: childConnectionCBFunction(e), pid: process.pid, event: "childConnection" });
                } else {
                    result.push({ message: e, pid: process.pid, event: "childConnection" });
                }
            });

            parentPort.on("message", options?.handlers?.childMessage);

            parentPort.on("error", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}:Closing child thread due to error`, e.toString());
                if (!!options?.handlers?.childError) {
                    const childErrorCBFunction = (typeof options?.handlers?.childError === "function") ? options?.handlers?.childError : require(options?.handlers?.childError);
                    result.push({ message: childErrorCBFunction(e), pid: process.pid, event: "childError" });
                } else {
                    result.push({ message: e, pid: process.pid, event: "childError" });
                }
            });

            parentPort.on("messageerror", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Closing child thread due to messageerror`, e.toString());
                if (!!options?.handlers?.childMessageerror) {
                    const childMessageerrorCBFunction = (typeof options?.handlers?.childMessageerror === "function") ? options?.handlers?.childMessageerror : require(options?.handlers?.childMessageerror);
                    result.push({ message: childMessageerrorCBFunction(e), pid: process.pid, event: "childMessageerror" });
                } else {
                    result.push({ message: e, pid: process.pid, event: "childMessageerror" });
                }
            });

            parentPort.on("close", (e) => {
                console.log(`demo.threads.js:_concurrencyThreads: Thread PID ${process.pid}: Closing child thread due to close event`, e.toString());
                if (!!options?.handlers?.childClose) {
                    const childCloseCBFunction = (typeof options?.handlers?.childClose === "function") ? options?.handlers?.childClose : require(options?.handlers?.childClose);
                    result.push({ message: childCloseCBFunction(e), pid: process.pid, event: "childClose" });
                } else {
                    result.push({ message: e, pid: process.pid, event: "childClose" });
                }
            });

            if (!!greet) {
                parentPort.postMessage({ pid: process.pid, message: `"Hello from child. - Thread: ${process.pid}`, event: "greet" });
            }

            if (!!options.handlers.childThreadExecute) {
                options.handlers.childThreadExecute();
            }
        }
    });
}

module.exports._concurrencyThreads = _concurrencyThreads;
