import type { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config();

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './db/seed',
      extension: 'ts',
    },
  },
};

export default config;
