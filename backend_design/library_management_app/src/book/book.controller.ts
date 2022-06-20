import BookService from "./book.service";
import { NextFunction, Request, Response, Router } from "express";

class BookController {
  public path = "/books";
  public router = Router();

  public bookService = new BookService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getBooks);
    this.router.get(`${this.path}/search`, this.search);
    this.router.post(`${this.path}`, this.addBook);
    this.router.put(`${this.path}/:id`, this.updateBook);
    this.router.delete(`${this.path}/:id`, this.deleteBook);
  }

  getBooks() {
    throw new Error("Method not implemented.");
  }

  private search = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query) {
      const books = await this.bookService.searchForBooks(req.query);
      return res.json({ response: books });
    }
    // fetch books that match the title

    return "nothing";
    //throw new Error("Method not implemented.");
  };

  addBook() {
    throw new Error("Method not implemented.");
  }

  updateBook() {
    throw new Error("Method not implemented.");
  }

  deleteBook() {
    throw new Error("Method not implemented.");
  }
}

export default BookController;
