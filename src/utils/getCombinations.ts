/**
 * Generates all possible combinations of selectors up to a specified length
 * @param items - Array of selector strings
 * @param maxLength - Maximum length of combinations
 * @returns Array of combined selector strings
 */
export function getCombinations(items: string[], maxLength: number = 3): string[] {
  if (!items.length) {
    return [];
  }

  const combinations: string[] = [];
  
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
function generateCombinationsOfLength(
  items: string[],
  length: number,
  startIndex: number,
  current: string[],
  result: string[]
): void {
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
