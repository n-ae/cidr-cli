# cidr-cli

[![npm version](https://badge.fury.io/js/cidr-cli.svg)](https://badge.fury.io/js/cidr-cli)
[![Build Status](https://github.com/n-ae/cidr-cli/workflows/CI/badge.svg)](https://github.com/n-ae/cidr-cli/actions)
[![Coverage Status](https://codecov.io/gh/n-ae/cidr-cli/branch/main/graph/badge.svg)](https://codecov.io/gh/n-ae/cidr-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CLI wrapper for the [cidr-tools](https://www.npmjs.com/package/cidr-tools) package, specifically wrapping the `containsCidr` method to check if an IP address is contained within CIDR ranges.

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g cidr-cli
```

### Local Installation

```bash
npm install cidr-cli
```

### Using npx (No Installation Required)

```bash
npx cidr-cli contains <cidr-list> <ip>
```

## 📖 Usage

```bash
cidr-cli contains <cidr-list> <ip>
```

### Arguments

- `<cidr-list>`: Comma-separated list of CIDR ranges (e.g., `192.168.1.0/24,10.0.0.0/8`)
- `<ip>`: IP address to check (IPv4 or IPv6)

### Examples

```bash
# Single CIDR range
cidr-cli contains 192.168.1.0/24 192.168.1.100
# Output: true

# Multiple CIDR ranges
cidr-cli contains 10.0.0.0/8,172.16.0.0/12 10.1.2.3
# Output: true

# User's example
cidr-cli contains 1.0.0.0/24,2.0.0.0/24 1.0.0.1
# Output: true

# IPv6 support
cidr-cli contains 2001:db8::/32 2001:db8:0:0:1::1
# Output: true

# IP not in range
cidr-cli contains 1.0.0.0/24,2.0.0.0/24 3.0.0.1
# Output: false

# Help
cidr-cli --help
```

## 📋 Exit Codes

- `0`: IP is contained in one of the CIDR ranges
- `1`: IP is not contained in any of the CIDR ranges  
- `2`: Error occurred (invalid arguments, invalid CIDR format, invalid IP, etc.)

## 🧪 Use Cases

### Shell Scripts

```bash
#!/bin/bash
if cidr-cli contains 192.168.0.0/16 $USER_IP; then
  echo "User is on local network"
else
  echo "User is on external network"
fi
```

### CI/CD Pipelines

```yaml
- name: Check if IP is in allowed range
  run: |
    if ! cidr-cli contains 10.0.0.0/8,172.16.0.0/12,192.168.0.0/16 ${{ env.SERVER_IP }}; then
      echo "Server IP not in allowed private ranges"
      exit 1
    fi
```

### Network Security

```bash
# Check if suspicious IP is in known bad ranges
if cidr-cli contains 1.2.3.0/24,5.6.7.0/24 $SUSPICIOUS_IP; then
  echo "IP is in known malicious range - blocking"
  # Add blocking logic here
fi
```

## 🔧 Development

### Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

### Setup

```bash
git clone https://github.com/n-ae/cidr-cli.git
cd cidr-cli
npm install
```

### Testing

```bash
# Run tests (Jest with ES modules)
npm test

# Run tests with coverage (c8 + Jest)
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Documentation

```bash
# Generate JSDoc documentation
npm run docs
```

## 🏗️ Project Structure

```
cidr-cli/
├── index.js              # Main CLI implementation (ES modules)
├── index.test.js         # Jest test suite (13 comprehensive tests)
├── package.json          # Package configuration
├── package-lock.json     # Lockfile v2 for CI compatibility
├── README.md            # This file
├── LICENSE              # MIT license
├── CHANGELOG.md         # Version history
├── PUBLISHING.md        # Publishing guide
├── WARP.md             # Claude/Warp AI development guide
├── .eslintrc.json      # ESLint configuration (Standard style)
├── .eslintignore       # ESLint exclusions
├── jest.config.js      # Jest configuration (ES modules)
├── .c8rc.json         # c8 coverage configuration
├── jsdoc.conf.json    # JSDoc configuration
├── .npmignore         # npm publish exclusions
├── .gitignore         # Git exclusions
├── .github/
│   └── workflows/     # GitHub Actions CI/CD (Node 14-21 matrix)
├── docs/              # Generated JSDoc documentation
├── coverage/          # c8 coverage reports (HTML + LCOV)
└── tests/             # Legacy test files (kept for reference)
```

## 🚀 Publishing

This package uses automated publishing via GitHub Actions:

1. **On Push/PR**: Runs full test suite across Node.js 14.x, 16.x, 18.x, 20.x, 21.x
2. **On Tag**: Automatically publishes to npm and creates GitHub release

### Manual Publishing

```bash
npm version patch|minor|major
git push origin main --tags
```

## 📊 Test Coverage

The project maintains **100% test coverage** using c8:

- **13 test cases** covering all functionality and edge cases
- **Integration tests**: End-to-end CLI execution via `child_process.spawn()`
- **Coverage tool**: c8 (Node.js native coverage) instead of Jest built-in
- **Coverage threshold**: 80% minimum, currently achieving 100%
- **Reports**: Text, LCOV (for Codecov), and HTML formats

Test categories:
- ✅ CIDR containment checks (IPv4/IPv6)
- ✅ Multiple CIDR range support
- ✅ Help and usage information
- ✅ Error handling (invalid CIDR, invalid IP, malformed arguments)
- ✅ Exit code validation
- ✅ Whitespace handling in CIDR lists
- ✅ Process-level coverage tracking

## 🔗 Dependencies

### Runtime Dependencies
- **[cidr-tools](https://www.npmjs.com/package/cidr-tools)** ^11.0.3 - Core CIDR functionality

### Development Dependencies
- **[jest](https://jestjs.io/)** ^29.7.0 - Testing framework
- **[c8](https://github.com/bcoe/c8)** ^10.1.3 - Native Node.js code coverage
- **[eslint](https://eslint.org/)** ^8.57.0 - Code linting
- **[eslint-config-standard](https://standardjs.com/)** ^17.1.0 - Standard style guide
- **[jsdoc](https://jsdoc.app/)** ^4.0.3 - Documentation generation

### Key Features
- **ES Modules**: Modern JavaScript module system
- **Node.js 14+**: Minimum Node.js version support
- **CI/CD**: GitHub Actions with Node.js 14.x-21.x matrix
- **Coverage**: 100% code coverage with c8
- **Lockfile v2**: Enhanced CI compatibility

📝 License

MIT © [nae](https://github.com/n-ae)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -am 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Issues

If you find a bug, please file an issue on [GitHub Issues](https://github.com/n-ae/cidr-cli/issues).

## 📈 Roadmap

- [ ] Add support for excluding CIDR ranges
- [ ] Add JSON output format option
- [ ] Add batch processing from file input
- [ ] Add verbose mode with detailed matching information
- [ ] Add support for hostname resolution

---

**Made with ❤️ for network administrators and DevOps engineers**
