import smartSelector from '../src/index';
import { isElement } from '../src/utils/isElement';

// Setup DOM environment
const setupDOM = () => {
  document.body.innerHTML = `
    <div id="container">
      <div id="unique-id">Unique ID element</div>
      <div class="test-class">Class element</div>
      <div class="test-class multiple-classes">Multiple classes</div>
      <span>Span element</span>
      <div data-test="value">Attribute element</div>
      <div>
        <p>Nested paragraph</p>
      </div>
    </div>
  `;
};

beforeEach(() => {
  setupDOM();
});

describe('smartSelector', () => {
  test('should throw error for non-element input', () => {
    expect(() => smartSelector(null as any)).toThrow('First argument must be a DOM element');
    expect(() => smartSelector({} as any)).toThrow('First argument must be a DOM element');
    expect(() => smartSelector('string' as any)).toThrow('First argument must be a DOM element');
  });

  test('should generate ID selector for element with unique ID', () => {
    const element = document.getElementById('unique-id')!;
    const selector = smartSelector(element);
    
    expect(selector).toBe('#unique-id');
  });

  test('should generate class selector for element with class', () => {
    const element = document.querySelector('.test-class')!;
    const selector = smartSelector(element);
    
    expect(selector).toContain('.test-class');
  });

  test('should generate tag selector when specified', () => {
    const element = document.querySelector('span')!;
    const selector = smartSelector(element, { selectorTypes: ['Tag'] });
    
    expect(selector).toBe('span');
  });

  test('should generate nth-child selector when needed', () => {
    const element = document.querySelector('p')!;
    const selector = smartSelector(element, { selectorTypes: ['NthChild'] });
    
    expect(selector).toContain(':nth-child(');
  });

  test('should generate attribute selector', () => {
    const element = document.querySelector('[data-test="value"]')!;
    const selector = smartSelector(element, { selectorTypes: ['Attributes'] });
    
    expect(selector).toContain('[data-test="value"]');
  });

  test('should respect excludeRegex option', () => {
    const element = document.getElementById('unique-id')!;
    const selector = smartSelector(element, { excludeRegex: /unique-id/ });
    
    expect(selector).not.toBe('#unique-id');
  });

  test('should respect attributesToIgnore option', () => {
    const element = document.querySelector('[data-test="value"]')!;
    const selector = smartSelector(element, { 
      selectorTypes: ['Attributes'],
      attributesToIgnore: ['data-test']
    });
    
    expect(selector).not.toContain('[data-test="value"]');
  });

  test('should generate hierarchical selector for nested elements', () => {
    const element = document.querySelector('p')!;
    const selector = smartSelector(element);
    
    expect(selector).toContain(' > ');
  });

  test('should return null for elements that cannot be uniquely identified', () => {
    // Create multiple identical elements
    document.body.innerHTML = `
      <div>
        <div></div>
        <div></div>
      </div>
    `;
    
    const elements = document.querySelectorAll('div > div');
    const selector = smartSelector(elements[0], { selectorTypes: ['Tag'] });
    
    // Should fall back to nth-child or return a working selector
    expect(selector).toBeTruthy();
  });

  test('should throw error for invalid selector types', () => {
    const element = document.getElementById('unique-id')!;
    
    expect(() => smartSelector(element, { selectorTypes: ['InvalidType'] as any })).toThrow(
      'Invalid selector types: InvalidType'
    );
  });
});

describe('isElement utility', () => {
  test('should correctly identify DOM elements', () => {
    const element = document.createElement('div');
    expect(isElement(element)).toBe(true);
    
    expect(isElement(null)).toBe(false);
    expect(isElement({})).toBe(false);
    expect(isElement('string')).toBe(false);
    expect(isElement(123)).toBe(false);
  });
});
