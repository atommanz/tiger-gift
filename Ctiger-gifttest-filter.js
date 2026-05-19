/**
 * Test script สำหรับทดสอบ filter logic
 */

// Mock form data - Multiple selections
const formData = {
  gender: ["G02", "G01"],
  age: ["A03"],
  relationship: ["R02", "R03"],
  occasion: ["O01"],
  budget: ["B01"],
  style: ["S01", "S02"]
}

console.log('🎁 Testing Multiple Selection Filter')
console.log('Selected:', JSON.stringify(formData, null, 2))
