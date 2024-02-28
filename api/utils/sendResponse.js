/**
 * Sends a formatted response using the provided details.
 * @param {Object} reply - The reply object from the Express route handler.
 * @param {number} code - HTTP status code for the response.
 * @param {string} message - A descriptive message for the response.
 * @param {string | null} error - Optional error message or null if no error.
 * @param {any} data - Optional data to be included in the response payload.
 * @returns {Object} - The Express response object.
 */
export const sendResponse = function (reply, code, message, error, data) {
    // Construct the response payload
    const responsePayload = {
        message,
        code,
        error,
        data,
    };

    // Send the formatted response with the specified HTTP status code
    return reply.status(code).send(responsePayload);
}
