import "reflect-metadata";
import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./authentication/auth.controller";
import HealthController from "./health/health.controller";
import BookController from "./book/book.controller";

const port = process.env.PORT || 8000;

const application = new App([
  new HealthController(),
  new UserController(),
  new BookController(),
  new AuthController()
]);

export default application.listen(port);
