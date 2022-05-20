"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("../src/routes/user.routes"));
const auth_routes_1 = __importDefault(require("../src/routes/auth.routes"));
const logger_1 = __importDefault(require("../src/middleware/logger"));
const error_1 = __importDefault(require("./middleware/error"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//const enviroment = process.env.NODE_ENV || "development";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(logger_1.default);
app.use(error_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/users", user_routes_1.default);
app.get("/health", (req, res) => {
    res.json({ status: "Healthy" });
});
app.get("/test", (req, res) => {
    res.json({ status: "Test" });
});
app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
