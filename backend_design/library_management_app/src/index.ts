import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "../src/routes/user.routes";
import authRoutes from "../src/routes/auth.routes";
import bookRoutes from "../src/routes/book.routes";
import myLogger from "../src/middleware/logger";
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

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "Healthy" });
});

app.get("/test", (req: Request, res: Response) => {
  res.json({ status: "Test" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
