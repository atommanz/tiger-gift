'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="flex-1 mx-6 flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1
        const isActive = step <= currentStep

        return (
          <motion.div
            key={step}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              backgroundColor: isActive ? '#FFD966' : '#D1D5DB'
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              backgroundColor: { duration: 0.3 }
            }}
            className="h-2 flex-1 rounded-full"
            style={{ originX: 0 }}
          />
        )
      })}
    </div>
  )
}
