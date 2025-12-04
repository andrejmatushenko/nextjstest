import { fetchProducts } from '../lib/api'
import { Product } from '../types/product'
import ProductCard from './ProductCard'

/**
 * ProductList - Server Component
 * 
 * Це Server Component, тому:
 * 1. Може використовувати async/await для отримання даних
 * 2. Виконується на сервері, що покращує SEO та швидкість завантаження
 * 3. Не має доступу до браузерних API (localStorage, window тощо)
 * 4. Може безпосередньо працювати з базами даних та API
 * 5. Не потребує "use client" directive
 * 
 * Server Components ідеальні для:
 * - Отримання даних з API/БД
 * - Рендерингу статичного контенту
 * - Зменшення розміру JavaScript bundle на клієнті
 */
export default async function ProductList() {
  try {
    // Server Component може використовувати async/await безпосередньо
    const products: Product[] = await fetchProducts()

    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Продуктів не знайдено</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  } catch (error) {
    // Обробка помилок на сервері
    console.error('Помилка завантаження продуктів:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Помилка завантаження продуктів. Спробуйте пізніше.
        </p>
      </div>
    )
  }
}

