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
      const oldUser = await this.userService.findUserByEmail(req.body.email);
      if (oldUser) {
        throw new UserExsistsForThisEmailException(req.body.email);
      }

      const { hash, requestBody } = await this.authService.validatePassword(
        req.body
      );

      const userId = await this.userService.insertUser({
        password_hash: hash,
        ...requestBody
      });

      const token = await this.authService.createToken(userId, req.body);

      return res.json({ token });
    } catch (err) {
      next(err);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token;
      const userId = await this.authService.validateLogin(req.body);

      if (userId) {
        token = await this.authService.createToken(userId);
      }

      return res.json({ data: userId, token });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
