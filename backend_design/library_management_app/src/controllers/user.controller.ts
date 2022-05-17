import UserService from '../services/user.service';

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

class UserController {
  userService = new UserService();

  public async fetchUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.json();
    } catch (err) {
      console.log(err);
      return -1;
    }
  }
}

export default UserController;
