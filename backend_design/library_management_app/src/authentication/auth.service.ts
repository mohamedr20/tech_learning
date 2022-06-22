import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserExsistsForThisEmailException from "../exceptions/UserExsistsForThisEmailException";
import InvalidCredentialsException from "../exceptions/InvalidCredentialsException";
import CreateUserDto from "../user/user.dto";
import UserService from "../user/user.service";
import LogInDtO from "./login.dto";
import UserNotFoundException from "../exceptions/UserNotFoundException";

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

    if (!user) throw new UserNotFoundException(userInput.email);

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
    requestBody?: CreateUserDto
  ): Promise<string> {
    const token = await jwt.sign({ userId, ...requestBody }, "jwt-secret", {
      expiresIn: "6h"
    });
    return token;
  }
}

export default AuthService;
