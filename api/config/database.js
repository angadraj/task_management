// Importing Mongoose for MongoDB interactions and dotenv for environment variable configuration
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Function to connect to the MongoDB database
export const database = async function () {
    try {
        // Log a message indicating the attempt to connect to the database
        console.log("Connecting to the database");

        // Use Mongoose to establish a connection to the MongoDB database
        await mongoose.connect(process.env.MONGO_DB_LINK);

        // Log a message indicating a successful connection to the database
        console.log("Connected to the database");

    } catch (e) {
        // Log an error message if there's an issue connecting to the database
        console.log("Error connecting to the database");

        // Log the specific error and its stack trace
        console.log(e, e.stack);
    }
};
