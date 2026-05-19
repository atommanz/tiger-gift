'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Users,
  Sparkles,
  Baby,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Heart,
  Smile,
  Home as HomeIcon,
  Handshake,
  Star,
  Cake,
  Gift,
  PartyPopper,
  ThumbsUp,
  Banknote,
  Gem,
  Package,
  Lightbulb
} from 'lucide-react'
import { FormData } from '@/app/types'
import ProgressBar from './ProgressBar'
import OptionButton from './OptionButton'

interface FormViewProps {
  formStep: number
  formData: FormData
  onSelect: (field: keyof FormData, value: string) => void
  onNext: () => void
  onBack: () => void
}

const questions = [
  {
    field: 'gender' as keyof FormData,
    title: 'ของขวัญสำหรับใคร?',
    subtitle: 'เลือกเพศของผู้รับ',
    options: [
      { value: 'G01', Icon: User, label: 'ผู้ชาย', color: '#87CEEB' },
      { value: 'G02', Icon: Users, label: 'ผู้หญิง', color: '#FF69B4' },
      { value: 'G03', Icon: Sparkles, label: 'ไม่ระบุ / เป็นกลาง', color: '#FFD966' }
    ]
  },
  {
    field: 'age' as keyof FormData,
    title: 'อายุประมาณเท่าไหร่?',
    subtitle: 'ช่วงวัยของผู้รับ',
    options: [
      { value: 'A01', Icon: Baby, label: 'เด็ก (ต่ำกว่า 12)', color: '#FFD966' },
      { value: 'A02', Icon: GraduationCap, label: 'วัยรุ่น (13-22)', color: '#FF69B4' },
      { value: 'A03', Icon: Briefcase, label: 'วัยทำงาน (23-40)', color: '#C5E86C' },
      { value: 'A04', Icon: HeartHandshake, label: 'ผู้ใหญ่ (40+)', color: '#B19CD9' }
    ]
  },
  {
    field: 'relationship' as keyof FormData,
    title: 'คุณรู้จักกันยังไง?',
    subtitle: 'ความสัมพันธ์กับผู้รับ',
    options: [
      { value: 'R01', Icon: Heart, label: 'แฟน / คนรัก', color: '#FF69B4' },
      { value: 'R02', Icon: Smile, label: 'เพื่อนสนิท', color: '#FFD966' },
      { value: 'R03', Icon: HomeIcon, label: 'พ่อแม่ / ครอบครัว', color: '#C5E86C' },
      { value: 'R04', Icon: Handshake, label: 'เพื่อนร่วมงาน', color: '#87CEEB' },
      { value: 'R05', Icon: Star, label: 'หัวหน้า / เจ้านาย', color: '#B19CD9' }
    ]
  },
  {
    field: 'occasion' as keyof FormData,
    title: 'โอกาสไหนเนี่ย?',
    subtitle: 'เลือกโอกาสพิเศษ',
    options: [
      { value: 'O01', Icon: Cake, label: 'วันเกิด', color: '#FF69B4' },
      { value: 'O02', Icon: PartyPopper, label: 'ปีใหม่', color: '#FFD966' },
      { value: 'O03', Icon: HomeIcon, label: 'ขึ้นบ้านใหม่', color: '#C5E86C' },
      { value: 'O04', Icon: ThumbsUp, label: 'แสดงความยินดี', color: '#FFA07A' },
      { value: 'O05', Icon: Gift, label: 'ขอบคุณ', color: '#B19CD9' }
    ]
  },
  {
    field: 'budget' as keyof FormData,
    title: 'งบเท่าไหร่ดี?',
    subtitle: 'งบประมาณต่อชิ้น',
    options: [
      { value: 'B01', Icon: Banknote, label: 'ต่ำกว่า 300 ฿', color: '#C5E86C' },
      { value: 'B02', Icon: Banknote, label: '300 - 500 ฿', color: '#FFD966' },
      { value: 'B03', Icon: Gem, label: '500 - 1,000 ฿', color: '#FFA07A' },
      { value: 'B04', Icon: Gem, label: '1,000 ฿ ขึ้นไป', color: '#FF69B4' }
    ]
  },
  {
    field: 'style' as keyof FormData,
    title: 'สไตล์ไหนเข้าทาง?',
    subtitle: 'แนวที่ผู้รับน่าจะชอบ',
    options: [
      { value: 'S01', Icon: Heart, label: 'น่ารัก น่าหยิก', color: '#FF69B4' },
      { value: 'S02', Icon: Sparkles, label: 'มินิมอล เรียบหรู', color: '#E8E8E8' },
      { value: 'S03', Icon: PartyPopper, label: 'สนุก สีสด', color: '#FFD966' },
      { value: 'S04', Icon: Package, label: 'ใช้งานได้จริง', color: '#87CEEB' }
    ]
  }
]

export default function FormView({
  formStep,
  formData,
  onSelect,
  onNext,
  onBack
}: FormViewProps) {
  const currentQuestion = questions[formStep - 1]
  const currentField = currentQuestion.field
  const isLastStep = formStep === 6

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen max-h-screen bg-[#FFF9F0] flex flex-col px-4 py-6 overflow-hidden"
    >
      {/* Header with back button and progress - Fixed height */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <span className="text-xl">←</span>
        </motion.button>

        <ProgressBar currentStep={formStep} totalSteps={6} />

        <motion.div
          key={formStep}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-sm font-bold text-gray-600 w-10 text-right flex-shrink-0"
        >
          {formStep}/6
        </motion.div>
      </div>

      {/* Question content - Scrollable area */}
      <div className="flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={formStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Title section - Fixed */}
            <div className="flex-shrink-0 mb-4">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-black text-black mb-2 leading-tight"
              >
                {currentQuestion.title}
              </motion.h2>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-600"
              >
                {currentQuestion.subtitle}
              </motion.p>
            </div>

            {/* Options - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <OptionButton
                    key={option.value}
                    Icon={option.Icon}
                    label={option.label}
                    bgColor={option.color}
                    isSelected={formData[currentField] === option.value}
                    onClick={() => onSelect(currentField, option.value)}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>
            </div>

            {/* Next button - Fixed at bottom */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-shrink-0 pt-4"
            >
              <motion.button
                whileHover={formData[currentField] ? { scale: 1.02 } : {}}
                whileTap={formData[currentField] ? { scale: 0.98 } : {}}
                onClick={onNext}
                disabled={!formData[currentField]}
                className={`w-full text-white text-base font-bold py-3.5 px-6 rounded-full transition-all ${
                  formData[currentField]
                    ? 'bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLastStep ? 'หาของขวัญให้เลย!' : 'ถัดไป'}
                  {!isLastStep && (
                    <motion.span
                      animate={{ x: formData[currentField] ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom scrollbar hide */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  )
}
