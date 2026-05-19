'use client'

import { useForm } from '@/app/context/FormContext'
import { useState, useEffect } from 'react'

export default function DebugFilter({ products }: { products: any[] }) {
  const { formData } = useForm()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log('🔍 FormData:', formData)
    console.log('📦 Products count:', products.length)
    console.log('📦 Products:', products.slice(0, 3))
  }, [formData, products])

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
      >
        🐛 Debug
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white border-2 border-black rounded-lg p-4 shadow-xl w-80 max-h-96 overflow-auto">
          <h3 className="font-bold mb-2">Form Data:</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded mb-3">
            {JSON.stringify(formData, null, 2)}
          </pre>

          <h3 className="font-bold mb-2">Products: {products.length}</h3>
          <div className="text-xs space-y-1">
            {products.slice(0, 5).map((p, i) => (
              <div key={i} className="border-b pb-1">
                <div className="font-bold">{p.title.substring(0, 30)}</div>
                <div className="text-gray-600">{p.price_thb}฿</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
