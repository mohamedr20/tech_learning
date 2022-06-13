import { Knex } from "knex";
import { createDefaultColumns } from "../../src/utils/db";

export async function up(knex: Knex): Promise<void> {
  //
  await knex.schema.createTable("address", (table) => {
    table.increments("id").primary().notNullable();
    table.string("address_1", 50);
    table.string("address_2");
    table.string("city", 20).notNullable();
    table.string("state", 20).notNullable();
    table.string("country", 20).notNullable();
    table.string("zip_code", 10).notNullable();
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("book", (table) => {
    table.increments("id").primary().notNullable();
    table.string("title", 150);
    table.string("description", 250);
    table.dateTime("publication_date");
    table.uuid("isbn").unique().notNullable();
    table.boolean("is_best_seller");
    table.boolean("is_reference");
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("category", (table) => {
    table.increments("id").primary().notNullable();
    table.string("category_name").notNullable().unique();
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("library", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("address_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("address");
    table.string("name", 50).unique().notNullable();
    table.string("description", 250);
    table.string("phone", 50);
    table.boolean("is_closed").notNullable();
    createDefaultColumns(knex, table);
  });

  // Each Library has a one to many relationship w/ business hours
  // A library has multiple opening hours depending on the day
  await knex.schema.createTable("library_business_hours", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("library_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("library");
    table.integer("day").notNullable();
    table.dateTime("open_time");
    table.dateTime("close_time");
  });

  await knex.schema.createTable("library_rack", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("rack_number");
    table.integer("floor_number");
    createDefaultColumns(knex, table);
  });

  // Users
  await knex.schema.createTable("role", (table) => {
    table.increments("id").primary().notNullable();
    table.string("name", 50).notNullable();
    createDefaultColumns(knex, table);
  });

  // [Many-to-Many](User -> UserRole -> Role)
  await knex.schema.createTable("user_role", (table) => {
    table.primary(["user_id", "role_id"]);
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("role");
    createDefaultColumns(knex, table);
  });

  // Books

  // Each user can have multiple book items and each
  // bookItem can have multiple copies of a single book
  await knex.schema.createTable("book_item", (table) => {
    table.primary(["user_id", "book_id"]);
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("book");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");
    table
      .integer("rack_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("library_rack");
    table.dateTime("due_date");
    table.boolean("is_reserved");
    table.boolean("is_checked_out");
    createDefaultColumns(knex, table);
  });

  // A category can belong to many books and a book can
  // belong to many different categories
  await knex.schema.createTable("book_category", (table) => {
    table.primary(["book_id", "category_id"]);
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("book");
    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("category");
    createDefaultColumns(knex, table);
  });

  // Library

  // A user has one library card and each library card
  // references one library
  await knex.schema.createTable("library_card", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("library_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("library");
    table.uuid("card_number");
    table.string("member_status");
    createDefaultColumns(knex, table);
  });

  // Author
  await knex.schema.createTable("author", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("book");
    table.string("name", 50);
    table.string("description", 250);
    table.boolean("is_best_seller");
    createDefaultColumns(knex, table);
  });

  // A book can have multiple authors and an author can have
  // multiple books
  await knex.schema.createTable("book_author", (table) => {
    table.primary(["book_id", "author_id"]);
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("book");
    table
      .integer("author_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("author");
  });

  // Fines

  // A user has a one-to-many relationship with a user_fine
  // One user could have multiple user fines
  await knex.schema.createTable("user_fine", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");
    table.string("type", 50);
    table.float("amount", 2).notNullable();
    createDefaultColumns(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
  await knex.schema.dropTable("user_role");
  await knex.schema.dropTable("role");
  await knex.schema.dropTable("address");

  await knex.schema.dropTable("book");
  await knex.schema.dropTable("book_item");
  await knex.schema.dropTable("book_category");
  await knex.schema.dropTable("category");

  await knex.schema.dropTable("author");
  await knex.schema.dropTable("book_author");

  await knex.schema.dropTable("library");
  await knex.schema.dropTable("library_card");
  await knex.schema.dropTable("library_business_hours");
  await knex.schema.dropTable("library_rack");

  await knex.schema.dropTable("fine");
}
