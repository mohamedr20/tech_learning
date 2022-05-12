"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookStatus = void 0;
var BookStatus;
(function (BookStatus) {
    BookStatus[BookStatus["Available"] = 0] = "Available";
    BookStatus[BookStatus["Reserved"] = 1] = "Reserved";
    BookStatus[BookStatus["Loaned"] = 2] = "Loaned";
    BookStatus[BookStatus["Lost"] = 3] = "Lost";
})(BookStatus = exports.BookStatus || (exports.BookStatus = {}));
