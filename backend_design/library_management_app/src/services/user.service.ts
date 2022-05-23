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

const findUsers = async () => {
  const users = await dbInstance
    .select("id", "email", "first_name", "created_at", "updated_at")
    .from("users");
  return users;
};

const updateUser = async (id: string, updateBody: updateUserDTO) => {
  try {
    const updateResult = await dbInstance<User>("users")
      .where("id", "=", id)
      .update({ ...updateBody });

    return updateResult;
  } catch (err) {
    throw err;
  }
};

const findUserById = async (id: string) => {
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

const findUserByEmail = async (email: string) => {
  try {
    const user: User | [] = await dbInstance("users")
      .first<User>(
        "id",
        "email",
        "password_hash",
        "first_name",
        "created_at",
        "updated_at"
      )
      .where("email", "=", email);
    return user;
  } catch (err) {
    throw err;
  }
};

const insertUser = async (userInput: Partial<User>) => {
  try {
    console.log(userInput);
    const createUserResult = await dbInstance("users").insert(
      { ...userInput },
      "id"
    );
    return createUserResult;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id: string) => {
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
  findUsers,
  updateUser,
  findUserById,
  deleteUserById,
  findUserByEmail,
  insertUser
};
