import { Knex } from "knex";

const createDefaultColumns = (knex: Knex, table: Knex.TableBuilder) => {
  table.dateTime("created_at").defaultTo(knex.fn.now());
  table.dateTime("updated_at").defaultTo(knex.fn.now());
};

export { createDefaultColumns };
