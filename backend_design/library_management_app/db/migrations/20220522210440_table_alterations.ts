import { Knex } from "knex";
import { createDefaultColumns } from "../../src/utils/db";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("author", (table) => {
    table.string("description", 150);
    table.boolean("is_best_seller");
  });

  await knex.schema.createTable("category", (table) => {
    table.increments("id").primary().notNullable();
    table.string("category_name").notNullable().unique();
    createDefaultColumns(knex, table);
  });

  await knex.schema.alterTable("book_category", (table) => {
    table.dropColumn("category_name");
    table.primary(["book_id", "category_id"]);
    table
      .integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("books");
    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("category");
  });

  await knex.schema.alterTable("library", (table) => {
    table.dropColumn("business_hours_id");
  });

  await knex.schema.alterTable("library_business_hours", (table) => {
    table
      .integer("library_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("library");
  });

  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary().notNullable();
    table.string("name", 50).notNullable();
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("user_roles", (table) => {
    table.primary(["user_id", "role_id"]);
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles");
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("fine", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.string("type", 50);
    table.float("amount", 2).notNullable();
    createDefaultColumns(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("author");
  await knex.schema.dropTable("book_category");
  await knex.schema.dropTable("category");
  await knex.schema.dropTable("library");
  await knex.schema.dropTable("library_business_hours");
  await knex.schema.dropTable("roles");
  await knex.schema.dropTable("user_roles");
  await knex.schema.dropTable("fine");
}
