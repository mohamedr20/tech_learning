const dbConfig = require('../../knexfile');
import knex from 'knex';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  phone: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}

class UserService {
  async getUsers(): Promise<User[]> {
    const dbInstance = knex(dbConfig);
    const users = await dbInstance.select().from<User>('users');
    return users;
  }
}

export default UserService;
