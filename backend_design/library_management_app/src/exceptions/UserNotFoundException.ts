import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
  constructor(email: string) {
    super(400, `User with this email: ${email} does not exsist`);
  }
}

export default UserNotFoundException;
