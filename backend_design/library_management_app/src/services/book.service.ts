import dbConfig from "../../knexfile";
import knex from "knex";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password_hash: string;
  phone: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}

interface updateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date_of_birth?: Date;
}

const dbInstance = knex(dbConfig["development"]);

const createBook = async (userInput: Partial<User>) => {
  try {
    const createUserResult = await dbInstance("users").insert(
      { ...userInput },
      "id"
    );
    return createUserResult;
  } catch (err) {
    throw err;
  }
};

const updateBook = async (id: string, updateBody: updateUserDTO) => {
  try {
    const updateResult = await dbInstance<User>("users")
      .where("id", "=", id)
      .update({ ...updateBody });

    return updateResult;
  } catch (err) {
    throw err;
  }
};

const findBooks = async () => {
  const users = await dbInstance
    .select("id", "email", "first_name", "created_at", "updated_at")
    .from("users");
  return users;
};

const findBookByAuthor = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select<Partial<User>>(
        "id",
        "email",
        "first_name",
        "created_at",
        "updated_at"
      )
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findBookByTitle = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select<Partial<User>>(
        "id",
        "email",
        "first_name",
        "created_at",
        "updated_at"
      )
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findBookByPublicationDate = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select<Partial<User>>(
        "id",
        "email",
        "first_name",
        "created_at",
        "updated_at"
      )
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findBookByCategory = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select<Partial<User>>(
        "id",
        "email",
        "first_name",
        "created_at",
        "updated_at"
      )
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteBook = async (id: string) => {
  try {
    const deleteResult = await dbInstance<User>("users")
      .where("id", "=", id)
      .del();
    return deleteResult;
  } catch (err) {
    throw err;
  }
};

export {
  createBook,
  updateBook,
  findBooks,
  findBookByPublicationDate,
  findBookByTitle,
  findBookByAuthor,
  findBookByCategory,
  deleteBook
};
