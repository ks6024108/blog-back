import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { authRoute } from "./routes/index.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/index.js";
import notFound from "./controllers/notFound.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

//route section
app.use("/api/v1/auth", authRoute);

//not found route
app.use("*", notFound);

//error handling middleware
app.use(errorHandler);
export default app;
