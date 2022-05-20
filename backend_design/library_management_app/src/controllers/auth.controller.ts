import * as UserService from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface loginUserRequest {
  email: string;
  password: string;
}

interface registerUserRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  date_of_birth: Date;
}

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    // Get User input
    // Validate user input
    // check to see if the user already exsists
    // encrypt the user's password
    // create the user in the db
    // create a signed jwt token
    const { firstname, lastname, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await UserService.findUserByEmail(email);
    console.log(`old user ${JSON.stringify(oldUser)}`);
    if (oldUser) {
      console.log("user is old");
      return res.status(409).send("User already exsists for this email");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    delete req.body.password;
    const user = await UserService.insertUser({
      firstname,
      lastname,
      email,
      passwordhash: encryptedPassword,
      ...req.body
    });

    const token = jwt.sign({ userId: user[0].id, ...req.body }, "jwt-secret", {
      expiresIn: "6h"
    });

    return res.json({ token });
  } catch (err) {
    throw err;
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | HttpException> => {
  try {
    // Get user input
    // Validate user input
    // check to see if the user already exsists
    // Verify incoming user password with what the hash we have in the DB
    // Return signed jwt token
    const userInput = req.body;
    if (!userInput.email)
      next(new HttpException(403, "Email required for login"));
    if (!userInput.password)
      next(new HttpException(403, "Password required for login"));

    const user = await UserService.findUserByEmail(userInput.email);

    if (!user)
      next(
        new HttpException(404, "Unable to find user for this email address")
      );

    console.log(user);
    const comparePassword = await bcrypt.compare(
      userInput.password,
      user.passwordhash
    );

    if (!comparePassword)
      res.json({
        error: new HttpException(403, "Unable to log in with this password")
      });

    const token = jwt.sign({ user_id: user.id }, "jwt-secret", {
      expiresIn: "6h"
    });

    return res.json({ data: user, token });
  } catch (err) {
    next(err);
    throw err;
  }
};

export { login, register };
