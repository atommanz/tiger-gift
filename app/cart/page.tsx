'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, calculateTotal } = useCart()
  const [giftMessage, setGiftMessage] = useState('')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-2.5 p-3 border-b">
        <button
          onClick={() => router.push('/feed')}
          className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">ตะกร้าของของขวัญ</h1>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="text-5xl mb-3">🛒</div>
          <h2 className="text-lg font-bold mb-2">ตะกร้าว่างเปล่า</h2>
          <p className="text-sm text-gray-600 mb-5">เพิ่มสินค้าลงตะกร้าเพื่อเริ่มช้อปปิ้ง</p>
          <button
            onClick={() => router.push('/feed')}
            className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-full"
          >
            เลือกสินค้า
          </button>
        </div>
      ) : (
        <>
          <div className="p-3 space-y-2.5">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-2.5 p-3 border-2 border-black rounded-2xl bg-white"
              >
                {/* Product icon */}
                <div
                  className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    backgroundColor:
                      item.product.id === 'P001' ? '#FBBF24' :
                      item.product.id === 'P002' ? '#EC4899' :
                      item.product.id === 'P003' ? '#FBBF24' : '#84CC16'
                  }}
                >
                  {item.product.id === 'P001' ? '😺' :
                   item.product.id === 'P002' ? '🎧' :
                   item.product.id === 'P003' ? '☕' : '🧪'}
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-black truncate">{item.product.title}</h3>
                  <p className="text-red-500 font-bold text-sm">{item.product.price_thb} ฿</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 border-2 border-black rounded-full flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="w-5 h-5 flex items-center justify-center font-bold text-base hover:text-red-500"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="w-5 h-5 flex items-center justify-center font-bold text-base hover:text-green-500"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gift Message */}
          <div className="px-3 mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
              </svg>
              <span className="font-bold text-sm">ข้อความของขวัญ</span>
            </div>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="เขียนข้อความของขวัญพร้อมที่นี่..."
              className="w-full p-3 border-2 border-black rounded-2xl bg-yellow-100 resize-none h-20 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Total and Checkout */}
          <div className="px-3 pb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold">ยอดรวมทั้งหมด</span>
              <span className="text-2xl font-bold text-red-500">{calculateTotal().toLocaleString()} ฿</span>
            </div>
            <button
              onClick={() => router.push('/celebration')}
              className="w-full py-3.5 bg-black text-white text-base font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              ชำระเงิน ( {cart.length} ชิ้น) →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
