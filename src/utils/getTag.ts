/**
 * Gets the tag selector for an element
 * @param element - The DOM element
 * @returns The tag selector string or null
 */
export function getTag(element: Element): string | null {
  const tagName = element.tagName;
  
  if (!tagName) {
    return null;
  }

  return tagName.toLowerCase();
}
