import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isNamedExportBindings } from "typescript";
import HttpException from "../exceptions/HttpException";
import UserExsistsForThisEmailException from "../exceptions/UserExsistsForThisEmailException";
import InvalidCredentialsException from "../exceptions/InvalidCredentialsException";
import CreateUserDto from "../user/user.dto";

import UserService from "../user/user.service";

interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export enum LoginValidationStatus {
  NO_EMAIL = "Email not provided",
  NO_PASSWORD = "Password not provided",
  USER_NOT_FOUND = "User not found for this email address",
  INVALID_PASSWORD = "Unable to login with this password",
  SUCCESS = "Logged in successfully"
}

class AuthService {
  public userService = new UserService();

  constructor() {}

  public async validateLogin(userInput: LoginBody): Promise<number> {
    const user = await this.userService.findUserByEmail(userInput.email);

    //TODO: Convert to http exception for User not found for this email
    if (!user) throw new UserExsistsForThisEmailException(userInput.email);

    const comparePassword = await bcrypt.compare(
      userInput.password,
      user.password_hash
    );

    if (!comparePassword) throw new InvalidCredentialsException();
    return user.id;
  }

  public async validatePassword(requestBody: RegisterBody): Promise<{
    hash: string;
    requestBody: RegisterBody;
  }> {
    const hash = await bcrypt.hash(requestBody.password as string, 10);
    if (!hash) throw new InvalidCredentialsException();
    delete requestBody.password;
    return {
      hash,
      requestBody
    };
  }

  public async createToken(
    userId: number,
    requestBody?: RegisterBody
  ): Promise<string> {
    const token = await jwt.sign({ userId, ...requestBody }, "jwt-secret", {
      expiresIn: "6h"
    });
    return token;
  }
}

export default AuthService;
