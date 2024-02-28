// Importing necessary modules and functions
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";

// Load environment variables from a .env file
dotenv.config();

// Middleware function for JWT verification
export const jwtVerify = function (req, reply, next) {
    try {
        console.log("Executing JWT verification");

        // Check if the Authorization header is present in the request
        if (!req?.headers?.authorization) {
            return sendResponse(reply, 401, "Auth Header is missing!", "error", null);
        }

        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;

        // Check if a token is present in the request
        if (!token) {
            return sendResponse(reply, 401, "Auth token required", "error", null);
        }

        // Verify the authenticity of the token using the JWT_SECRET
        jsonwebtoken.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            // Handle any verification errors
            if (err) {
                console.log(err);
                return sendResponse(reply, 401, "Auth token is invalid", "error", null);
            }

            // Attach decoded user_id and email to the request for future use
            req.user_id = decoded.user_id;
            req.user_email = decoded.email;

            // Continue to the next middleware or route handler
            next();
        });

    } catch (e) {
        // Log and handle any errors that occur during JWT verification
        console.log(e, e.stack);
        return sendResponse(reply, 403, e, e.stack, null);
    }
};
