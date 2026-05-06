const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModels").default;


dotenv.config({ path: "./.env" });

const database = process.env.DATABASE;
const databasePassword = process.env.DATABASE_PASSWORD;

if (!database || !databasePassword) {
  throw new Error("Missing DATABASE or DATABASE_PASSWORD in environment variables");
}

const DB = database.replace("<PASSWORD>", databasePassword);

// Read JSON file that matches the current Tour schema requirements.
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));


// Import data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully loaded!");
    } catch (err) {
        console.log(err);
    }
};

// Delete all data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data successfully deleted!");
    } catch (err) {
        console.log(err);
    }
};

const run = async () => {
    try {
        await mongoose.connect(DB);
        console.log("DB connection successful!");

        if (process.argv[2] === "--import") {
            await importData();
        } else if (process.argv[2] === "--delete") {
            await deleteData();
        } else {
            console.log("Use --import or --delete");
        }
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

run();