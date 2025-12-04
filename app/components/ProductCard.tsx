'use client'

import { useState, useEffect } from 'react'
import { Product } from '../types/product'
import AddToCartButton from './AddToCartButton'

/**
 * ProductCard - Client Component
 * 
 * Це Client Component, тому:
 * 1. Потребує "use client" directive на початку файлу
 * 2. Виконується на клієнті (в браузері)
 * 3. Може використовувати React hooks (useState, useEffect, тощо)
 * 4. Може обробляти події користувача (onClick, onChange, тощо)
 * 5. Має доступ до браузерних API
 * 
 * Client Components необхідні для:
 * - Інтерактивності (кнопки, форми, події)
 * - Використання React hooks
 * - Доступу до браузерних API (localStorage, window, тощо)
 * - Динамічного контенту, що змінюється під час взаємодії
 */
interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Використання React hooks - можливо тільки в Client Components
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // useEffect - можливо тільки в Client Components
  useEffect(() => {
    // Перевірка, чи продукт в обраних (з localStorage)
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as number[]
    setIsFavorite(favorites.includes(product.id))
  }, [product.id])

  // Обробка події - можливо тільки в Client Components
  const handleToggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as number[]
    
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id]
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Зображення продукту */}
      <div className="relative h-48 bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          onLoad={handleImageLoad}
        />
        {/* Кнопка обраного - інтерактивний елемент */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          aria-label={isFavorite ? 'Видалити з обраних' : 'Додати в обрані'}
        >
          <svg
            className={`w-5 h-5 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Немає в наявності
          </div>
        )}
      </div>

      {/* Інформація про продукт */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {product.price.toLocaleString('uk-UA')} ₴
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Client Component для додавання до кошика */}
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}

