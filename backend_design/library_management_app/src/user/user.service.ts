import knex from "knex";
import UserRepository from "./user.repo";
import dbConfig from "../../knexfile";
import { User } from "../utils/interfaces";

class UserService {
  private userRepository = new UserRepository(
    knex(dbConfig["development"]),
    "users"
  );
  constructor() {}

  async findUsers(): Promise<User[]> {
    try {
      console.log(`Inside userService.findUsers...`);
      const users = await this.userRepository.find([
        "id",
        "email",
        "first_name",
        "last_name",
        "username"
      ]);
      return users;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id: string, updateBody: Partial<User>): Promise<number> {
    try {
      console.log(
        `Inside userService.updateUser... id: ${id} updateBody: ${JSON.stringify(
          updateBody
        )}`
      );
      const updateResult = await this.userRepository.update(id, updateBody);
      return updateResult;
    } catch (err) {
      throw err;
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      console.log(`Inside userService.findById... ${id}`);
      const user = await this.userRepository.findOne(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      console.log(`Inside userService.findByEmail... email:${email}`);
      const user = await this.userRepository.findUserByEmail(email);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async insertUser(userInput: Partial<User>): Promise<number> {
    try {
      console.log(
        `Inside userService.insertUser... userInput:${JSON.stringify(
          userInput
        )}`
      );
      const createUserResult = await this.userRepository.insert({
        ...userInput
      });
      return createUserResult;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: string): Promise<number> {
    try {
      console.log(`Inside userService.deleteUser... userId:${id}`);
      const deleteUserResult = await this.userRepository.delete(id);
      return deleteUserResult;
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
