import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "HMS" })
    .then(() => console.log("Database connection successful."))
    .catch((err) =>
      console.log("An error occured while connecting to the database: " + err)
    );
};
