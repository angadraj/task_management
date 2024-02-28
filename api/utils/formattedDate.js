/**
 * Generates a formatted date string in the 'YYYY-MM-DD' format.
 * @param {number} timestamp - Optional timestamp to generate the date from.
 * @returns {string} - Formatted date string.
 */
export const formattedDate = function (timestamp = null) {
    // If no timestamp is provided, use the current timestamp
    if (!timestamp) {
        timestamp = getCurrentTimestamp();
    }

    // Create a new Date object from the provided or current timestamp
    const date = new Date(timestamp);

    // Extract day, month, and year components and format them
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Combine components to form the formatted date string
    return `${year}-${month}-${day}`;
}

/**
 * Gets the current timestamp in 'YYYY-MM-DDTHH:mm:ss' format.
 * @returns {string} - Formatted timestamp string.
 */
export const getCurrentTimestamp = function () {
    const now = new Date();

    // Extract individual components of the current timestamp and format them
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Combine components to form the formatted timestamp string
    const formattedTimestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedTimestamp;
}
