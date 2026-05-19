'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

export default function CelebrationPage() {
  const router = useRouter()
  const { cart, calculateTotal } = useCart()
  const [orderNumber, setOrderNumber] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Generate random order number
    const randomOrder = `TG-${Math.floor(10000 + Math.random() * 90000)}`
    setOrderNumber(randomOrder)

    // Fade in content after confetti starts
    setTimeout(() => setShowContent(true), 300)
  }, [])

  const handleReset = () => {
    // Clear cart and go home
    localStorage.removeItem('tiger-gift-cart')
    router.push('/')
    setTimeout(() => window.location.reload(), 100)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 overflow-hidden">
      {/* Confetti Particles */}
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              backgroundColor: [
                '#EC4899', '#3B82F6', '#10B981', '#F59E0B',
                '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16'
              ][Math.floor(Math.random() * 8)]
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center justify-between min-h-screen p-4 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Top Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Flying Tiger Logo */}
          <div className="mb-4 animate-scale-in">
            <div className="relative w-20 h-20">
              <Image
                src="/small-logo.png"
                alt="Flying Tiger Copenhagen"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Success Message */}
          <div className="animate-bounce-in">
            <h1 className="text-4xl font-black text-black mb-3" style={{
              textShadow: '2px 2px 0px rgba(236, 72, 153, 0.3), -1px -1px 0px rgba(59, 130, 246, 0.3)'
            }}>
              ส่งซื้อ<br/>สำเร็จ!
            </h1>
            <p className="text-base font-bold text-black/80">
              ของขวัญกำลังเดินทางไปหาคุณ ✨
            </p>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="w-full max-w-md animate-slide-up">
          <div className="bg-white rounded-3xl shadow-2xl p-5 border-[3px] border-black">
            {/* Flying Tiger Header */}
            <div className="text-center mb-3 pb-3 border-b-2 border-dashed border-gray-300">
              <h2 className="text-lg font-black">flying tiger</h2>
              <p className="text-[10px] font-bold">copenhagen</p>
            </div>

            {/* Order Items */}
            <div className="space-y-2.5 mb-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div
                      className="w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center text-lg flex-shrink-0"
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
                    <div className="text-left flex-1 min-w-0">
                      <p className="font-bold text-xs truncate">{item.product.title}</p>
                      <p className="text-[10px] text-gray-600">× {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-sm flex-shrink-0">{item.product.price_thb * item.quantity} ฿</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t-2 border-dashed border-gray-300 pt-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">รวมทั้งหมด</span>
                <span className="text-2xl font-black text-red-500">
                  {calculateTotal().toLocaleString()} ฿
                </span>
              </div>
            </div>

            {/* Order Number */}
            <div className="text-center text-xs text-gray-600">
              หมายเลขคำสั่งซื้อ: <span className="font-mono font-bold">{orderNumber}</span>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full mt-4 py-3.5 bg-black text-white text-base font-bold rounded-full hover:bg-gray-800 transition-transform active:scale-95 shadow-xl"
          >
            เริ่มใหม่อีกครั้ง
          </button>
        </div>
      </div>
    </div>
  )
}
