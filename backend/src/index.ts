import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import connectDatabase from "./config/database.config";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import "./config/passport.config"; // 確保 Passport 配置已經載入
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRoutes from "./routes/auth.route";
import { BadRequestException } from "./utils/app-error";
import userRoutes from "./routes/user.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import transactionRoutes from "./routes/transaction.route";

const app = express();
const BASE_PATH = Env.BASE_PATH || "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new BadRequestException();
      res.status(HTTPSTATUS.OK).json({
        message: "Hello World!",
      });
    } catch (error) {
      next(error);
    }
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
