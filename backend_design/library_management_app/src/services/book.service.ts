import dbConfig from "../../knexfile";
import knex from "knex";
import { Book } from "../utils/interfaces";

interface updateBookDTO {
  title: string;
  description: string;
  publication_date: Date;
  is_best_seller: boolean;
  is_reference: boolean;
}

const dbInstance = knex(dbConfig["development"]);

const createBook = async (bookInput: Partial<Book>): Promise<number[]> => {
  const createBookResult = await dbInstance("books")
    .insert({ ...bookInput })
    .returning(["id"]);
  return createBookResult;
};

const updateBook = async (id: string, updateBody: updateBookDTO) => {
  const updateResult = await dbInstance<Book>("books")
    .where("id", "=", id)
    .update({ ...updateBody });

  return updateResult;
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
      .select("id", "email", "first_name", "created_at", "updated_at")
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findBookByTitle = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select("id", "email", "first_name", "created_at", "updated_at")
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findBookByPublicationDate = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select("id", "email", "first_name", "created_at", "updated_at")
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findBookByCategory = async (id: string) => {
  try {
    const user = await dbInstance("users")
      .select("id", "email", "first_name", "created_at", "updated_at")
      .where("id", "=", id);
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteBook = async (id: string) => {
  const deleteResult = await dbInstance<Book>("books")
    .where("id", "=", id)
    .del();
  return deleteResult;
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
