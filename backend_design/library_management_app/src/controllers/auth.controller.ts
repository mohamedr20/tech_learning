import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type ControllerResponse = Response | HttpException;

class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async register(req: Request, res: Response): Promise<ControllerResponse> {
    try {
      const isRegistrationValid = await this.authService.checkRegistration(
        req.body
      );

      if (!isRegistrationValid) {
        return res.status(400).send("All input is required");
      }

      const oldUser = await this.userService.findUserByEmail(req.body.email);

      if (oldUser) {
        return res.json({
          statusCode: 409,
          message: "User already exsists for this email address"
        });
      }

      let encryptedPassword = await bcrypt.hash(password, 10);
      delete req.body.password;

      const userId = await this.userService.insertUser({
        password_hash: encryptedPassword,
        ...req.body
      });

      const token = jwt.sign({ userId, ...req.body }, "jwt-secret", {
        expiresIn: "6h"
      });

      return res.json({ token });
    } catch (err) {
      throw err;
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userInput = req.body;
      if (!userInput.email)
        next(new HttpException(403, "Email required for login"));
      if (!userInput.password)
        next(new HttpException(403, "Password required for login"));

      const user = await this.userService.findUserByEmail(userInput.email);

      if (!user)
        throw new HttpException(
          404,
          "Unable to find user for this email address"
        );

      const comparePassword = await bcrypt.compare(
        userInput.password,
        user.password_hash
      );

      if (!comparePassword)
        res.json({
          error: new HttpException(403, "Unable to log in with this password")
        });

      const token = jwt.sign({ user_id: user.id }, "jwt-secret", {
        expiresIn: "6h"
      });

      return res.json({ data: user, token });
    } catch (err) {
      throw err;
    }
  }
}

export default AuthController;
