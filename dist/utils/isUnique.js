/**
 * Checks if a selector uniquely identifies an element
 * @param element - The DOM element to check
 * @param selector - The CSS selector string
 * @returns True if the selector uniquely identifies the element
 */
export function isUnique(element, selector) {
    if (!selector) {
        return false;
    }
    try {
        const elements = element.ownerDocument.querySelectorAll(selector);
        return elements.length === 1 && elements[0] === element;
    }
    catch (error) {
        // Invalid selector
        return false;
    }
}
//# sourceMappingURL=isUnique.js.map