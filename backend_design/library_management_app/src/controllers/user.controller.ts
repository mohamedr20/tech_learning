import * as UserService from "../services/user.service";
import { NextFunction, Request, Response } from "express";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  phone: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}

const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const users: User[] = await UserService.findUsers();
    return res.json({ data: users });
  } catch (err) {
    next(err);
    throw err;
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updateUserResult: number = await UserService.updateUser(id, req.body);
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

const findUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    return res.json({ data: user }).status(200);
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleteUserResult: number = await UserService.deleteUserById(id);
    return res.json({ data: deleteUserResult }).status(200);
  } catch (err) {
    throw err;
  }
};

export { findAllUsers, updateUser, findUser, deleteUser };
