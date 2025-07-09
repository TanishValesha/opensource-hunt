import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute';

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.options(/.*/, cors());


app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.use("/api", userRoute);

const apiCheck = (req: Request, res: Response) => {
  res.json({
    message: "API is running",
  });
};

app.get("/", apiCheck);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});