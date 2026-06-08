import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

const inputClass = 'w-full px-4 py-3 rounded-xl border-2 border-brand-pink-light focus:border-brand-pink focus:outline-none bg-white text-brand-text placeholder:text-brand-text/30 transition-colors text-sm'

const FLAVORS = ['Watermelon', 'Strawberry', 'Grape', 'Blueberry', 'Original']

function ProductsTab() {
  const { customProducts, addCustomProduct, removeCustomProduct } = useAdmin()
  const [form, setForm] = useState({
    name: '', description: '', emoji: '🍬',
    sizes: [{ label: '', price: '', _key: Date.now() }],
    flavors: [],
  })
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const setField = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const setSizeField = (i, key, val) => {
    setForm(p => {
      const next = [...p.sizes]
      next[i] = { ...next[i], [key]: val }
      return { ...p, sizes: next }
    })
  }

  const addSize = () => setForm(p => ({ ...p, sizes: [...p.sizes, { label: '', price: '', _key: Date.now() }] }))
  const removeSize = (i) => setForm(p => ({ ...p, sizes: p.sizes.filter((_, j) => j !== i) }))

  const toggleFlavor = (f) => setForm(p => ({
    ...p,
    flavors: p.flavors.includes(f) ? p.flavors.filter(x => x !== f) : [...p.flavors, f],
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Product name is required.'); return }
    const sizes = form.sizes
      .filter(s => s.label.trim() && s.price !== '')
      .map(s => ({ label: s.label.trim(), price: parseFloat(s.price) }))
    if (sizes.length === 0) { setError('Add at least one size with a price.'); return }
    if (form.flavors.length === 0) { setError('Select at least one flavor.'); return }
    addCustomProduct({ name: form.name.trim(), description: form.description.trim(), emoji: form.emoji || '🍬', sizes, flavors: form.flavors })
    setForm({ name: '', description: '', emoji: '🍬', sizes: [{ label: '', price: '', _key: Date.now() }], flavors: [] })
    setShowForm(false)
    setError('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-brand-text/60 text-sm">{customProducts.length} custom product{customProducts.length !== 1 ? 's' : ''}</p>
        <button
          type="button"
          onClick={() => { setShowForm(p => !p); setError('') }}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-pink text-white rounded-full font-bold text-sm shadow-pink-md hover:bg-brand-pink-dark active:scale-95 transition-all touch-manipulation"
        >
          {showForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-brand-pink-light/40 rounded-3xl border-2 border-brand-pink-light p-6 mb-6 space-y-4">
          <h4 className="font-display font-bold text-lg text-brand-text">New Product</h4>

          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">{error}</p>}

          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-bold text-brand-text/60 mb-1">Emoji</label>
              <input type="text" value={form.emoji} onChange={e => setField('emoji', e.target.value)} className={inputClass} maxLength={2} />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-bold text-brand-text/60 mb-1">Product Name *</label>
              <input type="text" value={form.name} onChange={e => setField('name', e.target.value)} placeholder="e.g. Candied Mango" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text/60 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setField('description', e.target.value)} placeholder="Short description..." rows={2} className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text/60 mb-2">Sizes & Prices *</label>
            <div className="space-y-2">
              {form.sizes.map((s, i) => (
                <div key={s._key} className="grid grid-cols-[1fr_auto_5rem_auto] gap-2 items-center">
                  <input
                    type="text"
                    value={s.label}
                    onChange={e => setSizeField(i, 'label', e.target.value)}
                    placeholder="Label (e.g. 6 count)"
                    className={inputClass}
                  />
                  <span className="text-brand-text/40 font-bold">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={s.price}
                    onChange={e => setSizeField(i, 'price', e.target.value)}
                    placeholder="0.00"
                    className={inputClass}
                  />
                  {form.sizes.length > 1 && (
                    <button type="button" onClick={() => removeSize(i)} className="text-red-400 hover:text-red-600 font-bold px-2 touch-manipulation">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addSize} className="text-brand-pink text-sm font-bold hover:underline touch-manipulation">+ Add size</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text/60 mb-2">Flavors *</label>
            <div className="flex flex-wrap gap-2">
              {FLAVORS.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFlavor(f)}
                  className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all touch-manipulation ${
                    form.flavors.includes(f)
                      ? 'bg-brand-pink text-white border-brand-pink'
                      : 'bg-white text-brand-text border-brand-pink-light hover:border-brand-pink'
                  }`}
                >{f}</button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-brand-pink text-white rounded-full font-display font-bold text-base shadow-pink-md hover:bg-brand-pink-dark transition-all touch-manipulation">
            Add to Menu
          </button>
        </form>
      )}

      {customProducts.length === 0 && !showForm ? (
        <div className="border-2 border-dashed border-brand-pink-light rounded-3xl py-16 flex flex-col items-center gap-3">
          <span className="text-5xl">🍬</span>
          <p className="text-brand-text/40 text-sm">No custom products yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customProducts.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border-2 border-brand-pink-light shadow-pink p-4 flex items-start gap-4">
              <span className="text-4xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-text">{p.name}</p>
                <p className="text-xs text-brand-text/50 mt-0.5 truncate">{p.description}</p>
                <p className="text-xs text-brand-text/40 mt-1">
                  {p.sizes.map(s => `${s.label} $${s.price}`).join(' · ')}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.flavors.map(f => (
                    <span key={f} className="text-xs bg-brand-pink-light text-brand-pink px-2 py-0.5 rounded-full font-bold">{f}</span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeCustomProduct(p.id)}
                className="shrink-0 text-xs text-red-400 hover:text-red-600 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors touch-manipulation"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


function ReviewsTab() {
  const { userReviews, deleteUserReview } = useAdmin()

  if (userReviews.length === 0) {
    return (
      <div className="border-2 border-dashed border-brand-pink-light rounded-3xl py-16 flex flex-col items-center gap-3">
        <span className="text-5xl">⭐</span>
        <p className="text-brand-text/40 text-sm">No customer reviews yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-brand-text/60 text-sm mb-5">{userReviews.length} customer review{userReviews.length !== 1 ? 's' : ''}</p>
      {userReviews.map(review => (
        <div key={review.id} className="bg-white rounded-2xl border-2 border-brand-pink-light shadow-pink p-5 flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className={`w-4 h-4 ${i <= review.stars ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-brand-text text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-brand-text text-sm">{review.name}</span>
              <span className="text-brand-text/35 text-xs">{review.date}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => deleteUserReview(review.id)}
            className="shrink-0 text-xs text-red-400 hover:text-red-600 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors touch-manipulation"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

function OrdersTab() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [expanded, setExpanded] = useState(null)

  const fetchOrders = () => {
    setLoading(true)
    setError('')
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setOrders(data.orders)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useState(() => { fetchOrders() }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-20">
        <div className="w-8 h-8 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
        <p className="text-brand-text/40 text-sm">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border-2 border-red-200 bg-red-50 rounded-3xl py-12 flex flex-col items-center gap-3 px-6 text-center">
        <span className="text-4xl">⚠️</span>
        <p className="text-red-600 font-bold">Could not load orders</p>
        <p className="text-red-400 text-sm">{error}</p>
        <button type="button" onClick={fetchOrders} className="mt-2 px-5 py-2 bg-brand-pink text-white rounded-full font-bold text-sm touch-manipulation">
          Retry
        </button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="border-2 border-dashed border-brand-pink-light rounded-3xl py-16 flex flex-col items-center gap-3">
        <span className="text-5xl">📦</span>
        <p className="text-brand-text/40 text-sm">No completed orders yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-brand-text/60 text-sm">{orders.length} paid order{orders.length !== 1 ? 's' : ''}</p>
        <button type="button" onClick={fetchOrders} className="text-brand-pink text-sm font-bold hover:underline touch-manipulation">
          ↻ Refresh
        </button>
      </div>
      {orders.map(order => {
        const isOpen = expanded === order.id
        const date = new Date(order.created * 1000)
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        return (
          <div key={order.id} className="bg-white rounded-2xl border-2 border-brand-pink-light shadow-pink overflow-hidden">
            {/* Summary row */}
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : order.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-brand-pink-light/20 transition-colors touch-manipulation"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-brand-text">{order.customerName}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    order.fulfillmentType === 'delivery'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {order.fulfillmentType === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'}
                  </span>
                </div>
                <p className="text-xs text-brand-text/40 mt-0.5">{dateStr} at {timeStr}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-display font-bold text-brand-pink text-lg">${order.total.toFixed(2)}</span>
                <span className="text-brand-text/30 text-sm">{isOpen ? '▲' : '▼'}</span>
              </div>
            </button>

            {/* Expanded details */}
            {isOpen && (
              <div className="px-5 pb-5 border-t-2 border-brand-pink-light pt-4 space-y-4">
                {/* Customer info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs font-bold text-brand-text/40 uppercase tracking-wide mb-1">Customer</p>
                    <p className="font-bold text-brand-text">{order.customerName}</p>
                    {order.customerPhone !== '—' && <p className="text-brand-text/60">{order.customerPhone}</p>}
                    {order.customerEmail !== '—' && <p className="text-brand-text/60">{order.customerEmail}</p>}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-text/40 uppercase tracking-wide mb-1">Fulfillment</p>
                    <p className="text-brand-text/80">
                      {order.fulfillmentType === 'delivery' ? `📍 ${order.deliveryAddress}` : '🏪 Pickup'}
                    </p>
                    {order.preferredDate !== '—' && (
                      <p className="text-brand-text/60 mt-1">📅 {order.preferredDate}</p>
                    )}
                    {order.notes && (
                      <p className="text-brand-text/60 mt-1 italic">"{order.notes}"</p>
                    )}
                  </div>
                </div>

                {/* Line items */}
                <div>
                  <p className="text-xs font-bold text-brand-text/40 uppercase tracking-wide mb-2">Items</p>
                  <div className="space-y-1">
                    {order.lineItems.map((li, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-brand-text/80">{li.name} × {li.quantity}</span>
                        <span className="font-bold text-brand-pink">${li.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-brand-pink-light pt-2 flex justify-between font-bold mt-2">
                      <span className="text-brand-text">Total</span>
                      <span className="text-brand-pink font-display text-lg">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-text/25">Order ID: {order.id}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default function AdminDashboard() {
  const { logout } = useAdmin()
  const [tab, setTab] = useState('products')

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-white border-b-2 border-brand-pink-light sticky top-0 z-20 shadow-pink">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="" className="w-9 h-9 rounded-xl" aria-hidden="true" />
            <span className="font-display font-bold text-brand-text text-lg">Admin</span>
            <span className="text-brand-text/30 text-sm hidden sm:block">Sugar Coated Fruitzz</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-brand-text/50 hover:text-brand-pink font-bold transition-colors touch-manipulation">
              ← View Site
            </a>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-full border-2 border-brand-pink-light text-brand-text/70 hover:border-brand-pink hover:text-brand-pink font-bold text-sm transition-all touch-manipulation"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-text mb-2">Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-brand-pink-light">
          {[['products', '🍬 Products'], ['reviews', '⭐ Reviews'], ['orders', '📦 Orders']].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`px-5 py-2.5 font-bold text-sm rounded-t-xl border-2 border-b-0 transition-all touch-manipulation -mb-0.5 ${
                tab === key
                  ? 'bg-white border-brand-pink-light text-brand-pink'
                  : 'bg-transparent border-transparent text-brand-text/40 hover:text-brand-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'products' && <ProductsTab />}
        {tab === 'reviews'  && <ReviewsTab />}
        {tab === 'orders'   && <OrdersTab />}
      </main>
    </div>
  )
}
