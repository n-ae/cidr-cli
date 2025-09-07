# Publishing Guide

This document outlines the steps to publish `cidr-cli` to npm.

## Prerequisites

1. **npm account**: You need an npm account with publishing rights
2. **GitHub repository**: Set up the repository with the provided GitHub Actions
3. **npm token**: Create an npm token and add it as `NPM_TOKEN` in GitHub Secrets

## Automated Publishing (Recommended)

### Setup GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and Variables → Actions
3. Add the following secrets:
   - `NPM_TOKEN`: Your npm token from https://www.npmjs.com/settings/tokens

### Publish a Release

1. **Update version and changelog**:
   ```bash
   npm version patch  # or minor/major
   git push origin main --tags
   ```

2. **The GitHub Action will automatically**:
   - Run full test suite
   - Lint the code
   - Publish to npm
   - Create GitHub release with changelog

## Manual Publishing

### 1. Pre-publishing Checklist

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Generate documentation
npm run docs

# Check package contents
npm pack --dry-run
```

### 2. Login to npm

```bash
npm login
```

### 3. Publish

```bash
# For first-time publishing
npm publish

# For subsequent releases
npm version patch  # or minor/major
npm publish
```

## Publishing Workflow

1. **Development**: Create feature branch, implement changes
2. **Testing**: Ensure all tests pass and coverage is maintained
3. **Documentation**: Update README.md, CHANGELOG.md if needed
4. **Version**: Use semantic versioning (`npm version patch|minor|major`)
5. **Tag**: Push tags to trigger automated release
6. **Verify**: Check that package is available on npmjs.com

## Package Contents

The published package includes:

- `index.js` - Main CLI script
- `README.md` - Documentation
- `LICENSE` - MIT license
- `package.json` - Package metadata

Excluded via `.npmignore`:
- Test files (`*.test.js`, `tests/`)
- Development files (`.eslintrc.js`, `jest.config.js`, etc.)
- Documentation build (`docs/`)
- Coverage reports
- GitHub workflows

## Verification

After publishing, verify the package:

```bash
# Install globally and test
npm install -g cidr-cli@latest
cidr-cli --help
cidr-cli contains 192.168.1.0/24 192.168.1.100

# Check package page
# Visit: https://www.npmjs.com/package/cidr-cli
```

## Troubleshooting

### Common Issues

1. **Authentication Error**: Ensure you're logged in with `npm login`
2. **Version Conflict**: Can't publish same version twice - update version
3. **Test Failures**: Fix failing tests before publishing
4. **Missing Files**: Check `.npmignore` and `package.json` files array

### GitHub Actions Failures

1. **NPM_TOKEN Issues**: Verify secret is set correctly
2. **Test Failures**: Check CI logs for specific test failures
3. **Build Issues**: Ensure local build works before tagging

## Security Notes

- Never commit npm tokens or credentials
- Use GitHub Secrets for sensitive data
- Enable 2FA on npm account
- Regularly rotate npm tokens
- Monitor package for security vulnerabilities with `npm audit`