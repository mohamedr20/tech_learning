"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultColumns = void 0;
const createDefaultColumns = (knex, table) => {
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.fn.now());
};
exports.createDefaultColumns = createDefaultColumns;
