/**
 * Supported selector types for generating unique CSS selectors
 */
export type SelectorType = 'ID' | 'Class' | 'Tag' | 'NthChild' | 'Attributes';

/**
 * Configuration options for smart-selector
 */
export interface SmartSelectorOptions {
  /**
   * Array of selector types to use for generating unique selectors
   * @default ['ID', 'Class', 'Tag', 'NthChild']
   */
  selectorTypes?: SelectorType[];

  /**
   * Array of attribute names to ignore when generating attribute selectors
   * @default ['id', 'class', 'length']
   */
  attributesToIgnore?: string[];

  /**
   * Regular expression to exclude certain ID and class names
   * @default null
   */
  excludeRegex?: RegExp | null;
}

/**
 * Internal selector data structure
 */
export interface ElementSelectors {
  ID: string | null;
  Class: string[];
  Tag: string | null;
  Attributes: string[];
  NthChild: string | null;
}

/**
 * Function type for selector generation functions
 */
export type SelectorFunction = (element: Element, ...args: any[]) => string | string[] | null;

/**
 * Mapping of selector types to their corresponding functions
 */
export interface SelectorFunctions {
  Tag: (element: Element) => string | null;
  NthChild: (element: Element) => string | null;
  Attributes: (element: Element) => string[];
  Class: (element: Element) => string[];
  ID: (element: Element) => string | null;
}
