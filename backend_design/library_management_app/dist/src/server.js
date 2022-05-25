"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 8000;
app_1.default.get("/health", (req, res) => {
    res.json({ status: "Healthy" });
});
app_1.default.get("/test", (req, res) => {
    res.json({ status: "Test" });
});
app_1.default.listen(port, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
