import { Knex } from "knex";
import {
  users,
  authors,
  books,
  libraryCards,
  libraries,
  addresses,
  bookCategory,
  category
} from "../../src/utils/db";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  await knex("library_card").del();
  await knex("library").del();
  await knex("user").del();
  await knex("address").del();
  await knex("book").del();
  await knex("author").del();
  await knex("book_category").del();
  await knex("category").del();

  const tableNames = [
    "address",
    "library",
    "library_card",
    "user",
    "book",
    "category",
    "book_category",
    "author"
  ];

  const entries = [
    addresses,
    libraries,
    libraryCards,
    users,
    books,
    category,
    bookCategory,
    authors
  ];

  const seedEntries = async (entries: any[]) => {
    for (const [index, entry] of entries.entries()) {
      if (entry) {
        await knex(`${tableNames[index]}`).insert(entry);
      }
    }
  };

  await seedEntries(entries);
}
