import { Knex } from "knex";
import { createDefaultColumns } from "../../src/utils/db";

export async function up(knex: Knex): Promise<void> {
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

  await knex.schema.createTable("library_business_hours", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("day").notNullable();
    table.dateTime("open_time");
    table.dateTime("close_time");
  });

  await knex.schema.createTable("book_category", (table) => {
    table.string("category_name").notNullable().unique();
    createDefaultColumns(knex, table);
  });

  await knex.schema.createTable("rack", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("rack_number");
    table.integer("floor_number");
    createDefaultColumns(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("address");
  await knex.schema.dropTable("library_business_hours");
  await knex.schema.dropTable("book_category");
  await knex.schema.dropTable("rack");
}
