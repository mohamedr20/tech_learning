import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRoutes from '../src/routes/user.routes';

dotenv.config();
const app = express();
//const enviroment = process.env.NODE_ENV || "development";

app.use('/users', userRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Healthy' });
});

app.get('/testy', (req: Request, res: Response) => {
  res.json({ status: 'Test' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
