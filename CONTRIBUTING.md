# Contributing to Smart Selector

We love your input! We want to make contributing to Smart Selector as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/smart-selector.git
   cd smart-selector
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Build the Project**
   ```bash
   npm run build
   ```

5. **Run Linting**
   ```bash
   npm run lint
   ```

6. **Format Code**
   ```bash
   npm run format
   ```

### Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Changes**
   - Write your code following our style guidelines
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   # Run tests
   npm test
   
   # Run tests with coverage
   npm run test:coverage
   
   # Run linting
   npm run lint
   
   # Format code
   npm run format
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new selector type"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Prefer explicit types over `any`
- Use proper JSDoc comments for public APIs
- Follow the existing code style

### Code Formatting

We use Prettier for code formatting. Run `npm run format` before committing.

### Linting

We use ESLint for code quality. Run `npm run lint` to check for issues.

### Testing

- Write tests for all new functionality
- Aim for high test coverage (>90%)
- Use Jest with jsdom for DOM testing
- Test both positive and negative cases
- Include edge cases in your tests

### Commit Messages

We follow conventional commit format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding tests
- `refactor:` Code refactoring
- `style:` Code style changes
- `chore:` Build process or tooling changes

Examples:
```bash
feat: add support for shadow DOM elements
fix: handle null elements gracefully
docs: update API documentation
test: add tests for edge cases
```

## Project Structure

```
smart-selector/
├── src/                 # Source code
│   ├── index.ts        # Main entry point
│   ├── types.ts        # TypeScript type definitions
│   └── utils/          # Utility functions
├── test/               # Test files
├── dist/               # Built files (generated)
├── docs/               # Documentation
├── README.md           # Project documentation
├── CHANGELOG.md        # Version history
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
├── rollup.config.js    # Build configuration
├── jest.config.js      # Test configuration
├── .eslintrc.js        # Linting configuration
└── .prettierrc         # Formatting configuration
```

## Testing Guidelines

### Writing Tests

- Place tests in the `test/` directory
- Use descriptive test names
- Group related tests with `describe` blocks
- Test both success and failure scenarios

Example test structure:
```typescript
describe('smartSelector', () => {
  test('should generate ID selector for unique elements', () => {
    const element = document.getElementById('unique-id');
    const selector = smartSelector(element);
    expect(selector).toBe('#unique-id');
  });

  test('should handle invalid input gracefully', () => {
    expect(() => smartSelector(null)).toThrow();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testNamePattern="smartSelector"
```

## Documentation

### Code Documentation

- Use JSDoc comments for all public APIs
- Include parameter types and return types
- Provide usage examples where helpful
- Document any side effects or limitations

Example:
```typescript
/**
 * Generates a unique CSS selector for a DOM element
 * @param element - The DOM element to generate a selector for
 * @param options - Configuration options for selector generation
 * @returns A unique CSS selector string or null if unable to generate
 * @throws Error if the element parameter is not a valid DOM element
 * @example
 * ```typescript
 * const element = document.getElementById('my-button');
 * const selector = smartSelector(element);
 * console.log(selector); // "#my-button"
 * ```
 */
```

### README Updates

If your changes affect the public API or usage:
- Update the README.md file
- Add examples for new features
- Update the API reference section

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Environment details** (browser, Node.js version, etc.)
3. **Steps to reproduce** the bug
4. **Expected behavior** vs **actual behavior**
5. **Code example** demonstrating the issue
6. **Relevant error messages** or logs

Use this template:
```markdown
**Bug Description**
A clear description of what the bug is.

**Environment**
- Browser: [e.g., Chrome 91, Firefox 89]
- Node.js: [e.g., 16.14.0]
- smart-selector version: [e.g., 1.0.0]

**Steps to Reproduce**
1. Create element with '...'
2. Call smartSelector with '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Code Example**
```typescript
// Minimal code example
```

**Error Messages**
Any relevant error messages or console output.
```

### Feature Requests

For feature requests, please include:

1. **Clear description** of the feature
2. **Use case** explaining why this would be useful
3. **Proposed API** if applicable
4. **Alternative solutions** you've considered

## Release Process

Releases are handled by maintainers following semantic versioning:

- **Major version** (x.0.0): Breaking changes
- **Minor version** (0.x.0): New features, backward compatible
- **Patch version** (0.0.x): Bug fixes, backward compatible

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

## Getting Help

- **Documentation**: Check the README and API documentation first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Contact**: Reach out to maintainers for urgent matters

## Recognition

Contributors will be recognized in:
- The CHANGELOG.md file
- GitHub contributors list
- Package.json contributors field (for significant contributions)

Thank you for contributing to Smart Selector! 🎉