'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

interface LoadingViewProps {
  onComplete: () => void
}

export default function LoadingView({ onComplete }: LoadingViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen max-h-screen bg-[#FFD966] flex flex-col items-center justify-center px-6 overflow-hidden relative"
    >
      {/* Pink circle - Top Left */}
      <motion.div
        initial={{ scale: 0, x: -100, y: -100 }}
        animate={{ scale: 1, x: 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="absolute -top-32 -left-32 w-80 h-80 bg-[#FF69B4] rounded-full"
      />

      {/* Blue circle - Bottom Right */}
      <motion.div
        initial={{ scale: 0, x: 100, y: 100 }}
        animate={{ scale: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#87CEEB] rounded-full"
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Large "t" logo with floating animation */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-12 flex justify-center"
        >
          <motion.div
            animate={{
              rotateY: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            <Image
              src="/small-logo.png"
              alt="Tiger Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-4xl font-bold text-black leading-tight">
            กำลังเลือก
          </h2>
          <h2 className="text-4xl font-bold text-black leading-tight">
            ของขวัญให้คุณ...
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-black mt-6 mb-8"
        >
          กำลังจัดของให้ตรงใจ...
        </motion.p>

        {/* Loading dots */}
        <div className="flex gap-3 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-4 h-4 bg-black rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Sparkle effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5
        }}
        className="absolute top-1/4 left-1/4 text-4xl"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1
        }}
        className="absolute top-1/3 right-1/4 text-3xl"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5
        }}
        className="absolute bottom-1/4 left-1/3 text-2xl"
      >
        ✦
      </motion.div>
    </motion.div>
  )
}
