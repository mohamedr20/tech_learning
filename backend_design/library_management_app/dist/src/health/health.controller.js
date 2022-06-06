"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HealthController {
    constructor() {
        this.path = "/health";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, this.checkHealth);
    }
    async checkHealth(_req, res) {
        try {
            return res.json({ status: "Healthy" });
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = HealthController;
