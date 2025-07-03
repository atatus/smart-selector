# Smart Selector

[![Build Status](https://img.shields.io/github/workflow/status/your-username/smart-selector/CI)](https://github.com/your-username/smart-selector/actions)
[![npm version](https://img.shields.io/npm/v/smart-selector.svg)](https://www.npmjs.com/package/smart-selector)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for generating unique CSS selectors from DOM elements. This is a TypeScript port of the popular [unique-selector](https://github.com/ericclemmons/unique-selector) library with enhanced type safety and modern build tooling.

## Features

- 🎯 **Unique CSS Selectors**: Generate CSS selectors that uniquely identify DOM elements
- 🔧 **Configurable**: Support for different selector types (ID, Class, Tag, NthChild, Attributes)
- 🛡️ **Type Safe**: Full TypeScript support with comprehensive type definitions
- 🚀 **Modern**: Built with modern tooling and ES modules
- 📦 **Multiple Formats**: Supports ES modules, CommonJS, and UMD builds
- 🧪 **Well Tested**: Comprehensive test suite with Jest

## Installation

```bash
npm install smart-selector
```

Or using yarn:

```bash
yarn add smart-selector
```

Or using pnpm:

```bash
pnpm add smart-selector
```

## Quick Start

```javascript
import smartSelector from 'smart-selector';

// Get a DOM element
const element = document.querySelector('#my-button');

// Generate a unique CSS selector
const selector = smartSelector(element);
console.log(selector); // "#my-button"

// Use the selector to find the element again
const foundElement = document.querySelector(selector);
console.log(foundElement === element); // true
```

## Usage

### Basic Usage

```typescript
import smartSelector from 'smart-selector';

const element = document.getElementById('submit-button');
const selector = smartSelector(element);
// Result: "#submit-button"
```

### With Options

```typescript
import smartSelector, { SmartSelectorOptions } from 'smart-selector';

const options: SmartSelectorOptions = {
  selectorTypes: ['ID', 'Class', 'Tag', 'NthChild'],
  attributesToIgnore: ['id', 'class', 'data-temp'],
  excludeRegex: /^temp-/
};

const element = document.querySelector('.my-class');
const selector = smartSelector(element, options);
```

### Available Selector Types

- **ID**: Uses element's ID attribute (`#my-id`)
- **Class**: Uses element's class names (`.class1.class2`)
- **Tag**: Uses element's tag name (`div`, `span`, `button`)
- **NthChild**: Uses nth-child selector (`div:nth-child(3)`)
- **Attributes**: Uses element's attributes (`[data-id="123"]`)

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selectorTypes` | `SelectorType[]` | `['ID', 'Class', 'Tag', 'NthChild']` | Array of selector types to use |
| `attributesToIgnore` | `string[]` | `['id', 'class', 'length']` | Attribute names to ignore when generating attribute selectors |
| `excludeRegex` | `RegExp \| null` | `null` | Regular expression to exclude certain ID and class names |

### Advanced Examples

#### Using only specific selector types

```typescript
// Only use class and tag selectors
const selector = smartSelector(element, {
  selectorTypes: ['Class', 'Tag']
});
```

#### Excluding temporary classes

```typescript
// Exclude classes that start with "temp-"
const selector = smartSelector(element, {
  excludeRegex: /^temp-/
});
```

#### Including attribute selectors

```typescript
// Include custom attributes in selector generation
const selector = smartSelector(element, {
  selectorTypes: ['ID', 'Class', 'Attributes'],
  attributesToIgnore: ['id', 'class'] // Don't use id/class as attributes
});
```

#### Event tracking example

```typescript
document.addEventListener('click', (event) => {
  const selector = smartSelector(event.target as Element);
  
  // Send to analytics
  analytics.track('Element Clicked', {
    selector: selector,
    text: event.target.textContent
  });
});
```

### Using Named Exports

```typescript
import { 
  smartSelector, 
  getID, 
  getClassSelectors, 
  isUnique 
} from 'smart-selector';

// Use individual utility functions
const element = document.querySelector('button');
const id = getID(element);           // "#button-id" or null
const classes = getClassSelectors(element); // [".btn", ".primary"]
const unique = isUnique(element, '#button-id'); // true/false
```

## Browser Support

Smart Selector works in all modern browsers that support:
- ES2018 features
- DOM querySelectorAll API
- Basic TypeScript/JavaScript functionality

## CommonJS Usage

```javascript
const smartSelector = require('smart-selector');

const element = document.getElementById('my-element');
const selector = smartSelector(element);
```

## UMD/Browser Usage

```html
<script src="https://unpkg.com/smart-selector/dist/index.umd.min.js"></script>
<script>
  const element = document.getElementById('my-element');
  const selector = SmartSelector(element);
  console.log(selector);
</script>
```

## API Reference

### `smartSelector(element, options?)`

Main function to generate unique CSS selectors.

**Parameters:**
- `element` (Element): The DOM element to generate a selector for
- `options` (SmartSelectorOptions, optional): Configuration options

**Returns:** `string | null` - The unique CSS selector or null if unable to generate

**Throws:** Error if the first argument is not a DOM element

### Types

```typescript
type SelectorType = 'ID' | 'Class' | 'Tag' | 'NthChild' | 'Attributes';

interface SmartSelectorOptions {
  selectorTypes?: SelectorType[];
  attributesToIgnore?: string[];
  excludeRegex?: RegExp | null;
}
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Building

Build the library:

```bash
npm run build
```

This creates multiple output formats:
- `dist/index.esm.js` - ES Module
- `dist/index.cjs.js` - CommonJS
- `dist/index.umd.js` - UMD (Universal Module Definition)
- `dist/index.umd.min.js` - Minified UMD
- `dist/types/` - TypeScript declarations

## Development

Clone the repository:

```bash
git clone https://github.com/your-username/smart-selector.git
cd smart-selector
```

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build the project:

```bash
npm run build
```

## Use Cases

### Web Scraping
Generate reliable selectors for scraping dynamic content:

```typescript
const productElements = document.querySelectorAll('.product');
const selectors = Array.from(productElements).map(el => smartSelector(el));
// Use selectors for robust scraping
```

### Test Automation
Create stable selectors for automated testing:

```typescript
// In your test framework
const buttonSelector = smartSelector(submitButton);
await page.click(buttonSelector); // Cypress, Playwright, etc.
```

### Analytics & User Tracking
Track user interactions with precise element identification:

```typescript
document.addEventListener('click', (event) => {
  const selector = smartSelector(event.target);
  analytics.track('click', { element: selector });
});
```

### Form Field Mapping
Map form fields dynamically:

```typescript
const formInputs = document.querySelectorAll('input, select, textarea');
const fieldMap = {};
formInputs.forEach(input => {
  const selector = smartSelector(input);
  fieldMap[input.name] = selector;
});
```

## Performance

Smart Selector is optimized for performance:
- **Lightweight**: Zero runtime dependencies
- **Fast**: Efficient DOM traversal algorithms
- **Smart**: Generates the shortest unique selector possible
- **Cached**: Results can be easily cached for repeated use

## Troubleshooting

### Element not found
If `smartSelector` returns `null`:
- Check if the element exists in the DOM
- Verify the element has sufficient unique characteristics
- Try different `selectorTypes` options
- Use more permissive `excludeRegex` settings

### Selector not working
If the generated selector doesn't find the element:
- Verify the DOM structure hasn't changed
- Check for dynamic classes or IDs
- Consider using `attributesToIgnore` to exclude temporary attributes

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature-name`
5. Make your changes
6. Run tests: `npm test`
7. Build: `npm run build`
8. Commit and push your changes
9. Create a pull request

### Reporting Issues

Please use the [GitHub Issues](https://github.com/your-username/smart-selector/issues) page to report bugs or request features.

## Credits

This library is a TypeScript port of the excellent [unique-selector](https://github.com/ericclemmons/unique-selector) library by [Eric Clemmons](https://github.com/ericclemmons) and [Avraam Mavridis](https://github.com/AvraamMavridis).

### Original Authors
- **Eric Clemmons** - Original unique-selector creator
- **Avraam Mavridis** - Major contributor to unique-selector

### TypeScript Port
- **Smart Selector Contributors** - TypeScript implementation and modern tooling

## License

MIT License

Copyright (c) 2025 Smart Selector Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Related Projects

- [unique-selector](https://github.com/ericclemmons/unique-selector) - Original JavaScript implementation
- [css-selector-generator](https://github.com/fczbkk/css-selector-generator) - Alternative CSS selector generator
- [optimal-select](https://github.com/autarc/optimal-select) - Another approach to CSS selector generation

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed changes and version history.
