/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: worker.process.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const path = require("path");
const fs = require("fs");
const { sign } = require("crypto");


function _concurrencyProcesses(filename = __filename, options = {}, greet = false, close = true) {
    var messageData = [], childMessageData = [], result = [];

    if (!options.handlers) {
        options["handlers"] = {};
    }

    if (process.env.FORK) {
        if (!options.handlers.message) {
            options.handlers["message"] = function (data) {
                childMessageData.push(data);
                if (!!process.env.handlers?.childMessage) {
                    let childMessageCBFunction = (typeof process.env.handlers?.childMessage === "function") ? process.env.handlers?.childMessage : require(process.env.handlers?.childMessage);
                    result.push({ message: childMessageCBFunction(data), pid: process.pid, event: "childMessage" });
                } else {
                    result.push({ message: data, pid: process.pid, event: "childMessage" });
                }
                if (!!data.closeChild) {
                    process.send({ closeChild: true, pid: process.pid, childMessageData: childMessageData, result: result });
                }
            }
        }

        // process.stdout.on("message", console.log);
        // process.stdin.on("message", console.log);
        // process.stderr.on("message", console.log);

        process.on("message", options.handlers.message);

        process.on("exit", (code) => {
            // console.log(`worker.process.js: _concurrencyProcesses: Child Process PID:${process.pid}: EXIT CODE ${code} CHILD: `, childMessageData);
            if (!!process.env.handlers.childExit) {
                let childExitCBFunction = (typeof process.env.handlers?.childExit === "function") ? process.env.handlers?.childExit : require(process.env.handlers.childExit);
                result.push({ message: childExitCBFunction(code), pid: process.pid, event: "exit" });
            } else {
                result.push({ message: { code }, pid: process.pid, event: "exit" });
            }
        });

        if (!!greet) {
            process.send({ pid: process.pid, message: `Child Process PID:${process.pid}: Hello from Child Process`, event: "greet" });
        }

        if (!!process.env.handlers?.childSend) {
            let sendCBFunction = (typeof process.env.handlers?.childMessage === "function") ? process.env.handlers?.childMessage : require(process.env.handlers?.childMessage);
            (!!process.env.childData) ? child.send({ pid: process.pid, message: sendCBFunction(process.env.childData), event: "childSend" }) : null;
        } else {
            (!!process.env.childData) ? child.send({ pid: process.pid, message: process.env.childData, event: "childSend" }) : null;
        }

    } else {

        return new Promise((resolve, reject) => {
            const { fork, spawn } = require("child_process");
            const controller = new AbortController();
            const { signal } = controller;

            const child = fork(filename, {
                signal: signal, silent: false, env: {
                    ...process.env, FORK: 1, childData: options.childData, handlers: { ...options.handlers }
                }
            });

            child.on("error", (e) => {
                if (!!options.handlers.error) {
                    let errorCBFunction = (typeof options.handlers?.error === "function") ? options.handlers?.error : require(options.handlers?.error);
                    result.push({ message: errorCBFunction(e), pid: process.pid, event: "error" });
                } else {
                    result.push({ message: e, pid: process.pid, event: "error" });
                }
                reject(e);
            });

            child.on("close", function (code, signal) {
                let pid = child.pid, connected = child.connected;
                if (!!options.handlers.close) {
                    let closeCBFunction = (typeof options.handlers?.close === "function") ? options.handlers?.close : require(options.handlers?.close);
                    result.push({ message: closeCBFunction(code, signal, pid, connected), pid: process.pid, event: "close" });
                } else {
                    result.push({ message: { code, signal, pid, connected }, pid: process.pid, event: "close" });
                }
            });

            child.on("message", (data) => {
                messageData.push(data);
                if (!!options.handlers.message) {
                    let messageCBFunction = (typeof options.handlers?.message === "function") ? options.handlers?.message : require(options.handlers?.message);
                    result.push({ message: messageCBFunction(data), pid: process.pid, event: "message" });
                } else {
                    result.push({ message: data, pid: process.pid, event: "message" });
                }
                if (!!data.closeChild) {
                    // 
                    // try {
                    // // Stops the child process on message from child
                    // // Getting Error: 
                    // // AbortError: The operation was aborted
                    //     controller.abort(); 
                    // } catch (e) {
                    //     child.kill(0);
                    // } finally {
                    //     resolve({ messageData, result });
                    // }
                    // 
                    child.kill(0);
                    resolve({ pid: process.pid, message: messageData, result: result });
                }
            });

            if (!!greet) {
                child.send({ pid: process.pid, message: `Master Process PID:${process.pid}: Hello from Master Process`, event: "greet" });
            }

            (!!options.data) ? child.send({ pid: process.pid, message: options.data }) : null;
            if (!!close) {
                child.send({ pid: process.pid, closeChild: true, event: "closeChild" });
            }
        });
    }
}

if (process.env.FORK) {
    _concurrencyProcesses();
}

module.exports._concurrencyProcesses = _concurrencyProcesses;
