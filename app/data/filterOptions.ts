/**
 * Filter Options Metadata
 * ใช้สำหรับแสดงตัวเลือกในแบบสอบถามและกรองสินค้า
 */

export interface GenderOption {
  id: string
  value: string
}

export interface AgeOption {
  id: string
  min: number
  max: number
  value: string
}

export interface RelationshipOption {
  id: string
  value: string
}

export interface OccasionOption {
  id: string
  value: string
}

export interface BudgetOption {
  id: string
  value: string
  min?: number
  max?: number
}

export interface StyleOption {
  id: string
  value: string
}

export const filterOptions = {
  gender: [
    {
      id: "G01",
      value: "ชาย"
    },
    {
      id: "G02",
      value: "หญิง"
    },
    {
      id: "G03",
      value: "ไม่ระบุ"
    }
  ] as GenderOption[],

  age: [
    {
      id: "A01",
      min: 0,
      max: 12,
      value: "0-12 ปี"
    },
    {
      id: "A02",
      min: 13,
      max: 22,
      value: "13-22 ปี"
    },
    {
      id: "A03",
      min: 23,
      max: 45,
      value: "23-45 ปี"
    },
    {
      id: "A04",
      min: 46,
      max: 99,
      value: "46-99 ปี"
    }
  ] as AgeOption[],

  relationship: [
    {
      id: "R01",
      value: "แฟน"
    },
    {
      id: "R02",
      value: "เพื่อน"
    },
    {
      id: "R03",
      value: "พ่อแม่"
    },
    {
      id: "R04",
      value: "ผู้ใหญ่"
    },
    {
      id: "R05",
      value: "ญาติ"
    }
  ] as RelationshipOption[],

  occasion: [
    {
      id: "O01",
      value: "วันเกิด"
    },
    {
      id: "O02",
      value: "เทศกาล"
    },
    {
      id: "O03",
      value: "ขึ้นบ้านใหม่"
    },
    {
      id: "O04",
      value: "แสดงความยินดี"
    },
    {
      id: "O05",
      value: "ขอบคุณ / ขอโทษ"
    }
  ] as OccasionOption[],

  budget: [
    {
      id: "B01",
      value: "ต่ำกว่า 300 บาท",
      min: 0,
      max: 299
    },
    {
      id: "B02",
      value: "300 - 500 บาท",
      min: 300,
      max: 500
    },
    {
      id: "B03",
      value: "500 - 1,000 บาท",
      min: 501,
      max: 1000
    },
    {
      id: "B04",
      value: "1,000 บาทขึ้นไป",
      min: 1001,
      max: 999999
    }
  ] as BudgetOption[],

  style: [
    {
      id: "S01",
      value: "น่ารัก"
    },
    {
      id: "S02",
      value: "มินิมอล"
    },
    {
      id: "S03",
      value: "สนุกสนาน"
    },
    {
      id: "S04",
      value: "หรูหรา"
    },
    {
      id: "S05",
      value: "วินเทจ"
    },
    {
      id: "S06",
      value: "เทคโนโลยี / ทันสมัย"
    },
    {
      id: "S07",
      value: "โรแมนติก"
    },
    {
      id: "S08",
      value: "สร้างสรรค์ / DIY"
    },
    {
      id: "S09",
      value: "แฟนตาซี"
    }
  ] as StyleOption[]
}

/**
 * Helper function เพื่อหา budget range จาก budget ID
 */
export function getBudgetRange(budgetId: string): { min: number; max: number } | null {
  const budget = filterOptions.budget.find(b => b.id === budgetId)
  if (!budget || budget.min === undefined || budget.max === undefined) return null
  return { min: budget.min, max: budget.max }
}
