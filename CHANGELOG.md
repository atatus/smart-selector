# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-07-03

### Changed
- Updated GitHub URL in all relevant files: CONTRIBUTING.md, README.md, dist/index.esm.js, package.json, rollup.config.js, scripts/build.js, scripts/release.sh.

## [1.0.0] - 2025-07-03

### Added
- Initial release of smart-selector TypeScript library
- Complete TypeScript port of unique-selector with enhanced type safety
- Support for multiple selector types: ID, Class, Tag, NthChild, Attributes
- Configurable options for selector generation
- Comprehensive test suite with Jest and jsdom
- Multiple build outputs: ES modules, CommonJS, UMD
- TypeScript declarations for full type support
- Interactive HTML demo with Bootstrap UI
- Zero runtime dependencies
- Rollup build system with minification
- ESLint and Prettier configuration
- MIT License

### Features
- **Smart Selector Generation**: Automatically generates the most appropriate unique CSS selector
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Configurable**: Support for different selector strategies and exclusion patterns
- **Performance Optimized**: Efficient DOM traversal algorithms
- **Cross-Platform**: Works in browsers, Node.js, and various build systems
- **Well Tested**: 100% test coverage with comprehensive test suite

### API
- `smartSelector(element, options?)` - Main function for selector generation
- `SelectorType` - TypeScript type for available selector types
- `SmartSelectorOptions` - Configuration interface
- Utility functions: `getID`, `getClassSelectors`, `getTag`, `getNthChild`, `getAttributes`, `isUnique`

### Build System
- Rollup configuration for multiple output formats
- TypeScript compilation with declaration files
- Source maps for debugging
- Minified UMD build for browser usage
- ESLint for code quality
- Prettier for code formatting

### Documentation
- Comprehensive README with usage examples
- API reference documentation
- Interactive demo page
- TypeScript type definitions
- Contributing guidelines
- License information

### Testing
- Jest test framework with jsdom environment
- Comprehensive test coverage
- Type checking tests
- Integration tests for DOM manipulation
- Performance tests for efficiency

## [Unreleased]

### Planned
- Browser compatibility testing
- Performance benchmarks
- Additional selector strategies
- Plugin system for custom selectors
- CLI tool for testing selectors
- Additional output formats

---

## Version History

- **1.0.0** - Initial TypeScript port release
- **0.x.x** - Development versions (not released)

## Migration from unique-selector

Smart Selector is designed as a drop-in replacement for unique-selector with additional TypeScript benefits:

### Breaking Changes
- Requires TypeScript/modern JavaScript environment
- Function signature remains the same but with better type safety
- Options interface is more strictly typed

### Improvements
- Full TypeScript support
- Better error handling
- More reliable selector generation
- Modern build system
- Comprehensive testing
- Better documentation

### Migration Steps
1. Replace `unique-selector` with `smart-selector` in package.json
2. Update imports to use TypeScript types if needed
3. Test your existing code (should work without changes)
4. Optionally add TypeScript types for better development experience

Example migration:
```javascript
// Before (unique-selector)
import unique from 'unique-selector';
const selector = unique(element, options);

// After (smart-selector)
import smartSelector from 'smart-selector';
const selector = smartSelector(element, options);
```