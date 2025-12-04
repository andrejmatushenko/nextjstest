import { Product } from '../types/product'

/**
 * Симуляція API для отримання продуктів
 * В реальному проєкті це було б звернення до зовнішнього API або бази даних
 * 
 * Ця функція використовується в Server Component, тому може бути async
 * і не потребує "use client" directive
 */
export async function fetchProducts(): Promise<Product[]> {
  // Симуляція затримки мережевого запиту
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Повертаємо мокові дані
  return [
    {
      id: 1,
      name: 'Ноутбук MacBook Pro',
      description: 'Потужний ноутбук для професійної роботи з M3 процесором',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Електроніка',
      inStock: true,
    },
    {
      id: 2,
      name: 'Смартфон iPhone 15',
      description: 'Новітній смартфон з потужною камерою та швидким процесором',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Електроніка',
      inStock: true,
    },
    {
      id: 3,
      name: 'Навушники AirPods Pro',
      description: 'Бездротові навушники з активним шумопоглинанням',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
      category: 'Аудіо',
      inStock: true,
    },
    {
      id: 4,
      name: 'Планшет iPad Air',
      description: 'Універсальний планшет для роботи та розваг',
      price: 32999,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      category: 'Електроніка',
      inStock: false,
    },
    {
      id: 5,
      name: 'Годинник Apple Watch',
      description: 'Розумний годинник для моніторингу здоров\'я',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400',
      category: 'Гаджети',
      inStock: true,
    },
  ]
}

/**
 * Отримання одного продукту за ID
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  const products = await fetchProducts()
  return products.find((p) => p.id === id) || null
}

