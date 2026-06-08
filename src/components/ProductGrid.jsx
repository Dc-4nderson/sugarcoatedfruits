import ProductCard from './ProductCard'
import products from '../data/products.json'
import { useAdmin } from '../context/AdminContext'

// Shape custom admin products to match ProductCard's expected format
function normalizeCustomProduct(p) {
  return {
    ...p,
    // ProductCard reads product.id for emoji lookup — custom products use their own emoji
    _customEmoji: p.emoji,
  }
}

export default function ProductGrid() {
  const { customProducts } = useAdmin()
  const allProducts = [
    ...products,
    ...customProducts.map(normalizeCustomProduct),
  ]

  return (
    <section id="products" className="py-14 md:py-20 px-4 bg-brand-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-text">
            Our Treats
          </h2>
          <p className="text-brand-text/60 mt-2 text-base md:text-lg">
            Handmade fresh to order — pick your count & flavor!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* TODO: Seasonal specials / flavor-of-the-week */}
      </div>
    </section>
  )
}
