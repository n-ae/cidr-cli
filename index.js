#!/usr/bin/env node

/**
 * @fileoverview CLI wrapper for cidr-tools containsCidr method
 * @author Your Name <your.email@example.com>
 * @version 1.0.0
 * @license MIT
 */

import { containsCidr } from 'cidr-tools'

/**
 * Prints usage information and exits with code 1
 * @function printUsage
 * @description Displays command usage, examples, and exits the process
 * @example
 * printUsage();
 * // Output:
 * // Usage: cidr-cli contains <cidr-list> <ip>
 * //
 * // Examples:
 * //   cidr-cli contains 192.168.1.0/24 192.168.1.100
 * //   cidr-cli contains 10.0.0.0/8,172.16.0.0/12 10.1.2.3
 * //   cidr-cli contains 1.0.0.0/24,2.0.0.0/24 1.0.0.1
 */
function printUsage () {
  console.log('Usage: cidr-cli contains <cidr-list> <ip>')
  console.log('')
  console.log('Examples:')
  console.log('  cidr-cli contains 192.168.1.0/24 192.168.1.100')
  console.log('  cidr-cli contains 10.0.0.0/8,172.16.0.0/12 10.1.2.3')
  console.log('  cidr-cli contains 1.0.0.0/24,2.0.0.0/24 1.0.0.1')
  process.exit(1)
}

/**
 * Main CLI function that processes command line arguments and executes CIDR containment check
 * @function main
 * @description Parses command line arguments, validates input, and checks if an IP address
 * is contained within any of the provided CIDR ranges using cidr-tools library
 *
 * @example
 * // Command: cidr-cli contains 192.168.1.0/24 192.168.1.100
 * // Process: main() -> containsCidr(['192.168.1.0/24'], '192.168.1.100') -> true
 * // Output: "true"
 * // Exit code: 0
 *
 * @example
 * // Command: cidr-cli contains 10.0.0.0/8,172.16.0.0/12 192.168.1.1
 * // Process: main() -> containsCidr(['10.0.0.0/8', '172.16.0.0/12'], '192.168.1.1') -> false
 * // Output: "false"
 * // Exit code: 1
 *
 * @throws {Error} When invalid CIDR format or IP address is provided
 * @throws {Error} When cidr-tools library encounters parsing errors
 *
 * @see {@link https://www.npmjs.com/package/cidr-tools|cidr-tools npm package}
 *
 * Exit codes:
 * - 0: IP address is contained in at least one CIDR range
 * - 1: IP address is not contained in any CIDR range OR invalid arguments
 * - 2: Error occurred (invalid CIDR format, invalid IP, or library error)
 */
function main () {
  const args = process.argv.slice(2)

  // Handle help flags and no arguments
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage()
  }

  // Validate command structure
  if (args[0] !== 'contains' || args.length !== 3) {
    console.error('Error: Invalid arguments')
    printUsage()
  }

  const [, cidrList, ip] = args

  try {
    // Parse CIDR list - split by comma and trim whitespace
    const cidrs = cidrList.split(',').map(cidr => cidr.trim())

    // Check if IP is contained in any of the CIDRs using cidr-tools
    const result = containsCidr(cidrs, ip)

    // Output result as string (true/false)
    console.log(result.toString())

    // Exit with appropriate code
    process.exit(result ? 0 : 1)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(2)
  }
}

// Execute main function if this script is run directly or as a CLI
// For ES modules, we check if this is the main module being executed
if (import.meta.url.startsWith('file:') && (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('cidr-cli'))) {
  main()
}

export { main, printUsage }
