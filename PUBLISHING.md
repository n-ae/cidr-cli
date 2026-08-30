# Publishing Guide

This document outlines the steps to publish `cidr-cli` to npm.

## Prerequisites

1. **npm account**: You need an npm account with publishing rights
2. **GitHub repository**: Set up the repository with the provided GitHub Actions
3. **npm Trusted Publisher**: Link the `cidr-cli` package to this repo's `publish` job (no token to manage)

## Automated Publishing (Recommended)

Publishing uses npm's [OIDC Trusted Publishing](https://docs.npmjs.com/trusted-publishers) — GitHub Actions
authenticates to npm directly via a short-lived OIDC token, so there is no long-lived `NPM_TOKEN` secret to
create, store, or rotate.

### One-time setup

1. On [npmjs.com](https://www.npmjs.com), go to the `cidr-cli` package → **Settings → Trusted Publisher**
2. Add a GitHub Actions trusted publisher pointing at:
   - Repository: `n-ae/cidr-cli`
   - Workflow file: `.github/workflows/release.yml`
   - Environment: `npm`
3. On GitHub, the `npm` environment (Settings → Environments) must exist — the `publish` job deploys to it and
   requests an `id-token: write` OIDC token scoped to that environment.

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
# Run all tests (Jest with ES modules)
npm test

# Run tests with coverage (c8)
npm run test:coverage

# Run linter (ESLint flat config via neostandard)
npm run lint

# Generate documentation (JSDoc)
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

- `index.js` - Main CLI script (ES module)
- `README.md` - Documentation
- `LICENSE` - MIT license
- `package.json` - Package metadata

Package size: ~5KB (just the essentials)

Excluded via `.npmignore`:
- Test files (`*.test.js`, `tests/`)
- Development files (`eslint.config.js`, `jest.config.js`, `.c8rc.json`, etc.)
- Documentation build (`docs/`)
- Coverage reports (`coverage/`)
- GitHub workflows (`.github/`)
- Development guides (`WARP.md`, `PUBLISHING.md`)
- Lock files and logs

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

1. **Trusted Publisher Issues**: Verify the npm package's Trusted Publisher config matches this repo, the
   `release.yml` workflow path, and the `npm` environment exactly — a mismatch on any of the three causes the
   OIDC exchange to fail
2. **Test Failures**: Check CI logs for specific test failures
3. **Build Issues**: Ensure local build works before tagging

## Security Notes

- No npm token exists to leak — publishing uses OIDC Trusted Publishing, not a stored credential
- Never commit npm tokens or credentials if you fall back to manual/local publishing
- Enable 2FA on npm account
- Monitor package for security vulnerabilities with `npm audit`