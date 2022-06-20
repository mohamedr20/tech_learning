import { Knex } from "knex";
import User from "./models/user.model";
import KnexRepository from "../repo";

class UserRepository extends KnexRepository<User> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {
    super(knex, "users");
  }

  findUserByEmail(email: string): Promise<User> {
    return this.queryBuilder.where("email", "=", email).select().first();
  }

  async findBooksForUser(userId: string) {
    const user = await User.query().findById(userId);
    if (user) {
      const books = user.$relatedQuery("books");
      return books;
    }
    return [];
  }
}

export default UserRepository;
