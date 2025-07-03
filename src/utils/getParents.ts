/**
 * Gets all parent elements up to the document root
 * @param element - The DOM element
 * @returns Array of parent elements including the element itself
 */
export function getParents(element: Element): Element[] {
  const parents: Element[] = [];
  let currentElement: Element | null = element;
  
  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
    parents.push(currentElement);
    currentElement = currentElement.parentElement;
  }
  
  return parents;
}
