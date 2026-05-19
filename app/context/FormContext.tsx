'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { FormData } from '@/app/types'

interface FormContextType {
  formData: FormData
  setFormData: (data: FormData) => void
  updateFormField: (field: keyof FormData, value: string) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    age: '',
    relationship: '',
    occasion: '',
    budget: '',
    style: ''
  })

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('tiger-gift-form')
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.values(formData).some(val => val !== '')) {
      localStorage.setItem('tiger-gift-form', JSON.stringify(formData))
    }
  }, [formData])

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <FormContext.Provider value={{ formData, setFormData, updateFormField }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context
}
