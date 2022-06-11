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
      return this.queryBuilder
        .whereLike("title", `%${title}%`)
        .andWhereLike("author", `%${author}%`);
    } else if (author) {
      //get all books that are related to an author

      return this.queryBuilder
        .leftJoin("author", "books.id", "author.book_id")
        .leftJoin("book_category", "books.id", "book_category.book_id")
        .leftJoin("category", "book_category.category_id", "category.id")
        .whereLike("name", `%${author}%`)
        .andWhereLike("category_name", `%${category}`);

      //

      // .where("name", "=", `%${author}%`);
      // return this.queryBuilder
      //
      //   .andWhereLike("author", `%${author}%`);
    } else if (title && author && publication_date) {
      // get all books related to an author and filter by the publication date
    } else if (title && author && publication_date && category) {
    }
    return this.queryBuilder.whereLike("title", `%${title}%`);
  }
  // findUserByEmail(email: string): Promise<User> {
  //   return this.queryBuilder.where("email", "=", email).select().first();
  // }
}

export default BookRepository;
