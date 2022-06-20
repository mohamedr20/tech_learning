import dbConfig from "../../knexfile";
import knex from "knex";
import Book from "../book/models/book.model";
import BookRepository from "./book.repo";
import { BookSearchParams } from "./interfaces";
import CreateBookDto from "./book.dto";

class BookService {
  private env = process.env.NODE_ENV || "development";
  private bookRepository = new BookRepository(
    knex(dbConfig[`${this.env}`]),
    "book"
  );

  constructor() {}

  public async searchForBooks(searchQuery: BookSearchParams): Promise<Book[]> {
    const bookResult = await this.bookRepository.search(searchQuery);
    return bookResult;
  }

  public async findBookItems(bookId: string) {
    const users = await this.bookRepository.findUserForBook(bookId);
    return users;
  }

  public async insertBook(bookInput: CreateBookDto): Promise<number> {
    const bookResult = await this.bookRepository.insert(bookInput);
    return bookResult;
  }

  public async updateBook(
    bookId: string,
    bookInput: CreateBookDto
  ): Promise<number> {
    const updateResult = await this.bookRepository.update(bookId, bookInput);
    return updateResult;
  }

  public async deleteBook(bookId: string): Promise<number> {
    const deleteResult = await this.bookRepository.delete(bookId);
    return deleteResult;
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

export default BookService;
