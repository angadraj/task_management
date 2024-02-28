// Importing necessary modules and functions
import express from "express";
import { authController } from "../controllers/auth.controller.js";

// Create an instance of the Express Router
export const authRouter = express.Router();

// Define routes for user authentication
authRouter.route('/signup')
    .post(authController.signup);

authRouter.route('/login')
    .post(authController.login);
