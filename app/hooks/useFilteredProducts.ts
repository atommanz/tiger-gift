'use client'

import { useMemo } from 'react'
import { useForm } from '@/app/context/FormContext'
import { Product } from '@/app/types'
import { getRecommendedProducts } from '@/app/utils/filterProducts'

/**
 * Hook สำหรับดึงสินค้าที่กรองตาม FormData อัตโนมัติ
 * ใช้ useMemo เพื่อ optimize performance
 */
export function useFilteredProducts(allProducts: Product[]) {
  const { formData } = useForm()

  const filteredProducts = useMemo(() => {
    return getRecommendedProducts(allProducts, formData)
  }, [allProducts, formData])

  return {
    products: filteredProducts,
    count: filteredProducts.length,
    formData
  }
}
