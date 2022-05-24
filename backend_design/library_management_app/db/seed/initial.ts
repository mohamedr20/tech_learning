import { Knex } from "knex";
// import {
//   Address,
//   Author,
//   Book,
//   Library,
//   LibraryCard,
//   User
// } from "../../src/utils/interfaces";
import {
  users,
  authors,
  books,
  libraryCards,
  libraries,
  addresses
  // getAddress,
  // getLibrary,
  // getLibraryCard,
  // getUser,
  // getBook
} from "../../src/utils/db";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  // await knex("author").join("books", "books.id", "author.book_id").del();
  // await knex("library")
  //   .join("address", "address.id", "library.address_id")
  //   .del();
  // await knex("users")
  //   .join("library_card", "library_card.id", "users.card_id")
  //   .del();
  // await knex("library_card")
  //   .join("library", "library.id", "library_card.library_id")
  //   .del();

  await knex("library_card").del();
  await knex("library").del();
  await knex("users").del();
  await knex("address").del();
  await knex("books").del();
  await knex("author").del();

  const tableNames = [
    "address",
    "library",
    "library_card",
    "users",
    "books",
    "author"
  ];

  const entries = [addresses, libraries, libraryCards, users, books, authors];

  const seedEntries = async (entries: any[]) => {
    for (const [index, entry] of entries.entries()) {
      if (entry) {
        await knex(`${tableNames[index]}`).insert(entry);
      }
    }
  };

  await seedEntries(entries);
}
