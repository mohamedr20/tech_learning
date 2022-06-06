import { Request, Response, Router } from "express";

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
    try {
      return res.json({ status: "Healthy" });
    } catch (err) {
      throw err;
    }
  }
}

export default HealthController;
