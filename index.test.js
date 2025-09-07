import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Helper function to run the CLI command
 * @param {string[]} args - Command arguments
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
function runCLI (args) {
  return new Promise((resolve) => {
    const child = spawn('node', ['index.js', ...args], {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: __dirname
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('close', (code) => {
      resolve({
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        code
      })
    })
  })
}

describe('cidr-cli', () => {
  describe('contains command', () => {
    test('should return true for IP in single CIDR range', async () => {
      const result = await runCLI(['contains', '192.168.1.0/24', '192.168.1.100'])
      expect(result.stdout).toBe('true')
      expect(result.code).toBe(0)
    })

    test('should return true for IP in first of multiple CIDR ranges', async () => {
      const result = await runCLI(['contains', '10.0.0.0/8,172.16.0.0/12', '10.1.2.3'])
      expect(result.stdout).toBe('true')
      expect(result.code).toBe(0)
    })

    test('should return false for IP not in any CIDR range', async () => {
      const result = await runCLI(['contains', '192.168.1.0/24,10.0.0.0/8', '172.16.1.1'])
      expect(result.stdout).toBe('false')
      expect(result.code).toBe(1)
    })

    test('should handle user example correctly', async () => {
      const result = await runCLI(['contains', '1.0.0.0/24,2.0.0.0/24', '1.0.0.1'])
      expect(result.stdout).toBe('true')
      expect(result.code).toBe(0)
    })

    test('should support IPv6 addresses', async () => {
      const result = await runCLI(['contains', '2001:db8::/32', '2001:db8:0:0:1::1'])
      expect(result.stdout).toBe('true')
      expect(result.code).toBe(0)
    })

    test('should handle whitespace in CIDR list', async () => {
      const result = await runCLI(['contains', '192.168.1.0/24, 10.0.0.0/8', '192.168.1.50'])
      expect(result.stdout).toBe('true')
      expect(result.code).toBe(0)
    })
  })

  describe('help and usage', () => {
    test('should show help with --help flag', async () => {
      const result = await runCLI(['--help'])
      // Help should be in stderr since it's an error condition (usage printed due to invalid usage)
      const output = result.stderr || result.stdout
      expect(output).toContain('Usage: cidr-cli contains')
      expect(output).toContain('Examples:')
      expect(result.code).toBe(1)
    })

    test('should show help with -h flag', async () => {
      const result = await runCLI(['-h'])
      const output = result.stderr || result.stdout
      expect(output).toContain('Usage: cidr-cli contains')
      expect(result.code).toBe(1)
    })

    test('should show help with no arguments', async () => {
      const result = await runCLI([])
      const output = result.stderr || result.stdout
      expect(output).toContain('Usage: cidr-cli contains')
      expect(result.code).toBe(1)
    })
  })

  describe('error handling', () => {
    test('should handle invalid command', async () => {
      const result = await runCLI(['invalid'])
      expect(result.stderr).toContain('Error: Invalid arguments')
      expect(result.code).toBe(1)
    })

    test('should handle missing arguments', async () => {
      const result = await runCLI(['contains'])
      expect(result.stderr).toContain('Error: Invalid arguments')
      expect(result.code).toBe(1)
    })

    test('should handle invalid CIDR format', async () => {
      const result = await runCLI(['contains', 'invalid-cidr', '192.168.1.1'])
      expect(result.stderr).toContain('Error:')
      expect(result.code).toBe(2)
    })

    test('should handle invalid IP format', async () => {
      const result = await runCLI(['contains', '192.168.1.0/24', 'invalid-ip'])
      expect(result.stderr).toContain('Error:')
      expect(result.code).toBe(2)
    })
  })
})
