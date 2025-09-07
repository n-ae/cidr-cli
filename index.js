#!/usr/bin/env node

// Thin CLI wrapper for cidr-tools containsCidr method
import { containsCidr } from 'cidr-tools'

const args = process.argv.slice(2)

// Show usage if no args or help requested
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log(`Usage: cidr-cli contains <cidr-list> <ip>

Examples:
  cidr-cli contains 192.168.1.0/24 192.168.1.100
  cidr-cli contains 10.0.0.0/8,172.16.0.0/12 10.1.2.3
`);
  process.exit(args.length === 0 ? 1 : 0)
}

// Validate command structure
if (args[0] !== 'contains' || args.length !== 3) {
  console.error('Error: Invalid arguments')
  process.exit(1)
}

const [, cidrList, ip] = args

try {
  // Parse CIDR list and check containment
  const cidrs = cidrList.split(',').map(cidr => cidr.trim())
  const result = containsCidr(cidrs, ip)

  console.log(result.toString())
  process.exit(result ? 0 : 1)
} catch (error) {
  console.error('Error:', error.message)
  process.exit(2)
}
