// Importing necessary modules and functions
import { UserModel } from "../models/user.model.js";
import emailValidator from 'email-validator';
import { sendResponse } from "../utils/sendResponse.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";

// Controller object for authentication-related actions
export const authController = {
    // Signup function to handle user registration
    signup: async function (req, reply) {
        try {
            console.log("Executing signup API");

            // Destructuring request body to extract relevant data
            const { name, email, password, confirm_password } = req.body;

            // Check for required fields in the request body
            if (!name || !email || !password || !confirm_password) {
                return sendResponse(reply, 400, "Name, email, password, and confirm password are required", "error", null);
            }

            // Check if the provided passwords match
            if (password !== confirm_password) {
                return sendResponse(reply, 400, "Passwords don't match", "error", null);
            }

            // Validate the email using the email-validator module
            const validEmail = await emailValidator.validate(email);
            if (!validEmail) {
                return sendResponse(reply, 400, "Invalid email", "error", null);
            }

            // Check if a user with the provided email already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return sendResponse(reply, 400, `User with ${existingUser.email} already exists`, "error", null);
            }

            // Encrypt the password using bcrypt
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create a new user in the database
            const newUser = await UserModel.create({
                email,
                name,
                password: encryptedPassword,
            });

            // Generate a JWT token for the newly created user
            const token = jsonwebtoken.sign({
                user_id: newUser.id,
                email: newUser.email,
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });

            // Log success message and send response with token and user ID
            console.log(`User ${newUser.email} onboarded`);
            return sendResponse(reply, 200, `User ${newUser.email} onboarded`, null, {
                token,
                id: newUser.id,
            });

        } catch (e) {
            // Log and handle any errors that occur during signup
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    },

    // Login function to handle user authentication
    login: async function (req, reply) {
        try {
            console.log("Executing login API");

            // Destructuring request body to extract email and password
            const { email, password } = req.body;

            // Check for required fields in the request body
            if (!email || !password) {
                return sendResponse(reply, 400, "Email and password are required", "error", null);
            }

            // Check if a user with the provided email exists
            const existingUser = await UserModel.findOne({ email });
            if (!existingUser) {
                return sendResponse(reply, 404, "Please signup", "error", null);
            }

            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return sendResponse(reply, 401, "Password incorrect", "error", null);
            }

            // Generate a JWT token for the authenticated user
            const token = jsonwebtoken.sign({
                user_id: existingUser.id,
                email: existingUser.email,
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });

            // Log success message and send response with user details and token
            console.log(`User ${existingUser.email} logged in`);
            return sendResponse(reply, 200, `Welcome ${existingUser.name}`, null, {
                name: existingUser.name,
                email: existingUser.email,
                id: existingUser.id,
                token,
            });

        } catch (e) {
            // Log and handle any errors that occur during login
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    }
};
