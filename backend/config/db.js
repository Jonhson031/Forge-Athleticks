import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // load FIRST before anything else

async function connectDB() {
  try {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD,
    );
    await mongoose.connect(DB);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
export default connectDB;
