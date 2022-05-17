import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `   CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(50),
            lastName VARCHAR(50),
            username VARCHAR(50),
            email VARCHAR(50) NOT NULL,
            passwordHash VARCHAR(200) NOT NULL,
            phone VARCHAR(50),
            date_of_birth DATE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE users`);
}
