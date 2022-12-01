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

const path = require("path");
const fs = require("fs");
const { sign } = require("crypto");


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

function _concurrencyProcesses(filename = __filename, options = {}, greet = false) {
    var messageData = [], childMessageData = [], result = [];
    if (!options.handlers) {
        options["handlers"] = {};
    }
    if (process.env.FORK) {
        if (!options.callback) {
            options["callback"] = function (data) {
                childMessageData.push(data);
                if (!!process.env.handlers.childMessage) {
                    const childCBFunction = require(process.env.handlers.childMessage);
                    result.push({ message: childCBFunction(data), pid: process.pid, event: "message" });
                }
                if (!!data.closeChild) {
                    process.send({ closeChild: true, pid: process.pid, childMessageData: childMessageData, result: result });
                }
            }
        }

        // process.stdout.on("message", console.log);
        // process.stdin.on("message", console.log);
        // process.stderr.on("message", console.log);

        process.on("message", options.callback);

        process.on("exit", (code) => {
            // console.log(`worker.process.js: _concurrencyProcesses: Child Process PID:${process.pid}: EXIT CODE ${code} CHILD: `, childMessageData);
            if (!!process.env.handlers.childExit) {
                const cbFunction = require(process.env.handlers.childExit);
                result.push({ message: cbFunction(code), pid: process.pid, event: "exit" });
            }
        });

        if (!!greet) {
            process.send(`Child Process PID:${process.pid}: Hello from Child Process`);
        }

        (!!process.env.childData) ? child.send(process.env.childData) : null;

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
                    const cbFunction = require(options.handlers.error);
                    result.push({ message: cbFunction(e), pid: process.pid, event: "error" });
                }
                reject(e);
            });

            child.on("close", function (code, signal) {
                let pid = child.pid, connected = child.connected;
                if (!!options.handlers.close) {
                    const cbFunction = require(options.handlers.close);
                    result.push({ message: cbFunction(code, signal, pid, connected), pid: process.pid, event: "close" });
                }
            });

            child.on("message", (data) => {
                messageData.push(data);
                if (!!options.handlers.message) {
                    const cbFunction = require(options.handlers.message);
                    result.push({ message: cbFunction(data), pid: process.pid, event: "message" });
                }
                if (!!data.closeChild) {
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
                    child.kill(0);
                    resolve({ messageData, result });
                }
            });

            if (!!greet) {
                child.send(`Master Process PID:${process.pid}: Hello from Master Process`);
            }
            options.data ? child.send(options.data) : null;
            child.send({ closeChild: true });
        })
    }
}

if (process.env.FORK) {
    _concurrencyProcesses()
}

module.exports._concurrencyProcesses = _concurrencyProcesses
