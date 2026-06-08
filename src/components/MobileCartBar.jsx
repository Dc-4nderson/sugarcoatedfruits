import { useCart } from '../context/CartContext'

export default function MobileCartBar() {
  const { count, subtotal, setIsOpen } = useCart()

  if (count === 0) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-20 md:hidden px-4 pb-4 pt-2">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-brand-pink text-white rounded-full font-display font-bold text-base shadow-pink-lg flex items-center justify-between px-6"
        aria-label={`View cart — ${count} items, $${subtotal.toFixed(2)}`}
      >
        <span className="bg-white/25 px-3 py-0.5 rounded-full text-sm">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
        <span>View Cart 🛒</span>
        <span className="font-display">${subtotal.toFixed(2)}</span>
      </button>
    </div>
  )
}
