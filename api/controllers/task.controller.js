// Importing necessary modules and functions
import { constants } from "../config/constants.js";
import { TaskModel } from "../models/task.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import { stringValidator } from "../utils/stringValidator.js";

// Controller object for task-related actions
export const taskController = {
    // Function to retrieve paginated and active tasks for a user
    tasks: async function (req, reply) {
        try {
            console.log("Executing tasks API");

            // Extracting page and page size from query parameters or using default values
            const page = parseInt(req.query.page) ?? 1;
            const pageSize = parseInt(req.query.page_size) ?? 10;
            const status = req.query.status ?? null;

            // Validate the page number
            if (page <= 0) {
                return sendResponse(reply, 400, "Invalid page", "error", null);
            }

            // Retrieve tasks from the database based on user_id and is_active
            const taskQuery = {
                user_id: req.user_id,
                is_active: true,
            }

            if (status) {
                taskQuery.status = status;
            }

            const tasks = await TaskModel.find(taskQuery).sort({ "due_date": -1 }).skip((page - 1) * pageSize).limit(pageSize);

            // Send response with fetched tasks
            return sendResponse(reply, 200, "Tasks fetched", null, tasks);

        } catch (e) {
            // Log and handle any errors that occur during task retrieval
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    },

    // Function to add a new task
    addTask: async function (req, reply) {
        try {
            console.log("Executing add task API");

            // Extracting task details from the request body
            const { title, description, due_date, status } = req.body;

            // Validate title and description using a custom validator
            if (!stringValidator(title) || !stringValidator(description)) {
                return sendResponse(reply, 400, "Title and description are required", "error", null);
            }

            // Create a new task in the database
            const task = await TaskModel.create({
                title,
                description,
                due_date,
                status,
                user_id: req.user_id,
            });

            // Send response with the created task
            return sendResponse(reply, 200, "Task created", null, task);

        } catch (e) {
            // Log and handle any errors that occur during task creation
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    },

    // Function to update an existing task
    updateTask: async function (req, reply) {
        try {
            console.log("Executing update task API");

            // Extracting task ID from request parameters
            const id = req.params.id;

            // Validate the presence of task ID
            if (!id || id.trim() === "") {
                return sendResponse(reply, 400, "Task ID required for updating", "error", null);
            }

            // Find the task in the database by ID
            const task = await TaskModel.findById(id);

            // Check if the task with the provided ID exists
            if (!task) {
                return sendResponse(reply, 404, "Invalid task ID", "error", null);
            }

            // Update task properties based on the request body
            Object.keys(req.body).forEach(function (key) {
                if (req.body[key]) {
                    task[key] = req.body[key];
                }
            });

            // Save the updated task to the database
            await task.save();

            // Send response with the updated task details
            return sendResponse(reply, 200, "Task updated", null, {
                title: task.title,
                description: task.description,
                due_date: task.due_date,
                is_active: task.is_active,
                status: task.status,
            });

        } catch (e) {
            // Log and handle any errors that occur during task update
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    },

    // Function to retrieve details of a specific task by ID
    getTask: async function (req, reply) {
        try {
            console.log("Executing get task API");

            // Extracting task ID from request parameters
            const id = req.params.id;

            // Find the task in the database by ID
            const task = await TaskModel.findById(id);

            // Check if the task with the provided ID exists
            if (!task) {
                return sendResponse(reply, 400, "Invalid task ID", "error", null);
            }

            // Send response with the fetched task details
            return sendResponse(reply, 200, "Task fetched", null, task);

        } catch (e) {
            // Log and handle any errors that occur during task retrieval by ID
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    },

    // Function to soft-delete a task (mark as inactive)
    deleteTask: async function (req, reply) {
        try {
            console.log("Executing soft delete API");

            // Extracting task ID from request parameters
            const id = req.params.id;

            // Find the task in the database by ID
            const task = await TaskModel.findById(id);

            // Check if the task with the provided ID exists
            if (!task) {
                return sendResponse(reply, 400, "Invalid task ID", "error", null);
            }

            // Mark the task as inactive and update status to "CANCELLED"
            task["is_active"] = false;
            task["status"] = "CANCELLED";

            // Save the updated task to the database
            await task.save();

            // Send response with details of the soft-deleted task
            return sendResponse(reply, 200, "Task deleted", null, {
                id: task.id,
                title: task.title,
                description: task.description,
                is_active: task.is_active
            });

        } catch (e) {
            // Log and handle any errors that occur during task soft deletion
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    },

    // Function to fetch all task status
    taskStatus: async function (req, reply) {
        try {
            console.log("Executing task status API");
    
            // Send a response with predefined task statuses
            return sendResponse(reply, 200, "Status for tasks fetched", null, constants.task_status);
    
        } catch (e) {
            // Log and handle any errors that occur during task status retrieval
            console.log(e, e.stack);
            return sendResponse(reply, 403, e, e.stack, null);
        }
    }
};
