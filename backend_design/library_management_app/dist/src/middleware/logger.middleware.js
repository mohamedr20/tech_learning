"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myLogger = (req, res, next) => {
    console.log("logged");
    console.log(req.headers);
    next();
};
exports.default = myLogger;
