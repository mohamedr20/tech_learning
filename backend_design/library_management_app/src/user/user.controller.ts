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
    this.router.get(`${this.path}/:id`, this.findUser);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  async findAllUsers(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const users = await this.userService.findUsers();
      return res.json({ data: users });
    } catch (err) {
      next(err);
      throw err;
    }
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);
      return res.json({ data: user }).status(200);
    } catch (err) {
      throw err;
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
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
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleteUserResult: number = await this.userService.deleteUser(id);
      return res.json({ data: deleteUserResult }).status(200);
    } catch (err) {
      throw err;
    }
  }
}

export default UserController;
