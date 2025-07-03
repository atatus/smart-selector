/**
 * Gets attribute selectors for an element
 * @param element - The DOM element
 * @param attributesToIgnore - Array of attribute names to ignore
 * @returns Array of attribute selector strings
 */
export function getAttributes(element, attributesToIgnore = []) {
    const attributes = [];
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        if (!attributesToIgnore.includes(attr.name)) {
            attributes.push(`[${attr.name}="${attr.value}"]`);
        }
    }
    return attributes;
}
//# sourceMappingURL=getAttributes.js.map