"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const auth_controller_1 = __importDefault(require("./authentication/auth.controller"));
const health_controller_1 = __importDefault(require("./health/health.controller"));
const port = process.env.PORT || 8000;
const app = new app_1.default([
    new health_controller_1.default(),
    new user_controller_1.default(),
    new auth_controller_1.default()
]);
app.listen(port);
