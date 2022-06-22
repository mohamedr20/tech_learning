import BookService from "./book.service";
import { NextFunction, Request, Response, Router } from "express";
import CreateBookDto from "./book.dto";
import validateMiddleware from "../middleware/validation.middleware";
import authenticateUser from "../middleware/auth.middleware";
import { AuthRequest } from "../utils/interfaces";

class BookController {
  public path = "/books";
  public router = Router();

  public bookService = new BookService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authenticateUser, this.getBooks);
    this.router.get(`${this.path}/search`, authenticateUser, this.search);
    this.router.get(`${this.path}/bookItems/:bookId`, this.getBookItems);
    this.router.post(
      `${this.path}`,
      validateMiddleware(CreateBookDto),
      this.addBook
    );
    this.router.put(`${this.path}/:id`, this.updateBook);
    this.router.delete(`${this.path}/:id`, this.deleteBook);
  }

  getBooks() {
    throw new Error("Method not implemented.");
  }

  private search = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const books = await this.bookService.searchForBooks(req.query);
    return res.json({ response: books });
  };

  private getBookItems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const books = await this.bookService.findBookItems(req.params.bookId);
    return res.json({ response: books });
  };

  private addBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookResult = await this.bookService.insertBook(req.body);
    return res.json({ response: bookResult });
  };

  updateBook() {
    throw new Error("Method not implemented.");
  }

  deleteBook() {
    throw new Error("Method not implemented.");
  }
}

export default BookController;
