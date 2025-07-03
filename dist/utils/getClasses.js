/**
 * Gets class selectors for an element
 * @param element - The DOM element
 * @returns Array of class selector strings
 */
export function getClassSelectors(element) {
    const className = element.getAttribute('class');
    if (!className) {
        return [];
    }
    // Split by whitespace and filter out empty strings
    return className
        .trim()
        .split(/\s+/)
        .filter(cls => cls.length > 0)
        .map(cls => `.${cls}`);
}
//# sourceMappingURL=getClasses.js.map