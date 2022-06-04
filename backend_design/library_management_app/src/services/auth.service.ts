import UserRepository from "../repo/user.repo";
import { User } from "../utils/interfaces";

interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class AuthService {
  constructor() {}

  async checkRegistration(registerBody: RegisterBody): Promise<boolean> {
    try {
      const { first_name, last_name, email, password } = registerBody;
      if (!(email && password && first_name && last_name)) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default AuthService;
