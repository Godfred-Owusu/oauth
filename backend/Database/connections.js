import mongoose from "mongoose";

async function connections() {
  try {
    await mongoose.connect("mongodb://localhost:27017/signin");
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}
export default connections;
