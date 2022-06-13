import express, { Application } from "express";
import { errorHandler } from "./middleware/index";
import { Controller } from "../src/utils/interfaces";
import dbConfig from "../knexfile";
import knex from "knex";
import { Model } from "objection";
class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddleware();
    this.initializeDatabase();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen(port: number | string) {
    this.app.listen(port, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private initializeDatabase() {
    const knexInstance = knex(dbConfig["development"]);
    Model.knex(knexInstance);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App;
