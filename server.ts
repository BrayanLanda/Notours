import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

// Load .env by default and fallback to config.env if needed.
dotenv.config({ path: "./.env" });
dotenv.config({ path: "./config.env", override: false });

const database = process.env.DATABASE;
const databasePassword = process.env.DATABASE_PASSWORD;

if (!database || !databasePassword) {
  throw new Error("Missing DATABASE or DATABASE_PASSWORD in environment variables");
}

const DB = database.replace("<PASSWORD>", databasePassword);

mongoose.connect(DB).then(() => console.log("DATABASE connection successfully.."));

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
