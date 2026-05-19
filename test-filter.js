// Test script เพื่อเช็คว่าระบบ filter ทำงานหรือไม่

const fs = require('fs');

// Load mock data
const mockData = JSON.parse(fs.readFileSync('./mockdata/v1.json', 'utf8'));
const products = mockData.products;

console.log('📦 Total products:', products.length);
console.log('');

// Test case 1: Filter by Gender G02 (หญิง)
const testFormData1 = {
  gender: 'G02',
  age: '',
  relationship: '',
  occasion: '',
  budget: '',
  style: ''
};

const filtered1 = products.filter(p => {
  return p.tags.gender.includes('G02');
});

console.log('🔍 Test 1: Gender = G02 (หญิง)');
console.log('   Result:', filtered1.length, 'products');
console.log('   Sample:', filtered1.slice(0, 3).map(p => p.title));
console.log('');

// Test case 2: Filter by Budget B01 (ต่ำกว่า 300 บาท)
const filtered2 = products.filter(p => {
  return p.price_thb < 300;
});

console.log('🔍 Test 2: Budget < 300 บาท');
console.log('   Result:', filtered2.length, 'products');
console.log('   Sample prices:', filtered2.slice(0, 5).map(p => `${p.title.substring(0, 30)}... = ${p.price_thb}฿`));
console.log('');

// Test case 3: Multiple filters
const filtered3 = products.filter(p => {
  const matchGender = p.tags.gender.includes('G02');
  const matchAge = p.tags.age.includes('A03');
  const matchStyle = p.tags.style.includes('S01');
  const matchBudget = p.price_thb < 300;

  return matchGender && matchAge && matchStyle && matchBudget;
});

console.log('🔍 Test 3: Multiple filters (G02 + A03 + S01 + Budget<300)');
console.log('   Result:', filtered3.length, 'products');
if (filtered3.length > 0) {
  console.log('   Products:');
  filtered3.forEach(p => {
    console.log(`   - ${p.title} (${p.price_thb}฿)`);
    console.log(`     Tags: gender=${p.tags.gender.join(',')}, age=${p.tags.age.join(',')}, style=${p.tags.style.join(',')}`);
  });
}
console.log('');

// Test case 4: Style options coverage
console.log('📊 Style coverage in products:');
const styleCounts = {};
products.forEach(p => {
  p.tags.style.forEach(s => {
    styleCounts[s] = (styleCounts[s] || 0) + 1;
  });
});

['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09'].forEach(style => {
  console.log(`   ${style}: ${styleCounts[style] || 0} products`);
});
console.log('');

// Summary
console.log('✅ Summary:');
console.log('   - Total products:', products.length);
console.log('   - Products with price < 300:', filtered2.length);
console.log('   - Products with style S01-S04:', products.filter(p =>
    p.tags.style.some(s => ['S01','S02','S03','S04'].includes(s))
  ).length);
console.log('   - Products with style S05-S09:', products.filter(p =>
    p.tags.style.some(s => ['S05','S06','S07','S08','S09'].includes(s))
  ).length);
