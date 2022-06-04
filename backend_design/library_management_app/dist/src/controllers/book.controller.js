"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.deleteBook = exports.updateBook = exports.getBook = exports.search = void 0;
const BookService = __importStar(require("../services/book.service"));
const search = async (req, res, next) => {
    try {
        // const users: User[] = await UserService.findUsers();
        // return res.json({ data: users });
        return res.json({});
    }
    catch (err) {
        next(err);
        throw err;
    }
};
exports.search = search;
const getBook = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // const deleteUserResult: number = await UserService.deleteUserById(id);
        // return res.json({ data: deleteUserResult }).status(200);
        return res.json({});
    }
    catch (err) {
        next(err);
    }
};
exports.getBook = getBook;
const validateUpdateRequest = (updateBody) => {
    const validKeys = [
        "title",
        "description",
        "publication_date",
        "isbn",
        "is_best_seller",
        "is_reference"
    ];
    const isValidKey = (currentKey) => validKeys.indexOf(currentKey) > -1;
    return Object.keys(updateBody).every(isValidKey);
};
const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        console.log(Object.keys(req.body));
        if (validateUpdateRequest(req.body) === false) {
            return res.json({
                status: 409,
                message: "Payload has an invalid format"
            });
        }
        const updateBookResult = await BookService.updateBook(id, req.body);
        if (updateBookResult) {
            return res.json({ data: updateBookResult }).status(200);
        }
        return res.json({ statusCode: 404, message: "Unable to update this book" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateBook = updateBook;
const createBook = async (req, res) => {
    try {
        const createBookResult = await BookService.createBook(req.body);
        return res.json({ data: createBookResult }).status(201);
    }
    catch (err) {
        throw err;
    }
};
exports.createBook = createBook;
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBookResult = await BookService.deleteBook(id);
        return res.json({ data: deleteBookResult }).status(200);
    }
    catch (err) {
        throw err;
    }
};
exports.deleteBook = deleteBook;
