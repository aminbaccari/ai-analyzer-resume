// Simple test script for the formatSize function

// Copy of the formatSize function for testing
function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
}

// Test cases
const testCases = [
  { input: 0, expected: '0 Bytes' },
  { input: 500, expected: '500 Bytes' },
  { input: 1023, expected: '1023 Bytes' },
  { input: 1024, expected: '1 KB' },
  { input: 1500, expected: '1.46 KB' },
  { input: 1024 * 1024, expected: '1 MB' },
  { input: 1024 * 1024 * 2.5, expected: '2.5 MB' },
  { input: 1024 * 1024 * 1024, expected: '1 GB' },
  { input: 1024 * 1024 * 1024 * 1.75, expected: '1.75 GB' },
];

// Run tests
console.log('Testing formatSize function:');
console.log('----------------------------');

let passedTests = 0;
for (const test of testCases) {
  const result = formatSize(test.input);
  const passed = result === test.expected;
  
  console.log(`Input: ${test.input} bytes`);
  console.log(`Expected: "${test.expected}"`);
  console.log(`Result: "${result}"`);
  console.log(`Test ${passed ? 'PASSED' : 'FAILED'}`);
  console.log('----------------------------');
  
  if (passed) passedTests++;
}

console.log(`Summary: ${passedTests}/${testCases.length} tests passed`);