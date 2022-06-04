import app from "./app";
import { Request, Response } from "express";

const port = process.env.PORT || 8000;

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "Healthy" });
});

app.get("/test", (_req: Request, res: Response) => {
  res.json({ status: "Test" });
});

app.listen(port, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
