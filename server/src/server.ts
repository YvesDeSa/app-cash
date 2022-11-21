import "express-async-errors";
import routes from "./routes";
import cors from "cors";
import express, { NextFunction, Request, Response } from 'express';
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error.',
  });

});

app.listen(3030, () => {
  console.log("🚀 Server started in port 3030")
});