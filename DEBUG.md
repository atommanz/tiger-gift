# 🔍 Debug Guide - Budget Filter

## ปัญหาที่พบ:
> "กด budget มากกว่า 500 แต่ของ 150 ยังขึ้นมาอยู่เลย"

## ✅ สิ่งที่แก้ไข:

### 1. อัปเดต `scoreProduct()` function
**ไฟล์:** `app/utils/filterProducts.ts`

**ปัญหาเดิม:**
- ใช้ `product.tags.budget.includes(budget)` ในการให้คะแนน
- ทำให้สินค้าที่มี budget tag เก่าได้คะแนนผิด

**แก้ไข:**
- เปลี่ยนมาใช้ `getBudgetRange()` และเช็คจาก `price_thb` จริง
- ตอนนี้ให้คะแนนจากราคาจริง ไม่ใช่ tags

### 2. Budget Range ที่ถูกต้อง:

```typescript
B01: { min: 0, max: 299 }       // ต่ำกว่า 300 บาท
B02: { min: 300, max: 500 }     // 300-500 บาท
B03: { min: 501, max: 1000 }    // 501-1000 บาท
B04: { min: 1001, max: 999999 } // มากกว่า 1000 บาท
```

---

## 🧪 วิธีทดสอบ:

### Test 1: เลือก Budget B03 (501-1000 บาท)
**ควรเห็น:**
- ✅ Designer Collection - Glass teapot (550฿)
- ✅ Ceramic jug (650฿)
- ✅ Tablecloth (520฿)

**ไม่ควรเห็น:**
- ❌ สินค้าราคา 150฿, 180฿, 250฿, 320฿, 450฿
- ❌ สินค้าราคา 1200฿

### Test 2: เลือก Budget B02 (300-500 บาท)
**ควรเห็น:**
- ✅ Soap dispenser (320฿)
- ✅ Picnic blanket (450฿)
- ✅ Handheld fan - Gummy bear (380฿)
- ✅ Candle (420฿)
- ✅ Wooden play fruits (380฿)
- ✅ Ceramic bird tealight (320฿)

**ไม่ควรเห็น:**
- ❌ สินค้าราคา < 300฿
- ❌ สินค้าราคา > 500฿

### Test 3: เลือก Budget B01 (<300 บาท)
**ควรเห็น:**
- ✅ สินค้า 20 ชิ้น
- ✅ ราคา 95฿, 114฿, 152฿, 180฿, 190฿, 250฿, 280฿

**ไม่ควรเห็น:**
- ❌ สินค้าราคา ≥ 300฿

### Test 4: เลือก Budget B04 (>1000 บาท)
**ควรเห็น:**
- ✅ Handheld fan - Beige/silver (1200฿)

**ไม่ควรเห็น:**
- ❌ สินค้าราคา ≤ 1000฿

---

## 🐛 ถ้ายังมีปัญหา:

### เช็คใน Browser Console:

1. เปิด Feed page
2. กด F12 เปิด DevTools
3. ไปที่ Console tab
4. พิมพ์:

```javascript
// ดูข้อมูล FormData
JSON.parse(localStorage.getItem('tiger-gift-form'))

// ควรเห็น:
// { "gender": "...", "budget": "B03", ... }
```

### เช็คว่าสินค้าโหลดถูกต้อง:

```javascript
// ใน Feed page console
fetch('/mockdata/v1.json')
  .then(r => r.json())
  .then(data => {
    console.log('Total products:', data.products.length);
    
    // เช็คสินค้าราคา 501-1000
    const b03 = data.products.filter(p => p.price_thb >= 501 && p.price_thb <= 1000);
    console.log('B03 products:', b03.length);
    b03.forEach(p => console.log(`- ${p.title} (${p.price_thb}฿)`));
  });
```

### Hard Refresh:

บางครั้ง browser cache ข้อมูลเก่า ให้ทำ:

**Chrome/Edge:**
- Mac: `Cmd + Shift + R`
- Windows: `Ctrl + Shift + R`

**Safari:**
- `Cmd + Option + R`

---

## 📝 สรุป:

✅ Filter logic ทำงานถูกต้อง (ทดสอบแล้ว)
✅ Budget range ถูกต้อง
✅ scoreProduct() ใช้ราคาจริงแล้ว
✅ Build สำเร็จ

ถ้ายังเจอปัญหา → ลอง **hard refresh** หรือ **clear localStorage**:

```javascript
// Clear localStorage ใน console
localStorage.removeItem('tiger-gift-form');
localStorage.removeItem('tiger-gift-cart');
location.reload();
```

---

**อัปเดต:** 2026-05-19
