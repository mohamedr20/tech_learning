"use strict";
// In general, objects are defined by the names of the properties
// and the types of those properties
// We can define this object as a type
let car;
/**
 * Print information about a car to the console
 * @param car - the car to print
 */
function printCar(car) {
    console.log(`${car.make} ${car.model} ${car.year}`);
}
// We can also add optional properties to the car type
function printCar2(car) {
    let str = `${car.make} ${car.model} ${car.year}`;
    if (typeof car.voltageCount !== undefined) {
        str += car.voltageCount;
    }
    console.log(str);
}
printCar2({
    make: "Toyota",
    model: "Camry",
    year: 1996,
});
printCar2({
    make: "Toyota",
    model: "Camry",
    year: 1996,
    voltageCount: 540
});
// The print car function now works, even if car.voltageCount doesn't exsist in the object
// We can store phone numbers under a key and each phone number has three attributes of type string
// We can describe this value using an index signature
let phone = {};
const phones = {
    home: { country: "+1", area: "211", number: "652-4515" },
    work: { country: "+1", area: "670", number: "752-5856" },
    fax: { country: "+1", area: "322", number: "525-4357" },
};
// array of type {make:string, model:string, year: number}[]
const cars = [
    {
        make: "Toyota",
        model: "Camry",
        year: 1996,
    }
];
let myCar = [2002, 'Camry', 'Toyota']; // year, model, make
let [year, model, make] = myCar;
