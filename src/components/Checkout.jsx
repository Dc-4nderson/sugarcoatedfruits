import { useState } from 'react'
import { useCart } from '../context/CartContext'
import FulfillmentToggle from './FulfillmentToggle'
import AddressForm from './AddressForm'
import { handlePayment } from '../lib/stripe'

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toISOString().split('T')[0]
}

function validateZip(zip) {
  if (!zip || zip.length !== 5) return 'Please enter a valid 5-digit zip code.'
  if (!zip.startsWith('322')) return 'Sorry, we only deliver within Jacksonville, FL right now!'
  return null
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border-2 border-brand-pink-light focus:border-brand-pink focus:outline-none bg-white text-brand-text placeholder:text-brand-text/30 transition-colors'

export default function Checkout({ onBack }) {
  const { items, subtotal, count, clearCart } = useCart()

  const [fulfillment, setFulfillment] = useState('pickup')
  const [address, setAddress]         = useState({ street: '', city: 'Jacksonville', state: 'FL', zip: '' })
  const [customer, setCustomer]       = useState({ name: '', phone: '', email: '' })
  const [notes, setNotes]             = useState('')
  const [date, setDate]               = useState('')
  const [sameDay, setSameDay]         = useState(false)
  const [zipError, setZipError]       = useState(null)
  const [submitting, setSubmitting]   = useState(false)

  // Rush fee: $5 for 1 item, $10 for 2+ items
  const rushFee  = sameDay ? (count === 1 ? 5 : 10) : 0
  const total    = subtotal + rushFee

  const toggleSameDay = () => {
    const next = !sameDay
    setSameDay(next)
    setDate(next ? getTodayStr() : '')
  }

  const handleCustomer = (e) =>
    setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleAddressChange = (addr) => {
    setAddress(addr)
    setZipError(addr.zip.length === 5 ? validateZip(addr.zip) : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (fulfillment === 'delivery') {
      const err = validateZip(address.zip)
      if (err) { setZipError(err); return }
    }
    setSubmitting(true)
    try {
      await handlePayment(
        items,
        customer,
        fulfillment,
        fulfillment === 'delivery'
          ? { ...address, date, notes, sameDay, rushFee }
          : { date, notes, sameDay, rushFee }
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="checkout" className="py-14 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-pink font-bold mb-8 hover:gap-3 transition-all touch-manipulation"
        >
          ← Back to treats
        </button>

        <h2 className="font-display text-4xl font-bold text-brand-text mb-1">Checkout 🍬</h2>
        <p className="text-brand-text/60 mb-8">Almost there! Fill in your details below.</p>

        {/* Order summary */}
        <div className="bg-white rounded-3xl border-2 border-brand-pink-light p-6 mb-6 shadow-pink">
          <h3 className="font-bold text-brand-text text-lg mb-4">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-brand-text/80">
                  {item.name} · {item.size} · {item.flavor} × {item.quantity}
                </span>
                <span className="font-bold text-brand-pink">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {/* Rush fee line — only shown when same-day is on */}
            {sameDay && (
              <div className="flex justify-between text-sm">
                <span className="text-brand-text/80 flex items-center gap-1">
                  <span className="bg-brand-hot-pink text-white text-xs font-bold px-2 py-0.5 rounded-full">RUSH</span>
                  Same-day fee ({count === 1 ? '1 item' : `${count} items`})
                </span>
                <span className="font-bold text-brand-hot-pink">+${rushFee.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t-2 border-brand-pink-light pt-3 flex justify-between font-bold">
              <span className="text-brand-text">Total</span>
              <span className="font-display text-2xl text-brand-pink">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Fulfillment */}
          <div className="bg-white rounded-3xl border-2 border-brand-pink-light p-6 shadow-pink">
            <FulfillmentToggle value={fulfillment} onChange={setFulfillment} />
            {fulfillment === 'delivery' && (
              <div className="mt-5 pt-5 border-t-2 border-brand-pink-light">
                <p className="font-bold text-brand-text mb-3">Delivery Address</p>
                <AddressForm
                  data={address}
                  onChange={handleAddressChange}
                  zipError={zipError}
                />
              </div>
            )}
          </div>

          {/* Customer info */}
          <div className="bg-white rounded-3xl border-2 border-brand-pink-light p-6 shadow-pink">
            <h3 className="font-bold text-brand-text text-lg mb-4">Your Info</h3>
            <div className="space-y-3">
              {[
                { name: 'name',  label: 'Full Name',    type: 'text',  placeholder: 'Your name'       },
                { name: 'phone', label: 'Phone Number', type: 'tel',   placeholder: '(904) 555-0123'  },
                { name: 'email', label: 'Email',        type: 'email', placeholder: 'you@example.com' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-bold text-brand-text mb-1">{f.label} *</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={customer[f.name]}
                    onChange={handleCustomer}
                    placeholder={f.placeholder}
                    required
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Date + notes */}
          <div className="bg-white rounded-3xl border-2 border-brand-pink-light p-6 shadow-pink">
            <h3 className="font-bold text-brand-text text-lg mb-4">Order Details</h3>
            <div className="space-y-4">

              {/* Same-day toggle */}
              <button
                type="button"
                onClick={toggleSameDay}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 font-bold transition-all duration-200 touch-manipulation ${
                  sameDay
                    ? 'bg-brand-hot-pink border-brand-hot-pink text-white shadow-pink-md'
                    : 'bg-brand-pink-light border-brand-pink-light text-brand-text hover:border-brand-pink'
                }`}
              >
                <span className="flex items-center gap-2 text-sm md:text-base">
                  <span className="text-xl">⚡</span>
                  Same-day rush order
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${sameDay ? 'bg-white/25 text-white' : 'bg-brand-pink text-white'}`}>
                    +${count === 1 ? '5' : '10'}
                  </span>
                </span>
                <span className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${sameDay ? 'bg-white/30' : 'bg-brand-text/20'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${sameDay ? 'left-5' : 'left-0.5'}`} />
                </span>
              </button>

              {sameDay && (
                <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-sm text-amber-800 font-medium">
                  ⚠️ Rush orders must be confirmed by Amere — DM <a href="https://instagram.com/sugarcoated.fruitzz" target="_blank" rel="noopener noreferrer" className="font-bold underline">@sugarcoated.fruitzz</a> to ensure availability before placing.
                </div>
              )}

              {/* Date picker */}
              <div>
                <label className="block text-sm font-bold text-brand-text mb-1">
                  {sameDay ? 'Delivery / Pickup Date' : 'Preferred Date *'}
                  {' '}
                  {!sameDay && (
                    <span className="font-normal text-brand-text/45 text-xs">(min. 48 hrs from today)</span>
                  )}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => !sameDay && setDate(e.target.value)}
                  min={sameDay ? getTodayStr() : getMinDate()}
                  max={sameDay ? getTodayStr() : undefined}
                  required
                  readOnly={sameDay}
                  className={`${inputClass} ${sameDay ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-brand-text mb-1">
                  Order Notes <span className="font-normal text-brand-text/45 text-xs">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder='e.g. "No grape flavor on the strawberries"'
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-3xl border-2 border-brand-pink-light p-6 shadow-pink">
            <h3 className="font-bold text-brand-text text-lg mb-1">Payment</h3>
            <p className="text-sm text-brand-text/60 mb-5">
              Payment is required to secure your order. All sales are final.
            </p>

            {/* TODO: Stripe Checkout integration — create /api/create-checkout-session endpoint */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-brand-pink text-white rounded-full font-display font-bold text-xl shadow-pink-md hover:shadow-pink-lg hover:bg-brand-pink-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
            >
              {submitting ? 'Processing...' : `💳 Pay $${total.toFixed(2)}${sameDay ? ' (incl. rush fee)' : ''}`}
            </button>

            <div className="mt-5 text-center space-y-1">
              <p className="text-xs text-brand-text/40">— or —</p>
              <a
                href="https://instagram.com/sugarcoated.fruitzz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-pink font-bold text-sm hover:underline"
              >
                DM us on Instagram @sugarcoated.fruitzz to order
              </a>
            </div>
          </div>

        </form>
      </div>
    </section>
  )
}
