/**
 * Gets the nth-child selector for an element
 * @param element - The DOM element
 * @returns The nth-child selector string or null
 */
export function getNthChild(element: Element): string | null {
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
