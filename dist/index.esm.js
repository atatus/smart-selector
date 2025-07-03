/**
 * smart-selector v1.0.0
 * TypeScript library for generating unique CSS selectors
 * https://github.com/atatus/smart-selector
 *
 * @license MIT
 */
/**
 * Checks if the given object is a DOM element
 * @param element - The object to check
 * @returns True if the object is a DOM element, false otherwise
 */
function isElement(element) {
    return element instanceof Element;
}

/**
 * Gets the ID selector for an element
 * @param element - The DOM element
 * @returns The ID selector string or null if no ID exists
 */
function getID(element) {
    const id = element.getAttribute('id');
    if (!id) {
        return null;
    }
    // Handle IDs with special characters by escaping them
    const escapedId = id.replace(/:/g, '\\:');
    return `#${escapedId}`;
}

/**
 * Gets class selectors for an element
 * @param element - The DOM element
 * @returns Array of class selector strings
 */
function getClassSelectors(element) {
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

/**
 * Gets the tag selector for an element
 * @param element - The DOM element
 * @returns The tag selector string or null
 */
function getTag(element) {
    const tagName = element.tagName;
    if (!tagName) {
        return null;
    }
    return tagName.toLowerCase();
}

/**
 * Gets the nth-child selector for an element
 * @param element - The DOM element
 * @returns The nth-child selector string or null
 */
function getNthChild(element) {
    const parent = element.parentElement;
    if (!parent) {
        return null;
    }
    const children = Array.from(parent.children);
    const index = children.indexOf(element);
    if (index === -1) {
        return null;
    }
    return `:nth-child(${index + 1})`;
}

/**
 * Gets attribute selectors for an element
 * @param element - The DOM element
 * @param attributesToIgnore - Array of attribute names to ignore
 * @returns Array of attribute selector strings
 */
function getAttributes(element, attributesToIgnore = []) {
    const attributes = [];
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        if (!attributesToIgnore.includes(attr.name)) {
            attributes.push(`[${attr.name}="${attr.value}"]`);
        }
    }
    return attributes;
}

/**
 * Generates all possible combinations of selectors up to a specified length
 * @param items - Array of selector strings
 * @param maxLength - Maximum length of combinations
 * @returns Array of combined selector strings
 */
function getCombinations(items, maxLength = 3) {
    if (!items.length) {
        return [];
    }
    const combinations = [];
    // Generate combinations of different lengths
    for (let length = 1; length <= Math.min(maxLength, items.length); length++) {
        generateCombinationsOfLength(items, length, 0, [], combinations);
    }
    return combinations;
}
/**
 * Recursive helper function to generate combinations of specific length
 * @param items - Array of items to combine
 * @param length - Target length of combinations
 * @param startIndex - Starting index for current iteration
 * @param current - Current combination being built
 * @param result - Array to store completed combinations
 */
function generateCombinationsOfLength(items, length, startIndex, current, result) {
    if (current.length === length) {
        result.push(current.join(''));
        return;
    }
    for (let i = startIndex; i < items.length; i++) {
        current.push(items[i]);
        generateCombinationsOfLength(items, length, i + 1, current, result);
        current.pop();
    }
}

/**
 * Gets all parent elements up to the document root
 * @param element - The DOM element
 * @returns Array of parent elements including the element itself
 */
function getParents(element) {
    const parents = [];
    let currentElement = element;
    while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
        parents.push(currentElement);
        currentElement = currentElement.parentElement;
    }
    return parents;
}

/**
 * Checks if a selector uniquely identifies an element
 * @param element - The DOM element to check
 * @param selector - The CSS selector string
 * @returns True if the selector uniquely identifies the element
 */
function isUnique(element, selector) {
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

/**
 * Smart Selector - TypeScript port of unique-selector
 * Generates unique CSS selectors for DOM elements
 */
/**
 * Default options for smart-selector
 */
const DEFAULT_OPTIONS = {
    selectorTypes: ['ID', 'Class', 'Tag', 'NthChild'],
    attributesToIgnore: ['id', 'class', 'length'],
    excludeRegex: null,
};
/**
 * Gets all available selectors for an element
 * @param element - The DOM element
 * @param selectorTypes - Array of selector types to generate
 * @param attributesToIgnore - Array of attribute names to ignore
 * @returns Object containing all selector types and their values
 */
function getAllSelectors(element, selectorTypes, attributesToIgnore) {
    const result = {
        ID: null,
        Class: [],
        Tag: null,
        Attributes: [],
        NthChild: null,
    };
    for (const selectorType of selectorTypes) {
        switch (selectorType) {
            case 'ID':
                result.ID = getID(element);
                break;
            case 'Class':
                result.Class = getClassSelectors(element);
                break;
            case 'Tag':
                result.Tag = getTag(element);
                break;
            case 'NthChild':
                result.NthChild = getNthChild(element);
                break;
            case 'Attributes':
                result.Attributes = getAttributes(element, attributesToIgnore);
                break;
        }
    }
    return result;
}
/**
 * Tests if a selector uniquely identifies an element within its parent
 * @param element - The DOM element
 * @param selector - The CSS selector string
 * @returns True if the selector is unique within the parent
 */
function testUniqueness(element, selector) {
    const { parentNode } = element;
    if (!parentNode || parentNode.nodeType !== Node.ELEMENT_NODE) {
        return false;
    }
    try {
        const elements = parentNode.querySelectorAll(selector);
        return elements.length === 1 && elements[0] === element;
    }
    catch (error) {
        return false;
    }
}
/**
 * Finds the first unique selector from an array of selectors
 * @param element - The DOM element
 * @param selectors - Array of CSS selector strings
 * @returns The first unique selector or undefined
 */
function getFirstUnique(element, selectors) {
    return selectors.find(selector => testUniqueness(element, selector));
}
/**
 * Generates unique combinations of selectors
 * @param element - The DOM element
 * @param items - Array of selector strings
 * @param tag - Optional tag selector to prepend
 * @returns The first unique combination or null
 */
function getUniqueCombination(element, items, tag) {
    if (!items.length) {
        return null;
    }
    let combinations = getCombinations(items, 3);
    let firstUnique = getFirstUnique(element, combinations);
    if (firstUnique) {
        return firstUnique;
    }
    if (tag) {
        combinations = combinations.map(combination => tag + combination);
        firstUnique = getFirstUnique(element, combinations);
        if (firstUnique) {
            return firstUnique;
        }
    }
    return null;
}
/**
 * Generates a unique selector for an element based on specified options
 * @param element - The DOM element
 * @param selectorTypes - Array of selector types to use
 * @param attributesToIgnore - Array of attribute names to ignore
 * @param excludeRegex - Regular expression to exclude certain selectors
 * @returns A unique CSS selector string or null
 */
function getUniqueSelector(element, selectorTypes, attributesToIgnore, excludeRegex) {
    let foundSelector;
    const elementSelectors = getAllSelectors(element, selectorTypes, attributesToIgnore);
    // Apply exclude regex if provided
    if (excludeRegex && excludeRegex instanceof RegExp) {
        if (elementSelectors.ID && excludeRegex.test(elementSelectors.ID)) {
            elementSelectors.ID = null;
        }
        elementSelectors.Class = elementSelectors.Class.filter(className => !excludeRegex.test(className));
    }
    // Try each selector type in order
    for (const selectorType of selectorTypes) {
        const { ID, Tag, Class: Classes, Attributes, NthChild } = elementSelectors;
        switch (selectorType) {
            case 'ID':
                if (ID && testUniqueness(element, ID)) {
                    return ID;
                }
                break;
            case 'Tag':
                if (Tag && testUniqueness(element, Tag)) {
                    return Tag;
                }
                break;
            case 'Class':
                if (Classes && Classes.length) {
                    foundSelector = getUniqueCombination(element, Classes, Tag);
                    if (foundSelector) {
                        return foundSelector;
                    }
                }
                break;
            case 'Attributes':
                if (Attributes && Attributes.length) {
                    foundSelector = getUniqueCombination(element, Attributes, Tag);
                    if (foundSelector) {
                        return foundSelector;
                    }
                }
                break;
            case 'NthChild':
                if (NthChild) {
                    return NthChild;
                }
                break;
        }
    }
    return '*';
}
/**
 * Generate unique CSS selector for given DOM element
 * @param element - The DOM element
 * @param options - Configuration options
 * @returns A unique CSS selector string or null if unable to generate
 */
function smartSelector(element, options = {}) {
    // Input validation
    if (!isElement(element)) {
        throw new Error('First argument must be a DOM element');
    }
    const { selectorTypes = DEFAULT_OPTIONS.selectorTypes, attributesToIgnore = DEFAULT_OPTIONS.attributesToIgnore, excludeRegex = DEFAULT_OPTIONS.excludeRegex, } = options;
    // Validate selector types
    const validSelectorTypes = ['ID', 'Class', 'Tag', 'NthChild', 'Attributes'];
    const invalidTypes = selectorTypes.filter(type => !validSelectorTypes.includes(type));
    if (invalidTypes.length > 0) {
        throw new Error(`Invalid selector types: ${invalidTypes.join(', ')}`);
    }
    const allSelectors = [];
    const parents = getParents(element);
    // Generate selectors for each parent element
    for (const elem of parents) {
        const selector = getUniqueSelector(elem, selectorTypes, attributesToIgnore, excludeRegex);
        if (selector) {
            allSelectors.push(selector);
        }
    }
    // Build selector path from most specific to least specific
    const selectors = [];
    for (const selector of allSelectors) {
        selectors.unshift(selector);
        const combinedSelector = selectors.join(' > ');
        if (isUnique(element, combinedSelector)) {
            return combinedSelector;
        }
    }
    return null;
}

export { smartSelector as default, getAttributes, getClassSelectors, getCombinations, getID, getNthChild, getParents, getTag, isElement, isUnique, smartSelector };
//# sourceMappingURL=index.esm.js.map
