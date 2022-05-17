import express from 'express';
import { knex } from 'knex';
//import UserController from '../controllers/user.controller';
const router = express.Router();
import dbConfig from '../../knexfile';

const dbInstance = knex(dbConfig['development']);
// const userController = new UserController()
router.get('/', async (_req, res) => {
  const users = await dbInstance
    .select('id', 'email', 'firstname', 'created_at', 'updated_at')
    .from('users');

  res.json(users);
});

export default router;
