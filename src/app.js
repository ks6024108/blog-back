import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { authRoute, blogRoute, categoryRoute } from "./routes/index.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/index.js";
import notFound from "./controllers/notFound.js";
// import multer from "multer";
// import { storage } from "./config/cloudinary.js";
// import path from "path";
// import upload from "./middlewares/upload.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bloggy-mmrt72f6x-ks6024108s-projects.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use(morgan("dev"));

//route section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);

app.use("/api/v1/blog", blogRoute);

//not found route
app.use("*", notFound);

//error handling middleware
app.use(errorHandler);
export default app;
