// Importing necessary module
import mongoose from 'mongoose';

// Define the structure of the User model using Mongoose Schema
const UserSchema = mongoose.Schema({
    // Name of the user (required)
    name: {
        type: String,
        required: true
    },

    // Email of the user (required, unique, and limited to 30 characters)
    email: {
        type: String,
        required: true,
        maxLength: [30, 'Email should not exceed 30 characters'],
        unique: true
    },

    // Password of the user (required and must contain a minimum of 8 characters)
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must contain a minimum of 8 characters']
    },

    // Flag indicating whether the user is active or not (default is active)
    is_active: {
        type: Boolean,
        default: true
    },

}, {
    // Enable timestamps to automatically add createdAt and updatedAt fields
    timestamps: true
});

// Create the UserModel based on the defined schema
export const UserModel = mongoose.model('UserModel', UserSchema);
