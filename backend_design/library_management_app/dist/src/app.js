"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_middleware_1 = __importDefault(require("./middleware/logger.middleware"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
dotenv_1.default.config();
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server started at port ${process.env.PORT}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded());
        this.app.use(logger_middleware_1.default);
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
}
exports.default = App;
