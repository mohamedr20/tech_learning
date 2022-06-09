import UserService from "../user/user.service";
import AuthService from "./auth.service";
import { NextFunction, Request, Response, Router } from "express";
import HttpException from "../exceptions/HttpException";
import validateMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../user/user.dto";
import LogInDtO from "./login.dto";
import { Controller } from "../utils/interfaces";
import { UserExsistsForThisEmailException } from "../exceptions/index";

type ControllerResponse = Response | HttpException;

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  public authService = new AuthService();
  public userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validateMiddleware(CreateUserDto),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validateMiddleware(LogInDtO),
      this.login
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ControllerResponse | undefined> => {
    try {
      const token = await this.authService.register(req.body);
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.authService.login(req.body);
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
