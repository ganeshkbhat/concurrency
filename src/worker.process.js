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

const path = require('path');
const fs = require('fs');
const { sign } = require('crypto');


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

function _concurrencyProcesses(filename, options = {}, greet = true) {
    var messageData = [], childMessageData = [], result = [];
    if (!options.handlers) {
        options["handlers"] = {};
    }
    if (process.env.FORK) {
        if (!options.callback) {
            options["callback"] = function (data) {
                childMessageData.push(data);
                if (!!process.env.handlers.childMessageHandlerFile) {
                    const childCBFunction = require(process.env.handlers.childMessageHandlerFile);
                    result.push({ message: childCBFunction(data), pid: null, event: null });
                }
                if (!!data.childClose) {
                    process.send({ childClose: true, pid: process.pid, childMessageData: childMessageData });
                }
            }
        }

        // process.stdout.on("message", console.log);
        // process.stdin.on("message", console.log);
        // process.stderr.on("message", console.log);

        process.on('message', options.callback);
        process.on('exit', (code) => {
            // console.log(`worker.process.js: _concurrencyProcesses: Child Process PID:${process.pid}: EXIT CODE ${code} CHILD: `, childMessageData);
            if (!!process.env.handlers.exitHandlerFile) {
                const cbFunction = require(options.handlers.exitHandlerFile);
                result.push({ message: cbFunction(code), pid: null, event: null });
            }
        });
        if (!!greet) {
            process.send(`Child Process PID:${process.pid}: Hello from Child Process`);
        }
        (!!process.env.childData) ? child.send(process.env.childData) : null;

    } else {

        return new Promise((resolve, reject) => {
            const { fork, spawn } = require('child_process');
            const controller = new AbortController();
            const { signal } = controller;

            const child = fork(filename, {
                signal: signal, silent: false, env: {
                    ...process.env, FORK: 1, childData: options.childData, handlers: { ...options.handlers }
                }
            });
            child.on('error', (e) => {
                if (!!options.handlers.errorHandlerFile) {
                    const cbFunction = require(options.handlers.errorHandlerFile);
                    result.push({ message: cbFunction(e), pid: null, event: null });
                }
                reject(e);
            });

            child.on("close", function (code, signal) {
                let pid = child.pid, connected = child.connected;
                if (!!options.handlers.closeHandlerFile) {
                    const cbFunction = require(options.handlers.closeHandlerFile);
                    result.push({ message: cbFunction(code, signal, pid, connected), pid: null, event: null });
                }
            });

            child.on('message', (data) => {
                messageData.push(data);
                if (!!options.handlers.callbackFile) {
                    const cbFunction = require(options.handlers.callbackFile);
                    result.push({ message: cbFunction(data), pid: null, event: null });
                }
                if (!!data.childClose) {
                    // try {
                    // // Stops the child process on message from child
                    // // Getting Error: AbortError: The operation was aborted
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
            child.send({ childClose: true });
        })
    }
}

if (process.env.FORK) {
    _concurrencyProcesses()
}

module.exports._concurrencyProcesses = _concurrencyProcesses
