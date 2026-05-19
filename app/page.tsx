'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ViewState, FormData } from '@/app/types'
import LandingPage from '@/app/components/LandingPage'
import FormView from '@/app/components/FormView'
import LoadingView from '@/app/components/LoadingView'

export default function Home() {
  const [view, setView] = useState<ViewState>('home')
  const [formStep, setFormStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    age: '',
    relationship: '',
    occasion: '',
    budget: '',
    style: ''
  })

  const handleStartForm = () => {
    setView('form')
    setFormStep(1)
  }

  const handleSelectOption = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    const fields: (keyof FormData)[] = ['gender', 'age', 'relationship', 'occasion', 'budget', 'style']
    const currentField = fields[formStep - 1]

    if (!formData[currentField]) {
      return // Don't proceed if no selection
    }

    if (formStep < 6) {
      setFormStep(formStep + 1)
    } else {
      // Form complete, go to loading
      setView('loading')
    }
  }

  const handleBack = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1)
    } else {
      setView('home')
    }
  }

  const handleLoadingComplete = () => {
    setView('feed')
    // TODO: Filter products based on formData
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'home' && (
        <LandingPage key="landing" onStart={handleStartForm} />
      )}

      {view === 'form' && (
        <FormView
          key="form"
          formStep={formStep}
          formData={formData}
          onSelect={handleSelectOption}
          onNext={handleNextStep}
          onBack={handleBack}
        />
      )}

      {view === 'loading' && (
        <LoadingView key="loading" onComplete={handleLoadingComplete} />
      )}

      {view === 'feed' && (
        <div key="feed" className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
          <p className="text-xl">Product Feed - Coming soon...</p>
        </div>
      )}
    </AnimatePresence>
  )
}
