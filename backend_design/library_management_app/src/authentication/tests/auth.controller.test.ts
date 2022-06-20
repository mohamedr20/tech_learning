import request from "supertest";
import App from "../../app";
import CreateUserDto from "../../user/user.dto";
import LogInDtO from "../login.dto";
import AuthController from "../auth.controller";
import { faker } from "@faker-js/faker";
import AuthService from "../auth.service";

describe("AuthController", () => {
  const authController = new AuthController();
  const app = new App([authController]);

  beforeAll(() => {
    faker.setLocale("en_US");
  });

  describe("POST /auth/register", () => {
    it("should return a user token upon successfull registration", () => {
      const userData: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        date_of_birth: faker.date.birthdate(),
        age: 28,
        phone: "703-359-3717"
      };

      process.env.JWT_SECRET = "jwt_secret";

      const authService = new AuthService();

      authService.register = jest
        .fn()
        .mockReturnValue(Promise.resolve(undefined));

      return request(app.getServer())
        .post(`${authController.path}/register`)
        .send(userData)
        .expect("Content-Type", /json/)
        .then((res: any) => {
          console.log(res);
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("token");
        });
    });
  });

  describe("POST /auth/login", () => {
    it("should return a user token upon successfull login", () => {
      const userData: LogInDtO = {
        email: "misse11@email.com",
        password: "heyhey12@"
      };

      process.env.JWT_SECRET = "jwt_secret";

      const authService = new AuthService();

      authService.login = jest.fn().mockReturnValue(Promise.resolve(undefined));

      return request(app.getServer())
        .post(`${authController.path}/login`)
        .send(userData)
        .expect("Content-Type", /json/)
        .then((res: any) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("token");
        });
    });
  });

  afterAll((done) => {
    done();
  });
});
