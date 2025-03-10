import mongoose from "mongoose";
import logError from "mongoose";
import handleError from "mongoose";

export default async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected to MongoDB!");
  } catch (error) {
    handleError(error);
  }

  mongoose.connection.on("error", (err) => {
    logError(err);
  });
}
