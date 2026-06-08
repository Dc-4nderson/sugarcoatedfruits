const inputClass =
  'w-full px-4 py-3 rounded-xl border-2 border-brand-pink-light focus:border-brand-pink focus:outline-none bg-white text-brand-text placeholder:text-brand-text/30 transition-colors'

export default function AddressForm({ data, onChange, zipError }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value })

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-bold text-brand-text mb-1">Street Address *</label>
        <input
          type="text"
          value={data.street}
          onChange={set('street')}
          placeholder="123 Main St"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-brand-text mb-1">City</label>
          <input
            type="text"
            value={data.city}
            readOnly
            className={`${inputClass} bg-brand-pink-light cursor-not-allowed`}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-text mb-1">State</label>
          <input
            type="text"
            value={data.state}
            readOnly
            className={`${inputClass} bg-brand-pink-light cursor-not-allowed`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-brand-text mb-1">Zip Code *</label>
        <input
          type="text"
          value={data.zip}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 5)
            onChange({ ...data, zip: val })
          }}
          placeholder="32205"
          required
          className={`${inputClass} ${zipError ? 'border-red-400 bg-red-50' : ''}`}
        />
        {zipError && (
          <p className="text-red-500 text-sm mt-1 font-semibold">🚫 {zipError}</p>
        )}
      </div>
    </div>
  )
}
