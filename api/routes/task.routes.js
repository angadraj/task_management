// Importing the necessary modules and functions
import express from "express";
import { taskController } from "../controllers/task.controller.js";
import { jwtVerify } from "../middlewares/jwtVerify.js";

// Creating an instance of the Express router
export const taskRouter = express.Router();

// Applying JWT verification middleware to all routes in this router
taskRouter.use(jwtVerify);

// Defining routes for handling task

// Route: /task/new
// Description: Add a new task
taskRouter.route('/new')
    .post(taskController.addTask);      // POST request to add a new task


// Route: /task/status
// Description: for retrieving task statuses
taskRouter.route('/status')
    .get(taskController.taskStatus)


// Route: /task/list
// Description: Get all tasks
taskRouter.route('/list')
    .get(taskController.tasks);         // GET request to retrieve all tasks


// Route: /task/:id
// Description: Get, delete, or update a specific task by its ID
taskRouter.route('/:id')
    .get(taskController.getTask)        // GET request to retrieve task details
    .delete(taskController.deleteTask)  // DELETE request to delete a task
    .patch(taskController.updateTask);  // PATCH request to update a task

