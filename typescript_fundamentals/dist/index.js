"use strict";
/**
 * Create a promise that resolves after some time
 * @param n is the number of miliseconds before promise resolve
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNumbers = void 0;
function timeout(n) {
    return new Promise((res) => setTimeout(res, n));
}
/**
 * Add three numbers
 * @param a is the first number
 * @param b is the second number
 */
async function addNumbers(a, b) {
    await timeout(2000);
    return a + b;
}
exports.addNumbers = addNumbers;
(async () => {
    console.log(await addNumbers(3, 4));
})();
