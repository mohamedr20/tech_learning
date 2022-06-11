import dbConfig from "../../knexfile";
import knex from "knex";
import { Book } from "../utils/interfaces";
import BookRepository from "./book.repo";
import { ParsedQs } from "qs";
import { BookSearchParams } from "./interfaces";
// interface updateBookDTO {
//   title: string;
//   description: string;
//   publication_date: Date;
//   is_best_seller: boolean;
//   is_reference: boolean;
// }

interface BookQuery {
  [key: string]:
    | undefined
    | string
    | string[]
    | ParsedQs
    | ParsedQs[]
    | keyof BookSearchParams;
}

class BookService {
  private env = process.env.NODE_ENV || "development";
  private bookRepository = new BookRepository(
    knex(dbConfig[`${this.env}`]),
    "books"
  );

  constructor() {}

  public async searchForBooks(searchQuery: BookSearchParams): Promise<Book[]> {
    const bookResult = await this.bookRepository.findBookByTitle(searchQuery);
    return bookResult;
  }
}

// const createBook = async (
//   bookInput: Partial<Book>
// ): Promise<number[] | void> => {
//   try {
//     const createBookResult = await dbInstance("books")
//       .insert({ ...bookInput })
//       .returning(["id"]);
//     return createBookResult;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw err;
//     }
//   }
// };

// const updateBook = async (
//   id: string,
//   updateBody: updateBookDTO
// ): Promise<number | void> => {
//   try {
//     const updateResult = await dbInstance<Book>("books")
//       .where("id", "=", id)
//       .update({ ...updateBody });

//     return updateResult;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw err;
//     }
//   }
// };

// const findBooks = async () => {
//   try {
//     const users = await dbInstance
//       .select("id", "email", "first_name", "created_at", "updated_at")
//       .from("users");
//     return users;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw err;
//     }
//   }
// };

// const findBookByAuthor = async (id: string) => {
//   try {
//     const user = await dbInstance("users")
//       .select("id", "email", "first_name", "created_at", "updated_at")
//       .where("id", "=", id);
//     return user;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw err;
//     }
//   }
// };

// const findBookByTitle = async (id: string) => {
//   try {
//     const user = await dbInstance("users")
//       .select("id", "email", "first_name", "created_at", "updated_at")
//       .where("id", "=", id);
//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

// const findBookByPublicationDate = async (id: string) => {
//   try {
//     const user = await dbInstance("users")
//       .select("id", "email", "first_name", "created_at", "updated_at")
//       .where("id", "=", id);
//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

// const findBookByCategory = async (id: string) => {
//   try {
//     const user = await dbInstance("users")
//       .select("id", "email", "first_name", "created_at", "updated_at")
//       .where("id", "=", id);
//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

// const deleteBook = async (id: string): Promise<number | void> => {
//   try {
//     const deleteResult = await dbInstance<Book>("books")
//       .where("id", "=", id)
//       .del();
//     return deleteResult;
//   } catch (err) {
//     if (err instanceof Error) {
//       throw err;
//     }
//   }
// };

export default BookService;
