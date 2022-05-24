"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.findBookByCategory = exports.findBookByAuthor = exports.findBookByTitle = exports.findBookByPublicationDate = exports.findBooks = exports.updateBook = exports.createBook = void 0;
const knexfile_1 = __importDefault(require("../../knexfile"));
const knex_1 = __importDefault(require("knex"));
const dbInstance = (0, knex_1.default)(knexfile_1.default["development"]);
const createBook = async (userInput) => {
    try {
        const createUserResult = await dbInstance("users").insert({ ...userInput }, "id");
        return createUserResult;
    }
    catch (err) {
        throw err;
    }
};
exports.createBook = createBook;
const updateBook = async (id, updateBody) => {
    try {
        const updateResult = await dbInstance("users")
            .where("id", "=", id)
            .update({ ...updateBody });
        return updateResult;
    }
    catch (err) {
        throw err;
    }
};
exports.updateBook = updateBook;
const findBooks = async () => {
    const users = await dbInstance
        .select("id", "email", "first_name", "created_at", "updated_at")
        .from("users");
    return users;
};
exports.findBooks = findBooks;
const findBookByAuthor = async (id) => {
    try {
        const user = await dbInstance("users")
            .select("id", "email", "first_name", "created_at", "updated_at")
            .where("id", "=", id);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.findBookByAuthor = findBookByAuthor;
const findBookByTitle = async (id) => {
    try {
        const user = await dbInstance("users")
            .select("id", "email", "first_name", "created_at", "updated_at")
            .where("id", "=", id);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.findBookByTitle = findBookByTitle;
const findBookByPublicationDate = async (id) => {
    try {
        const user = await dbInstance("users")
            .select("id", "email", "first_name", "created_at", "updated_at")
            .where("id", "=", id);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.findBookByPublicationDate = findBookByPublicationDate;
const findBookByCategory = async (id) => {
    try {
        const user = await dbInstance("users")
            .select("id", "email", "first_name", "created_at", "updated_at")
            .where("id", "=", id);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.findBookByCategory = findBookByCategory;
const deleteBook = async (id) => {
    try {
        const deleteResult = await dbInstance("users")
            .where("id", "=", id)
            .del();
        return deleteResult;
    }
    catch (err) {
        throw err;
    }
};
exports.deleteBook = deleteBook;
