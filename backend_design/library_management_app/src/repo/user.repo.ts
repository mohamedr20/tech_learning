import { Knex } from "knex";
import { User } from "../utils/interfaces";
import KnexRepository from "./repo";

class UserRepository extends KnexRepository<User> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {
    super(knex, "users");
  }

  findUserByEmail(email: string): Promise<User> {
    return this.queryBuilder.where("email", "=", email).select().first();
  }
}

export default UserRepository;
