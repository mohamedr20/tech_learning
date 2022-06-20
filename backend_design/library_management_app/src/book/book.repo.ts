import { Knex } from "knex";
import Book from "./models/book.model";
import KnexRepository from "../repo";
import { BookSearchParams } from "./interfaces";
import Objection from "objection";

class BookRepository extends KnexRepository<Book> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {
    super(knex, "books");
  }

  async search(searchQuery: BookSearchParams): Promise<Book[]> {
    const { title, author, category } = searchQuery;

    if (Object.keys(searchQuery).length > 0) {
      const books = await Book.query()
        .leftJoin("author", "book.id", "author.book_id")
        .leftJoin("book_category", "book.id", "book_category.book_id")
        .leftJoin("category", "book_category.category_id", "category.id")
        .where("category_name", `${category}`)
        .orWhere("name", `${author}`)
        .orWhere("title", `${title}`)
        .select("*");
      return books;
    }
    return await Book.query().select("*");
  }

  async findUserForBook(bookId: string): Promise<Objection.Model[]> {
    const book = await Book.query().findById(bookId);
    if (book) {
      const users = book.$relatedQuery("users");
      return users;
    }
    return [];
  }
}

export default BookRepository;
