'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0, rotate: 0 }}
            animate={{
              y: window.innerHeight + 20,
              opacity: [0, 1, 1, 0.3],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
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
          {/* Tiger Gift Image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="mb-3"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-48 h-48"
            >
              <Image
                src="/tiger-gift.png"
                alt="Flying Tiger Copenhagen"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <div>
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.4
              }}
              className="text-4xl font-black text-black mb-3"
              style={{
                textShadow: '2px 2px 0px rgba(236, 72, 153, 0.3), -1px -1px 0px rgba(59, 130, 246, 0.3)'
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-block"
              >
                สั่งซื้อ
              </motion.span>
              <br />
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="inline-block"
              >
                สำเร็จ!
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-base font-bold text-black/80"
            >
              ของขวัญกำลังเดินทางไปหาคุณ ✨
            </motion.p>
          </div>
        </div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.5
          }}
          className="w-full max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl shadow-2xl p-5 border-[3px] border-black"
          >
            {/* Flying Tiger Header */}
            <div className="text-center mb-3 pb-3 border-b-2 border-dashed border-gray-300">
              <h2 className="text-lg font-black">flying tiger</h2>
              <p className="text-[10px] font-bold">copenhagen</p>
            </div>

            {/* Order Items */}
            <div className="space-y-2.5 mb-3">
              {cart.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        delay: 0.7 + index * 0.1
                      }}
                      className="w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center overflow-hidden flex-shrink-0 bg-white"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3E🎁%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    </motion.div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="font-bold text-xs truncate">{item.product.title}</p>
                      <p className="text-[10px] text-gray-600">× {item.quantity}</p>
                    </div>
                  </div>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="font-bold text-sm flex-shrink-0"
                  >
                    {item.product.price_thb * item.quantity} ฿
                  </motion.p>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="border-t-2 border-dashed border-gray-300 pt-3 mb-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">รวมทั้งหมด</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 10 }}
                  className="text-2xl font-black text-red-500"
                >
                  {calculateTotal().toLocaleString()} ฿
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Reset Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="w-full mt-4 py-3.5 bg-black text-white text-base font-bold rounded-full hover:bg-gray-800 transition-transform shadow-xl"
          >
            เริ่มใหม่อีกครั้ง
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
