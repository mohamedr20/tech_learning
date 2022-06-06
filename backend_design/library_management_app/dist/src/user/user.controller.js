"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const express_1 = require("express");
class UserController {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, this.findAllUsers);
        this.router.get(`${this.path}/:id`, this.findUser);
        this.router.put(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }
    async findAllUsers(_req, res, next) {
        try {
            const users = await this.userService.findUsers();
            return res.json({ data: users });
        }
        catch (err) {
            next(err);
            throw err;
        }
    }
    async findUser(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.findUserById(id);
            return res.json({ data: user }).status(200);
        }
        catch (err) {
            throw err;
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updateUserResult = await this.userService.updateUser(id, req.body);
            if (updateUserResult === 1)
                return res.json({ data: updateUserResult }).status(200);
            else {
                return res.json({ data: updateUserResult }).status(404);
            }
        }
        catch (err) {
            next(err);
            throw err;
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleteUserResult = await this.userService.deleteUser(id);
            return res.json({ data: deleteUserResult }).status(200);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = UserController;
