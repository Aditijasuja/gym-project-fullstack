import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectionToDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/gym-database');

    if (connection) {
      console.log(`MongoDB Connection successfull ${process.env.MONGO_URL
      }`);
    }
  } catch (e) {
    console.log("Error is", e);
    process.exit(1);
  }
};

export default connectionToDb;