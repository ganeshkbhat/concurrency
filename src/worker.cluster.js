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

function _concurrencyClusters(filename = __filename, num = cpus().length, options = {}, greet = false) {
    var worker, workers = {}, result = [];
    var messageData = {}, childMessageData = [];

    if (!options.handlers) {
        options["handlers"] = {};
    }

    return new Promise((resolve, reject) => {
        if (cluster.isPrimary) {
            num = num || cpus().length;
            for (let i = 0; i < num; i++) {
                cluster.fork(filename, { env: { ...process.env, FORK: 1, childData: options.childData, handlers: { ...options.handlers } } });
            }

            for (const id in cluster.workers) {
                messageData[id] = [];
                cluster.workers[id].on("message", (msg) => {
                    if (!messageData[id]) {
                        messageData[id] = [];
                    }
                    messageData[id].push(msg);
                    if (!!options.handlers.message) {
                        const cbFunction = require(options.handlers.message);
                        result.push({ return: cbFunction(msg), id: id, pid: process.pid, event: "message" });
                    }
                    if (!!msg.closeChild) {
                        childMessageData.push(msg);
                        cluster.workers[id].disconnect();
                    }
                    if (!Object.keys(cluster.workers).length) {
                        resolve({ messageData: messageData, result: result });
                    }
                });

                if (!!greet) {
                    cluster.workers[id].send({ pid: process.pid, message: "Message from Parent: " + process.pid.toString() });
                }

                (!!options.data) ? cluster.workers[id].send({ id: id, pid: process.pid, message: options.data }) : null;

                cluster.workers[id].on("error", function (e) {
                    console.log("error called");
                    if (!!options.handlers.error) {
                        const cbFunction = require(options.handlers.error);
                        result.push({ return: cbFunction(e), id: id, pid: process.pid, event: "error" });
                    }
                    reject(e);
                });

                cluster.workers[id].on("close", function (code, signal) {
                    console.log("close called");
                    if (!!options.handlers.close) {
                        let connected = cluster.workers[id].isConnected();
                        const cbFunction = require(options.handlers.close);
                        // result.push(cbFunction(code, signal, pid, connected));
                        result.push({ return: cbFunction(code, signal, pid, connected), id: id, pid: process.pid, event: "close" });
                    }
                });

                cluster.workers[id].on("exit", (code) => {
                    if (!!process.env.handlers.exit) {
                        const cbFunction = require(options.handlers.exit);
                        result.push({ return: cbFunction(code), id: id, pid: process.pid, event: "exit" });
                    }
                    if (!Object.keys(cluster.workers).length) {
                        console.log("exit called");
                    }
                });

                cluster.workers[id].send({ closeChild: true })
            }
        } else if (cluster.isWorker) {
            // } else {
            // return new Promise((resolve, reject) => {
            process.on("message", (msg) => {
                childMessageData.push(msg);
                // if (!!process.env.handlers.childMessage) {
                //     const childCBFunction = require(process.env.handlers.childMessage);
                //     result.push({ return: cbFunction(msg), pid: process.pid, event: "message" });
                // }
                if (!!msg.closeChild) {
                    process.send({ closeChild: true, pid: process.pid, childMessageData: childMessageData, result: result });
                }
            });

            if (!!greet) {
                process.send({ pid: process.pid, message: "Message from worker: " + process.pid.toString() });
            }

            (!!process.env.childData) ? child.send({ pid: process.pid, message: process.env.childData }) : null;
        }
    });
}

if (process.env.FORK) {
    _concurrencyClusters()
}


module.exports._concurrencyClusters = _concurrencyClusters
