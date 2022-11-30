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

const cluster = require("node:cluster");
const http = require("node:http");
const { cpus } = require("node:os");
const process = require("node:process");

function _concurrencyClusters(filename, num = cpus().length, options = {}, greet = true) {
    var worker, workers = {}, result = [];
    var messageData = {}, childMessageData = [];

    if (!options.handlers) {
        options["handlers"] = {};
    }

    return new Promise((resolve, reject) => {
        if (cluster.isPrimary) {
            num = num || cpus().length;
            for (let i = 0; i < num; i++) {
                cluster.fork({ env: { ...process.env, FORK: 1, childData: options.childData, handlers: { ...options.handlers } } });
            }

            for (const id in cluster.workers) {
                messageData[id] = [];
                cluster.workers[id].on("message", (msg) => {
                    if (!messageData[id]) {
                        messageData[id] = [];
                    }
                    messageData[id].push(msg);
                    if (!!options.handlers.messageHandlerFile) {
                        const cbFunction = require(options.handlers.messageHandlerFile);
                        result.push({ message: cbFunction(msg), pid: null, event: null });
                    }
                    if (!!msg.childClose) {
                        childMessageData.push(msg);
                        cluster.workers[id].disconnect();
                    }
                    if (!Object.keys(cluster.workers).length) {
                        resolve({ messageData: messageData, childMessageData: childMessageData, result: result });
                    }
                });

                if (!!greet) {
                    cluster.workers[id].send("Message from Parent: " + process.pid.toString());
                }

                (!!options.data) ? cluster.workers[id].send({ id, pid: process.pid.toString(), msg: options.data }) : null;

                cluster.workers[id].on("error", function (e) {
                    console.log("error called");
                    if (!!options.handlers.errorHandlerFile) {
                        const cbFunction = require(options.handlers.errorHandlerFile);
                        result.push({ message: cbFunction(e), pid: null, event: null });
                    }
                    reject(e);
                });

                cluster.workers[id].on("close", function (code, signal) {
                    console.log("close called");
                    if (!!options.handlers.closeHandlerFile) {
                        let connected = cluster.workers[id].isConnected();
                        const cbFunction = require(options.handlers.closeHandlerFile);
                        // result.push(cbFunction(code, signal, pid, connected));
                        result.push({ message: cbFunction(code, signal, pid, connected), pid: null, event: null });
                    }
                });

                cluster.workers[id].on("exit", (code) => {
                    if (!!process.env.handlers.exitHandlerFile) {
                        const cbFunction = require(options.handlers.exitHandlerFile);
                        result.push({ message: cbFunction(code), pid: null, event: null });
                    }
                    if (!Object.keys(cluster.workers).length) {
                        console.log("exit called");
                    }
                });

                cluster.workers[id].send({ childClose: true })
            }
        } else if (cluster.isWorker) {
            // } else {
            // return new Promise((resolve, reject) => {
            process.on('message', (msg) => {
                childMessageData.push(msg);
                // if (!!process.env.handlers.childMessageHandlerFile) {
                //     const childCBFunction = require(process.env.handlers.childMessageHandlerFile);
                //     result.push({ message: cbFunction(msg), pid: null, event: null });
                // }
                if (!!msg.childClose) {
                    process.send({ childClose: true, pid: process.pid, childMessageData: childMessageData, result: result });
                }
            });

            if (!!greet) {
                process.send("Message from worker: " + process.pid.toString());
            }

            (!!process.env.childData) ? child.send({ id, pid: process.pid.toString(), msg: process.env.childData }) : null;
        }
    });
}

if (process.env.FORK) {
    _concurrencyClusters()
}


module.exports._concurrencyClusters = _concurrencyClusters
