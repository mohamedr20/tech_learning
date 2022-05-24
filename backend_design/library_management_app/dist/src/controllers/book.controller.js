"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.deleteBook = exports.updateBook = exports.getBook = exports.search = void 0;
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
const getBook = async (req, res) => {
    try {
        // const { id } = req.params;
        // const deleteUserResult: number = await UserService.deleteUserById(id);
        // return res.json({ data: deleteUserResult }).status(200);
        return res.json({});
    }
    catch (err) {
        throw err;
    }
};
exports.getBook = getBook;
const updateBook = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // const updateUserResult: number = await UserService.updateUser(id, req.body);
        // if (updateUserResult === 1)
        //   return res.json({ data: updateUserResult }).status(200);
        // else {
        //   return res.json({ data: updateUserResult }).status(404);
        // }
        return res.json({});
    }
    catch (err) {
        next(err);
        throw err;
    }
};
exports.updateBook = updateBook;
const createBook = async (req, res) => {
    try {
        // const { id } = req.params;
        // const user = await UserService.findUserById(id);
        // return res.json({ data: user }).status(200);
        return res.json({});
    }
    catch (err) {
        throw err;
    }
};
exports.createBook = createBook;
const deleteBook = async (req, res) => {
    try {
        // const { id } = req.params;
        // const deleteUserResult: number = await UserService.deleteUserById(id);
        // return res.json({ data: deleteUserResult }).status(200);
        return res.json({});
    }
    catch (err) {
        throw err;
    }
};
exports.deleteBook = deleteBook;
