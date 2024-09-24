import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to database successfully");
    });
    mongoose.connection.error("error", (err) => {
      console.log("error in connecting to database", err);
    });

    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    console.log(`failed to connect to database`, error.message);
    process.exit(1);
  }
};

export default connectDB;
