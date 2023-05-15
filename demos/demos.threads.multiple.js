/**
 * 
 * Package: concurrency.js
 * Author: Ganesh B
 * Description: npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files
 * Install: npm i concurrency.js --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: demos.threads.multiple.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const postData = { foo: 'bar' };
const options = { headers: { 'Authorization': 'Bearer <TOKEN>' } };

makePostRequest('https://example.com/api', postData, options)
    .then((response) => {
        console.log(`Status code: ${response.statusCode}`);
        console.log(`Response body: ${response.body}`);
    })
    .catch((error) => {
        console.error(error);
    });


const urls = ['https://www.google.com', 'https://www.google.com/search?q=javascript', 'https://www.google.com/search?q=web+workers'];
fetchMultipleUrls(urls)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });
