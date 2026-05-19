'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart, Product } from '../context/CartContext'

export default function FeedPage() {
  const router = useRouter()
  const { cart, addToCart, getTotalItems, isInCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set())

  // Mock products for testing
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 'P001',
        title: 'สมุดโน้ตเขียวหมึกชมพู',
        price_thb: 180,
        image: '/placeholder-notebook.jpg',
        tags: {
          gender: ['G02'],
          age: ['A02', 'A03'],
          relationship: ['R02'],
          occasion: ['O01'],
          budget: ['B01'],
          style: ['S01', 'S02']
        }
      },
      {
        id: 'P002',
        title: 'กล่องดินสอหลากสี',
        price_thb: 320,
        image: '/placeholder-box.jpg',
        tags: {
          gender: ['G01', 'G02'],
          age: ['A01', 'A02'],
          relationship: ['R02'],
          occasion: ['O01'],
          budget: ['B02'],
          style: ['S03']
        }
      },
      {
        id: 'P003',
        title: 'ชุดเทเสมุนไม้น้ำเชื่อมเล็ก',
        price_thb: 149,
        image: '/placeholder-tea.jpg',
        tags: {
          gender: ['G02'],
          age: ['A03', 'A04'],
          relationship: ['R03'],
          occasion: ['O02'],
          budget: ['B01'],
          style: ['S02']
        }
      },
      {
        id: 'P004',
        title: 'ถุงเปลี่ยนดบน้ำเย็น',
        price_thb: 99,
        image: '/placeholder-bottle.jpg',
        tags: {
          gender: ['G01', 'G02', 'G03'],
          age: ['A02', 'A03'],
          relationship: ['R02'],
          occasion: ['O01'],
          budget: ['B01'],
          style: ['S06']
        }
      }
    ]
    setProducts(mockProducts)
  }, [])

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

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Fixed Header - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2 bg-transparent pointer-events-none">
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Recommendation badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-md pointer-events-auto">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-medium">แนะนำให้คุณ 1 / {products.length}</span>
        </div>

        {/* Cart button */}
        <button
          onClick={() => router.push('/cart')}
          className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Snap scroll container with bounce effect */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory overscroll-bounce">
        {products.map((product, index) => {
          const inCart = isInCart(product.id)
          const justAdded = addedProducts.has(product.id)

          return (
            <div
              key={product.id}
              className="h-screen w-full snap-start flex flex-col relative"
              style={{
                backgroundColor: index === 0 ? '#EC4899' : index === 1 ? '#EAB308' : index === 2 ? '#EAB308' : '#84CC16'
              }}
            >

              {/* Product content - Centered */}
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                {/* Product icon/image */}
                <div className="mb-6">
                  {index === 0 && (
                    <div className="w-32 h-32 bg-pink-200 rounded-2xl border-[3px] border-black flex items-center justify-center">
                      <div className="text-5xl">📓</div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="w-32 h-32 bg-yellow-300 rounded-2xl border-[3px] border-black flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-2 p-3">
                        <div className="w-10 h-10 border-[3px] border-black rounded-full bg-red-400"></div>
                        <div className="w-10 h-10 border-[3px] border-black rounded-full bg-red-400"></div>
                        <div className="w-10 h-10 border-[3px] border-black rounded-full bg-red-400"></div>
                        <div className="w-10 h-10 border-[3px] border-black rounded-full bg-red-400"></div>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="w-32 h-32 bg-yellow-300 rounded-2xl border-[3px] border-black flex items-center justify-center">
                      <div className="text-5xl">☕</div>
                    </div>
                  )}
                  {index === 3 && (
                    <div className="w-32 h-32 bg-lime-200 rounded-2xl border-[3px] border-black flex items-center justify-center">
                      <div className="text-5xl">🧪</div>
                    </div>
                  )}
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-28 left-6 w-6 h-6 rounded-full bg-white opacity-50"></div>
                <div className="absolute top-1/2 right-8 w-5 h-5 text-black opacity-30">★</div>
              </div>

              {/* Bottom card - Fixed */}
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-5">
                <h3 className="text-xl font-bold text-black mb-1.5">{product.title}</h3>
                <p className="text-2xl font-bold text-red-500 mb-3">{product.price_thb} ฿</p>

                {/* Add to cart button with state */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3.5 text-base font-bold rounded-full transition-all duration-300 ${
                    justAdded
                      ? 'bg-green-500 text-white'
                      : inCart
                      ? 'bg-gray-200 text-gray-700 border-2 border-black'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {justAdded ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      เพิ่มแล้ว!
                    </span>
                  ) : inCart ? (
                    'เพิ่มอีก +'
                  ) : (
                    'ใส่ตะกร้า'
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
