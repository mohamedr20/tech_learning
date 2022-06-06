"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationStatus = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../user/user.service"));
var LoginValidationStatus;
(function (LoginValidationStatus) {
    LoginValidationStatus["NO_EMAIL"] = "Email not provided";
    LoginValidationStatus["NO_PASSWORD"] = "Password not provided";
    LoginValidationStatus["USER_NOT_FOUND"] = "User not found for this email address";
    LoginValidationStatus["INVALID_PASSWORD"] = "Unable to login with this password";
    LoginValidationStatus["SUCCESS"] = "Logged in successfully";
})(LoginValidationStatus = exports.LoginValidationStatus || (exports.LoginValidationStatus = {}));
class AuthService {
    constructor() {
        this.userService = new user_service_1.default();
    }
    async validateRegistration(userData) {
        try {
            const { first_name, last_name, email, password } = userData;
            if (!(email && password && first_name && last_name)) {
                return false;
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    }
    async validateLogin(userInput) {
        try {
            const { email, password } = userInput;
            if (!email)
                return { status: LoginValidationStatus.NO_EMAIL };
            if (!password)
                return { status: LoginValidationStatus.NO_PASSWORD };
            const user = await this.userService.findUserByEmail(userInput.email);
            if (!user)
                return { status: LoginValidationStatus.USER_NOT_FOUND };
            const comparePassword = await bcrypt_1.default.compare(userInput.password, user.password_hash);
            if (!comparePassword)
                return { status: LoginValidationStatus.INVALID_PASSWORD };
            return {
                status: LoginValidationStatus.SUCCESS,
                userId: user.id
            };
        }
        catch (err) {
            throw err;
        }
    }
    async validatePassword(requestBody) {
        try {
            const hash = await bcrypt_1.default.hash(requestBody.password, 10);
            delete requestBody.password;
            return {
                hash,
                requestBody
            };
        }
        catch (err) {
            throw err;
        }
    }
    async createToken(userId, requestBody) {
        try {
            const token = await jsonwebtoken_1.default.sign({ userId, ...requestBody }, "jwt-secret", {
                expiresIn: "6h"
            });
            return token;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = AuthService;
