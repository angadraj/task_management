// Importing necessary modules and functions
import mongoose from 'mongoose';
import { formattedDate } from '../utils/formattedDate.js';
import { constants } from '../config/constants.js';

// Define the structure of the Task model using Mongoose Schema
const TaskSchema = mongoose.Schema({
    // Title of the task (required)
    title: {
        type: String,
        required: true
    },

    // Description of the task (required)
    description: {
        type: String,
        required: true
    },

    // Due date of the task (default is the current date)
    due_date: {
        type: Date,
        default: formattedDate()
    },

    // Status of the task with predefined options
    status: {
        type: String,
        default: "TO_DO",
        enum: constants.task_status
    },

    // Flag indicating whether the task is active or not (default is active)
    is_active: {
        type: Boolean,
        default: true
    },

    // Reference to the User model using ObjectId
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel'
    },

}, {
    // Enable timestamps to automatically add createdAt and updatedAt fields
    timestamps: true
});

// Create the TaskModel based on the defined schema
export const TaskModel = mongoose.model('TaskModel', TaskSchema);
