import "reflect-metadata";
import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./authentication/auth.controller";
import HealthController from "./health/health.controller";

//const port = process.env.PORT || 8000;

const application = new App([
  new HealthController(),
  new UserController(),
  new AuthController()
]);

const serverInstance = application
  .getServer()
  .listen((port = process.env.PORT || 8000) => {
    console.log(`Listening at port ${port}`);
  });

export default serverInstance;
