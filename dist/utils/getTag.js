/**
 * Gets the tag selector for an element
 * @param element - The DOM element
 * @returns The tag selector string or null
 */
export function getTag(element) {
    const tagName = element.tagName;
    if (!tagName) {
        return null;
    }
    return tagName.toLowerCase();
}
//# sourceMappingURL=getTag.js.map