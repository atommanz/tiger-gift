# ระบบกรองสินค้า (Product Filter System)

## 📋 ภาพรวม

ระบบนี้ใช้ข้อมูลจากแบบสอบถาม 6 ขั้นตอนเพื่อกรองและจัดเรียงสินค้าที่เหมาะสมให้กับผู้ใช้

## 🗂️ ไฟล์สำคัญ

### 1. Filter Metadata
**ไฟล์:** `app/data/filterOptions.ts`

เก็บข้อมูล metadata ทั้งหมดของตัวเลือกในแบบสอบถาม:

- **Gender (เพศ)**: 3 ตัวเลือก (G01-G03)
  - G01: ชาย
  - G02: หญิง
  - G03: ไม่ระบุ

- **Age (อายุ)**: 4 ช่วงอายุ (A01-A04)
  - A01: 0-12 ปี
  - A02: 13-22 ปี
  - A03: 23-45 ปี
  - A04: 46-99 ปี

- **Relationship (ความสัมพันธ์)**: 5 ตัวเลือก (R01-R05)
  - R01: แฟน
  - R02: เพื่อน
  - R03: พ่อแม่
  - R04: ผู้ใหญ่
  - R05: ญาติ

- **Occasion (โอกาส)**: 5 ตัวเลือก (O01-O05)
  - O01: วันเกิด
  - O02: เทศกาล
  - O03: ขึ้นบ้านใหม่
  - O04: แสดงความยินดี
  - O05: ขอบคุณ / ขอโทษ

- **Budget (งบประมาณ)**: 4 ช่วงราคา (B01-B04)
  - B01: ต่ำกว่า 300 บาท (0-299)
  - B02: 300 - 500 บาท (300-500)
  - B03: 500 - 1,000 บาท (501-1000)
  - B04: 1,000 บาทขึ้นไป (1001+)

- **Style (สไตล์)**: 9 ตัวเลือก (S01-S09)
  - S01: น่ารัก
  - S02: มินิมอล
  - S03: สนุกสนาน
  - S04: หรูหรา
  - S05: วินเทจ
  - S06: เทคโนโลยี / ทันสมัย
  - S07: โรแมนติก
  - S08: สร้างสรรค์ / DIY
  - S09: แฟนตาซี

### 2. Filter Logic
**ไฟล์:** `app/utils/filterProducts.ts`

ประกอบด้วย 3 ฟังก์ชันหลัก:

#### `filterProducts(products, formData)`
กรองสินค้าตาม criteria ที่ user เลือก

**Logic:**
- ใช้ **AND condition** - สินค้าต้องตรงกับทุก field ที่เลือก
- **Gender, Age, Relationship, Occasion, Style**: เช็คจาก tags ในสินค้า
- **Budget**: เช็คจากราคาสินค้าจริง (price_thb) ว่าอยู่ในช่วงที่เลือกหรือไม่
- ถ้าไม่มีข้อมูลเลย แสดงสินค้าทั้งหมด

#### `scoreProduct(product, formData)`
คำนวณคะแนนความเหมาะสม

**การให้คะแนน:**
- แต่ละ tag ที่ตรง = +1 คะแนน
- คะแนนสูงสุด = 6 (ตรงทุก field)
- ใช้สำหรับจัดเรียงสินค้า

#### `getRecommendedProducts(products, formData)`
ฟังก์ชันหลักสำหรับดึงสินค้าที่แนะนำ

**ขั้นตอน:**
1. กรองสินค้าที่ตรงกับ criteria
2. จัดเรียงตามคะแนนจากมากไปน้อย
3. คืนค่า array ของสินค้าที่แนะนำ

### 3. Custom Hook
**ไฟล์:** `app/hooks/useFilteredProducts.ts`

React hook สำหรับใช้งานง่าย:

```typescript
const { products, count, formData } = useFilteredProducts(allProducts)
```

**Features:**
- ดึงข้อมูล FormData อัตโนมัติจาก Context
- ใช้ `useMemo` เพื่อ optimize performance
- Re-calculate เฉพาะเมื่อ `allProducts` หรือ `formData` เปลี่ยน

### 4. Context Management
**ไฟล์:** `app/context/FormContext.tsx`

จัดการข้อมูลแบบสอบถาม:

- เก็บข้อมูลใน React state
- Auto-save ไปยัง localStorage
- Auto-load จาก localStorage เมื่อ refresh

## 🎯 ตัวอย่างการใช้งาน

### ใน Feed Page:
```typescript
import { useFilteredProducts } from '@/app/hooks/useFilteredProducts'

export default function FeedPage() {
  const [allProducts, setAllProducts] = useState([])
  
  // Load all products
  useEffect(() => {
    fetch('/mockdata/v1.json')
      .then(res => res.json())
      .then(data => setAllProducts(data.products))
  }, [])
  
  // Get filtered products automatically
  const { products, count } = useFilteredProducts(allProducts)
  
  return (
    <div>
      <p>พบสินค้าที่เหมาะสม {count} ชิ้น</p>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 📊 Mock Data Format

สินค้าใน `mockdata/v1.json` ต้องมีโครงสร้าง:

```json
{
  "id": "P001",
  "title": "ชื่อสินค้า",
  "price_thb": 152,
  "image": "url",
  "tags": {
    "gender": ["G01", "G02"],
    "age": ["A03", "A04"],
    "relationship": ["R02", "R05"],
    "occasion": ["O01", "O03"],
    "budget": ["B01"],
    "style": ["S01", "S02"]
  }
}
```

**สำคัญ:**
- `price_thb` ใช้สำหรับกรอง budget (ราคาจริง)
- `tags.budget` เป็น fallback หากไม่มี price_thb

## 🔄 Flow การทำงาน

```
User กรอก Quiz 
    ↓
FormContext เก็บข้อมูล + localStorage
    ↓
Feed Page โหลด all products
    ↓
useFilteredProducts() ดึงข้อมูล
    ↓
filterProducts() กรองสินค้า
    ↓
scoreProduct() คำนวณคะแนน
    ↓
เรียงลำดับตามคะแนน
    ↓
แสดงผลใน TikTok-style Feed
```

## ✅ Empty State

หากไม่มีสินค้าที่ตรง filter:
- แสดงหน้า empty state พร้อมข้อความ
- ปุ่ม "กลับไปเริ่มต้นใหม่" เพื่อกรอก quiz ใหม่

## 🚀 Performance Optimization

1. **useMemo** - คำนวณเฉพาะเมื่อข้อมูลเปลี่ยน
2. **localStorage** - เก็บข้อมูล quiz ไม่ต้องกรอกใหม่
3. **Lazy loading** - โหลด products แบบ async

## 🎨 UI Components

- **FormView**: แสดงคำถามและตัวเลือก (6 ขั้นตอน)
- **Feed**: แสดงสินค้าที่กรองแล้วแบบ TikTok-style
- **Badge**: แสดงจำนวนสินค้าที่แนะนำ

---

**สร้างโดย:** Claude Code
**วันที่:** 2026-05-19
