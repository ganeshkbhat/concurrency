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

function _concurrencyClusters(filename = __filename, num = cpus().length, options = {}, greet = false, close = true) {
    var worker, workers = {}, result = [];
    var messageData = {}, childMessageData = [];

    if (!options.handlers) {
        options["handlers"] = {};
    }

    return new Promise((resolve, reject) => {
        if (cluster.isPrimary) {
            num = num || cpus().length;
            for (let i = 0; i < num; i++) {
                cluster.fork(filename, { env: { ...process.env, FORK: 1, childData: options.childData, handlers: (!!options.handlers) ? { ...options.handlers } : {} } });
            }

            for (const id in cluster.workers) {
                messageData[id] = [];
                cluster.workers[id].on("message", (msg) => {

                    if (!messageData[id]) {
                        messageData[id] = [];
                    }

                    messageData[id].push(msg);

                    if (!!options.handlers?.message) {
                        let messageCBFunction = require(options.handlers?.message);
                        result.push({ id: id, return: messageCBFunction(msg), id: id, pid: process.pid, event: "message" });
                    } else {
                        result.push({ id: id, return: msg, id: id, pid: process.pid, event: "message" });
                    }

                    if (!!msg.closeChild) {
                        childMessageData.push(msg);
                        cluster.workers[id].disconnect();
                    }

                    if (!Object.keys(cluster.workers).length) {
                        resolve({ id: id, pid: process.pid, message: messageData, result: result });
                    }

                });

                if (!!greet) {
                    cluster.workers[id].send({ id: id, pid: process.pid, message: "Message from Parent: " + process.pid.toString() });
                }

                if (!!options.handlers?.send) {
                    let sendCBFunction = (typeof options.handlers?.send === "function") ? options.handlers?.send : require(options.handlers?.send);
                    (!!options.data) ? cluster.workers[id].send({ id: id, pid: process.pid, message: sendCBFunction(options.data), event: "send" }) : null;
                } else {
                    (!!options.data) ? cluster.workers[id].send({ id: id, pid: process.pid, message: options.data, event: "send" }) : null;
                }

                cluster.workers[id].on("error", function (e) {
                    if (!!options.handlers?.error) {
                        let errorCBFunction = (typeof options.handlers?.error === "function") ? options.handlers?.error : require(options.handlers?.error);
                        result.push({ return: errorCBFunction(e), id: id, pid: process.pid, event: "error" });
                    } else {
                        result.push({ return: e, id: id, pid: process.pid, event: "error" });
                    }
                    reject({ id: id, pid: process.pid, message: e, result: result });
                });

                cluster.workers[id].on("close", function (code, signal) {
                    if (!!options.handlers?.close) {
                        let connected = cluster.workers[id].isConnected();
                        let closeCBFunction = (typeof options.handlers?.close === "function") ? options.handlers?.close : require(options.handlers?.close);
                        // result.push(cbFunction(code, signal, pid, connected));
                        result.push({ return: closeCBFunction(code, signal, pid, connected), id: id, pid: process.pid, event: "close" });
                    } else {
                        result.push({ return: { code, signal, pid, connected }, id: id, pid: process.pid, event: "close" });
                    }
                });

                cluster.workers[id].on("exit", (code) => {
                    if (!!options.handlers?.exit) {
                        let exitCBFunction = require(options.handlers?.exit);
                        result.push({ return: exitCBFunction(code), id: id, pid: process.pid, event: "exit" });
                    } else {
                        result.push({ return: { code }, id: id, pid: process.pid, event: "exit" });
                    }
                    if (!Object.keys(cluster.workers).length) {
                        // console.log("exit called");
                    }
                });

                if (!!close) {
                    cluster.workers[id].send({ closeChild: true })
                }
            }
        } else if (cluster.isWorker) {
            // } else {
            // return new Promise((resolve, reject) => {
            process.on("message", (msg) => {
                childMessageData.push(msg);
                if (!!process.env.handlers?.childMessage) {
                    let messageCBFunction = (typeof process.env.handlers?.childMessage === "function") ? process.env.handlers?.childMessage : require(process.env.handlers?.childMessage);
                    result.push({ return: messageCBFunction(msg), pid: process.pid, event: "childMessage" });
                } else {
                    result.push({ return: msg, pid: process.pid, event: "childMessage" });
                }
                if (!!msg.closeChild) {
                    process.send({ closeChild: true, pid: process.pid, childMessageData: childMessageData, result: result, event: "childMessage" });
                } else {
                    process.send({ closeChild: false, pid: process.pid, childMessageData: childMessageData, result: result, event: "childMessage" });
                }
            });

            if (!!greet) {
                process.send({ pid: process.pid, message: "Message from worker: " + process.pid.toString(), event: "greet" });
            }

            if (!!process.env.handlers?.childSend) {
                let sendCBFunction = (typeof process.env.handlers?.childMessage === "function") ? process.env.handlers?.childMessage : require(process.env.handlers?.childMessage);
                (!!process.env.childData) ? child.send({ pid: process.pid, message: sendCBFunction(process.env.childData), event: "childSend" }) : null;
            } else {
                (!!process.env.childData) ? child.send({ pid: process.pid, message: process.env.childData, event: "childSend" }) : null;
            }

        }
    });

}

if (process.env.FORK) {
    _concurrencyClusters();
}


module.exports._concurrencyClusters = _concurrencyClusters;
