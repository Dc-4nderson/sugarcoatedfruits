import { useState } from 'react'
import FlavorSelector from './FlavorSelector'
import { useCart } from '../context/CartContext'

const PRODUCT_EMOJI = {
  'candied-grapes': '🍇',
  'candied-pineapples': '🍍',
  'candied-strawberries': '🍓',
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [selectedSize,   setSelectedSize]   = useState(product.sizes[0])
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name:      product.name,
      size:      selectedSize.label,
      flavor:    selectedFlavor,
      unitPrice: selectedSize.price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="bg-white rounded-3xl border-2 border-brand-pink-light shadow-pink p-5 md:p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-pink-lg transition-all duration-300 touch-manipulation">

      {/* Emoji image */}
      <div className="bg-gradient-to-br from-brand-pink-light to-pink-100 rounded-2xl h-28 md:h-36 flex items-center justify-center select-none">
        <span className="text-6xl md:text-7xl" role="img" aria-label={product.name}>
          {product._customEmoji ?? PRODUCT_EMOJI[product.id] ?? '🍬'}
        </span>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-brand-text leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-brand-text/60 mt-1 leading-snug">{product.description}</p>
      </div>

      {/* Size */}
      <div>
        <p className="text-xs font-bold text-brand-text/50 uppercase tracking-wide mb-2">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map(size => (
            <button
              key={size.label}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-bold transition-all duration-200 touch-manipulation ${
                selectedSize.label === size.label
                  ? 'bg-brand-pink text-white border-brand-pink shadow-pink-md scale-105'
                  : 'bg-white text-brand-text border-brand-pink-light hover:border-brand-pink active:scale-95'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flavor */}
      <FlavorSelector
        flavors={product.flavors}
        selected={selectedFlavor}
        onChange={setSelectedFlavor}
      />

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-brand-pink-light">
        <span className="font-display text-3xl font-bold text-brand-pink">
          ${selectedSize.price.toFixed(2)}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className={`px-6 py-3 rounded-full font-bold text-white text-sm transition-all duration-200 touch-manipulation ${
            added
              ? 'bg-brand-green scale-95'
              : 'bg-brand-pink hover:bg-brand-pink-dark shadow-pink-md hover:shadow-pink-lg hover:-translate-y-0.5 active:scale-95'
          }`}
        >
          {added ? 'Added!' : '+ Add to cart'}
        </button>
      </div>
    </article>
  )
}
