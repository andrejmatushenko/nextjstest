'use client'

import { useState } from 'react'
import { Product } from '../types/product'

/**
 * AddToCartButton - Client Component
 * 
 * Це Client Component, оскільки:
 * 1. Потребує інтерактивності (обробка кліків)
 * 2. Використовує React hooks (useState)
 * 3. Має доступ до localStorage для збереження стану кошика
 * 4. Показує динамічний UI на основі стану (loading, success)
 * 
 * Цей компонент отримує дані від Server Component через props,
 * що демонструє правильну інтеграцію між Server та Client Components
 */
interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // Обробка додавання до кошика
  const handleAddToCart = () => {
    if (!product.inStock) {
      alert('Цей продукт зараз недоступний')
      return
    }

    setIsAdding(true)

    // Симуляція асинхронної операції (в реальному проєкті це був би API запит)
    setTimeout(() => {
      // Отримуємо поточний кошик з localStorage
      const cart = JSON.parse(
        localStorage.getItem('cart') || '[]'
      ) as Array<{ productId: number; quantity: number }>

      // Перевіряємо, чи продукт вже в кошику
      const existingItem = cart.find((item) => item.productId === product.id)

      if (existingItem) {
        // Оновлюємо кількість
        existingItem.quantity += quantity
      } else {
        // Додаємо новий продукт
        cart.push({ productId: product.id, quantity })
      }

      // Зберігаємо оновлений кошик
      localStorage.setItem('cart', JSON.stringify(cart))

      setIsAdding(false)
      setIsAdded(true)

      // Скидаємо стан через 2 секунди
      setTimeout(() => {
        setIsAdded(false)
        setQuantity(1)
      }, 2000)
    }, 500)
  }

  // Обробка зміни кількості
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)))
  }

  return (
    <div className="space-y-2">
      {/* Селектор кількості - інтерактивний елемент */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
          className="px-3 py-1 bg-white dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Зменшити кількість"
        >
          −
        </button>
        <span className="px-4 font-semibold text-gray-900 dark:text-white">
          {quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(1)}
          disabled={quantity >= 10}
          className="px-3 py-1 bg-white dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Збільшити кількість"
        >
          +
        </button>
      </div>

      {/* Кнопка додавання до кошика */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !product.inStock || isAdded}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isAdded
            ? 'bg-green-500 text-white'
            : isAdding
            ? 'bg-blue-400 text-white cursor-wait'
            : product.inStock
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Додавання...
          </span>
        ) : isAdded ? (
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Додано до кошика!
          </span>
        ) : product.inStock ? (
          'Додати до кошика'
        ) : (
          'Немає в наявності'
        )}
      </button>
    </div>
  )
}

