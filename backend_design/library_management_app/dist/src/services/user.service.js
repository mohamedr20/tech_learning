"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.findUserByEmail = exports.deleteUserById = exports.findUserById = exports.updateUser = exports.findUsers = void 0;
const knexfile_1 = __importDefault(require("../../knexfile"));
const knex_1 = __importDefault(require("knex"));
const user_repo_1 = __importDefault(require("../repo/user.repo"));
const dbInstance = (0, knex_1.default)(knexfile_1.default["development"]);
const findUsers = async () => {
    const userRepo = new user_repo_1.default(dbInstance, "users");
    const users = await userRepo.find([
        "id",
        "email",
        "first_name",
        "last_name",
        "username"
    ]);
    return users;
};
exports.findUsers = findUsers;
const updateUser = async (id, updateBody) => {
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
exports.updateUser = updateUser;
const findUserById = async (id) => {
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
exports.findUserById = findUserById;
const findUserByEmail = async (email) => {
    try {
        const user = await dbInstance("users")
            .first("id", "email", "password_hash", "first_name", "created_at", "updated_at")
            .where("email", "=", email);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.findUserByEmail = findUserByEmail;
const insertUser = async (userInput) => {
    try {
        console.log(userInput);
        const createUserResult = await dbInstance("users").insert({ ...userInput }, "id");
        return createUserResult;
    }
    catch (err) {
        throw err;
    }
};
exports.insertUser = insertUser;
const deleteUserById = async (id) => {
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
exports.deleteUserById = deleteUserById;
