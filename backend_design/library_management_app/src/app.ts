import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import myLogger from "./middleware/logger";
import errorMiddleware from "./middleware/error";

dotenv.config();
const app = express();
//const enviroment = process.env.NODE_ENV || "development";

app.use(express.json());
app.use(express.urlencoded());

app.use(myLogger);
app.use(errorMiddleware);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

export default app;
