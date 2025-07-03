/**
 * Checks if the given object is a DOM element
 * @param element - The object to check
 * @returns True if the object is a DOM element, false otherwise
 */
export function isElement(element: any): element is Element {
  return element instanceof Element;
}
