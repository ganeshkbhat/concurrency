/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/concurrency
 * npmjs Link: https://www.npmjs.com/package/concurrency.js
 * File: index.js
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const expect = require('chai').expect;


describe('test-.js::concurrency.js: [Test A] Test Suite for a simple promise', function () {
    
    it('[Test A] Test for promise tests', async function () {
        var result;
        function testPromise(resolve, reject) {
            return new Promise(function (resolve, reject) {
                resolve({ msg: "testing" });
            });
        }
        result = await testPromise();
        console.log(result);
        expect(result.msg).to.equal("testing");
        // done();
    });
    
});

