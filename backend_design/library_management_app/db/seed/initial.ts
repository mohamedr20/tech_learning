import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      firstname: "Test",
      lastname: "User",
      username: "test_user1",
      email: "test@email.com",
      passwordhash: "###############",
      phone: "703-111-1234",
      date_of_birth: knex.fn.now(),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
