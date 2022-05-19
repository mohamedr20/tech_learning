import { Response, Request, NextFunction } from "express";

const myLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log("logged");
  console.log(req.headers);
  next();
};

export default myLogger;
