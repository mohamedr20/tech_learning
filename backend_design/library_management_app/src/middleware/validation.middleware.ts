import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, RequestHandler } from "express";
import HttpException from "../exceptions/HttpException";

function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, _res, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => {
            return { [error.property]: error.constraints };
          });
          next(new HttpException(400, JSON.stringify(message)));
        } else {
          next();
        }
      }
    );
  };
}

export default validationMiddleware;
