import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('scf-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('scf-cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem) => {
    setItems(prev => {
      const idx = prev.findIndex(i =>
        i.productId === newItem.productId &&
        i.size === newItem.size &&
        i.flavor === newItem.flavor
      )
      if (idx !== -1) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 }
        return updated
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index, qty) => {
    if (qty <= 0) { removeItem(index); return }
    setItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: qty } : item))
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const count    = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
