import App from "./app";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import HealthController from "./controllers/health.controller";

const port = process.env.PORT || 8000;

const app = new App([
  new HealthController(),
  new UserController(),
  new AuthController()
]);

app.listen(Number(port));
