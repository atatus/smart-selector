/**
 * Gets the ID selector for an element
 * @param element - The DOM element
 * @returns The ID selector string or null if no ID exists
 */
export function getID(element) {
    const id = element.getAttribute('id');
    if (!id) {
        return null;
    }
    // Handle IDs with special characters by escaping them
    const escapedId = id.replace(/:/g, '\\:');
    return `#${escapedId}`;
}
//# sourceMappingURL=getID.js.map