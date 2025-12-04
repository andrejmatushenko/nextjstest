/**
 * Типи для продуктів
 * Використовується для типізації даних продуктів по всьому проєкту
 */
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export interface CartItem {
  productId: number
  quantity: number
}

