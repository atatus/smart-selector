#!/bin/bash

# Smart Selector Release Script
# Usage: ./scripts/release.sh [patch|minor|major|prerelease]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we have the required tools
check_dependencies() {
    log_info "Checking dependencies..."

    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi

    if ! command -v git &> /dev/null; then
        log_error "git is not installed"
        exit 1
    fi

    log_success "All dependencies are available"
}

# Check if we're on the main branch
check_branch() {
    log_info "Checking git branch..."

    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "main" ]; then
        log_error "You must be on the main branch to create a release. Current branch: $current_branch"
        exit 1
    fi

    log_success "On main branch"
}

# Check if working directory is clean
check_working_directory() {
    log_info "Checking working directory..."

    if ! git diff-index --quiet HEAD --; then
        log_error "Working directory is not clean. Please commit or stash your changes."
        git status --porcelain
        exit 1
    fi

    log_success "Working directory is clean"
}

# Pull latest changes
pull_latest() {
    log_info "Pulling latest changes..."
    git pull origin main
    log_success "Latest changes pulled"
}

# Run tests
run_tests() {
    log_info "Running tests..."
    npm ci
    npm run lint
    npm run typecheck
    npm test
    log_success "All tests passed"
}

# Build the project
build_project() {
    log_info "Building project..."
    npm run build
    log_success "Project built successfully"
}

# Update version
update_version() {
    local version_type=$1

    log_info "Updating version ($version_type)..."

    case $version_type in
        patch|minor|major)
            npm version $version_type --no-git-tag-version
            ;;
        prerelease)
            npm version prerelease --preid=beta --no-git-tag-version
            ;;
        *)
            log_error "Invalid version type: $version_type"
            log_info "Valid types: patch, minor, major, prerelease"
            exit 1
            ;;
    esac

    local new_version=$(node -p "require('./package.json').version")
    log_success "Version updated to $new_version"
    echo $new_version
}

# Update changelog
update_changelog() {
    local version=$1
    log_warning "Please update CHANGELOG.md with the changes for version $version"
    log_info "Press Enter when you have updated the changelog..."
    read -p ""
}

# Create git tag and commit
create_tag() {
    local version=$1

    log_info "Creating git commit and tag for version $version..."

    git add package.json CHANGELOG.md
    git commit -m "chore: release v$version"
    git tag "v$version"

    log_success "Created commit and tag v$version"
}

# Push changes
push_changes() {
    local version=$1

    log_info "Pushing changes and tags..."
    git push origin main
    git push origin "v$version"
    log_success "Changes and tags pushed"
}

# Publish to npm
publish_npm() {
    local version_type=$1

    log_info "Publishing to npm..."

    # Check if logged in to npm
    if ! npm whoami &> /dev/null; then
        log_error "You are not logged in to npm. Please run 'npm login' first."
        exit 1
    fi

    # Verify package contents
    log_info "Verifying package contents..."
    npm pack --dry-run

    # Publish
    case $version_type in
        prerelease)
            npm publish --tag beta
            ;;
        *)
            npm publish
            ;;
    esac

    log_success "Package published to npm"
}

# Verify installation
verify_installation() {
    log_info "Verifying installation..."

    # Create temporary directory for testing
    temp_dir=$(mktemp -d)
    cd "$temp_dir"

    # Initialize npm and install the package
    npm init -y > /dev/null 2>&1
    npm install smart-selector > /dev/null 2>&1

    # Test if package works
    if node -e "console.log(require('smart-selector'))" > /dev/null 2>&1; then
        log_success "Package installation verified"
    else
        log_error "Package installation verification failed"
        exit 1
    fi

    # Clean up
    cd - > /dev/null
    rm -rf "$temp_dir"
}

# Main release function
main() {
    local version_type=${1:-patch}

    log_info "Starting release process for smart-selector..."
    log_info "Version type: $version_type"

    # Pre-release checks
    check_dependencies
    check_branch
    check_working_directory
    pull_latest

    # Run tests and build
    run_tests
    build_project

    # Update version
    local new_version=$(update_version $version_type)

    # Update changelog
    update_changelog $new_version

    # Create tag and commit
    create_tag $new_version

    # Push changes
    push_changes $new_version

    # Publish to npm
    publish_npm $version_type

    # Verify installation
    verify_installation

    log_success "Release v$new_version completed successfully!"
    log_info "Next steps:"
    log_info "1. Create GitHub release at: https://github.com/atatus/smart-selector/releases/new?tag=v$new_version"
    log_info "2. Announce the release"
    log_info "3. Update any dependent projects"
}

# Show usage if no arguments or help requested
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    echo "Smart Selector Release Script"
    echo ""
    echo "Usage: $0 [version_type]"
    echo ""
    echo "Version types:"
    echo "  patch      - Bug fixes (1.0.0 -> 1.0.1)"
    echo "  minor      - New features (1.0.0 -> 1.1.0)"
    echo "  major      - Breaking changes (1.0.0 -> 2.0.0)"
    echo "  prerelease - Beta release (1.0.0 -> 1.0.1-beta.0)"
    echo ""
    echo "Examples:"
    echo "  $0 patch     # Create a patch release"
    echo "  $0 minor     # Create a minor release"
    echo "  $0 major     # Create a major release"
    echo "  $0 prerelease # Create a beta release"
    exit 0
fi

# Run the main function
main "$1"