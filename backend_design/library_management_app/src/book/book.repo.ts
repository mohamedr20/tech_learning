import { Knex } from "knex";
import { Book } from "../utils/interfaces";
import KnexRepository from "../repo";
import { BookSearchParams } from "./interfaces";

class BookRepository extends KnexRepository<Book> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {
    super(knex, "books");
  }

  findBookByTitle(searchQuery: BookSearchParams): Promise<Book[]> {
    console.log(searchQuery);
    const { title, author, publication_date, category } = searchQuery;

    if (title) {
      if (title && author) {
        if (title && author && category) {
          return this.queryBuilder
            .leftJoin("author", "books.id", "author.book_id")
            .leftJoin("book_category", "books.id", "book_category.book_id")
            .leftJoin("category", "book_category.category_id", "category.id")
            .whereLike("name", `%${author}%`)
            .andWhereLike("category_name", `%${category}`)
            .andWhereLike("title", `%${title}%`);
        }
        return this.queryBuilder
          .leftJoin("author", "books.id", "author.book_id")
          .whereLike("title", `%${title}%`);
      }
      return this.queryBuilder.whereLike("title", `%${title}%`);
    }
    if (category) {
      if (category && title) {
        return this.queryBuilder
          .leftJoin("author", "books.id", "author.book_id")
          .leftJoin("book_category", "books.id", "book_category.book_id")
          .leftJoin("category", "book_category.category_id", "category.id")
          .whereLike("category_name", `%${category}`)
          .andWhereLike("title", `%${title}%`);
      }
      if (category && author && title) {
        return this.queryBuilder
          .leftJoin("author", "books.id", "author.book_id")
          .leftJoin("book_category", "books.id", "book_category.book_id")
          .leftJoin("category", "book_category.category_id", "category.id")
          .whereLike("name", `%${author}%`)
          .andWhereLike("category_name", `%${category}`)
          .andWhereLike("title", `%${title}%`);
      }
      return this.queryBuilder
        .leftJoin("author", "books.id", "author.book_id")
        .leftJoin("book_category", "books.id", "book_category.book_id")
        .leftJoin("category", "book_category.category_id", "category.id")
        .whereLike("category_name", `%${category}`);
    }

    if (author) {
      if (author && title) {
        return this.queryBuilder
          .leftJoin("author", "books.id", "author.book_id")
          .whereLike("title", `%${title}%`);
      }
      if (author && title && category) {
        return this.queryBuilder
          .leftJoin("author", "books.id", "author.book_id")
          .leftJoin("book_category", "books.id", "book_category.book_id")
          .leftJoin("category", "book_category.category_id", "category.id")
          .whereLike("name", `%${author}%`)
          .andWhereLike("category_name", `%${category}`)
          .andWhereLike("title", `%${title}%`);
      }
      return this.queryBuilder
        .leftJoin("author", "books.id", "author.book_id")
        .whereLike("name", `%${author}%`);
    }

    return this.queryBuilder.select("*");
  }
  // findUserByEmail(email: string): Promise<User> {
  //   return this.queryBuilder.where("email", "=", email).select().first();
  // }
}

export default BookRepository;
