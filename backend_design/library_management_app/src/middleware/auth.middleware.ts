import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: Record<string, any>;
}

const authenticateUser = async (
  req: AuthRequest,
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
  }
};

export default authenticateUser;
