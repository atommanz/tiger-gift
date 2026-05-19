'use client'

import { CartProvider } from './context/CartContext'
import { FormProvider } from './context/FormContext'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FormProvider>
      <CartProvider>{children}</CartProvider>
    </FormProvider>
  )
}
