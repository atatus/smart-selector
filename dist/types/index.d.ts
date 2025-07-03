/**
 * Smart Selector - TypeScript port of unique-selector
 * Generates unique CSS selectors for DOM elements
 */
import { SmartSelectorOptions, SelectorType, ElementSelectors } from './types';
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
 * Generate unique CSS selector for given DOM element
 * @param element - The DOM element
 * @param options - Configuration options
 * @returns A unique CSS selector string or null if unable to generate
 */
export default function smartSelector(element: Element, options?: SmartSelectorOptions): string | null;
export { smartSelector, isElement, getID, getClassSelectors, getTag, getNthChild, getAttributes, getCombinations, getParents, isUnique, };
export type { SmartSelectorOptions, SelectorType, ElementSelectors, };
//# sourceMappingURL=index.d.ts.map