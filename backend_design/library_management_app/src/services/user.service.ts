import dbConfig from "../../knexfile";
import knex from "knex";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
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
    .select("id", "email", "firstname", "created_at", "updated_at")
    .from("users");
  return users;
};

const updateUser = async (id: string, updateBody: updateUserDTO) => {
  try {
    const updateResult = dbInstance("users")
      .where("id", "=", id)
      .update({ ...updateBody });

    return updateResult;
  } catch (err) {
    throw err;
  }
};

const findUserById = async (id: string) => {
  try {
    const user = dbInstance("users")
      .select("id", "email", "firstname", "created_at", "updated_at")
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id: string) => {
  try {
    const deleteResult = dbInstance("user").where("id", "=", id).del();
    return deleteResult;
  } catch (err) {
    throw err;
  }
};

export { findUsers, updateUser, findUserById, deleteUserById };
