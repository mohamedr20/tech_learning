"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const user_repo_1 = __importDefault(require("./user.repo"));
const knexfile_1 = __importDefault(require("../../knexfile"));
class UserService {
    constructor() {
        this.userRepository = new user_repo_1.default((0, knex_1.default)(knexfile_1.default["development"]), "users");
    }
    async findUsers() {
        try {
            const users = await this.userRepository.find([
                "id",
                "email",
                "first_name",
                "last_name",
                "username"
            ]);
            return users;
        }
        catch (err) {
            throw err;
        }
    }
    async updateUser(id, updateBody) {
        try {
            const updateResult = await this.userRepository.update(id, updateBody);
            return updateResult;
        }
        catch (err) {
            throw err;
        }
    }
    async findUserById(id) {
        try {
            const user = await this.userRepository.findOne(id);
            return user;
        }
        catch (err) {
            throw err;
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            return user;
        }
        catch (err) {
            throw err;
        }
    }
    async insertUser(userInput) {
        try {
            const createUserResult = await this.userRepository.insert({
                ...userInput
            });
            return createUserResult;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteUser(id) {
        try {
            const deleteUserResult = await this.userRepository.delete(id);
            return deleteUserResult;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = UserService;
