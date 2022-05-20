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
exports.deleteUser = exports.findUser = exports.updateUser = exports.findAllUsers = void 0;
const UserService = __importStar(require("../services/user.service"));
const findAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.findUsers();
        return res.json({ data: users });
    }
    catch (err) {
        next(err);
        throw err;
    }
};
exports.findAllUsers = findAllUsers;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateUserResult = await UserService.updateUser(id, req.body);
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
};
exports.updateUser = updateUser;
const findUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.findUserById(id);
        return res.json({ data: user }).status(200);
    }
    catch (err) {
        throw err;
    }
};
exports.findUser = findUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUserResult = await UserService.deleteUserById(id);
        return res.json({ data: deleteUserResult }).status(200);
    }
    catch (err) {
        throw err;
    }
};
exports.deleteUser = deleteUser;
