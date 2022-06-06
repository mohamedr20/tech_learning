import UserService from "../user/user.service";
import AuthService, { LoginValidationStatus } from "./auth.service";

import { NextFunction, Request, Response, Router } from "express";
import HttpException from "../exceptions/HttpException";
import validateMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../user/user.dto";
import LogInDtO from "./login.dto";

type ControllerResponse = Response | HttpException;

class AuthController {
  public path = "/auth";
  public router = Router();
  private authService = new AuthService();
  private userService = new UserService();

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

  private async register(
    req: Request,
    res: Response
  ): Promise<ControllerResponse> {
    try {
      const isRegistrationValid = await this.authService.validateRegistration(
        req.body
      );

      if (!isRegistrationValid) {
        return res.status(400).send("All input is required");
      }

      const oldUser = await this.userService.findUserByEmail(req.body.email);

      if (oldUser) {
        return res
          .status(409)
          .send("User already exsists for this email address");
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
      throw err;
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      let token;
      const { status, userId } = await this.authService.validateLogin(req.body);

      switch (status) {
        case LoginValidationStatus.NO_EMAIL:
          throw new HttpException(403, LoginValidationStatus.NO_EMAIL);
        case LoginValidationStatus.NO_PASSWORD:
          throw new HttpException(403, LoginValidationStatus.NO_PASSWORD);
        case LoginValidationStatus.INVALID_PASSWORD:
          throw new HttpException(403, LoginValidationStatus.INVALID_PASSWORD);
        case LoginValidationStatus.USER_NOT_FOUND:
          throw new HttpException(403, LoginValidationStatus.USER_NOT_FOUND);
        case LoginValidationStatus.SUCCESS:
          if (userId) {
            token = await this.authService.createToken(userId);
          }
      }

      return res.json({ data: userId, token });
    } catch (err) {
      throw err;
    }
  }
}

export default AuthController;
