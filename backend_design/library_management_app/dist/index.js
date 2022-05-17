"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//const enviroment = process.env.NODE_ENV || "development";
app.get('/health', (req, res) => {
    res.json({ status: 'Healthy' });
});
app.get('/test', (req, res) => {
    res.json({ status: 'Test' });
});
app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
