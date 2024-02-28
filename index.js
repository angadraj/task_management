// Importing necessary modules and functions
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './api/routes/routes.js';
import { database } from './api/config/database.js';

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the defined router for routes starting with '/api/v1'
app.use('/api/v1', router);

// Custom middleware to handle CORS headers
app.use(function (req, res, next) {
    // Allow requests from any origin (you might want to restrict this in a production environment)
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Allow the following HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Set allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, User-Agent');

    // Set whether credentials are allowed (e.g., cookies, HTTP authentication)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Continue to the next middleware or route handler
    next();
});

// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to the database and start the server
app.listen(process.env.PORT, function () {
    // Initialize the database connection
    database();

    // Log the server's address and port
    console.log(`Server is running at http://localhost:${process.env.PORT}/api/v1`);
});
