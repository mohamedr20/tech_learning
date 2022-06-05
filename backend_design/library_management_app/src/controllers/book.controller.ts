import * as BookService from "../services/book.service";
import { NextFunction, Request, Response } from "express";
import { Book } from "../utils/interfaces";
import HttpException from "../exceptions/HttpException";

// router.get("/", BookController.search);
// router.post("/", BookController.createBook);
// router.get("/:id", BookController.getBook);
// router.put("/:id", BookController.updateBook);
// router.delete("/:id", BookController.deleteBook);

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

const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // const { id } = req.params;
    // const deleteUserResult: number = await UserService.deleteUserById(id);
    // return res.json({ data: deleteUserResult }).status(200);
    return res.json({});
  } catch (err) {
    next(err);
  }
};

const validateUpdateRequest = (updateBody: Partial<Book>) => {
  const validKeys = [
    "title",
    "description",
    "publication_date",
    "isbn",
    "is_best_seller",
    "is_reference"
  ];
  const isValidKey = (currentKey: string) => validKeys.indexOf(currentKey) > -1;
  return Object.keys(updateBody).every(isValidKey);
};

const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    console.log(req.body);
    console.log(Object.keys(req.body));
    if (validateUpdateRequest(req.body) === false) {
      return res.json({
        status: 409,
        message: "Payload has an invalid format"
      });
    }
    const updateBookResult: number | void = await BookService.updateBook(
      id,
      req.body
    );

    if (updateBookResult) {
      return res.json({ data: updateBookResult }).status(200);
    }

    return res.json({ statusCode: 404, message: "Unable to update this book" });
  } catch (err) {
    next(err);
  }
};

const createBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const createBookResult = await BookService.createBook(req.body);
    return res.json({ data: createBookResult }).status(201);
  } catch (err) {
    throw err;
  }
};

const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleteBookResult: number | void = await BookService.deleteBook(id);
    return res.json({ data: deleteBookResult }).status(200);
  } catch (err) {
    throw err;
  }
};

export { search, getBook, updateBook, deleteBook, createBook };
