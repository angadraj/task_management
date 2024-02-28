// Importing necessary modules and route handlers
import express from "express";
import { authRouter } from "./auth.routes.js";
import { taskRouter } from "./task.routes.js";

// Create an instance of the Express Router
export const router = express.Router();

// Use the authentication router for routes starting with '/auth'
router.use('/auth', authRouter);

// Use the task router for routes starting with '/task'
router.use('/task', taskRouter);
