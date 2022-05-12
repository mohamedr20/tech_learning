"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookItem = void 0;
const Book_1 = require("./Book");
class BookItem extends Book_1.Book {
    constructor() {
        super();
    }
    checkout() {
        return false;
    }
}
exports.BookItem = BookItem;
