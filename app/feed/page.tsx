'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Star, Check } from 'lucide-react'
import { useCart, Product } from '../context/CartContext'
import { useForm } from '../context/FormContext'
import { getRecommendedProducts } from '../utils/filterProducts'
import DebugFilter from '../components/DebugFilter'

export default function FeedPage() {
  const router = useRouter()
  const { cart, addToCart, getTotalItems, isInCart } = useCart()
  const { formData } = useForm()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // Load all products from JSON
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/mockdata/v1.json')
        const data = await response.json()
        setAllProducts(data.products)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filter products directly
  const products = getRecommendedProducts(allProducts, formData)
  const count = products.length

  // Debug
  useEffect(() => {
    console.log('🔍 FormData:', formData)
    console.log('📦 All products:', allProducts.length)
    console.log('📦 Filtered products:', products.length)
  }, [formData, allProducts, products])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    // Show added state temporarily
    setAddedProducts(prev => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 1500)
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-black border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // Show empty state if no products match the filter
  if (products.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 mb-4" />
        </motion.div>
        <h2 className="text-xl font-bold text-black mb-2">ไม่พบสินค้าที่เหมาะสม</h2>
        <p className="text-gray-600 text-center mb-6">
          ลองเปลี่ยนคำตอบในแบบสอบถามใหม่อีกครั้ง
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-black text-white rounded-full font-bold"
        >
          กลับไปเริ่มต้นใหม่
        </motion.button>
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Fixed Header - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2 bg-transparent pointer-events-none">
        {/* Back button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/')}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md pointer-events-auto"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        {/* Recommendation badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-md pointer-events-auto">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">แนะนำให้คุณ {count} ชิ้น</span>
        </div>

        {/* Cart button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/cart')}
          className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md pointer-events-auto"
        >
          <ShoppingCart className="w-5 h-5" />
          {getTotalItems() > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
            >
              {getTotalItems()}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Snap scroll container with bounce effect */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory overscroll-bounce">
        {products.map((product, index) => {
          const inCart = isInCart(product.id)
          const justAdded = addedProducts.has(product.id)

          return (
            <div
              key={product.id}
              className="h-screen w-full snap-start flex flex-col overflow-hidden"
            >
              {/* Image Section - Takes remaining space */}
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 relative overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.backgroundColor = '#EAB308'
                  }}
                />
              </motion.div>

              {/* Product Info Card - Fixed height at bottom */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="bg-white rounded-t-3xl shadow-2xl px-5 pt-4 pb-6 flex-shrink-0"
              >
                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-bold text-black mb-1 line-clamp-1"
                >
                  {product.title}
                </motion.h3>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold text-red-500 mb-3"
                >
                  {product.price_thb} ฿
                </motion.p>

                {/* Add to cart button with state */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 text-base font-bold rounded-full transition-all duration-300 ${
                    justAdded
                      ? 'bg-green-500 text-white'
                      : inCart
                      ? 'bg-gray-200 text-gray-700 border-2 border-black'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {justAdded ? (
                      <motion.span
                        key="added"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                        เพิ่มแล้ว!
                      </motion.span>
                    ) : inCart ? (
                      <motion.span
                        key="more"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        เพิ่มอีก +
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        ใส่ตะกร้า
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Debug component */}
      <DebugFilter products={products} />
    </div>
  )
}
