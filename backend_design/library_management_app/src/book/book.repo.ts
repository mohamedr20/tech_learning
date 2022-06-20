import { Knex } from "knex";
import Book from "./models/book.model";
import KnexRepository from "../repo";
import { BookSearchParams } from "./interfaces";

class BookRepository extends KnexRepository<Book> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {
    super(knex, "books");
  }

  async findBookByTitle(searchQuery: BookSearchParams): Promise<Book[]> {
    console.log(searchQuery);
    const { title, author, publication_date, category } = searchQuery;

    const books = await Book.query()
      .leftJoin("author", "book.id", "author.book_id")
      .leftJoin("book_category", "book.id", "book_category.book_id")
      .leftJoin("category", "book_category.category_id", "category.id")
      .select("*");

    if (category) {
      if (category && author) {
        if (category && author && title) {
          return books.filter(
            (book: any) =>
              book.category_name === category &&
              book.name === author &&
              book.title === title
          );
        }
        return books.filter(
          (book: any) => book.category_name === category && book.name === author
        );
      }
      return books.filter((book: any) => book.category_name === category);
    }

    if (title) {
      if (title && category) {
        if (title && category && author) {
          return books.filter(
            (book: any) =>
              book.category_name === category &&
              book.title === title &&
              book.name === author
          );
        }
        return books.filter(
          (book: any) => book.category_name === category && book.title === title
        );
      }
      return books.filter((book: any) => book.title === title);
    }

    if (author) {
      if (author && category) {
        if (author && category && author) {
          return books.filter(
            (book: any) =>
              book.category_name === category &&
              book.title === title &&
              book.name === author
          );
        }
        return books.filter(
          (book: any) => book.category_name === category && book.name === author
        );
      }
      return books.filter((book: any) => book.name === author);
    }

    return Book.query().select("*");
  }
}

export default BookRepository;
