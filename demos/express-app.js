/**
 * 
 * Package: loadbalancer
 * Author: Ganesh B
 * Description: A simple threaded and clustered load balancer for nodejs
 * Install: npm i loadbalancer --save
 * Github: https://github.com/ganeshkbhat/loadbalancer
 * npmjs Link: https://www.npmjs.com/package/loadbalancer
 * File: demos/express-app.js
 * File Description: A simple threaded and clustered load balancer for nodejs
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

var express = require("express")();

express.all("/", (req, res) => {
        console.log("TESTING CLUSTER PROCESS ", process.pid);
        res.status(200).send(`{ 'hello': 'server', 'pid': ${process.pid} }`)
})

express.get("/test", (req, res) => {
        console.log("TESTING CLUSTER PROCESS ", process.pid);
        res.status(200).send(`{ 'hello': 'server', 'pid': ${process.pid} }`)
})

express.listen(8000, "127.0.0.1", () => { console.log("Starting server at 8000") });
// module.exports = express;

// app.handle(req, res, next);
