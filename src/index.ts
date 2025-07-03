/**
 * Smart Selector - TypeScript port of unique-selector
 * Generates unique CSS selectors for DOM elements
 */

import { SmartSelectorOptions, SelectorType, ElementSelectors, SelectorFunctions } from './types';
import { isElement } from './utils/isElement';
import { getID } from './utils/getID';
import { getClassSelectors } from './utils/getClasses';
import { getTag } from './utils/getTag';
import { getNthChild } from './utils/getNthChild';
import { getAttributes } from './utils/getAttributes';
import { getCombinations } from './utils/getCombinations';
import { getParents } from './utils/getParents';
import { isUnique } from './utils/isUnique';

/**
 * Default options for smart-selector
 */
const DEFAULT_OPTIONS: Required<SmartSelectorOptions> = {
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
function getAllSelectors(
  element: Element,
  selectorTypes: SelectorType[],
  attributesToIgnore: string[]
): ElementSelectors {
  const functions: SelectorFunctions = {
    Tag: getTag,
    NthChild: getNthChild,
    Attributes: (elem) => getAttributes(elem, attributesToIgnore),
    Class: getClassSelectors,
    ID: getID,
  };

  return selectorTypes.reduce(
    (result, selectorType) => {
      const func = functions[selectorType];
      if (func) {
        result[selectorType] = func(element) as any;
      }
      return result;
    },
    {
      ID: null,
      Class: [],
      Tag: null,
      Attributes: [],
      NthChild: null,
    } as ElementSelectors
  );
}

/**
 * Tests if a selector uniquely identifies an element within its parent
 * @param element - The DOM element
 * @param selector - The CSS selector string
 * @returns True if the selector is unique within the parent
 */
function testUniqueness(element: Element, selector: string): boolean {
  const { parentNode } = element;
  if (!parentNode || parentNode.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  try {
    const elements = (parentNode as Element).querySelectorAll(selector);
    return elements.length === 1 && elements[0] === element;
  } catch (error) {
    return false;
  }
}

/**
 * Finds the first unique selector from an array of selectors
 * @param element - The DOM element
 * @param selectors - Array of CSS selector strings
 * @returns The first unique selector or undefined
 */
function getFirstUnique(element: Element, selectors: string[]): string | undefined {
  return selectors.find(selector => testUniqueness(element, selector));
}

/**
 * Generates unique combinations of selectors
 * @param element - The DOM element
 * @param items - Array of selector strings
 * @param tag - Optional tag selector to prepend
 * @returns The first unique combination or null
 */
function getUniqueCombination(element: Element, items: string[], tag?: string | null): string | null {
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
function getUniqueSelector(
  element: Element,
  selectorTypes: SelectorType[],
  attributesToIgnore: string[],
  excludeRegex: RegExp | null
): string | null {
  let foundSelector: string | null;
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
export default function smartSelector(
  element: Element,
  options: SmartSelectorOptions = {}
): string | null {
  // Input validation
  if (!isElement(element)) {
    throw new Error('First argument must be a DOM element');
  }

  const {
    selectorTypes = DEFAULT_OPTIONS.selectorTypes,
    attributesToIgnore = DEFAULT_OPTIONS.attributesToIgnore,
    excludeRegex = DEFAULT_OPTIONS.excludeRegex,
  } = options;

  // Validate selector types
  const validSelectorTypes: SelectorType[] = ['ID', 'Class', 'Tag', 'NthChild', 'Attributes'];
  const invalidTypes = selectorTypes.filter(type => !validSelectorTypes.includes(type));
  if (invalidTypes.length > 0) {
    throw new Error(`Invalid selector types: ${invalidTypes.join(', ')}`);
  }

  const allSelectors: string[] = [];
  const parents = getParents(element);

  // Generate selectors for each parent element
  for (const elem of parents) {
    const selector = getUniqueSelector(elem, selectorTypes, attributesToIgnore, excludeRegex);
    if (selector) {
      allSelectors.push(selector);
    }
  }

  // Build selector path from most specific to least specific
  const selectors: string[] = [];
  for (const selector of allSelectors) {
    selectors.unshift(selector);
    const combinedSelector = selectors.join(' > ');
    
    if (isUnique(element, combinedSelector)) {
      return combinedSelector;
    }
  }

  return null;
}

// Named exports for additional utility
export {
  smartSelector,
  SmartSelectorOptions,
  SelectorType,
  ElementSelectors,
  isElement,
  getID,
  getClassSelectors,
  getTag,
  getNthChild,
  getAttributes,
  getCombinations,
  getParents,
  isUnique,
};
