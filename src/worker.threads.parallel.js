/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: worker.threads.parallel.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


function runFunctionInWorkerThreads(func, argsArray) {
    const promises = [];

    for (let i = 0; i < argsArray.length; i++) {
        const worker = new Worker('worker.js');

        const promise = new Promise((resolve) => {
            worker.onmessage = (event) => {
                resolve({ result: event.data, index: i });
                worker.terminate();
            };
        });

        worker.onerror = (error) => {
            resolve({ error, index: i });
            worker.terminate();
        };

        worker.postMessage({ func, args: argsArray[i], index: i });
        promises.push(promise);
    }

    return Promise.all(promises).then((results) => {
        const output = { results: [], errors: [] };
        results.forEach((result) => {
            if (result.error) {
                output.errors[result.index] = result.error;
            } else {
                output.results[result.index] = result.result;
            }
        });
        return output;
    });
}
