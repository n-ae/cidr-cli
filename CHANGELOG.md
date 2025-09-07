# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/yourusername/cidr-cli/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/cidr-cli/releases/tag/v1.0.0