import { FormData, Product } from '@/app/types'
import { getBudgetRange } from '@/app/data/filterOptions'

/**
 * กรองสินค้าตามข้อมูลที่ user เลือกจาก quiz
 * รองรับ Multiple Selection - user เลือกได้หลายตัวเลือกในแต่ละคำถาม
 * ใช้ logic OR ภายใน field (ตรงอย่างใดอย่างหนึ่ง) และ scoring เพื่อ rank
 */
export function filterProducts(products: Product[], formData: FormData): Product[] {
  const { gender, age, relationship, occasion, budget, style } = formData

  // ถ้ายังไม่มีข้อมูลเลย ให้แสดงสินค้าทั้งหมด
  const hasAnySelection = gender.length > 0 || age.length > 0 || relationship.length > 0 ||
                          occasion.length > 0 || budget.length > 0 || style.length > 0

  if (!hasAnySelection) {
    return products
  }

  // กรองสินค้าโดยเช็คแต่ละ field
  return products.filter(product => {
    // เช็ค budget ก่อน (เป็น hard requirement)
    if (budget.length > 0) {
      let matchAnyBudget = false
      for (const budgetId of budget) {
        const budgetRange = getBudgetRange(budgetId)
        if (budgetRange) {
          if (product.price_thb >= budgetRange.min && product.price_thb <= budgetRange.max) {
            matchAnyBudget = true
            break
          }
        }
      }
      // ถ้าไม่อยู่ในช่วงงบประมาณใดเลย ไม่แสดงสินค้านี้
      if (!matchAnyBudget) return false
    }

    // นับจำนวน criteria category ที่ตรง (แต่ละ field นับ 1 category)
    let matchedCategories = 0
    let totalCategories = 0

    // Gender: ตรงอย่างใดอย่างหนึ่งใน array
    if (gender.length > 0) {
      totalCategories++
      const hasMatch = gender.some(g => product.tags.gender.includes(g))
      if (hasMatch) matchedCategories++
    }

    // Age: ตรงอย่างใดอย่างหนึ่งใน array
    if (age.length > 0) {
      totalCategories++
      const hasMatch = age.some(a => product.tags.age.includes(a))
      if (hasMatch) matchedCategories++
    }

    // Relationship: ตรงอย่างใดอย่างหนึ่งใน array
    if (relationship.length > 0) {
      totalCategories++
      const hasMatch = relationship.some(r => product.tags.relationship.includes(r))
      if (hasMatch) matchedCategories++
    }

    // Occasion: ตรงอย่างใดอย่างหนึ่งใน array
    if (occasion.length > 0) {
      totalCategories++
      const hasMatch = occasion.some(o => product.tags.occasion.includes(o))
      if (hasMatch) matchedCategories++
    }

    // Style: ตรงอย่างใดอย่างหนึ่งใน array
    if (style.length > 0) {
      totalCategories++
      const hasMatch = style.some(s => product.tags.style.includes(s))
      if (hasMatch) matchedCategories++
    }

    // แสดงสินค้าที่ตรงอย่างน้อย 40% ของ categories ที่เลือก (หรืออย่างน้อย 2 categories)
    // สำหรับ single selection: ถ้าเลือก 5-6 categories ต้องตรงอย่างน้อย 2-3 categories
    const minMatch = Math.max(2, Math.ceil(totalCategories * 0.4))
    return matchedCategories >= minMatch
  })
}

/**
 * คำนวณคะแนนความเหมาะสม (relevance score) ของสินค้าแต่ละชิ้น
 * ใช้สำหรับเรียงลำดับสินค้าตามความตรงกับที่ user ต้องการมากที่สุด
 * Single Selection - แต่ละ field มีแค่ 1 ค่า (เก็บใน array ที่มี 1 element)
 */
export function scoreProduct(product: Product, formData: FormData): number {
  let score = 0
  const { gender, age, relationship, occasion, budget, style } = formData

<<<<<<< HEAD
  // ให้คะแนนต่างกันตามความสำคัญของแต่ละ criteria
  // Single selection: แต่ละ array มีแค่ 1 ค่า

  // Gender: 2 คะแนน
  if (gender.length > 0 && product.tags.gender.includes(gender[0])) {
    score += 2
  }

  // Age: 2 คะแนน
  if (age.length > 0 && product.tags.age.includes(age[0])) {
    score += 2
  }

  // Relationship: 3 คะแนน (สำคัญที่สุด)
  if (relationship.length > 0 && product.tags.relationship.includes(relationship[0])) {
    score += 3
  }

  // Occasion: 3 คะแนน (สำคัญที่สุด)
  if (occasion.length > 0 && product.tags.occasion.includes(occasion[0])) {
    score += 3
  }

  // Style: 1.5 คะแนน
  if (style.length > 0 && product.tags.style.includes(style[0])) {
    score += 1.5
  }

  // Budget: 2.5 คะแนน
  if (budget.length > 0) {
    const budgetRange = getBudgetRange(budget[0])
    if (budgetRange) {
      if (product.price_thb >= budgetRange.min && product.price_thb <= budgetRange.max) {
        score += 2.5
      }
    }
  }
=======
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
>>>>>>> fe3eaaab1a1ad4472063fa0874dfcebfb973881b

  return score
}

/**
 * กรอง + เรียงลำดับสินค้าตามความเหมาะสม
 * ใช้ฟังก์ชันนี้เพื่อได้ผลลัพธ์ที่ดีที่สุด
 */
export function getRecommendedProducts(products: Product[], formData: FormData): Product[] {
  // กรองสินค้าที่ตรงกับ criteria
  const filtered = filterProducts(products, formData)

  // Debug log (สามารถเปิดได้เพื่อ debug)
  if (typeof window !== 'undefined' && true) { // เปลี่ยนเป็น true เพื่อดู log
    console.log('🎁 Filter Result:', {
      formData,
      totalProducts: products.length,
      filteredProducts: filtered.length,
      products: filtered.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price_thb,
        score: scoreProduct(p, formData),
        tags: p.tags
      }))
    })
  }

  // เรียงลำดับตามคะแนนจากมากไปน้อย
  return filtered.sort((a, b) => {
    const scoreA = scoreProduct(a, formData)
    const scoreB = scoreProduct(b, formData)
    return scoreB - scoreA
  })
}
