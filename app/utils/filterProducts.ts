import { FormData, Product } from '@/app/types'
import { getBudgetRange } from '@/app/data/filterOptions'

/**
 * กรองสินค้าตามข้อมูลที่ user เลือกจาก quiz
 * ใช้ logic แบบ AND - สินค้าต้องมี tags ที่ตรงกับทุก criteria ที่ user เลือก
 */
export function filterProducts(products: Product[], formData: FormData): Product[] {
  return products.filter(product => {
    const { gender, age, relationship, occasion, budget, style } = formData

    // ถ้ายังไม่มีข้อมูลเลย ให้แสดงสินค้าทั้งหมด
    if (!gender && !age && !relationship && !occasion && !budget && !style) {
      return true
    }

    // เช็คแต่ละ field ที่ user เลือก
    const matchGender = gender ? product.tags.gender.includes(gender) : true
    const matchAge = age ? product.tags.age.includes(age) : true
    const matchRelationship = relationship ? product.tags.relationship.includes(relationship) : true
    const matchOccasion = occasion ? product.tags.occasion.includes(occasion) : true

    // เช็ค budget โดยดูจาก price range
    let matchBudget = true
    if (budget) {
      const budgetRange = getBudgetRange(budget)
      if (budgetRange) {
        // เช็คว่าราคาสินค้าอยู่ในช่วงที่เลือกหรือไม่
        matchBudget = product.price_thb >= budgetRange.min && product.price_thb <= budgetRange.max
      } else {
        // ถ้าหา range ไม่เจอ ใช้ tag แบบเดิม
        matchBudget = product.tags.budget.includes(budget)
      }
    }

    const matchStyle = style ? product.tags.style.includes(style) : true

    // สินค้าต้องตรงกับทุก criteria ที่เลือก
    return matchGender && matchAge && matchRelationship && matchOccasion && matchBudget && matchStyle
  })
}

/**
 * คำนวณคะแนนความเหมาะสม (relevance score) ของสินค้าแต่ละชิ้น
 * ใช้สำหรับเรียงลำดับสินค้าตามความตรงกับที่ user ต้องการมากที่สุด
 */
export function scoreProduct(product: Product, formData: FormData): number {
  let score = 0
  const { gender, age, relationship, occasion, budget, style } = formData

  // +1 คะแนนสำหรับแต่ละ tag ที่ตรง
  if (gender && product.tags.gender.includes(gender)) score++
  if (age && product.tags.age.includes(age)) score++
  if (relationship && product.tags.relationship.includes(relationship)) score++
  if (occasion && product.tags.occasion.includes(occasion)) score++

  // เช็ค budget จากราคาจริง ไม่ใช่ tags
  if (budget) {
    const budgetRange = getBudgetRange(budget)
    if (budgetRange) {
      const matchBudget = product.price_thb >= budgetRange.min && product.price_thb <= budgetRange.max
      if (matchBudget) score++
    } else if (product.tags.budget.includes(budget)) {
      score++
    }
  }

  if (style && product.tags.style.includes(style)) score++

  return score
}

/**
 * กรอง + เรียงลำดับสินค้าตามความเหมาะสม
 * ใช้ฟังก์ชันนี้เพื่อได้ผลลัพธ์ที่ดีที่สุด
 */
export function getRecommendedProducts(products: Product[], formData: FormData): Product[] {
  // กรองสินค้าที่ตรงกับ criteria
  const filtered = filterProducts(products, formData)

  // เรียงลำดับตามคะแนนจากมากไปน้อย
  return filtered.sort((a, b) => {
    const scoreA = scoreProduct(a, formData)
    const scoreB = scoreProduct(b, formData)
    return scoreB - scoreA
  })
}
