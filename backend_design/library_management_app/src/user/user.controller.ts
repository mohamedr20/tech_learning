import UserService from "./user.service";
import { NextFunction, Request, Response, Router } from "express";

class UserController {
  public path = "/users";
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/`, this.findAllUsers);
    this.router.get(`${this.path}/bookItems/:userId`, this.findCheckedOutBooks);
    this.router.get(`${this.path}/:id`, this.findUser);
    this.router.post(
      `$${this.path}/bookItems/reserve/:bookId`,
      this.reserveBook
    );
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private findAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const users = await this.userService.findUsers();
      return res.json({ data: users });
    } catch (err) {
      next(err);
      throw err;
    }
  };

  private findUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);
      return res.json({ data: user }).status(200);
    } catch (err) {
      throw err;
    }
  };

  private findCheckedOutBooks = async (req: Request, res: Response) => {
    const books = await this.userService.findBooksForUser(req.params.userId);
    return res.json({ data: books }).status(200);
  };

  private reserveBook = async (req: Request, res: Response) => {
    console.log(req.headers["authorization"]);
    console.log("reserve hit");
  };

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const updateUserResult: number = await this.userService.updateUser(
        id,
        req.body
      );
      if (updateUserResult === 1)
        return res.json({ data: updateUserResult }).status(200);
      else {
        return res.json({ data: updateUserResult }).status(404);
      }
    } catch (err) {
      next(err);
      throw err;
    }
  };

  private deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const deleteUserResult: number = await this.userService.deleteUser(id);
      return res.json({ data: deleteUserResult }).status(200);
    } catch (err) {
      throw err;
    }
  };
}

export default UserController;
