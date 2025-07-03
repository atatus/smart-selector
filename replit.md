# Smart Selector

## Overview

Smart Selector is a TypeScript library for generating unique CSS selectors from DOM elements. It's a modern TypeScript port of the popular unique-selector library, designed to provide robust, type-safe selector generation for web scraping, testing, and DOM manipulation tasks.

## System Architecture

### Frontend Architecture
- **Core Library**: TypeScript-based modular architecture with clear separation of concerns
- **Build System**: Rollup with multiple output formats (ES modules, CommonJS, UMD)
- **Demo Interface**: Simple HTML page with Bootstrap styling for interactive demonstrations

### Backend Architecture
- **Pure Client-Side**: No backend components - operates entirely in the browser environment
- **Stateless**: No data persistence required - all operations are performed on DOM elements in memory

## Key Components

### Core Module (`src/index.ts`)
- Main entry point and orchestrator
- Implements the primary `smartSelector` function
- Manages selector generation strategy and options
- Handles error cases and input validation

### Utility Modules
- **Element Validation** (`utils/isElement.ts`): Type checking for DOM elements
- **Selector Generators**: Individual utilities for different selector types
  - ID selectors (`utils/getID.ts`)
  - Class selectors (`utils/getClasses.ts`)
  - Tag selectors (`utils/getTag.ts`)
  - Nth-child selectors (`utils/getNthChild.ts`)
  - Attribute selectors (`utils/getAttributes.ts`)
- **Combination Logic** (`utils/getCombinations.ts`): Generates selector combinations
- **DOM Traversal** (`utils/getParents.ts`): Parent element navigation
- **Uniqueness Validation** (`utils/isUnique.ts`): Verifies selector uniqueness

### Type System (`src/types.ts`)
- Comprehensive TypeScript definitions
- Configuration interfaces for customization
- Selector type enums and function signatures

## Data Flow

1. **Input Validation**: Verify DOM element input using `isElement`
2. **Option Processing**: Merge user options with defaults
3. **Selector Generation**: Generate all possible selectors based on configuration
4. **Combination Creation**: Create combinations of selectors for complex elements
5. **Uniqueness Testing**: Test each selector/combination for uniqueness
6. **Result Selection**: Return the shortest unique selector found

## External Dependencies

### Development Dependencies
- **TypeScript**: Primary language and type checking
- **Rollup**: Module bundler with TypeScript plugin
- **Jest**: Testing framework with jsdom environment
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting

### Runtime Dependencies
- **None**: Zero runtime dependencies for maximum compatibility

## Deployment Strategy

### Build Process
- Multiple output formats for different consumption patterns:
  - ES modules for modern bundlers
  - CommonJS for Node.js environments
  - UMD for browser script tags
- Source maps and TypeScript declarations included
- Minified production builds available

### Distribution
- npm package distribution
- CDN-ready UMD builds
- GitHub releases with automated versioning

### Testing Strategy
- Unit tests for all utility functions
- Integration tests for main selector generation
- jsdom environment for DOM testing
- Coverage reporting and CI integration

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Completed TypeScript port of unique-selector library as "smart-selector"
  - Built complete TypeScript library with full type definitions
  - Created modular architecture with utility functions
  - Set up comprehensive test suite with Jest (all tests passing)
  - Configured build system with Rollup for multiple output formats
  - Created interactive HTML demo with Bootstrap UI
  - Updated package.json configuration for smart-selector project
  - Created comprehensive documentation (README, CHANGELOG, CONTRIBUTING)
  - Added complete usage examples, API reference, and license information
- July 03, 2025. Added comprehensive release documentation and automation
  - Created detailed release process documentation in CONTRIBUTING.md
  - Added automated GitHub Actions workflows for CI/CD and releases
  - Built release automation script with comprehensive error checking
  - Documented tag creation, npm publishing, and rollback procedures
  - Added support for pre-release versions (alpha/beta)
  - Created release checklist and emergency hotfix procedures
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```