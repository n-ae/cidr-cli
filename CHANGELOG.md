# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-09-07

### Changed
- **BREAKING**: Simplified CLI to be a thin wrapper around cidr-tools
- Removed complex argument parsing and configurations
- Streamlined to single `contains` command only
- Updated to ES modules (type: "module")
- Migrated from Jest built-in coverage to c8 for accurate CLI coverage tracking
- Updated package-lock.json to version 2 for better CI compatibility
- Enhanced GitHub Actions workflow with npm version updates

### Added
- c8 configuration file (.c8rc.json) with 80% coverage thresholds
- Process-level coverage tracking for CLI testing via child_process.spawn()
- Comprehensive WARP.md development guide for AI assistance
- Enhanced error handling with proper exit codes

### Fixed
- Resolved "Cannot read property 'cidr-tools' of undefined" error in GitHub Actions
- Fixed coverage reporting showing 0% (now shows 100%)
- Improved npm ci compatibility across different Node.js versions
- Fixed Codecov integration with proper lcov.info generation

### Technical Improvements
- **100% test coverage** achieved with c8
- **13 comprehensive tests** covering all CLI functionality
- **Node.js 14.x-21.x** support matrix in CI
- **Lockfile version 2** for enhanced CI compatibility
- **ES modules** throughout the codebase
- **Thin wrapper architecture** for minimal overhead

## [0.1.1] - 2024-08-30

### Fixed
- Fixed global CLI execution for ES modules

## [1.0.0] - 2024-08-29

### Added
- Initial release of cidr-cli
- CLI wrapper for cidr-tools containsCidr method
- Support for checking if IP addresses are within CIDR ranges
- Support for multiple CIDR ranges (comma-separated)
- Support for both IPv4 and IPv6 addresses
- Comprehensive Jest test suite (13 tests)
- JSDoc documentation
- ESLint configuration with Standard style
- GitHub Actions CI/CD pipeline
- Automated npm publishing on tag releases
- Security auditing in CI pipeline
- Integration tests for CLI functionality
- Exit code support (0=contained, 1=not contained, 2=error)

### Examples
```bash
cidr-cli contains 192.168.1.0/24 192.168.1.100        # Returns: true
cidr-cli contains 10.0.0.0/8,172.16.0.0/12 10.1.2.3  # Returns: true
cidr-cli contains 1.0.0.0/24,2.0.0.0/24 1.0.0.1       # Returns: true
```

[Unreleased]: https://github.com/n-ae/cidr-cli/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/n-ae/cidr-cli/releases/tag/v0.2.0
[0.1.1]: https://github.com/n-ae/cidr-cli/releases/tag/v0.1.1
[1.0.0]: https://github.com/n-ae/cidr-cli/releases/tag/v1.0.0
