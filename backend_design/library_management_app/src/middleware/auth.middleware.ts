import { Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../utils/interfaces";

const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "jwt-secret", (err: any, user: any) => {
      if (err) {
        next(new HttpException(403, JSON.stringify(err)));
      }
      req.user = user;
      next();
    });
  } else {
    next(
      new HttpException(403, "Need to provide credentials to access resource")
    );
  }
};

export default authenticateUser;
