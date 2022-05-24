import * as BookService from "../services/book.service";
import { NextFunction, Request, Response } from "express";

interface Book {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}

const search = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    // const users: User[] = await UserService.findUsers();
    // return res.json({ data: users });
    return res.json({});
  } catch (err) {
    next(err);
    throw err;
  }
};

const getBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const { id } = req.params;
    // const deleteUserResult: number = await UserService.deleteUserById(id);
    // return res.json({ data: deleteUserResult }).status(200);
    return res.json({});
  } catch (err) {
    throw err;
  }
};

const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    // const { id } = req.params;
    // const updateUserResult: number = await UserService.updateUser(id, req.body);
    // if (updateUserResult === 1)
    //   return res.json({ data: updateUserResult }).status(200);
    // else {
    //   return res.json({ data: updateUserResult }).status(404);
    // }
    return res.json({});
  } catch (err) {
    next(err);
    throw err;
  }
};

const createBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const { id } = req.params;
    // const user = await UserService.findUserById(id);
    // return res.json({ data: user }).status(200);
    return res.json({});
  } catch (err) {
    throw err;
  }
};

const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const { id } = req.params;
    // const deleteUserResult: number = await UserService.deleteUserById(id);
    // return res.json({ data: deleteUserResult }).status(200);
    return res.json({});
  } catch (err) {
    throw err;
  }
};

export { search, getBook, updateBook, deleteBook, createBook };
