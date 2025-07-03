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

### For Maintainers: Creating a Release

#### Prerequisites

1. **npm Account**: Ensure you have an npm account with publish permissions
2. **GitHub Access**: Write access to the repository
3. **Clean Working Directory**: No uncommitted changes
4. **All Tests Passing**: Verify CI is green

#### Release Steps

1. **Prepare for Release**
   ```bash
   # Ensure you're on main branch
   git checkout main
   git pull origin main
   
   # Verify everything is working
   npm install
   npm test
   npm run lint
   npm run build
   ```

2. **Update Version and Changelog**
   ```bash
   # For patch release (1.0.0 -> 1.0.1)
   npm version patch
   
   # For minor release (1.0.0 -> 1.1.0)
   npm version minor
   
   # For major release (1.0.0 -> 2.0.0)
   npm version major
   ```

   This automatically:
   - Updates version in `package.json`
   - Creates a git tag
   - Creates a commit

3. **Update CHANGELOG.md**
   ```bash
   # Edit CHANGELOG.md to document changes
   # Add new version section at the top
   git add CHANGELOG.md
   git commit -m "docs: update changelog for v1.0.1"
   ```

4. **Push Changes and Tags**
   ```bash
   # Push the version commit and tag
   git push origin main
   git push origin --tags
   ```

5. **Create GitHub Release**
   - Go to GitHub repository
   - Click "Releases" → "Create a new release"
   - Select the tag you just pushed
   - Title: `v1.0.1` (match the tag)
   - Description: Copy relevant section from CHANGELOG.md
   - Check "Set as the latest release" (for stable releases)
   - Click "Publish release"

6. **Publish to npm**
   ```bash
   # Login to npm (if not already)
   npm login
   
   # Verify package contents
   npm pack --dry-run
   
   # Publish to npm
   npm publish
   
   # For beta/alpha releases
   npm publish --tag beta
   npm publish --tag alpha
   ```

7. **Verify Release**
   ```bash
   # Check npm
   npm view smart-selector
   
   # Test installation
   mkdir test-install && cd test-install
   npm init -y
   npm install smart-selector
   node -e "console.log(require('smart-selector'))"
   cd .. && rm -rf test-install
   ```

8. **Announce Release**
   - Update README if needed
   - Post in relevant channels/communities
   - Update any dependent projects

#### Automated Release (GitHub Actions)

For automated releases, you can set up GitHub Actions:

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### Release Checklist

- [ ] All tests pass locally and in CI
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated with new version
- [ ] Git tag created and pushed
- [ ] GitHub release created with release notes
- [ ] Package published to npm
- [ ] Installation verified
- [ ] Documentation updated if needed

#### Pre-release Process

For alpha/beta releases:

1. **Create Pre-release Version**
   ```bash
   # For alpha
   npm version prerelease --preid=alpha
   # Results in: 1.0.1-alpha.0
   
   # For beta
   npm version prerelease --preid=beta
   # Results in: 1.0.1-beta.0
   ```

2. **Publish with Tag**
   ```bash
   npm publish --tag alpha
   # or
   npm publish --tag beta
   ```

3. **Users can install with**
   ```bash
   npm install smart-selector@alpha
   npm install smart-selector@beta
   ```

#### Hotfix Process

For urgent fixes:

1. **Create Hotfix Branch**
   ```bash
   git checkout -b hotfix/critical-fix
   ```

2. **Make the Fix**
   ```bash
   # Make minimal changes
   git add .
   git commit -m "fix: critical security issue"
   ```

3. **Release Hotfix**
   ```bash
   git checkout main
   git merge hotfix/critical-fix
   npm version patch
   git push origin main --tags
   ```

4. **Emergency Publish**
   ```bash
   npm publish
   ```

#### Version Strategy

- **Patch (1.0.x)**: Bug fixes, documentation updates, internal refactoring
- **Minor (1.x.0)**: New features, new options, performance improvements
- **Major (x.0.0)**: Breaking API changes, major architecture changes

#### Rollback Process

If a release has critical issues:

1. **Deprecate Bad Version**
   ```bash
   npm deprecate smart-selector@1.0.1 "Critical bug, use 1.0.0 instead"
   ```

2. **Publish Fixed Version**
   ```bash
   # Fix the issue
   npm version patch
   npm publish
   ```

3. **Update GitHub Release**
   - Mark problematic release as "pre-release"
   - Create new release for fixed version

#### Release Notes Template

```markdown
## [1.0.1] - 2025-07-03

### Added
- New feature X
- Support for Y

### Changed
- Improved performance of Z
- Updated dependencies

### Fixed
- Fixed issue with A
- Resolved bug in B

### Breaking Changes
- None

### Migration Guide
- No migration needed for this release
```

#### npm Package Configuration

Ensure `package.json` has proper fields:

```json
{
  "name": "smart-selector",
  "files": [
    "dist/**/*",
    "src/**/*",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/types/index.d.ts"
    }
  }
}
```

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