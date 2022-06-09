import {
  InvalidCredentialsException,
  UserExsistsForThisEmailException
} from "../../exceptions";
import CreateUserDto from "../../user/user.dto";
import AuthService from "../auth.service";
import { faker } from "@faker-js/faker";
import UserService from "../../user/user.service";
import LogInDtO from "../login.dto";

describe("AuthService", () => {
  describe("User Registration", () => {
    describe("if email is already taken", () => {
      it("should throw an exception", async () => {
        const userData: CreateUserDto = {
          email: "misse11@email.com",
          password: faker.internet.password(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          username: faker.internet.userName(),
          date_of_birth: faker.date.birthdate(),
          age: 28,
          phone: faker.phone.phoneNumber("703-###-####")
        };

        const authService = new AuthService();
        const userService = new UserService();

        userService.findUserByEmail = jest
          .fn()
          .mockReturnValue(Promise.resolve(userData));

        await expect(authService.register(userData)).rejects.toMatchObject(
          new UserExsistsForThisEmailException(userData.email)
        );
      });
    });
  });

  describe("User Login", () => {
    describe("if credentials are incorrect", () => {
      it("should throw an exception", async () => {
        const userData: LogInDtO = {
          email: "misse11@email.com",
          password: "heyhey123@" //Invalid password
        };

        const authService = new AuthService();
        const userService = new UserService();

        userService.findUserByEmail = jest
          .fn()
          .mockReturnValue(Promise.resolve(userData));

        await expect(authService.login(userData)).rejects.toMatchObject(
          new InvalidCredentialsException()
        );
      });
    });
  });
});
