'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen max-h-screen bg-[#FFF9F0] flex flex-col items-center justify-between px-6 py-6 sm:py-8 relative overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full flex justify-center pt-2 flex-shrink-0"
      >
        {/* <Image
          src="/full-logo.png"
          alt="Flying Tiger Copenhagen"
          width={140}
          height={35}
          className="object-contain"
        /> */}
      </motion.div>

      {/* Decorative circles with animation */}
      <motion.div
        initial={{ scale: 0, x: -100 }}
        animate={{ scale: 1, x: -64 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className="absolute top-20 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#FFD966] rounded-full"
      />
      <motion.div
        initial={{ scale: 0, x: 100 }}
        animate={{ scale: 1, x: 80 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="absolute top-32 sm:top-40 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-[#FF69B4] rounded-full"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        className="absolute bottom-48 sm:bottom-60 left-8 w-20 h-20 sm:w-24 sm:h-24 bg-[#87CEEB] rounded-full"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
        className="absolute bottom-32 sm:bottom-40 right-8 w-24 h-24 sm:w-28 sm:h-28 bg-[#C5E86C] rounded-full"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 text-center">
        {/* Large "t" logo with floating animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            y: [0, -20, 0],
            rotateZ: [0, 5, -5, 0]
          }}
          transition={{
            scale: { delay: 0.5, duration: 0.8, type: "spring" },
            rotate: { delay: 0.5, duration: 0.8, type: "spring" },
            y: {
              delay: 1.5,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotateZ: {
              delay: 1.5,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="mb-8 flex justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <Image
              src="/small-logo.png"
              alt="Tiger Logo"
              width={180}
              height={180}
              className="object-contain"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Full Logo Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-4 flex justify-center"
        >
          <Image
            src="/full-logo.png"
            alt="Flying Tiger Copenhagen"
            width={280}
            height={70}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p className="text-base sm:text-lg text-gray-700 mb-2">
            ตอบคำถามเพียง 6 ข้อ
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-1">
            แล้วเราจะช่วยหาของขวัญที่ใช่ให้คุณ
          </p>
          <motion.p
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.1,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1
            }}
            className="text-base sm:text-lg font-bold text-[#FF1744]"
          >
            ใช้เวลาแค่ 3 นาที ✦
          </motion.p>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="w-full max-w-md z-10 flex-shrink-0"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full bg-black text-white text-base sm:text-lg font-bold py-3.5 sm:py-4 px-6 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          เริ่มหาของขวัญ
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-xl"
          >
            →
          </motion.span>
        </motion.button>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-xs text-gray-500 text-center mt-3 leading-relaxed"
        >
          ค้นหาของขวัญ Flying Tiger Copenhagen ใน Index Living Mall
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
