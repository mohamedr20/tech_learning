import { plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "../exceptions/HttpException";

// function validationMiddleware<T>(type: T, skipMissingProperties){
//   return (req,res, next) => {
//     ///
//   }
// }
