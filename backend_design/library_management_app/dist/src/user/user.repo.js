"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repo_1 = __importDefault(require("../repo"));
class UserRepository extends repo_1.default {
    constructor(knex, tableName) {
        super(knex, "users");
        this.knex = knex;
        this.tableName = tableName;
    }
    findUserByEmail(email) {
        return this.queryBuilder.where("email", "=", email).select().first();
    }
}
exports.default = UserRepository;
