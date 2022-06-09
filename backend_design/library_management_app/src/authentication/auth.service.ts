import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isNamedExportBindings, tokenToString } from "typescript";
import HttpException from "../exceptions/HttpException";
import UserExsistsForThisEmailException from "../exceptions/UserExsistsForThisEmailException";
import InvalidCredentialsException from "../exceptions/InvalidCredentialsException";
import CreateUserDto from "../user/user.dto";

import UserService from "../user/user.service";
import LogInDtO from "./login.dto";

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

  public async register(userInput: CreateUserDto): Promise<string> {
    const oldUser = await this.userService.findUserByEmail(userInput.email);
    if (oldUser) {
      throw new UserExsistsForThisEmailException(userInput.email);
    }

    const hash = await bcrypt.hash(userInput.password as string, 10);
    if (!hash) throw new InvalidCredentialsException();

    delete userInput.password;

    const userId = await this.userService.insertUser({
      password_hash: hash,
      ...userInput
    });

    const token = await this.createToken(userId, userInput);

    return token;
  }

  public async login(userInput: LogInDtO): Promise<string> {
    const user = await this.userService.findUserByEmail(userInput.email);

    if (!user) throw new UserExsistsForThisEmailException(userInput.email);

    const comparePassword = await bcrypt.compare(
      userInput.password,
      user.password_hash
    );

    if (!comparePassword) throw new InvalidCredentialsException();

    const token = this.createToken(user.id);

    return token;
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
