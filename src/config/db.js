import mongoose from "mongoose";
import { config } from "./config";

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
    console.log(`failed to connect to database`, error);
    process.exit(1);
  }
};

export default connectDB;
