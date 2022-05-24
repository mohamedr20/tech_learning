import { Knex } from "knex";
import { createDefaultColumns } from "../../src/utils/db";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("library", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("address_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("address");
    table
      .integer("business_hours_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("library_business_hours");
    table.string("name", 50).unique().notNullable();
    table.string("description", 250);
    table.string("phone", 50);
    table.boolean("is_closed").notNullable();
    createDefaultColumns(knex, table);
  });

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

  await knex.schema.alterTable("users", (table) => {
    table.integer("address_id").unsigned().references("id").inTable("address");
    table
      .integer("card_id")
      .unsigned()
      .references("id")
      .inTable("library_card");
    table.renameColumn("firstname", "first_name");
    table.renameColumn("lastname", "last_name");
    table.renameColumn("passwordhash", "password_hash");
    table.integer("age");
  });

  await knex.schema.createTable("books", (table) => {
    table.increments("id").primary().notNullable();
    table.string("title", 150);
    table.string("description", 250);
    table.dateTime("publication_date");
    table.uuid("isbn").unique().notNullable();
    table.boolean("is_best_seller");
    table.boolean("is_reference");
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("author", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("books");
    table.string("name", 50);
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("book_item", (table) => {
    table.primary(["user_id", "book_id"]);
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("books");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table
      .integer("rack_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("rack");
    table.dateTime("due_date");
    table.boolean("is_reserved");
    table.boolean("is_checked_out");
    createDefaultColumns(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("library");
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("books");
  await knex.schema.dropTable("library_card");
  await knex.schema.dropTable("author");
  await knex.schema.dropTable("book_item");
}
