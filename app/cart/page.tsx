'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageSquare, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, calculateTotal } = useCart()
  const [giftMessage, setGiftMessage] = useState('')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-2.5 p-3 border-b">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/feed')}
          className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h1 className="text-xl font-bold">ตะกร้าของของขวัญ</h1>
      </div>

      {/* Cart Items */}
      <AnimatePresence mode="wait">
        {cart.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <ShoppingBag className="w-16 h-16 text-gray-400 mb-3" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-bold mb-2"
            >
              ตะกร้าว่างเปล่า
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-600 mb-5"
            >
              เพิ่มสินค้าลงตะกร้าเพื่อเริ่มช้อปปิ้ง
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/feed')}
              className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-full"
            >
              เลือกสินค้า
            </motion.button>
          </motion.div>
        ) : (
        <>
          <motion.div
            key="cart-items"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="p-3 space-y-2.5"
          >
            <AnimatePresence>
              {cart.map((item, index) => {
                // Assign background colors cyclically
                const bgColors = ['bg-yellow-300', 'bg-pink-300', 'bg-yellow-200', 'bg-lime-300']
                const bgColor = bgColors[index % bgColors.length]

                return (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 border-[3px] border-black rounded-3xl bg-white"
                  >
                    {/* Product image with colored background */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 rounded-2xl border-[3px] border-black flex items-center justify-center overflow-hidden flex-shrink-0 ${bgColor}`}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="32"%3E🎁%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    </motion.div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-black mb-0.5 line-clamp-2 leading-tight">{item.product.title}</h3>
                      <p className="text-red-500 font-bold text-base">{item.product.price_thb} ฿</p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border-[3px] border-black rounded-full flex-shrink-0 bg-white">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-5 h-5 flex items-center justify-center hover:text-red-500 transition-colors"
                      >
                        <Minus className="w-4 h-4 stroke-[3]" />
                      </motion.button>
                      <span className="w-6 text-center font-bold text-base">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-5 h-5 flex items-center justify-center hover:text-green-500 transition-colors"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Gift Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-3 mb-4"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <MessageSquare className="w-5 h-5" />
              <span className="font-bold text-base">ข้อความของขวัญ</span>
            </div>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="เขียนข้อความของขวัญพร้อมที่นี่..."
              className="w-full p-4 border-[3px] border-black rounded-2xl bg-yellow-200 resize-none h-24 text-base placeholder-gray-600 focus:outline-none focus:ring-0 focus:bg-yellow-300 transition-colors font-medium"
            />
          </motion.div>

          {/* Total and Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="px-3 pb-5"
          >
            <motion.div
              className="flex items-center justify-between mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-lg font-bold">ยอดรวมทั้งหมด</span>
              <motion.span
                key={calculateTotal()}
                initial={{ scale: 1.3, color: '#EF4444' }}
                animate={{ scale: 1, color: '#EF4444' }}
                className="text-3xl font-black text-red-500"
              >
                {calculateTotal().toLocaleString()} ฿
              </motion.span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/celebration')}
              className="w-full py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center gap-1"
              >
                ชำระเงิน ( {cart.length} ชิ้น) →
              </motion.span>
            </motion.button>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </div>
  )
}
