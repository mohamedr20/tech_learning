import knex from "knex";
import UserRepository from "./user.repo";
import dbConfig from "../../knexfile";
import { User } from "../utils/interfaces";

interface updateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date_of_birth?: Date;
}

class UserService {
  private userRepository = new UserRepository(
    knex(dbConfig["development"]),
    "users"
  );
  constructor() {}

  async findUsers(): Promise<User[]> {
    try {
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
      const updateResult = await this.userRepository.update(id, updateBody);
      return updateResult;
    } catch (err) {
      throw err;
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async insertUser(userInput: Partial<User>): Promise<number> {
    try {
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
      const deleteUserResult = await this.userRepository.delete(id);
      return deleteUserResult;
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
