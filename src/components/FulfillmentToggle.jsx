export default function FulfillmentToggle({ value, onChange }) {
  return (
    <div>
      <p className="font-bold text-brand-text text-lg mb-3">
        How would you like your order?
      </p>
      <div className="flex gap-3">
        {[
          { key: 'pickup',   label: 'Pickup',   icon: '🏪' },
          { key: 'delivery', label: 'Delivery', icon: '🚗' },
        ].map(opt => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`flex-1 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-200 ${
              value === opt.key
                ? 'bg-brand-pink text-white border-brand-pink shadow-pink-md'
                : 'bg-white text-brand-text border-brand-pink-light hover:border-brand-pink'
            }`}
          >
            {opt.icon} {opt.label}
          </button>
        ))}
      </div>

      {value === 'pickup' && (
        <div className="mt-4 p-4 bg-brand-pink-light rounded-2xl text-sm space-y-1">
          <p className="font-bold text-brand-text">📍 Pickup Location</p>
          <p className="text-brand-text/70">Jacksonville, FL — exact address sent after order confirmation</p>
          <p className="text-brand-text/70">⏰ 48-hour turnaround on all orders</p>
        </div>
      )}

      {value === 'delivery' && (
        <div className="mt-4 p-4 bg-brand-pink-light rounded-2xl text-sm space-y-1">
          <p className="font-bold text-brand-text">🚗 Delivery Info</p>
          <p className="text-brand-text/70">We deliver up to 20 miles within Jacksonville, FL.</p>
          <p className="text-brand-text/70">Delivery fee varies by distance — we will confirm your total before charging.</p>
          <p className="text-brand-text/70">⏰ 48-hour turnaround on all orders</p>
        </div>
      )}
    </div>
  )
}
