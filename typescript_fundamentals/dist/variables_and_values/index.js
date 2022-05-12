"use strict";
let a = 6;
// a = "Hello there"; This will throw a Typescript error
const age = 6;
// constants cannot be reassigned, const age: 6 (Has to be the number 6)
// This is called a literal type, it is literally the type number 6
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;
let startTime = new Date();
let endTime; // Variables that are defined without a value are assigned a type of any
// This is how normal Javascript works
setTimeout(() => {
    endTime = 0;
    endTime = new Date();
}, RANDOM_WAIT_TIME);
function add(a, b) {
    return a + b; // string, numbers or a mix?
}
const result = add(2, 3);
//const result1 = add(2, "a"); // Without type annotations, we can pass in any value to add()
