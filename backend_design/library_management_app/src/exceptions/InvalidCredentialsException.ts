import HttpException from "./HttpException";

class InvalidCredentialsException extends HttpException {
  constructor() {
    super(403, `Unable to log in with this email/password`);
  }
}

export default InvalidCredentialsException;
