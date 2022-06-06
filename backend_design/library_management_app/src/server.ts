import "reflect-metadata";
import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./authentication/auth.controller";
import HealthController from "./health/health.controller";

const port = process.env.PORT || 8000;

const app = new App([
  new HealthController(),
  new UserController(),
  new AuthController()
]);

app.listen(port);
