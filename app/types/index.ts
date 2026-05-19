export type ViewState = 'home' | 'form' | 'loading' | 'feed' | 'cart' | 'celebration'

export interface FormData {
  gender: string
  age: string
  relationship: string
  occasion: string
  budget: string
  style: string
}

export interface Product {
  id: string
  title: string
  description?: string
  price_eur?: number
  price_thb: number
  image: string
  product_type?: string
  handle?: string
  url?: string
  tags: {
    gender: string[]
    age: string[]
    relationship: string[]
    occasion: string[]
    budget: string[]
    style: string[]
  }
}

export interface CartItem {
  product: Product
  quantity: number
}
