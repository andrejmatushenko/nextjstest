import { Suspense } from 'react'
import ProductList from './components/ProductList'

/**
 * Головна сторінка - Server Component
 * 
 * Це Server Component, який:
 * 1. Рендериться на сервері
 * 2. Може використовувати Server Components безпосередньо
 * 3. Використовує Suspense для показу loading стану
 * 4. Передає дані до Client Components через props
 * 
 * Архітектура:
 * - page.tsx (Server) → ProductList (Server) → ProductCard (Client) → AddToCartButton (Client)
 * 
 * Це демонструє правильну ієрархію:
 * Server Components отримують дані та передають їх до Client Components,
 * які обробляють інтерактивність
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок сторінки */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Каталог продуктів
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Демонстрація Server Components та Client Components в Next.js
          </p>
        </div>

        {/* Використання Suspense для обробки loading стану */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Завантаження продуктів...
                </p>
              </div>
            </div>
          }
        >
          {/* ProductList - Server Component, який отримує дані */}
          <ProductList />
        </Suspense>

        {/* Пояснення архітектури */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Про архітектуру проєкту
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-blue-600 dark:text-blue-400">
                Server Components:
              </strong>{' '}
              page.tsx, ProductList - виконуються на сервері, отримують дані
            </li>
            <li>
              <strong className="text-green-600 dark:text-green-400">
                Client Components:
              </strong>{' '}
              ProductCard, AddToCartButton - виконуються в браузері, обробляють
              інтерактивність
            </li>
            <li>
              <strong>Інтеграція:</strong> Server Components передають дані до
              Client Components через props
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

