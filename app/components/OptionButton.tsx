'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface OptionButtonProps {
  Icon: LucideIcon
  label: string
  bgColor: string
  isSelected: boolean
  onClick: () => void
  delay?: number
}

export default function OptionButton({
  Icon,
  label,
  bgColor,
  isSelected,
  onClick,
  delay = 0
}: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-3xl border-4 border-black flex items-center gap-3 transition-all ${
        isSelected
          ? 'bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
      }`}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <Icon size={24} className="text-black" strokeWidth={2.5} />
      </motion.div>
      <span className="text-lg font-bold text-black text-left flex-1">{label}</span>
      {isSelected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="text-2xl flex-shrink-0"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  )
}
