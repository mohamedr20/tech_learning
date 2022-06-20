import { Request, Response, Router } from "express";
import logger from "../utils/logger";

class HealthController {
  public path = "/health";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/`, this.checkHealth);
  }

  async checkHealth(_req: Request, res: Response): Promise<Response> {
    logger.info(`Inside health.controller, checking for health...`);
    return res.json({ status: "Healthy" });
  }
}

export default HealthController;
