import HttpException from "./HttpException";

class UserExsistsForThisEmailException extends HttpException {
  constructor(email: string) {
    super(400, `User with this email: ${email} already exsists`);
  }
}

export default UserExsistsForThisEmailException;
