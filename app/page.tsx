'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ViewState, FormData } from '@/app/types'
import { useForm } from '@/app/context/FormContext'
import LandingPage from '@/app/components/LandingPage'
import FormView from '@/app/components/FormView'
import LoadingView from '@/app/components/LoadingView'
import { useForm } from '@/app/context/FormContext'

export default function Home() {
  const [view, setView] = useState<ViewState>('home')
  const [formStep, setFormStep] = useState<number>(1)
  const { formData, updateFormField } = useForm()

  const handleStartForm = () => {
    setView('form')
    setFormStep(1)
  }

  const handleSelectOption = (field: keyof FormData, value: string) => {
    updateFormField(field, value)
  }

  const handleNextStep = () => {
    const fields: (keyof FormData)[] = ['gender', 'age', 'relationship', 'occasion', 'budget', 'style']
    const currentField = fields[formStep - 1]

    if (!formData[currentField] || formData[currentField].length === 0) {
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
    // Navigate to feed page using Next.js router
    window.location.href = '/feed'
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

    </AnimatePresence>
  )
}
