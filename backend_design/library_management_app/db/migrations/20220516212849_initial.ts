import { Knex } from "knex";
import { createDefaultColumns } from "../../src/utils/db";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", (table) => {
    table.increments("id").primary().notNullable();
    table.string("first_name", 50);
    table.string("last_name", 50);
    table.string("username", 100);
    table.integer("age");
    table.string("email", 50).unique().notNullable();
    table.string("password_hash", 200).notNullable();
    table.string("phone", 50);
    table.dateTime("date_of_birth");
    createDefaultColumns(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE user`);
}
