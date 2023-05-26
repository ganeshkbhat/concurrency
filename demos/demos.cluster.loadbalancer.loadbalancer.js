/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.cluster.loadbalancer.loadbalancer.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


var loadbalancer = require("../index").loadbalancer;
// var httpSocketServer = require("../index").loadbalancer.sockets.httpSocketServer;
var server = require("./expressapp");

// console.log(loadbalancer);

loadbalancer.loadbalancer({
    "server": server,
    "protocol": "http",
    "createCerts": true,
    "host": "localhost",
    "proxy": {
        "proxy": true,
        "protocol": "http",
        "host": "localhost",
        "port": 7000,
        "proxyHost": "",
        "proxyPort": 9000
    },
    "certs": {
        "key": "./certs/ssl.key",
        "cert": "./certs/ssl.cert"
    },
    "port": 8000,
    "ws": true,
    "processes": 5,
    "threads": 10,
    "mainProcessCallback": () => { },
    "forkCallback": (opts, pr) => {
        // console.log(opts, pr);
        // console.log(opts);
        httpSocketServer(opts);
    },
    "callbacks": {
        "wsOnData": null,
        "wsOnEnd": null,
        "wsUpgrade": null,
        "server": null,
        "listen": null
    }
})
