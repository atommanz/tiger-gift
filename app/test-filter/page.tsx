'use client'

import { useState, useEffect } from 'react'
import { useForm } from '../context/FormContext'

export default function TestFilterPage() {
  const { formData } = useForm()
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch('/mockdata/v1.json')
      .then(r => r.json())
      .then(data => setProducts(data.products))
  }, [])

  const getBudgetRange = (budgetId: string) => {
    const ranges: any = {
      'B01': { min: 0, max: 299 },
      'B02': { min: 300, max: 500 },
      'B03': { min: 501, max: 1000 },
      'B04': { min: 1001, max: 999999 }
    };
    return ranges[budgetId] || null;
  };

  const filtered = products.filter(product => {
    const { gender, age, relationship, occasion, budget, style } = formData;

    if (!gender && !age && !relationship && !occasion && !budget && !style) {
      return true;
    }

    const matchGender = gender ? product.tags.gender.includes(gender) : true;
    const matchAge = age ? product.tags.age.includes(age) : true;
    const matchRelationship = relationship ? product.tags.relationship.includes(relationship) : true;
    const matchOccasion = occasion ? product.tags.occasion.includes(occasion) : true;

    let matchBudget = true;
    if (budget) {
      const budgetRange = getBudgetRange(budget);
      if (budgetRange) {
        matchBudget = product.price_thb >= budgetRange.min && product.price_thb <= budgetRange.max;
      }
    }

    const matchStyle = style ? product.tags.style.includes(style) : true;

    return matchGender && matchAge && matchRelationship && matchOccasion && matchBudget && matchStyle;
  });

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🧪 Filter Test Page</h1>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">FormData:</h2>
        <pre className="text-xs">{JSON.stringify(formData, null, 2)}</pre>
      </div>

      <div className="mb-6 p-4 bg-blue-100 rounded">
        <h2 className="font-bold mb-2">Results:</h2>
        <p>Total products: {products.length}</p>
        <p className="text-2xl font-bold text-blue-600">Filtered products: {filtered.length}</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold">Products:</h2>
        {filtered.length === 0 ? (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            ❌ No products found with current filters
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="border p-3 rounded">
              <div className="font-bold">{p.title}</div>
              <div className="text-sm text-gray-600">Price: {p.price_thb}฿</div>
              <div className="text-xs text-gray-500">
                Gender: {p.tags.gender.join(', ')} |
                Age: {p.tags.age.join(', ')} |
                Occasion: {p.tags.occasion.join(', ')}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <a href="/" className="text-blue-600 underline">← Back to Home</a>
      </div>
    </div>
  )
}
