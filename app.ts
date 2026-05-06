import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req: Request, _res: Response, next: NextFunction) => {
  next();
});

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
