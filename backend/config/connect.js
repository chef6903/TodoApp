import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));

  await mongoose.connect(`${process.env.MONGODB_URI}/todo_app`);
};

export default connectDB;
