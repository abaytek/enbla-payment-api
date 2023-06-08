import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDb = async (url) => {
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("Db connected"));
  } catch (err) {
    console.log(err.message);
  }
};
