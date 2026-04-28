import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config({ path: "./config.env" });

const database = process.env.DATABASE;
const databasePassword = process.env.DATABASE_PASSWORD;

if (!database || !databasePassword) {
  throw new Error("Missing DATABASE or DATABASE_PASSWORD in environment variables");
}

const DB = database.replace("<PASSWORD>", databasePassword);

mongoose.connect(DB).then(() => console.log("DATABASE connection successfully.."));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
