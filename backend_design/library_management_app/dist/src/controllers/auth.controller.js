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
exports.register = exports.login = void 0;
const UserService = __importStar(require("../services/user.service"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res, next) => {
    try {
        // Get User input
        // Validate user input
        // check to see if the user already exsists
        // encrypt the user's password
        // create the user in the db
        // create a signed jwt token
        const { firstname, lastname, email, password } = req.body;
        // Validate user input
        if (!(email && password && firstname && lastname)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await UserService.findUserByEmail(email);
        console.log(`old user ${JSON.stringify(oldUser)}`);
        if (oldUser) {
            console.log("user is old");
            return res.status(409).send("User already exsists for this email");
        }
        let encryptedPassword = await bcrypt_1.default.hash(password, 10);
        delete req.body.password;
        const user = await UserService.insertUser({
            firstname,
            lastname,
            email,
            passwordhash: encryptedPassword,
            ...req.body
        });
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ ...req.body }, "jwt-secret", {
            expiresIn: "6h"
        });
        return res.json({ token });
    }
    catch (err) {
        throw err;
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        // Get user input
        // Validate user input
        // check to see if the user already exsists
        // Verify incoming user password with what the hash we have in the DB
        // Return signed jwt token
        const userInput = req.body;
        if (!userInput.email)
            next(new HttpException_1.default(403, "Email required for login"));
        if (!userInput.password)
            next(new HttpException_1.default(403, "Password required for login"));
        const user = await UserService.findUserByEmail(userInput.email);
        if (!user)
            next(new HttpException_1.default(404, "Unable to find user for this email address"));
        const hashedPassword = await bcrypt_1.default.hash(userInput.password, 10);
        const comparePassword = await bcrypt_1.default.compare(hashedPassword, user.passwordhash);
        if (!comparePassword)
            next(new HttpException_1.default(403, "Unable to log in with this password"));
        const token = jsonwebtoken_1.default.sign({ user_id: user.id }, "jwt-secret", {
            expiresIn: "6h"
        });
        return res.json({ data: user, token });
    }
    catch (err) {
        next(err);
        throw err;
    }
};
exports.login = login;
