import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

const inputClass = 'w-full px-4 py-3 rounded-xl border-2 border-brand-pink-light focus:border-brand-pink focus:outline-none bg-white text-brand-text placeholder:text-brand-text/30 transition-colors text-sm'

const FLAVORS = ['Watermelon', 'Strawberry', 'Grape', 'Blueberry', 'Original']

function ProductsTab() {
  const { customProducts, addCustomProduct, removeCustomProduct } = useAdmin()
  const [form, setForm] = useState({
    name: '', description: '', emoji: '🍬',
    sizes: [{ label: '', price: '' }],
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

  const addSize = () => setForm(p => ({ ...p, sizes: [...p.sizes, { label: '', price: '' }] }))
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
    setForm({ name: '', description: '', emoji: '🍬', sizes: [{ label: '', price: '' }], flavors: [] })
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
            <label className="block text-xs font-bold text-brand-text/60 mb-1">Sizes & Prices *</label>
            <p className="text-xs text-brand-text/40 mb-2">
              Label = what the customer sees (e.g. <span className="font-bold">6 count</span>, <span className="font-bold">12 count</span>, <span className="font-bold">Small bag</span>).
              Price = dollar amount for that size. Add a row for each size option.
            </p>
            <div className="space-y-2">
              {form.sizes.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" value={s.label} onChange={e => setSizeField(i, 'label', e.target.value)} placeholder="e.g. 6 count" className={`${inputClass} flex-1`} />
                  <span className="text-brand-text/40 font-bold">$</span>
                  <input type="text" inputMode="decimal" value={s.price} onChange={e => setSizeField(i, 'price', e.target.value)} placeholder="0.00" className={`${inputClass} w-24`} />
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


export default function AdminDashboard() {
  const { logout } = useAdmin()

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
        <p className="text-brand-text/50 text-sm mb-8">Manage products</p>

        <ProductsTab />
      </main>
    </div>
  )
}
