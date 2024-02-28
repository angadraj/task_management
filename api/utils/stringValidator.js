/**
 * Validates a string by checking if it is not empty or contains only whitespace.
 * @param {string} str - The string to be validated.
 * @returns {boolean} - True if the string is not empty or contains non-whitespace characters, false otherwise.
 */
export const stringValidator = function (str) {
    // Check if the string is empty or contains only whitespace
    if (!str || str.trim() === "") {
        return false;
    } else {
        return true;
    }
}
