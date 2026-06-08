import { useCart } from '../context/CartContext'
import CartItem from './CartItem'

export default function Cart({ onCheckout }) {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, count, clearCart } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-brand-bg z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-brand-pink-light">
          <h2 className="font-display text-2xl font-bold text-brand-text">
            Cart {count > 0 && <span className="text-brand-pink">({count})</span>}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full bg-brand-pink-light flex items-center justify-center text-brand-text hover:bg-brand-pink hover:text-white transition-colors text-2xl leading-none"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <span className="text-6xl">🍬</span>
              <p className="font-display text-xl text-brand-text/60">Your cart is empty!</p>
              <p className="text-sm text-brand-text/40">Add some treats to get started</p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-brand-pink text-white rounded-full font-bold hover:bg-brand-pink-dark transition-colors mt-2"
              >
                Browse treats
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <CartItem
                key={i}
                item={item}
                index={i}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t-2 border-brand-pink-light space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-brand-text">Subtotal</span>
              <span className="font-display text-2xl font-bold text-brand-pink">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-brand-text/40 text-center">
              Delivery fee calculated at checkout · 48-hr lead time on all orders
            </p>
            <button
              onClick={() => { setIsOpen(false); onCheckout() }}
              className="w-full py-4 bg-brand-pink text-white rounded-full font-display font-bold text-lg hover:bg-brand-pink-dark transition-all duration-200 shadow-pink-md hover:shadow-pink-lg"
            >
              Proceed to checkout →
            </button>
            <button
              onClick={clearCart}
              className="w-full py-1.5 text-brand-text/35 text-xs hover:text-brand-red transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
