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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../user/user.service"));
const auth_service_1 = __importStar(require("./auth.service"));
const express_1 = require("express");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const user_dto_1 = __importDefault(require("../user/user.dto"));
const login_dto_1 = __importDefault(require("./login.dto"));
class AuthController {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authService = new auth_service_1.default();
        this.userService = new user_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}\register`, (0, validation_middleware_1.default)(user_dto_1.default), this.register);
        this.router.post(`${this.path}\login`, (0, validation_middleware_1.default)(login_dto_1.default), this.login);
    }
    async register(req, res) {
        try {
            const isRegistrationValid = await this.authService.validateRegistration(req.body);
            if (!isRegistrationValid) {
                return res.status(400).send("All input is required");
            }
            const oldUser = await this.userService.findUserByEmail(req.body.email);
            if (oldUser) {
                return res
                    .status(409)
                    .send("User already exsists for this email address");
            }
            const { hash, requestBody } = await this.authService.validatePassword(req.body);
            const userId = await this.userService.insertUser({
                password_hash: hash,
                ...requestBody
            });
            const token = await this.authService.createToken(userId, req.body);
            return res.json({ token });
        }
        catch (err) {
            throw err;
        }
    }
    async login(req, res, next) {
        try {
            let token;
            const { status, userId } = await this.authService.validateLogin(req.body);
            switch (status) {
                case auth_service_1.LoginValidationStatus.NO_EMAIL:
                    throw new HttpException_1.default(403, auth_service_1.LoginValidationStatus.NO_EMAIL);
                case auth_service_1.LoginValidationStatus.NO_PASSWORD:
                    throw new HttpException_1.default(403, auth_service_1.LoginValidationStatus.NO_PASSWORD);
                case auth_service_1.LoginValidationStatus.INVALID_PASSWORD:
                    throw new HttpException_1.default(403, auth_service_1.LoginValidationStatus.INVALID_PASSWORD);
                case auth_service_1.LoginValidationStatus.USER_NOT_FOUND:
                    throw new HttpException_1.default(403, auth_service_1.LoginValidationStatus.USER_NOT_FOUND);
                case auth_service_1.LoginValidationStatus.SUCCESS:
                    if (userId) {
                        token = await this.authService.createToken(userId);
                    }
            }
            return res.json({ data: userId, token });
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = AuthController;
