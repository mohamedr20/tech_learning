"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.findUsers = void 0;
const knexfile_1 = __importDefault(require("../../knexfile"));
const knex_1 = __importDefault(require("knex"));
const dbInstance = (0, knex_1.default)(knexfile_1.default["development"]);
const findUsers = async () => {
    const users = await dbInstance
        .select('id', 'email', 'firstname', 'created_at', 'updated_at')
        .from('users');
    return users;
};
exports.findUsers = findUsers;
const updateUser = async (id, updateBody) => {
    const updateResult = dbInstance('users')
        .update({ ...updateBody })
        .where('id', id);
    console.log(updateResult);
    return updateResult;
};
exports.updateUser = updateUser;
