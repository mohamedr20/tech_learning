import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "./user.service";

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
  private userService = new UserService();
  constructor() {}

  async validateRegistration(registerBody: RegisterBody): Promise<boolean> {
    try {
      const { first_name, last_name, email, password } = registerBody;
      if (!(email && password && first_name && last_name)) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  async validateLogin(
    userInput: LoginBody
  ): Promise<{ status: LoginValidationStatus; userId?: number }> {
    try {
      const { email, password } = userInput;

      if (!email) return { status: LoginValidationStatus.NO_EMAIL };
      if (!password) return { status: LoginValidationStatus.NO_PASSWORD };

      const user = await this.userService.findUserByEmail(userInput.email);
      if (!user) return { status: LoginValidationStatus.USER_NOT_FOUND };

      const comparePassword = await bcrypt.compare(
        userInput.password,
        user.password_hash
      );

      if (!comparePassword)
        return { status: LoginValidationStatus.INVALID_PASSWORD };

      return {
        status: LoginValidationStatus.SUCCESS,
        userId: user.id
      };
    } catch (err) {
      throw err;
    }
  }

  async validatePassword(requestBody: RegisterBody): Promise<{
    hash: string;
    requestBody: RegisterBody;
  }> {
    try {
      const hash = await bcrypt.hash(requestBody.password as string, 10);
      delete requestBody.password;

      return {
        hash,
        requestBody
      };
    } catch (err) {
      throw err;
    }
  }

  async createToken(
    userId: number,
    requestBody?: RegisterBody
  ): Promise<string> {
    try {
      const token = await jwt.sign({ userId, ...requestBody }, "jwt-secret", {
        expiresIn: "6h"
      });
      return token;
    } catch (err) {
      throw err;
    }
  }
}

export default AuthService;
